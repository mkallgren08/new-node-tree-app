const Child = require('../../models/child');
const express = require('express');
const router = express.Router();
const pusher = require('../../utils/Pusher');

/* CREATE */
router.post('/new', (req, res) => {
  //console.log(Child)
  // console.log('API Index line 13')
  // console.log(req.body)
  // * Remember, the .create() method can take a single obj or an array
  // * of objects to create both single and multiple docs
  Child.create(req.body.nodes, (err, child) => {
    // console.log(req.body.nodes)
    if (err) {
      console.log('CREATE Error: ' + err);
      res.status(500).send('Error');
    } else {
      res.status(200).json(child);
      console.log(child)
      console.log('--------- CREATE INSERT TRIGGER SHOULD FIRE---------')
      pusher.trigger('nodes', 'insert', child)
      if (!req.body.newCycle) {
        setTimeout(() => {
          console.log('--------- CREATE REPARSE TRIGGER SHOULD FIRE---------')
          pusher.trigger('nodes', 'reparse', child)
        }, 500)
      }
    }
  });
});

/* UPDATE  NODE NAME */
router.post('/editName/:id', (req, res) => {
  console.log(req.body)
  Child.findOneAndUpdate(
    { _id: req.params.id }, { $set: { name: req.body.name } },
    { new: true }, (err, child) => {
      if (err) {
        console.log(`UPDATE Error: ${err}`)
        res.status(500).send('Error')
      } else if (child) {
        res.status(200).json(child)
        setTimeout(() => {
          console.log('--------- NAME UPDATE REPARSE TRIGGER SHOULD FIRE---------')
          pusher.trigger('nodes', 'reparse', 'okay')
          // pusher.trigger('nodes', 'deleted', 'okay')
        }, 500)
      } else {
        res.status(404).send('Not found');
      }
    })
});

/* DELETE GRANDCHILDREN OF FACTORY (CHILD) NODE AND UPDATE THE MIN/MAX*/
router.route('/delete/:id/:min/:max/:name').delete((req, res) => {
  // console.log(req.params.id)
  Child.deleteMany({
    parent: req.params.id
  }, (err, child) => {
    if (err) {
      console.log('DELETE Error: ' + err);
      res.status(500).send('Error');
    } else if (child) {
      Child.findByIdAndUpdate({ _id: req.params.id },
        { $set: { maxVal: req.params.max, minVal: req.params.min, name: req.params.name } }
        , (err, result) => {
          if (err) { console.log(`Error with range update`); console.log(err) }
          if (result) { res.status(200).json(result) }
        }
      )
    } else {
      res.status(404).send('Not found');
    }
  })
});

/* DELETE WHOLE FACTORY (CHILD) NODE */
router.route('/deleteWhole/:id').delete((req, res) => {
  // console.log(req.params.id)
  Child.deleteMany({
    $or: [{ parent: req.params.id }, { _id: req.params.id }]
  }, (err, child) => {
    if (err) {
      console.log('DELETE Error: ' + err);
      res.status(500).send('Error');
    } else if (child) {
      res.status(200).json(child)
      setTimeout(() => {
        console.log('--------- DELETED TRIGGER SHOULD FIRE---------')
        // pusher.trigger('nodes', 'reparse', child)
        pusher.trigger('nodes', 'deleted', 'okay')
      }, 500)
    } else {
      res.status(404).send('Not found');
    }
  })
});

/* FIND ALL */
router.get("/nodes", (req, res) => {
  // console.log(req.query)
  Child.find({}, (err, child) => {
    if (err) {
      console.log('Error Getting Children: ' + err);
      res.status(500).send('Error');
    } else if (child) {
      // console.log(child)
      res.status(200).json(child);
    } else {
      res.status(404).send('Not found');
    }
  })
})

/* APPLY AND RELEASE HOLDS */

let holds =[];

router.post("/hold/:id", (req,res)=>{
  console.log(req.body)
  if (req.body.val){
    console.log('--------- HOLD TRIGGER SHOULD FIRE---------')
    if (req.params.id.indexOf('~~~') === -1 && holds.indexOf(req.params.id)===-1){
      holds.push(req.params.id)
      console.log("Held ids: ")
      console.log(holds)
    }
    pusher.trigger('nodes','hold',req.params.id);
  } else {
    console.log('--------- RELEASE TRIGGER SHOULD FIRE---------')
    if (holds.indexOf(req.params.id) > -1 ){
      holds.splice(holds.indexOf(req.params.id),1)
      console.log("Held ids: ")
      console.log(holds)
    }
    pusher.trigger('nodes','release',req.params.id)
  }
  res.status(200).send('Hold triggered')
})

/* CHECK FOR HOLDS */
router.post("/holdCheck/:id", (req,res)=>{
  if (holds.indexOf(req.params.id) > -1){
    pusher.trigger('nodes','hold',req.params.id);
  }
  res.status(200).send('Checking for holds')
})

/* LOGS OUT DATA FOR ANALYSIS */
router.post("/log", (req,res)=>{
  console.log("____ Start Navigation Data ___")
  console.log(req.body)
  console.log("____ End Navigation Data ___")
  res.status(200).send('Check server logs for data')
})

module.exports = router;