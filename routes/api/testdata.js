const router = require("express").Router();
const testdataController = require("../../controllers/testdataController");

// Matches with "/api/testdata"
router.route("/")
  .get(testdataController.findAll)
  .post(testdataController.create);

// Matches with "/api/testdata/:id"
router
  .route("/:id")
  .get(testdataController.findById)
  .put(testdataController.update)
  .delete(testdataController.remove);

module.exports = router;