const router = require('express').Router();

const {
    create_design_collection,
    view_all,
    update_design_collection,
    delete_design_collection
} = require("../Controller/design_collection_controller")


// Product Type
router.post("/design", create_design_collection)
router.get("/design", view_all)
router.put('/product/:id', update_design_collection)
router.delete('/product/:id', delete_design_collection)

module.exports = router;