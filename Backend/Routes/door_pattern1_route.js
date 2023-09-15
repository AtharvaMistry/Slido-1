const router = require('express').Router();

const {
    create_door_pattern1,
    view_all,
    update_door_pattern1,
    delete_door_pattern1
} = require("../Controller/door_pattern1_controller")


// door1 
router.post("/door1", create_door_pattern1)
router.get("/door1", view_all)
router.put('/door1/:id', update_door_pattern1)
router.delete('/door1/:id', delete_door_pattern1)

module.exports = router;