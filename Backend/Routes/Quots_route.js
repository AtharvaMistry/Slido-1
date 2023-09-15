const router = require('express').Router();

const {
    create_quots,
    view_all,
    updateQuote,
    delete_quots
} = require("../Controller/Quote.controller")

// quote
router.post("/quotation", create_quots)
router.get("/viewQuote", view_all)
router.put("/upadteQuote/:id",updateQuote)
router.delete("/deleteQuote/:id", delete_quots)

module.exports = router;