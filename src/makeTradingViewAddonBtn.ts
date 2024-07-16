import { addPlayReplayTDV } from "@/addon/addPlayReplayTDV";
import { addQuickTimeChangeTDV } from "@/addon/addQuickTimeChangeTDV";
import { addXauScale1 } from "@/addon/addXauScale1";

async function makeTradingViewAddonBtn() {
  //   let tdvBtn: Element | null = await getTradingViewRightToolBarBtnAsync();
  //   const btnToRemoveList: Element[] = [];

  //   while (tdvBtn?.nextElementSibling) {
  //     btnToRemoveList.push(tdvBtn);
  //     tdvBtn = tdvBtn.nextElementSibling;
  //   }

  //   btnToRemoveList.forEach((e) => e.remove());

  await addQuickTimeChangeTDV();
  await addPlayReplayTDV();
  await addXauScale1();
}

makeTradingViewAddonBtn();
