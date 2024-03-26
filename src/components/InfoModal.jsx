import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function InfoModal({showInfoModal, title, infoText, dismiss}) {


    return (
        <Modal show={showInfoModal} onHide={dismiss} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{infoText}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='primary' onClick={dismiss}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )
}