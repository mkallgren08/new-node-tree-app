import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import { Row, Container } from "../../components/Grid";

class TestPage extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Jumbotron>
            <h1>Test Page!!!</h1>
          </Jumbotron>
        </Row>
      </Container>
    );
  }

}

export default TestPage;