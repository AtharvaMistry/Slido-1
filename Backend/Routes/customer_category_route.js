const router = require('express').Router();

const {
    create_customer_category,
    view_all,
    update_customer_category,
    delete_customer_category
} = require("../Controller/customer_category_controller")


// customer category Type
router.post("/customer", create_customer_category)
router.get("/customer", view_all)
router.put('/customer/:id', update_customer_category)
router.delete('/customer/:id', delete_customer_category)

module.exports = router;