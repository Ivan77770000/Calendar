import "./module.css";

import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

import { Container, Card, Alert } from "react-bootstrap";
import { ChevronBackOutline, ChevronForwardOutline } from "react-ionicons";

import Week from "./Week";

import ConnectAPIHook from "../../hooks/connection-api-hook";
import API from "../../common/api";
import { getTodayInfo } from "../../common/function";

import CalendarModel from "../../models/Calendar";

const Calendar = (rops) => {
  const { APIMethodType, sendAPIRequest } = ConnectAPIHook();
  const [errorMessage, setErrorMessage] = useState();
  const [calendar, setCalendar] = useState();

  const { user } = useSelector((state) => state.auth);
  const { today, postCount } = useSelector((state) => state.today);

  const fetchCalendar = useCallback(
    (url) => {
      const callback = {
        success: (data) => {
          setErrorMessage();
          setCalendar(
            new CalendarModel(
              data.data.year,
              data.data.month,
              data.data.dayOfMonth,
              data.data.calendar
            )
          );
        },
        error: (err) => {
          setErrorMessage(err.message);
        },
      };

      sendAPIRequest(
        {
          url,
          method: APIMethodType.get,
        },
        callback
      );
    },
    [APIMethodType.get, sendAPIRequest]
  );

  useEffect(() => {
    const url = `${API.calendar.index}/${user.id}`;
    fetchCalendar(url);
  }, [fetchCalendar]);

  useEffect(() => {
    if (postCount === 0) return;

    const url = `${API.calendar.index}/${user.id}?year=${calendar.year}&month=${calendar.month}`;
    fetchCalendar(url);
  }, [fetchCalendar, postCount]);

  const changeToPrevMonthHandler = () => {
    const prevMonth = getTodayInfo.prevMonth(calendar.year, calendar.month);
    const url = `${API.calendar.index}/${user.id}?year=${prevMonth.year}&month=${prevMonth.month}`;
    fetchCalendar(url, false);
  };

  const changeToTodayMonthHandler = (forceReload = false) => {
    if (
      !forceReload &&
      today.year === calendar.year &&
      today.month === calendar.month
    )
      return;

    const url = `${API.calendar.index}/${user.id}`;
    fetchCalendar(url, false);
  };

  const changeToNextMonthHandler = () => {
    const nextMonth = getTodayInfo.nextMonth(calendar.year, calendar.month);
    const url = `${API.calendar.index}/${user.id}?year=${nextMonth.year}&month=${nextMonth.month}`;
    fetchCalendar(url, false);
  };

  const renderCalendar = () => {
    if (!calendar) return;

    return calendar.calendar.map((week, index) => {
      return (
        <Week
          key={index}
          today={today}
          year={calendar.year}
          month={calendar.month}
          dayOfMonth={calendar.dayOfMonth}
          week={week}
        />
      );
    });
  };

  return (
    <section id='main-container'>
      <Container>
        {errorMessage && (
          <Alert variant='danger' className='rounded-0'>
            {errorMessage}
          </Alert>
        )}
        <div className='i-choose-month'>
          <div className='i-chosen-month'>
            {calendar && calendar.year}/
            {calendar &&
              (calendar.month >= 10 ? calendar.month : `0${calendar.month}`)}
          </div>
          <div className='i-switch-month'>
            <div
              className='i-change-month i-previous-month'
              onClick={changeToPrevMonthHandler}
            >
              <ChevronBackOutline color={"#000"} height='30px' width='30px' />
            </div>
            <div
              className='i-switch-month today'
              onClick={() => changeToTodayMonthHandler()}
            >
              Today
            </div>
            <div
              className='i-change-month i-next-month'
              onClick={changeToNextMonthHandler}
            >
              <ChevronForwardOutline
                color={"#000"}
                height='30px'
                width='30px'
              />
            </div>
          </div>
        </div>
        <div className='i-calendar-week'>
          <Card className='i-calendar-week-item'>
            <span>日 </span>
          </Card>
          <Card className='i-calendar-week-item'>
            <span>ㄧ</span>
          </Card>
          <Card className='i-calendar-week-item'>
            <span>二</span>
          </Card>
          <Card className='i-calendar-week-item'>
            <span>三</span>
          </Card>
          <Card className='i-calendar-week-item'>
            <span>四</span>
          </Card>
          <Card className='i-calendar-week-item'>
            <span>五</span>
          </Card>
          <Card className='i-calendar-week-item'>
            <span>六</span>
          </Card>
        </div>
        {renderCalendar()}
      </Container>
    </section>
  );
};

export default Calendar;
