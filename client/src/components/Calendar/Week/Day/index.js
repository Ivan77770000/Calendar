import { Fragment, useState, useEffect, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Modal } from "react-bootstrap";
import { PencilOutline, TrashOutline } from "react-ionicons";
import _ from "lodash";

import AddTodoPopup from "../../../../ui/popup/add-todo";
import DeleteConfirmPopup from "../../../../ui/popup/delete-confirm";

import ConnectAPIHook from "../../../../hooks/connection-api-hook";

import API from "../../../../common/api";
import { formatDate } from "../../../../common/function";
import TodoModel from "../../../../models/Todo";

import { changePostCount } from "../../../../stores/actions/today";

const actionType = {
  createTodo: "CREATE_TODO",
  deleteAllTodo: "DELETE_ALL_TODO",
  editTodo: "EDIT_TODO",
  deleteTodo: "DELETE_TODO",
};

const defaultPopupSwitchState = {
  createTodo: false,
  deleteAllTodo: false,
  editTodo: false,
  deleteTodo: false,
};
const popupSwitchReducer = (state, action) => {
  switch (action.type) {
    case actionType.createTodo:
      return {
        ...state,
        createTodo: action.value,
      };
    case actionType.deleteAllTodo:
      return {
        ...state,
        deleteAllTodo: action.value,
      };
    case actionType.editTodo:
      return {
        ...state,
        editTodo: action.value,
      };
    case actionType.deleteTodo:
      return {
        ...state,
        deleteTodo: action.value,
      };
    default:
      return defaultPopupSwitchState;
  }
};

const Day = (props) => {
  const { today, year, month, dayOfMonth, day } = props;
  const { APIMethodType, sendAPIRequest } = ConnectAPIHook();
  const [errorMessage, setErrorMessage] = useState();
  const [todoList, setTodoList] = useState();
  const [selectedTodo, setSelectedTodo] = useState();
  const [dailyPopupSwitch, setDailyPopupSwitch] = useState(false);
  const [popupSwitchState, dispatchPopupSwitch] = useReducer(
    popupSwitchReducer,
    defaultPopupSwitchState
  );

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!dailyPopupSwitch) return;

    const url = `${API.todo.index}/${user.id}/${year}/${month}/${day.day}`;
    const callback = {
      success: (data) => {
        const todoList = _.sortBy(data.data, ["from"]).map((todo) => {
          return new TodoModel(
            todo._id,
            todo.from,
            todo.to,
            todo.title,
            todo.detail
          );
        });

        setTodoList(todoList);
      },
      error: (err) => {
        setErrorMessage(err.message);
        setTodoList([]);
      },
    };

    sendAPIRequest(
      {
        url,
        method: APIMethodType.get,
      },
      callback
    );
  }, [
    dailyPopupSwitch,
    APIMethodType.get,
    sendAPIRequest,
    day.day,
    month,
    year,
  ]);

  const dailyPopupSwitchHandler = (flag) => {
    if (!flag) {
      setErrorMessage();
    }
    setDailyPopupSwitch(flag);
  };

  const createTodoHandler = () => {
    dispatchPopupSwitch({
      type: actionType.createTodo,
      value: true,
    });
    setDailyPopupSwitch(false);
  };

  const closeCreateTodoHandler = () => {
    dispatchPopupSwitch({
      type: actionType.createTodo,
      value: false,
    });
    setDailyPopupSwitch(true);
  };

  const execCreateTodoHandler = (todo) => {
    const url = `${API.todo.index}/${user.id}`;
    const postData = {
      data: {
        year: day.year,
        month: day.month,
        day: day.day,
        ...todo,
      },
    };

    const callback = {
      success: (data) => {
        dispatch(changePostCount());
        setErrorMessage();
      },
      error: (err) => {
        setErrorMessage(err.message);
      },
      finally: () => {
        dispatchPopupSwitch({
          type: actionType.createTodo,
          value: false,
        });
        setDailyPopupSwitch(true);
      },
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

  const deleteAllTodoHandler = (todo) => {
    dispatchPopupSwitch({
      type: actionType.deleteAllTodo,
      value: true,
    });
    setDailyPopupSwitch(false);
  };

  const closeDeleteAllTodoHandler = () => {
    dispatchPopupSwitch({
      type: actionType.deleteAllTodo,
      value: false,
    });
    setDailyPopupSwitch(true);
  };

  const execDeleteAllTodoHandler = () => {
    const url = `${API.todo.index}/${user.id}/${day.year}/${day.month}/${day.day}`;
    const callback = {
      success: (data) => {
        dispatch(changePostCount());
        setErrorMessage();
      },
      error: (err) => {
        setErrorMessage(err.message);
      },
      finally: () => {
        dispatchPopupSwitch({
          type: actionType.deleteAllTodo,
          value: false,
        });
        setDailyPopupSwitch(true);
      },
    };

    sendAPIRequest(
      {
        url,
        method: APIMethodType.delete,
      },
      callback
    );
  };

  const editTodoHandler = (todo) => {
    setSelectedTodo(todo);
    dispatchPopupSwitch({
      type: actionType.editTodo,
      value: true,
    });
    setDailyPopupSwitch(false);
  };

  const closeEditTodoHandler = () => {
    setSelectedTodo();
    dispatchPopupSwitch({
      type: actionType.editTodo,
      value: false,
    });
    setDailyPopupSwitch(true);
  };

  const execEditTodoHandler = (todo) => {
    const url = `${API.todo.index}/${todo.id}`;
    const postData = {
      data: {
        ...todo,
      },
    };

    const callback = {
      success: (data) => {
        dispatch(changePostCount());
        setErrorMessage();
      },
      error: (err) => {
        setErrorMessage(err.message);
      },
      finally: () => {
        dispatchPopupSwitch({
          type: actionType.editTodo,
          value: false,
        });
        setDailyPopupSwitch(true);
      },
    };

    sendAPIRequest(
      {
        url,
        method: APIMethodType.put,
        body: JSON.stringify(postData),
      },
      callback
    );
  };

  const deleteTodoHandler = (todo) => {
    setSelectedTodo(todo);
    dispatchPopupSwitch({
      type: actionType.deleteTodo,
      value: true,
    });
    setDailyPopupSwitch(false);
  };

  const closeDeleteTodoHandler = () => {
    setSelectedTodo();
    dispatchPopupSwitch({
      type: actionType.deleteTodo,
      value: false,
    });
    setDailyPopupSwitch(true);
  };

  const execDeleteTodoHandler = () => {
    const url = `${API.todo.index}/${selectedTodo.id}`;
    const callback = {
      success: (data) => {
        dispatch(changePostCount());
        setErrorMessage();
      },
      error: (err) => {
        setErrorMessage(err.message);
      },
      finally: () => {
        dispatchPopupSwitch({
          type: actionType.deleteTodo,
          value: false,
        });
        setDailyPopupSwitch(true);
      },
    };

    sendAPIRequest(
      {
        url,
        method: APIMethodType.delete,
      },
      callback
    );
  };

  const renderTodo = () => {
    return todoList.map((todo, index) => {
      return (
        <Card className='i-item' key={index}>
          <Card.Body>
            <div className='i-item-title'>
              <div className='i-item-title-left'>{todo.title}</div>
              <div className='i-item-title-right'>
                <div>
                  {todo.from}-{todo.to}
                </div>
                <div
                  className='i-item-title-right-icon'
                  onClick={() => editTodoHandler(todo)}
                >
                  <PencilOutline color={"#000"} height='16px' width='16px' />
                </div>
                <div
                  className='i-item-title-right-icon'
                  onClick={() => deleteTodoHandler(todo)}
                >
                  <TrashOutline color={"#aa3939"} height='16px' width='16px' />
                </div>
              </div>
            </div>
            <div className='i-item-body'>{todo.detail}</div>
          </Card.Body>
        </Card>
      );
    });
  };

  let dailyModalConent = null;
  if (todoList) {
    dailyModalConent = (
      <Modal show={dailyPopupSwitch} size='lg'>
        <Modal.Header>
          <h5 className='modal-title'>
            {formatDate(day.year, day.month, day.day)}
          </h5>
          <button
            type='button'
            className='close'
            data-dismiss='modal'
            aria-label='Close'
            onClick={() => dailyPopupSwitchHandler(false)}
          >
            <span aria-hidden='true'>&times;</span>
          </button>
        </Modal.Header>
        <Modal.Body className='modal-content'>
          {errorMessage && (
            <div className='i-error-message'>{errorMessage}</div>
          )}
          <div className='i-operation-normal-size'>
            <button
              className='i-small-button i-small-button-add'
              onClick={createTodoHandler}
            >
              Post
            </button>
            <button
              className='i-small-button i-small-button-del'
              onClick={deleteAllTodoHandler}
            >
              Clean
            </button>
          </div>
          <div className='i-body'>{renderTodo()}</div>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <Fragment>
      <Card
        className={`${
          today.year !== day.year ||
          today.month !== day.month ||
          day.month !== month ||
          day.day !== dayOfMonth
            ? "i-calendar-day-item"
            : "i-calendar-day-active-item"
        }`}
      >
        {(day.year !== year || day.month !== month) && (
          <span className='out' onClick={() => dailyPopupSwitchHandler(true)}>
            {day.day}
          </span>
        )}
        {day.year === year && day.month === month && (
          <span className='in' onClick={() => dailyPopupSwitchHandler(true)}>
            {day.day}
          </span>
        )}
        {(day.year !== year || day.month !== month) && (
          <div className='out work-count'>{day.taskNumber}</div>
        )}
        {day.year === year && day.month === month && (
          <div className='in work-count'>{day.taskNumber}</div>
        )}
      </Card>
      {dailyModalConent}
      {popupSwitchState.createTodo && (
        <AddTodoPopup
          year={day.year}
          month={day.month}
          day={day.day}
          closeModalHandler={closeCreateTodoHandler}
          execModalHandler={execCreateTodoHandler}
        ></AddTodoPopup>
      )}
      {popupSwitchState.deleteAllTodo && (
        <DeleteConfirmPopup
          title='Delete all tasks?'
          closeModalHandler={closeDeleteAllTodoHandler}
          execModalHandler={execDeleteAllTodoHandler}
        >
          Ary you sure?
        </DeleteConfirmPopup>
      )}
      {popupSwitchState.editTodo && (
        <AddTodoPopup
          year={day.year}
          month={day.month}
          day={day.day}
          todo={selectedTodo}
          closeModalHandler={closeEditTodoHandler}
          execModalHandler={execEditTodoHandler}
        ></AddTodoPopup>
      )}
      {popupSwitchState.deleteTodo && (
        <DeleteConfirmPopup
          title='Delete this task?'
          closeModalHandler={closeDeleteTodoHandler}
          execModalHandler={execDeleteTodoHandler}
        >
          <Card>
            <Card.Body>
              <Card.Title>{selectedTodo.title}</Card.Title>
              <Card.Text>
                {selectedTodo.from}-{selectedTodo.to}
              </Card.Text>
              <Card.Text>{selectedTodo.detail}</Card.Text>
            </Card.Body>
          </Card>
        </DeleteConfirmPopup>
      )}
    </Fragment>
  );
};

export default Day;
