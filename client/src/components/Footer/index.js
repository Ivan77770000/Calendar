import "./module.css";
import { Fragment, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";

import AddTodoPopup from "../../ui/popup/add-todo";

import ConnectAPIHook from "../../hooks/connection-api-hook";
import API from "../../common/api";

import { changePostCount } from "../../stores/actions/today";

const Footer = () => {
  const { APIMethodType, sendAPIRequest } = ConnectAPIHook();
  const [createTodoPopupSwitch, setCreateTodoPopupSwitch] = useState(false);

  const dispatch = useDispatch();
  const { today } = useSelector((state) => state.today);
  const { user } = useSelector((state) => state.auth);

  const createTodoHandler = () => {
    if (!user.email) return;
    setCreateTodoPopupSwitch((prevStatue) => !prevStatue);
  };

  const execCreateTodoHandler = (todo, returnErrorMessage) => {
    const url = `${API.todo.index}/${user.id}`;
    const postData = {
      data: {
        year: today.year,
        month: today.month,
        day: today.day,
        ...todo,
      },
    };

    const callback = {
      success: (data) => {
        dispatch(changePostCount());
        createTodoHandler(false);
      },
      error: (err) => {
        returnErrorMessage(err.message);
      },
      finally: () => {},
    };

    sendAPIRequest(
      {
        url,
        method: APIMethodType.post,
        body: JSON.stringify(postData),
      },
      callback
    );
  };

  return (
    <Fragment>
      <footer>
        <span>&#169;ISP-START</span>
      </footer>
      {user.email && (
        <div className='fixed-bottom'>
          <button className='i-post-one' onClick={createTodoHandler}>
            Post
          </button>
        </div>
      )}
      {createTodoPopupSwitch && (
        <AddTodoPopup
          year={today.year}
          month={today.month}
          day={today.day}
          closeModalHandler={createTodoHandler}
          execModalHandler={execCreateTodoHandler}
        ></AddTodoPopup>
      )}
    </Fragment>
  );
};

export default Footer;
