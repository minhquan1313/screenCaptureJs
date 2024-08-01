//+------------------------------------------------------------------+
//|                                             SimpleOrder[MTB].mq5 |
//|                                              Copyright 2024, MTB |
//|                                             https://www.mql5.com |
//+------------------------------------------------------------------+
#include <ChartObjects\ChartObjectsTxtControls.mqh>
#include <Controls\Button.mqh>
#include <Controls\Edit.mqh>
#include <Trade\Trade.mqh>

#property copyright "Copyright 2024, MTB"
#property link "https://www.mql5.com"
#property version "1.00"

const string defaultEST = "Paste EST here";
enum MTB_ORDER_TYPE {
    BUY_LIMIT,
    SELL_LIMIT,
};

input string inpDefaultEST = "Paste EST here";  // Default EST
// input string inpDefaultEST = "sell-limit|2384.55|2389.55|2379.55";  // Default EST
input string inpOrderComment = "Simple Order[MTB]";  // Default Order comment
input double inpLotSize = 0.01;                      // Default lot size
input int inpTopOffset = 20;                         // Top offset

// Global variables for the GUI controls
CEdit editEntryPrice, editLotSize;
CButton buttonPlaceOrder;
int magicNumber;
//+------------------------------------------------------------------+
//| Expert initialization function                                   |
//+------------------------------------------------------------------+
int OnInit() {
    // Create the GUI elements
    MathSrand(GetTickCount());
    magicNumber = GetRandomInt(100, 1000);
    CreateGUI();
    return (INIT_SUCCEEDED);
}
//+------------------------------------------------------------------+
//| Expert deinitialization function                                 |
//+------------------------------------------------------------------+
void OnDeinit(const int reason) {
    // Destroy the GUI elements
    editEntryPrice.Destroy();
    editLotSize.Destroy();
    buttonPlaceOrder.Destroy();
}
//+------------------------------------------------------------------+
//| Expert tick function                                             |
//+------------------------------------------------------------------+
void OnTick() {
    // This EA does nothing on every tick
}
//+------------------------------------------------------------------+
//| Create the GUI elements                                          |
//+------------------------------------------------------------------+
void CreateGUI() {
    // Entry Price Edit Box
    int etHeight = 30;
    int btnHeight = 20;
    int xGap, yGap;
    xGap = yGap = 4;
    // editEntryPrice.Create(0, "EntryPrice", 0, 4, 80, 124, 80 + etHeight);
    editEntryPrice.Create(0, "EntryPrice", 0, xGap, yGap + inpTopOffset, 0, 0);
    editEntryPrice.Text(inpDefaultEST);
    // editEntryPrice.Alignment()
    editEntryPrice.FontSize(12);
    editEntryPrice.Width(120);
    editEntryPrice.Height(30);
    // editLotSize.Create(0, "LotSize", 0, 4, 114, 60, 114 + btnHeight);
    editLotSize.Create(0, "LotSize", 0, xGap, yGap + editEntryPrice.Bottom(), 0, 0);
    editLotSize.Text(DoubleToString(inpLotSize, 2));
    editLotSize.FontSize(10);
    editLotSize.Width((int)(120 / 2 - xGap / 2));
    editLotSize.Height(20);
    buttonPlaceOrder.Create(0, "PlaceOrder", 0, xGap + editLotSize.Right(), yGap + editEntryPrice.Bottom(), 0, 0);
    buttonPlaceOrder.Text("Place");
    buttonPlaceOrder.Width((int)(120 / 2 - xGap / 2));
    buttonPlaceOrder.Height(20);
}
//+------------------------------------------------------------------+
//| Handle the button click event                                    |
//+------------------------------------------------------------------+
void OnChartEvent(const int id, const long &lparam, const double &dparam, const string &sparam) {
    if (id == CHARTEVENT_OBJECT_CLICK) {
        if (sparam == "PlaceOrder") {
            string editLotSizeText = editLotSize.Text();
            string estText = editEntryPrice.Text();
            string orderComment = inpOrderComment;
            // printf("%s | %s", estText, editLotSizeText);
            // Print(IsValidDouble(editLotSizeText));
            // Print(IsValidESTString(estText));
            if (!IsValidDouble(editLotSizeText) || !IsValidESTString(estText)) return;
            double lotSize = StringToDouble(editLotSizeText);
            // Print(lotSize);
            MTB_ORDER_TYPE orderType = ESTToOrderType(estText);
            double et = ESTToET(estText);
            double sl = ESTToSL(estText);
            double tp = ESTToTP(estText);
            // double entryPrice = StringToDouble(text);
            // double stopLoss = StringToDouble(editStopLoss.Text());
            // double takeProfit = StringToDouble(editTakeProfit.Text());
            // double currentPrice = SymbolInfoDouble(Symbol(), SYMBOL_BID);
            // int orderType = 0;  // 0 = no order, 1 = buy, -1 = sell
            // if (currentPrice < entryPrice)
            //     orderType = 1;  // Buy order
            // else if (currentPrice > entryPrice)
            //     orderType = -1;  // Sell order
            // if (orderType != 0)
            printf("Type: %s | et: %.2f | sl: %.2f | tp: %.2f | lot: %.2f | cmt: %s", orderType == BUY_LIMIT ? "buy" : "sell", et, sl, tp, lotSize, orderComment);
            PlaceOrder(orderType, et, sl, tp, lotSize, orderComment);
        }
    }
    //  else if (id == CHARTEVENT_MOUSE_WHEEL) {
    //     Print(lparam);
    //     Print(dparam);
    //     Print(sparam);
    //     if (sparam == "LotSize") {
    //         Print("Wheel");
    //     }
    // }
}
//+------------------------------------------------------------------+
//| Function to place order                                          |
//+------------------------------------------------------------------+
void PlaceOrder(MTB_ORDER_TYPE orderType, double entry, double sl, double tp, double lot, string comment) {
    MqlTradeRequest request;
    MqlTradeResult result;
    ZeroMemory(request);
    ZeroMemory(result);
    request.action = TRADE_ACTION_PENDING;
    request.symbol = Symbol();
    request.volume = lot;
    request.deviation = 500;
    request.magic = 123456;
    request.type_filling = ORDER_FILLING_FOK;
    request.type_time = ORDER_TIME_GTC;
    request.comment = comment;
    if (orderType == BUY_LIMIT) {
        request.price = entry;
        // request.price = SymbolInfoDouble(Symbol(), SYMBOL_ASK);
        // request.type = ORDER_TYPE_BUY;
        request.type = ORDER_TYPE_BUY_LIMIT;
        request.sl = sl;
        request.tp = tp;
    } else if (orderType == SELL_LIMIT) {
        request.price = entry;
        // request.price = SymbolInfoDouble(Symbol(), SYMBOL_BID);
        // request.type = ORDER_TYPE_SELL;
        request.type = ORDER_TYPE_SELL_LIMIT;
        request.sl = sl;
        request.tp = tp;
    }
    if (!OrderSend(request, result)) {
        Print("OrderSend failed, error: ", GetLastError());
    } else {
        // Print("OrderSend succeeded: ", result.order);
        PlaceSuccess();
    }
}
//+------------------------------------------------------------------+
//|                                                                  |
//+------------------------------------------------------------------+
void PlaceSuccess() {
    editEntryPrice.Text(defaultEST);
}

//+------------------------------------------------------------------+
//|                                                                  |
//+------------------------------------------------------------------+
int SplitString(string text, string delimiters, string &result[]) {
    ushort u_delimiters;
    u_delimiters = StringGetCharacter(delimiters, 0);
    return StringSplit(text, u_delimiters, result);
}

//+------------------------------------------------------------------+
//|                                                                  |
//+------------------------------------------------------------------+
bool IsValidESTString(string est) {
    string parts[];
    int parts_count = SplitString(est, "|", parts);
    if (parts_count != 4) return false;
    if (parts[0] != "buy-limit" && parts[0] != "sell-limit") return false;
    if (!IsValidDouble(parts[1])) return false;
    if (!IsValidDouble(parts[2])) return false;
    if (!IsValidDouble(parts[3])) return false;
    return true;
}
//+------------------------------------------------------------------+
//|                                                                  |
//+------------------------------------------------------------------+
MTB_ORDER_TYPE ESTToOrderType(string est) {
    string parts[];
    SplitString(est, "|", parts);
    if (parts[0] == "buy-limit") return BUY_LIMIT;
    return SELL_LIMIT;
}
//+------------------------------------------------------------------+
//|                                                                  |
//+------------------------------------------------------------------+
double ESTToET(string est) {
    string parts[];
    SplitString(est, "|", parts);
    return StringToDouble(parts[1]);
}
//+------------------------------------------------------------------+
//|                                                                  |
//+------------------------------------------------------------------+
double ESTToSL(string est) {
    string parts[];
    SplitString(est, "|", parts);
    return StringToDouble(parts[2]);
}
//+------------------------------------------------------------------+
//|                                                                  |
//+------------------------------------------------------------------+
double ESTToTP(string est) {
    string parts[];
    SplitString(est, "|", parts);
    return StringToDouble(parts[3]);
}
//+------------------------------------------------------------------+
//|                                                                  |
//+------------------------------------------------------------------+
bool IsValidDouble(string str) {
    double number = StringToDouble(str);
    // Check if the string can be correctly converted to a double
    if (number == 0.0 && StringLen(str) != 1 && str[0] != '0') {
        return false;
    }
    // Further checks can be done if needed
    int dot_count = 0;
    int len = StringLen(str);
    for (int i = 0; i < len; i++) {
        if (str[i] == '.') {
            dot_count++;
            if (dot_count > 1) {
                return false;
            }
        } else if (!((str[i] >= '0' && str[i] <= '9') || str[i] == '-' || str[i] == '+')) {
            return false;
        }
    }
    return true;
}
//+------------------------------------------------------------------+
// Function to generate a random integer between min and max
int GetRandomInt(int min, int max) {
    return min + MathRand() % (max - min + 1);
}
//+------------------------------------------------------------------+
