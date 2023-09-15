const router = require('express').Router();

const Auth = require('./Auth.routes')
const Quots = require('./Quots_route')
const product_type = require('./product_type_route')
const customer_category = require('./customer_category_route')
const design = require('./design_collection_route')
const door1 = require('./door_pattern1_route')
const door2 = require('./door_pattern2_route')
const delivery = require('./expected_delivery_dete_route')
const lock_type = require('./lock_type_route')
const profile = require('./profile_route')
const room = require('./room_route')
const customer = require('./type_of_customer_route')
const material = require('./material_route')
const color = require('./color_router')

router.use(
    '/api',
    Auth,
    Quots,
    product_type,
    customer_category,
    design,
    door1,
    door2,
    delivery,
    lock_type,
    profile,
    room,
    customer,
    material,
    color
)

module.exports = router