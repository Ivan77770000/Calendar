import { Modal } from "react-bootstrap";

const DeleteConfirmPopup = (props) => {
  const { title, closeModalHandler, execModalHandler } = props;

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
        {props.children}
      </Modal.Body>
      <Modal.Footer>
        <a
          className='i-button i-save-button'
          href='/#'
          onClick={execModalHandler}
        >
          Delete
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

export default DeleteConfirmPopup;
