import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, Modal } from "react-bootstrap";
import _ from "lodash";

import API from "../../../common/api";
import { getTodayInfo } from "../../../common/function";
import ErrorMessage from "../../../common/error-message";

const LandingPopup = (props) => {
  const [landingPopupSwitch, setLandingPopupSwitch] = useState(true);
  const [todayTodo, setTodayTodo] = useState();
  const todayInfo = getTodayInfo();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user.email || !todayTodo) return;

    const fetchTodayTodoList = async () => {
      try {
        const url = `${API.todo.index}/${todayInfo.year}/${todayInfo.month}/${todayInfo.day}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(ErrorMessage.common.common);
        }

        const data = await response.json();
        const todayTodo = _.sortBy(data.data, ["from"]);
        setTodayTodo(todayTodo);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchTodayTodoList();
  }, [todayInfo, user.email, todayTodo]);

  const landingPopupHandler = () => {
    setLandingPopupSwitch((preStatus) => !preStatus);
  };

  const renderTodayTodo = () => {
    return todayTodo.map((todo, index) => {
      return (
        <Card className='i-item' key={index}>
          <Card.Body>
            <div className='i-item-title'>
              <div className='i-item-title-left'>{todo.title}</div>
              <div className='i-item-title-right'>
                <div>
                  {todo.from}-{todo.to}
                </div>
              </div>
            </div>
            <div className='i-item-body'>{todo.detail}</div>
          </Card.Body>
        </Card>
      );
    });
  };

  let content = <div></div>;

  if (todayTodo) {
    content = (
      <Modal show={landingPopupSwitch} size='lg'>
        <Modal.Header>
          <h5 className='Popup-title'>{todayInfo.format.normal}</h5>
          <button
            type='button'
            className='close'
            data-dismiss='Popup'
            aria-label='Close'
            onClick={landingPopupHandler}
          >
            <span aria-hidden='true'>&times;</span>
          </button>
        </Modal.Header>
        <Modal.Body className='Popup-content'>
          <div className='i-body'>{renderTodayTodo()}</div>
        </Modal.Body>
      </Modal>
    );
  }

  return content;
};

export default LandingPopup;
