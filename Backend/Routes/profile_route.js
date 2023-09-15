const router = require('express').Router();

const {
    create_profile,
    view_all,
    update_profile,
    delete_profile
} = require("../Controller/profile_controller")


// profile 
router.post("/profile", create_profile)
router.get("/profile", view_all)
router.put('/profile/:id', update_profile)
router.delete('/profile/:id', delete_profile)

module.exports = router;