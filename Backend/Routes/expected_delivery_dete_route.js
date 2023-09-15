const router = require('express').Router();

const {
    create_expected_delivery_date,
    view_all,
    update_expected_delivery_date,
    delete_expected_delivery_date
} = require("../Controller/expected_delivery_dete_controller")


// deliverydate 
router.post("/deliverydate", create_expected_delivery_date)
router.get("/deliverydate", view_all)
router.put('/deliverydate/:id', update_expected_delivery_date)
router.delete('/deliverydate/:id', delete_expected_delivery_date)

module.exports = router;