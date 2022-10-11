export const modifyDate = (date: Date, status: Boolean): Date => {
  // when status true, modify date by adding one month

  if (status) {
    // when month has 31 days
    if (date.getDate() === 31) {
      // get last day of next month
      date.setDate(
        new Date(date.getFullYear(), date.getMonth() + 2, 0).getDate()
      );

      // set next month
      date.setMonth(date.getMonth() + 1);

      return date;
    }

    // otherwise just add one month
    date.setMonth(date.getMonth() + 1);

    return date;
  }
  // otherwise add five days to date
  date.setDate(date.getDate() + 5);

  return date;
};

// modifyDate(new Date("2024-01-31T08:12:59Z"), true);
