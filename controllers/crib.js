const Crib = require("../models/crib");

// @desc      Create crib
// @route     POST /api/cribs
// @access    Public
exports.createCrib = async (req, res, next) => {
  const crib = await Crib.create({
    ...req.body,
  });

  res.status(201).json({
    success: true,
    data: crib,
  });
};

// @desc      Get all cribs
// @route     GET /api/cribs
// @access    Public
exports.getCribs = async (req, res, next) => {
  const crib = await Crib.find();

  res.status(201).json({
    success: true,
    data: crib,
  });
};

// @desc      Edit crib
// @route     PUT /api/cribs/:id
// @access    Public
exports.editCrib = async (req, res, next) => {
  const crib = await Crib.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
    },
    { runValidators: true, new: true }
  );

  let message = "Crib updated Successfully";
  res.status(200).json({
    success: true,
    crib,
    message,
  });
};

// @desc      Get single crib
// @route     GET /api/cribs/:id
// @access    Public
exports.getSingleCrib = async (req, res, next) => {
  const crib = await Crib.findById(req.params.id);
  res.status(200).json({
    success: true,
    crib,
  });
};

// @desc      Delete single crib
// @route     DELETE /api/cribs/:id
// @access    Public
exports.deleteSingleCrib = async (req, res, next) => {
  const crib = await Crib.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    crib,
  });
};
