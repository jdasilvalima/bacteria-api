const Bacteria = require("../models/bacteriaModels");

exports.getAllBacterias = async (req, res, next) => {
  try {
    const bacterias = await Bacteria.find();
    res.status(200).json({
      status: "success",
      results: bacterias.length,
      data: {
        bacterias,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }
};

exports.getOneBacteria = async (req, res, next) => {
  try {
    const bacteria = await Bacteria.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        bacteria,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }
};

exports.createBacteria = async (req, res, next) => {
  try {
    const bacteria = await Bacteria.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        bacteria,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }
};

exports.updateBacteria = async (req, res, next) => {
  try {
    const bacteria = await Bacteria.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        bacteria,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }
};

exports.deleteBacteria = async (req, res, next) => {
  try {
    const bacteria = await Bacteria.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }
};
