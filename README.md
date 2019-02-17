#Factory Node Tree Application
--------
##Table of Contents
  1. [About the Application](#about-the-application)
  2. [Factory Editing](#factory-editing)
  3. [Test Cases Performed](#test-cases-performed)
  4. [Known Issues](#known-issues)
  5. [Future Developments](#future-developments)
--------
##About the Application
###Deployed website is [located here](https://new-node-tree-app.herokuapp.com/)
This website allows a user to create new 'Factories' which are nodes that generate a series of sub-nodes containing random numbers within a user-specified range. The Factory data is stored in a database which is read in real-time, allowing multiple users to edit the Factories containing within the overall root node.  

The name of each Factory may be any alpha-numeric combination but must start with a letter. A Factory may have between 1 and 15 nodes; **once created, the number of nodes is fixed**. 

After creating the Factory, a user may edit the Factory's name and/or the number range for the Factory's nodes. Mutual-exclusion (mutex) protocols have been implemented to prevent multiple users from editing the same Factory by placing a hold and disabling the Editing Panel for that Factory for all users except the one currently performing edits; this helps prevent data corruption.


------
##Factory Editing
Every Factory has an "Edit This Factory" button. If a hold has been applied to a Factory, a notifiction will appear beneath the Factory's name and the Edit This Factory button will be disabled.
  **-Important Note:** There is currently a documented bug where a user who is editing a Factory attempts to either close, navigate away from, or refresh a page before finishing the edit. Attempting any of these navigation actions will release the hold on that Factory, even if the user cancels the navigation event. **If you accidentally navigate away from the page while editing, remain on the page _and then close the Editing Panel and immediately reopen it_**. Your data will not be overwritten and reopening the Editing Panel will reapply the hold; preventing other users from simultaneously editing the Factory.

Once once a user has clicked the Edit button, an Editing Panel will drop down. This panel contains the following:
  - A field to change the Factory name
  - A field to change the minimum value of the Factory's number-generator
------
##Test Cases Performed
Below is a list a test cases performed during development:
  1. Create a new Factory
  2. Edit the Factory name
  3. Edit the Factory's minimum range value
  4. Edit the Factory's maximum range value
  5. Edit the Factory's minimum range value _and_ maximum range value
  6. Edit the Factory's name _and_ minimum range value _and_ maximum range value
  7. Delete a Factory
  8. Perform Tests 1-7 while having two clients open to make sure the information is pushed to any open clients
  9. Apply a hold to a Factory being edited to clients other than the client who initiated the edit.
  10. Remove the hold for all clients when the editing client
    - Closes the editing panel
    - Submits edits
    - Deletes a Factory
  11. Check that a hold is applied to a Factory currently being edited on page load
  12. Check that one client can create a _new_ Factory while another client is editing a Factory without affecting either the Factory creation or edit.
  13. Check that one client can edit a Factory while another client creates a _new_ Factory without affecting either the Factory creation or edit.
  14. Check that navigating away from a page will release the holds on any Factories.
  16. Check that refreshing the page of a client who is _not_ editing a Factory with an edit hold applied to it does not remove the editing hold on that Factory
##Known Issues
Below is a list of known issues:
  1. If the range of numbers for a Factory's nodes is small (~ 30 or less ), a node may be generated with a number slightly greater than the specified number maximum. 
  2. The navigation event [issue](#user-who-is-editing-a-factory-attempts-to-either-close) mentioned in the [Factory Editing](#factory-editing) section.

------
##Future Developments
Below is a list of future developments:
  1. If the need arises, implement the ability for a Factory's individual nodes to be edited.
  2. Replace the alert() and confirm() functions with custom modals - primarily for appearance's sake; the functionality would remain the same.
  3. Test out [mutex](#mutual-exclusion) protocols to handle multiple editing panels open on the same client; if the tests reveal bugs, fix them.
  4. Fix the small range [issue](#~-30-or-less).
  5. Find/build a fix for the navigation event [issue](#user-who-is-editing-a-factory-attempts-to-either-close)
  6. Write automated tests