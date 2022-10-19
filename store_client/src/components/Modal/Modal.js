import { Modal, Button } from "react-bootstrap";
import React, { Component } from "react";
export default class ModalClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }
  handleClose = () => {
    this.setState({
      show: false,
    });
  };
  modal = () => {};
  render() {
    return (
      <>
        {" "}
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
