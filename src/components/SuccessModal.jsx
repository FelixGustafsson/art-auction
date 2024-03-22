import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function SuccessModal({showSuccessModal, successText, dismiss}) {


    return (
        <Modal show={showSuccessModal} onHide={dismiss} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Success!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{successText}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='primary' onClick={dismiss}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )
}