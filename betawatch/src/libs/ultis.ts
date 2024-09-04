export const formatter = new Intl.NumberFormat("en-US");

export function formatNumber(num: number) {
  //   if (num >= 1000000) {
  //     return (num / 1000000).toFixed(2) + "M";
  //   }
  //  else if (num >= 1000) {
  //     return (num / 1000).toFixed(2) + 'K';
  // }
  return formatter.format(Math.round(num)) + "đ";
}
