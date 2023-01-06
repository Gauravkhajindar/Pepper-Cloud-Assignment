const express = require('express')
const router = express.Router()
const ImageController=require("../controller/imageController")

router.post("/image",ImageController.createImage)
router.get("/images",ImageController.getImage)




module.exports = router