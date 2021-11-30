import Day from "./Day";

const Week = (props) => {
  const { today, year, month, dayOfMonth, week, dailyModalHandler } = props;

  const renderWeek = () => {
    return week.map((day, index) => {
      return (
        <Day
          key={index}
          today={today}
          year={year}
          dayOfMonth={dayOfMonth}
          month={month}
          day={day}
          dailyModalHandler={dailyModalHandler}
        />
      );
    });
  };

  return <div className='i-calendar-day'>{renderWeek()}</div>;
};

export default Week;
