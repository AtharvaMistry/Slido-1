const router = require('express').Router();

const {
    create_lock_type,
    view_all,
    update_lock_type,
    delete_lock_type
} = require("../Controller/lock_type_controller")


// lock Type
router.post("/lock", create_lock_type)
router.get("/lock", view_all)
router.put('/lock/:id', update_lock_type)
router.delete('/lock/:id', delete_lock_type)

module.exports = router;