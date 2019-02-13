import React from "react";
import { Modal } from "react-bootstrap";
import "./Modals.css";

export const MyModal = (props) => {

  return (
    <Modal show={props.show} onHide={props.handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.children}
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
  )
}