import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Form } from "react-bootstrap";

import ErrorMessage from "../../../common/error-message";

import { toggleFormErrorMessage } from "../../../stores/actions/common";
import { actionWhere, login } from "../../../stores/actions/auth";

const SigninPopup = (props) => {
  const { signinPopupSwitch, closeModalHandler } = props;
  const [field, setField] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { formErrorMessage, where } = useSelector((state) => state.common);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user.email) closeModalHandler();
  }, [user.email, closeModalHandler]);

  const changeValueHandler = (field, value) => {
    setField((prevStatus) => ({ ...prevStatus, [field]: value }));
  };

  const signinHandler = () => {
    if (!field.email || !field.password) {
      dispatch(
        toggleFormErrorMessage(
          ErrorMessage.common.invalidInput,
          actionWhere.signin
        )
      );
      return;
    }

    const postData = {
      data: {
        email: field.email,
        password: field.password,
      },
    };

    dispatch(login(postData));
  };

  return (
    <Modal show={signinPopupSwitch}>
      <Modal.Header>
        <h5 className='modal-title'>Sign In</h5>
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
        {formErrorMessage && where === actionWhere.signin && (
          <div className='i-error-message'>{formErrorMessage}</div>
        )}
        <Form>
          <Form.Group className='mb-3'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='text'
              value={field.email}
              autoComplete='new-password'
              onChange={(e) => changeValueHandler("email", e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              value={field.password}
              autoComplete='new-password'
              onChange={(e) => changeValueHandler("password", e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <a className='i-button i-save-button' href='/#' onClick={signinHandler}>
          Sign In
        </a>
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

export default SigninPopup;
