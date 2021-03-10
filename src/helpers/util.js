export function parseDate(string) {
  let dataObj = typeof string === "object" ? string : new Date(string);
  let time = dataObj.getTime();
  let now = Date.now();
  let str = "";

  let timeSpace = now - time;
  switch (true) {
    case timeSpace < 60000:
      str = "刚刚";
      break;
    case timeSpace < 1000 * 3600:
      str = Math.floor(timeSpace / (1000 * 60)) + "分钟前";
      break;
    case timeSpace < 1000 * 3600 * 24:
      str = Math.floor(timeSpace / (1000 * 3600)) + "小时前";
      break;
    default:
      str = Math.floor(timeSpace / (1000 * 3600 * 24)) + "天前";
  }
  return str;
}
