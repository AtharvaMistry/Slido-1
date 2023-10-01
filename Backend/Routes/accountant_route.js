const router = require('express').Router();

const {
    create_Accountant,
    view_all,
    update_Accountant,
    delete_Accountant
} = require("../Controller/accountant_controller")


// accountant Type
router.post("/accountant", create_Accountant)
router.get("/accountant", view_all)
router.put('/accountant/:id', update_Accountant)
router.delete('/accountant/:id', delete_Accountant)

module.exports = router;