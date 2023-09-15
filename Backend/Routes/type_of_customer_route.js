const router = require('express').Router();

const {
    create_customer_type,
    view_all,
    update_customer_type,
    delete_customer_type
} = require("../Controller/type_of_customer_controller")


// customer Type
router.post("/customer", create_customer_type)
router.get("/customer", view_all)
router.put('/customer/:id', update_customer_type)
router.delete('/customer/:id', delete_customer_type)

module.exports = router;