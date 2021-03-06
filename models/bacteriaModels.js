const mongoose = require("mongoose");

const bacteriaSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Bacteria must have a name"],
    unique: true,
  },
  type: {
    type: String,
    require: [true, "Bacteria must have a type"],
  },
  o2requirement: {
    type: String,
    require: [true, "Bacteria must have O2 requirement"],
  },
  morphology: {
    type: String,
    require: [true, "Bacteria must have a morphlogy"],
  },
});

const Bacteria = mongoose.model("Bacteria", bacteriaSchema);
module.exports = Bacteria;
