import Vanie, { TVanieWindowType } from "vanie";

export type TVanieWindowTypeAdapter = "mac" | "window" | "linux";
export const vanie = (type: TVanieWindowTypeAdapter) => {
  let _type: TVanieWindowType;
  switch (type) {
    case "mac":
      _type = "mac-oscuro";
      break;
    case "window":
      _type = "windows-claro";
      break;
    case "linux":
      _type = "linux-oscuro";
      break;
  }

  return new Vanie(_type);
};
