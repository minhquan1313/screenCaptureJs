import { IPanelOption } from "@/utils/tradingView/makePanelOptionUI";

export const panelOptions: IPanelOption = {
  captureMinute: {
    value: 30,
    label: "Chụp sau",
    select: [
      {
        value: 1,
        label: "1 phút",
      },
      {
        value: 5,
        label: "5 phút",
      },
      {
        value: 10,
        label: "10 phút",
      },
      {
        value: 15,
        label: "15 phút",
      },
      {
        value: 30,
        label: "30 phút",
      },
      {
        value: 60,
        label: "1 tiếng",
      },
    ],
  },
  scanTimeInterval: {
    value: 1,
    label: "Delay (giây)",
  },

  allowCapture: {
    value: false,
    label: "Chụp màn hình",
  },
  updateRealtime: {
    value: false,
    label: "Cập nhật realtime",
  },
} as const;
