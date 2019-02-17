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

After creating the Factory, a user may edit the Factory's name and/or the number range for the Factory's nodes. Mutual-exclusion protocols have been implemented to prevent multiple users from editing the same Factory by placing a hold and disabling the Editing Panel for that Factory for all users except the one currently performing edits; this helps prevent data corruption.
  **-Important Note:** There is currently a documented bug where a user who is editing a Factory attempts to either close, navigate away from, or refresh a page before finishing the edit. Attempting any of these navigation actions will release the hold on that Factory, even if the user cancels the navigation event. **If you accidentally navigate away from the page while editing, remain on the page _and then close the Editing Panel and immediately reopen it_**. Your data will not be overwritten and reopening the Editing Panel will reapply the hold; preventing other users from simultaneously editing the Factory.

------
##Factory Editing
Every Factory has an "Edit This Factory" button. If a hold has been applied to a Factory, a notifiction will appear beneath the Factory's name and the Edit This Factory button will be disabled.

Once once a user has clicked the Edit button, an Editing Panel will drop down. This panel contains the following:
  - A field to change the Factory name
  - A field to change the minimum value of the Factory's number-generator
------
##Test Cases Performed
Below is a list a test cases performed during development:
  1. 
##Known Issues
Below is a list of known issues:
  1. If the range of numbers for a Factory's nodes is small (~ 30 or less ), a node may be generated with a number slightly greater than the specified number maximum. 

------
##Future Developments
Below is a list of future developments:
  1. If the need arises, implement the ability for a Factory's individual nodes to be edited.
  2. Replace the alert() and confirm() functions with custom modals - primarily for appearance's sake; the functionality would remain the same.
  3. Fix the small range [issue](#~-30-or-less).
  4. Find/build a fix for the navigation event [issue](#user-who-is-editing-a-factory-attempts-to-either-close)
  5. Write automated tests