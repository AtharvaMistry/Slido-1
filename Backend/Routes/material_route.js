const router = require('express').Router();

const {
    create_material,
    view_material,
    update_material,
    delete_material
} = require("../Controller/material.controller")


// material Type
router.post("/material", create_material)
router.get("/material", view_material)
router.put('/material/:id', update_material)
router.delete('/material/:id', delete_material)

module.exports = router;