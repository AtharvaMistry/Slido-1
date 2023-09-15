const router = require('express').Router();

const {
    create_room,
    view_all,
    update_room,
    delete_room
} = require("../Controller/room_controller")


// Product Type
router.post("/room", create_room)
router.get("/room", view_all)
router.put('/product/:id', update_room)
router.delete('/product/:id', delete_room)

module.exports = router;