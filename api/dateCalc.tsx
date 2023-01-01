export const dateToJa = (dateString: string) => {
  const date = new Date(Date.parse(dateString));
  const dateJa =
    date.getFullYear() +
    '年' +
    (date.getMonth() + 1).toString().replace(/^0+/, '') +
    '月' +
    date.getDate() +
    '日';
  return dateJa;
};

export const datetimeToJa = (datetimeString: string) => {
  const date = new Date(Date.parse(datetimeString));
  const dateJa =
    date.getFullYear() +
    '年' +
    (date.getMonth() + 1).toString().replace(/^0+/, '') +
    '月' +
    date.getDate() +
    '日' +
    ' ' +
    date.getHours() +
    ':' +
    date.getMinutes() +
    ':' +
    date.getSeconds();

  return dateJa;
};

export const roundedDiffDate = (dateString: string) => {
  const frontOrBehind = (value: number) => {
    if (value > 0) {
      return '前';
    } else {
      return '後';
    }
  };
  const date = new Date(Date.parse(dateString));
  const nowDate = new Date(Date.now());
  const difference = nowDate - date;
  const second = difference / 1000;
  const minute = second / 60;
  const hour = minute / 60;
  const day = hour / 24;
  const month = day / 30;
  const year = day / 365;
  let num;
  let unit;
  switch (!num && !unit) {
    case year >= 1:
      num = Math.round(year);
      unit = '年';
      break;
    case month >= 1:
      num = Math.round(month);
      unit = 'ヶ月';
      break;
    case day >= 1:
      num = Math.round(day);
      unit = '日';
      break;
    case hour >= 1:
      num = Math.round(hour);
      unit = '時間';
      break;
    case minute >= 1:
      num = Math.round(minute);
      unit = '分';
      break;
    case second >= 1:
      num = Math.round(second);
      unit = '秒';
      break;
    default:
      return '不明';
  }
  const dateJa = num + unit + frontOrBehind(num);
  return dateJa;
};
