import React from 'react';
import { Modal } from 'react-bootstrap';
import "./Infobox.css"

const Infobox = (props) =>
  <Modal show={props.showThis} onHide={props.hideThis} className="infoModal">
    <Modal.Header className="infoHeader">
      <button
          onClick={props.hideThis}
          className='upperBtnClose'
      >
        X
      </button>
      <Modal.Title className="infoBoxTitle">
        Application Information and Instructions
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="infoTextWrapper">
        <p><i>
          The GitHub repo for this project can be found <a href="https://github.com/mkallgren08/new-node-tree-app" target="_blank">here</a>
        </i></p>
        <p>
          This website allows a user to create new 'Factories' which are nodes that
          generate a series of sub-nodes containing random numbers within a
          user-specified range. The Factory data is stored in a database which is
          read in real-time, allowing multiple users to edit the Factories contained
          within the overall root node.
      </p>
        <p>
          The name of each Factory may be any alpha-numeric combination but must start
        with a letter. A Factory must have between 1 and 15 nodes; <strong> once
        created, the number of nodes is fixed.</strong> Each node will contain a
          random number between a user-defined range of positive integers.
      </p>
        <p>
          After creating the Factory, a user may edit the Factory's name and/or the
          number range for the Factory's nodes. Mutual-exclusion (mutex) protocols
          have been implemented to prevent multiple users from editing the same
          Factory by placing a hold and disabling the Editing Panel for that Factory
          for all users except the one currently performing edits; this helps prevent
          data corruption.
      </p>
        <hr />
        <h4>Factory Editing</h4>
        <p>
          Every Factory has an "Edit This Factory" button. If a hold has been applied
          to a Factory, a notification will appear beneath the Factory's name and the
          Edit This Factory button will be disabled.
      </p>
        <br />
        <p className="indentItem">
          <strong>-Important Note:</strong> There is currently a documented bug
          wherea user who is editing a Factory attempts to either close, navigate
          away from, or refresh a page before finishing the edit. Attempting any
          of these navigation actions will release the hold on that Factory, even
          if the user cancels the navigation event. <strong>PLEASE NOTE: If you
          accidentally navigate away from the page while editing, remain on the
          page <i>and then close the Editing Panel and immediately reopen it.</i>
          Your data will not be overwritten and reopening the Editing Panel will
          reapply the hold; preventing other users from simultaneously editing the
          Factory.</strong>
        </p>
        <p>
          Once a user has clicked the Edit button, an Editing Panel will drop down.
          This panel contains the following:
        </p>
        <ul>
            <li>A field to change the Factory name</li>
            <li>
              A field to change the minimum value of the Factory's number-generator
            </li>
            <li>
              A field to change the maximum value of the Factory's number-generator
            </li>
            <li>A Submit button</li>
            <li>A Delete button</li>
          </ul>
        <br />
        <p>
          The user may edit any of the fields available. Please note that the
          number of nodes is fixed on Factory creation, and that each Factory
          node is supposed to be a random number. <strong>At the present time,
          the application's requirements do not need to allow a user to edit
          the value of an individual Factory node; they are meant to be random.
          </strong>
        </p>
        <br />
        <p>
          If the user is done editing, they may do one of three things:
        </p>
        <ol>
          <li>
            Close the Editing Panel: this will release the hold on the Factory
            but leave any changes made during editing accessible to the current
            client. If another client edits the Factory, those changes will be
            overwritten.
          </li>
          <li>
            Submit the Edits: The application will validate the data and then
            either perform the edit operations or alert the user of errors.
            Once validation is successful, the hold on the Factory will be
            released.
          </li>
          <li>
            Delete the Factory: The user will be asked to confirm Factory
            deletion. If the deletion is confirmed, the Factory will be deleted
            and data used to create the hold on the Factory will be removed
          </li>
        </ol>
      </div>
      <button
        onClick={props.hideThis}
        className='btn btn-lg btnClose'
      >
        Close
      </button>
    </Modal.Body>
  </Modal>




export default Infobox;