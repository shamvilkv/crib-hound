const express = require("express");
const {
  createCrib,
  getCribs,
  getSingleCrib,
  editCrib,
  deleteSingleCrib,
} = require("../controllers/crib");

const router = express.Router();

router.route("/:id").put(editCrib).get(getSingleCrib).delete(deleteSingleCrib);
router.route("/").post(createCrib).get(getCribs);

module.exports = router;
