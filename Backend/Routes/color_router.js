const router = require('express').Router();

const {
    addColor,
    viewAllColor,

} = require("../Controller/color_collection_controllr")


// Product Type
router.post("/color-add", addColor)
router.get("/get-color",viewAllColor)

module.exports = router;    