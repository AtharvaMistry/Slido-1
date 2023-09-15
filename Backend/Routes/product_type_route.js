const router = require('express').Router();

const {
    create_product_type,
    view_all,
    update_product_type,
    delete_product_type
} = require("../Controller/product_type_controller")


// Product Type
router.post("/product", create_product_type)
router.get("/product", view_all)
router.put('/product/:id', update_product_type)
router.delete('/product/:id', delete_product_type)

module.exports = router;