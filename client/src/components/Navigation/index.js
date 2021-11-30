import "./module.css";

import { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Navbar, Nav } from "react-bootstrap";

import SigninPopup from "../Popup/Signin";

import { toggleFormErrorMessage } from "../../stores/actions/common";
import { logout } from "../../stores/actions/auth";

const Navigation = (props) => {
  const [signinPopupSwitch, setSigninPopupSwitch] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const signinModalHandler = () => {
    setSigninPopupSwitch(true);
  };

  const closeSigninModalHandler = () => {
    dispatch(toggleFormErrorMessage());
    setSigninPopupSwitch(false);
  };

  const logoutHandler = () => {
    dispatch(logout(user));
  };

  const renderNavLink = () => {
    if (!user.email) {
      return (
        <Fragment>
          <Nav className='ml-auto i-navbar'>
            <Nav.Link
              className='i-nav-item i-nav-link'
              onClick={signinModalHandler}
            >
              Sign In
            </Nav.Link>
          </Nav>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <Nav className='ml-auto i-navbar'>
          <Nav.Link className='i-nav-item i-nav-link'>Calendar</Nav.Link>
          <Nav.Link
            className='i-nav-item i-nav-link-in'
            onClick={logoutHandler}
          >
            Hi! {user.email}
          </Nav.Link>
        </Nav>
      </Fragment>
    );
  };

  return (
    <header>
      <Navbar bg='light' expand='lg'>
        <Container>
          <Navbar.Brand href='/#home'>
            <img className='i-brand' src='./img/brand.png' alt='' />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            {renderNavLink()}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {signinPopupSwitch && (
        <SigninPopup
          signinPopupSwitch={signinPopupSwitch}
          closeModalHandler={closeSigninModalHandler}
        />
      )}
    </header>
  );
};

export default Navigation;
