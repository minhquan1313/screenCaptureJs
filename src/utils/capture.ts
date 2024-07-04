import { getHMS, getYMD } from "@/utils/getHMS";
import html2canvas from "html2canvas";

let count = 0;
export function capture(fn = "canvas_image") {
  return new Promise<void>((rs) => {
    const [h, m, s] = getHMS(new Date());
    const [y, mo, d] = getYMD(new Date());
    const timeStrDom = [y, mo, d].map((v) => String(v).padStart(2, "0")).join("/") + " " + [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
    const timeStr = [y, mo, d].map((v) => String(v).padStart(2, "0")).join("_") + "-" + [h, m, s].map((v) => String(v).padStart(2, "0")).join("_");
    makeNumberOnDom(timeStrDom);

    html2canvas(document.body, {
      allowTaint: true,
    }).then((canvas) => {
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

function makeNumberOnDom(str: string) {
  const id = "__mtb_time__";
  document.querySelector("div#" + id)?.remove();

  const div = document.createElement("div");
  div.id = id;
  div.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  background: rgba(0,0,0,0.5);
  padding: 1rem 2rem;
  font-size: 1.5rem;
  `;

  div.innerText = str + "#" + count++;

  document.body.append(div);
}
