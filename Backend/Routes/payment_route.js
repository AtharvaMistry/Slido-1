const router = require('express').Router();

const {
    create_Payment,
    view_all,
    update_Payment,
    delete_Payment
} = require("../Controller/payment_controller")


router.post("/payment", create_Payment)
router.get("/payment", view_all)
router.put('/payment/:id', update_Payment)
router.delete('/payment/:id', delete_Payment)

module.exports = router;