import "./module.css";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Container, Row, Col, Form } from "react-bootstrap";

import ErrorMessage from "../../common/error-message";
import { toggleFormErrorMessage } from "../../stores/actions/common";
import { actionWhere, register } from "../../stores/actions/auth";

const Signup = (rops) => {
  const [signupField, setSignupField] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const { formErrorMessage, where } = useSelector((state) => state.common);

  const changeValueHandler = (field, value) => {
    setSignupField((prevStatus) => ({ ...prevStatus, [field]: value }));
  };

  const signupHandler = () => {
    if (
      !signupField.email ||
      !signupField.password ||
      !signupField.confirmPassword ||
      signupField.password !== signupField.confirmPassword
    ) {
      dispatch(
        toggleFormErrorMessage(
          ErrorMessage.common.invalidInput,
          actionWhere.signup
        )
      );
      return;
    }

    const postData = {
      data: {
        email: signupField.email,
        password: signupField.password,
        confirmPassword: signupField.confirmPassword,
      },
    };
    dispatch(register(postData));
  };

  const cleanupSignupFieldHandler = () => {
    setSignupField({
      email: "",
      password: "",
      confirmPassword: "",
    });

    dispatch(toggleFormErrorMessage());
  };

  return (
    <Container>
      <Row>
        <Col sm='5'>
          <div className='i-intro'>
            <h1>Calendar</h1>
            <p>
              Manifestamente e udita le come forse fallo quella piú occulta
              manifestamente. Che quella sempre che a fatica e mossa, dea.
            </p>
          </div>
        </Col>
        <Col sm='7'>
          <div className='i-signup'>
            {formErrorMessage && where === actionWhere.signup && (
              <div className='i-error-message'>{formErrorMessage}</div>
            )}
            <div className='i-signup-title'>Sign UP</div>
            <Form>
              <Form.Group className='mb-3'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type='text'
                  autoComplete='new-password'
                  value={signupField.email}
                  onChange={(e) => changeValueHandler("email", e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  autoComplete='new-password'
                  value={signupField.password}
                  onChange={(e) =>
                    changeValueHandler("password", e.target.value)
                  }
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Confirm password</Form.Label>
                <Form.Control
                  type='password'
                  autoComplete='new-password'
                  value={signupField.confirmPassword}
                  onChange={(e) =>
                    changeValueHandler("confirmPassword", e.target.value)
                  }
                />
              </Form.Group>
              <Row className='ml-auto'>
                <a
                  className='i-button i-save-button'
                  href='/#'
                  onClick={signupHandler}
                >
                  Sign Up
                </a>
                <div className='i-mr-10'></div>
                <a
                  className='i-button i-cancel-button'
                  href='/#'
                  onClick={cleanupSignupFieldHandler}
                >
                  Cancel
                </a>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
