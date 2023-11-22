import React, { useState } from "react";
import Navigation from "./Navigation";
import { Form, Container, Button, Modal } from "react-bootstrap";

const Setting = () => {
  const [ipAddr, setIpAddr] = useState("");
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Modal show={showModal}>
        <Modal.Header>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>IP address saved successfully!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Go to Dashboard
          </Button>
        </Modal.Footer>
      </Modal>
      <Navigation />
      <br />
      <br />
      <br />
      <Container>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Enter Arduino IP Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="x.x.x.x"
            name="ip"
            onChange={(e) => {
              setIpAddr(e.target.value);
            }}
          />
          <br />
          <Button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              localStorage.setItem("ipAddress", JSON.stringify(ipAddr));
              setShowModal(true);
              console.log("data saved");
            }}
          >
            Submit
          </Button>
        </Form.Group>
      </Container>
    </>
  );
};

export default Setting;
