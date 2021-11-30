export const getTodayInfo = (nowYear = null, nowMonth = null) => {
  let today = new Date();

  if (nowYear) {
    today = new Date(nowYear, nowMonth);
  }

  const year = today.getUTCFullYear();
  const month = today.getUTCMonth() + 1;
  const day = today.getUTCDate();

  return {
    year,
    month,
    day,
    format: {
      normal: `${year}${month}${day}`,
    },
  };
};

getTodayInfo.prevMonth = (nowYear, nowMonth) => {
  return getTodayInfo(nowYear, nowMonth - 1);
};

getTodayInfo.nextMonth = (nowYear, nowMonth) => {
  return getTodayInfo(nowYear, nowMonth + 1);
};

export const formatDate = (year, month, day) => {
  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;

  return `${year.toString()}${month.toString()}${day.toString()}`;
};

export const getTimeRange = () => {
  let items = [];
  for (var hour = 0; hour < 24; hour++) {
    items.push([hour, 0]);
    items.push([hour, 30]);
  }

  const date = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

  const timeRanges = items.map((time, index) => {
    const [hour, minute] = time;
    date.setHours(hour);
    date.setMinutes(minute);

    return {
      id: index,
      value: formatter.format(date),
    };
  });

  return timeRanges;
};
