const router = require('express').Router();

const {
    create_door_pattern2,
    view_all,
    update_door_pattern2,
    delete_door_pattern2
} = require("../Controller/door_pattern2_controller")


// door2 Type
router.post("/door2", create_door_pattern2)
router.get("/door2", view_all)
router.put('/door2/:id', update_door_pattern2)
router.delete('/door2/:id', delete_door_pattern2)

module.exports = router;