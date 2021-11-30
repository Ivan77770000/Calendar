import { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";

import { formatDate, getTimeRange } from "../../common/function";
import ErrorMessage from "../../common/error-message";
import TodoModel from "../../models/Todo";

const AddTodoPopup = (props) => {
  const { year, month, day, todo, closeModalHandler, execModalHandler } = props;
  const [errorMessage, setErrorMessage] = useState();
  const [newTodo, setNewTodo] = useState(TodoModel.createOne());

  const timeRange = getTimeRange();

  let title = `${formatDate(year, month, day)}-Post`;
  if (todo) {
    title = `${formatDate(year, month, day)}-Edit`;
  }

  useEffect(() => {
    if (!todo) return;

    setNewTodo({
      id: todo.id,
      title: todo.title,
      from: todo.from,
      to: todo.to,
      detail: todo.detail,
    });
  }, [todo]);

  const changeValueHandler = (field, value) => {
    setNewTodo((prevStatus) => ({ ...prevStatus, [field]: value }));
  };

  const beforeSave = () => {
    if (!TodoModel.validtor(newTodo)) {
      setErrorMessage(ErrorMessage.common.invalidInput);
      return;
    }

    execModalHandler(newTodo, setErrorMessage);
  };

  return (
    <Modal show={true}>
      <Modal.Header>
        <h5 className='modal-title'>{title}</h5>
        <button
          type='button'
          className='close'
          data-dismiss='modal'
          aria-label='Close'
          onClick={closeModalHandler}
        >
          <span aria-hidden='true'>&times;</span>
        </button>
      </Modal.Header>
      <Modal.Body className='modal-content border-0'>
        {errorMessage && <div className='i-error-message'>{errorMessage}</div>}
        <Form>
          <Form.Group className='mb-3'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              value={newTodo.title}
              onChange={(e) => changeValueHandler("title", e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Time</Form.Label>
            <div style={{ display: "flex", gap: "20px" }}>
              <div style={{ flex: 1 }}>
                <Form.Control
                  as='select'
                  value={newTodo.from}
                  onChange={(e) => changeValueHandler("from", e.target.value)}
                >
                  {timeRange.map((time, index) => {
                    return <option key={index}>{time.value}</option>;
                  })}
                </Form.Control>
              </div>
              <div style={{ flex: 1 }}>
                <Form.Control
                  as='select'
                  value={newTodo.to}
                  onChange={(e) => changeValueHandler("to", e.target.value)}
                >
                  {timeRange.map((time, index) => {
                    return <option key={index}>{time.value}</option>;
                  })}
                </Form.Control>
              </div>
            </div>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Detail</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              value={newTodo.detail}
              onChange={(e) => changeValueHandler("detail", e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {!todo && (
          <a className='i-button i-save-button' href='/#' onClick={beforeSave}>
            Post
          </a>
        )}
        {todo && (
          <a className='i-button i-save-button' href='/#' onClick={beforeSave}>
            Save
          </a>
        )}
        <div className='i-mr-10'></div>
        <a
          className='i-button i-cancel-button'
          href='/#'
          onClick={closeModalHandler}
        >
          Cancel
        </a>
      </Modal.Footer>
    </Modal>
  );
};

export default AddTodoPopup;
