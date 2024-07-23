import { getXPath } from "@/utils/getXPath";

console.clear();

const t = getXPath("//canvas[2]");
const event = new CustomEvent("contextmenu");
t?.dispatchEvent(event);
