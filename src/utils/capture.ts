import { getHMS, getYMD } from "@/utils/getHMS";
import html2canvas from "html2canvas";

export function capture(fn = "canvas_image") {
  return new Promise<void>((rs) => {
    const [h, m, s] = getHMS(new Date());
    const [y, mo, d] = getYMD(new Date());

    const timeStr = [y, mo, d].map((v) => String(v).padStart(2, "0")).join("_") + "-" + [h, m, s].map((v) => String(v).padStart(2, "0")).join("_");

    html2canvas(document.body).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");

      const fileName = fn + "_" + timeStr + ".png";

      link.download = fileName; // Specify the file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      rs();
    });
  });
}
