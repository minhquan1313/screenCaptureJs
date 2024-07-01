import { getHMS, getYMD } from "@/utils/getHMS";
import html2canvas from "html2canvas";

export function capture() {
  return new Promise<void>((rs) => {
    html2canvas(document.body).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");

      const [h, m, s] = getHMS(new Date());
      const [y, mo, d] = getYMD(new Date());

      const fileName = "canvas_image_" + y + "_" + [mo, d, h, m, s].map((v) => String(v).padStart(2, "0")).join("_") + ".png";

      link.download = fileName; // Specify the file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      rs();
    });
  });
}
