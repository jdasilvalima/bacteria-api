const express = require("express");

const bacteriaController = require("../controllers/bacteriaController");

const router = express.Router();

//localhost:3000/
router
  .route("/")
  .get(bacteriaController.getAllBacterias)
  .post(bacteriaController.createBacteria);

router
  .route("/:id")
  .get(bacteriaController.getOneBacteria)
  .patch(bacteriaController.updateBacteria)
  .delete(bacteriaController.deleteBacteria);

module.exports = router;
