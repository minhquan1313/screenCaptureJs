export function getHMS(date: Date) {
  const [h, m, s] = [date.getHours(), date.getMinutes(), date.getSeconds()];

  return [h, m, s];
}
export function getYMD(date: Date) {
  const [y, m, d] = [date.getFullYear(), date.getMonth() + 1, date.getDate()];

  return [y, m, d];
}
