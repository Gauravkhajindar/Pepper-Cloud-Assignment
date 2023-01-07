// ==+==+==+==+==+==+==+==+==+==[Requirements]==+==+==+==+==+==+==+==+==+==

const express = require('express')
const router = express.Router()
const ImageController=require("../controller/imageController")

// ==+==+==+==+==+==+==+==+==+==[Route]==+==+==+==+==+==+==+==+==+==+==+==

router.post("/image",ImageController.createImage)
router.get("/images",ImageController.getImage)

// ==+==+==+==+==+==+==+==+==+==[Global route]==+==+==+==+==+==+==+==+==+==

router.all("*", function (req, res) {
    res.status(400).send({
        status: false,
        msg: "please enter valid api"
    })
})


module.exports = router
