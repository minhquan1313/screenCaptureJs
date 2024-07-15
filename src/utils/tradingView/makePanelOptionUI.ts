import { cssApply } from "@/utils/cssApply";

type IValue<T> = {
  value: T;
  label: string;
  select?: IValue<T>[];
};

export interface IPanelOption<T = number | boolean> {
  [key: string]: IValue<T>;
}

export function makePanelOptionUI(options: IPanelOption) {
  const div = cssApply(document.createElement("div"), {
    display: "flex",
    flexDirection: "column",
  });

  for (const key in options) {
    const obj = options[key];
    const { label, value, select } = obj;

    const row = cssApply(document.createElement("label"), {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    });

    const titleEle = cssApply(document.createElement("div"), {
      //
    });
    titleEle.textContent = label;

    let valueEle: HTMLSelectElement | HTMLInputElement;
    if (typeof value === "number") {
      if (select) {
        valueEle = cssApply(document.createElement("select"), {});

        select.forEach((v) => {
          const option = document.createElement("option");
          option.value = String(v.value);
          option.label = String(v.label || v.value);

          valueEle.append(option);
        });

        valueEle.value = String(value);

        valueEle.addEventListener("change", function () {
          options[key].value = Number(this.value);
        });
      } else {
        valueEle = cssApply(document.createElement("input"), {
          width: "80px",
        });
        valueEle.type = "number";

        valueEle.value = String(value);
        valueEle.addEventListener("change", function () {
          options[key].value = Number(this.value);
        });
      }
    } else {
      valueEle = cssApply(document.createElement("input"), {});
      valueEle.type = "checkbox";

      valueEle.checked = value;
      valueEle.addEventListener("change", function () {
        options[key].value = this.checked;
      });
    }

    row.appendChild(titleEle);
    row.appendChild(valueEle);

    div.appendChild(row);
  }

  return div;
}
