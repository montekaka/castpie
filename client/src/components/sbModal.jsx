import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const SbModal = (props) =>  {
    return (
      <div>
        <Modal isOpen={props.modal} toggle={props.toggle}>
          <ModalHeader toggle={props.toggle}>{props.title}</ModalHeader>
          <ModalBody>
            <p>{props.message}</p>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={props.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>        
      </div>
    );
}

export default SbModal;
