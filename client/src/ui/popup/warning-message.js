import { Modal } from "react-bootstrap";

const WarningMesssaePopup = (props) => {
  const { warningPopupSwitch, warningPopupMessage, closeModalHandler } = props;

  return (
    <Modal show={warningPopupMessage}>
      <Modal.Header>
        <h5 className='modal-title'>Warning!</h5>
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
        {warningPopupMessage}
      </Modal.Body>
      <Modal.Footer>
        <a
          className='i-button i-cancel-button'
          href='/#'
          onClick={closeModalHandler}
        >
          Close
        </a>
      </Modal.Footer>
    </Modal>
  );
};

export default WarningMesssaePopup;
