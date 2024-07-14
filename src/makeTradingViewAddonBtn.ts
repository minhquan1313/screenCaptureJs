import { addQuickTimeChangeTDV } from "@/addon/addQuickTimeChangeTDV";

async function makeTradingViewAddonBtn() {
  //   let tdvBtn: Element | null = await getTradingViewRightToolBarBtnAsync();
  //   const btnToRemoveList: Element[] = [];

  //   while (tdvBtn?.nextElementSibling) {
  //     btnToRemoveList.push(tdvBtn);
  //     tdvBtn = tdvBtn.nextElementSibling;
  //   }

  //   btnToRemoveList.forEach((e) => e.remove());

  await addQuickTimeChangeTDV();
}

makeTradingViewAddonBtn();
