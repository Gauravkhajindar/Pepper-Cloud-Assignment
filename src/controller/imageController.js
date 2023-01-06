
const imageModel = require("../model/ImageModel")
const validator = require("../validations/validator")
const uploadFile = require('../aws/uploadFile')


const createImage = async function (req, res) {
    try {

        let files = req.files

        let data = {}

        // validation for image
        if (files.length == 0) return res.status(400).send({ status: false, message: "Please Provide Image" })
        if (!validator.isValidFile(files[0].originalname)) return res.status(400).send({ status: false, message: 'Image type should be png|jpeg' })
        if (files[0].size > 1024 * 1024) return res.status(400).send({ status: false, message: 'Image should not be greater than 2MB' })


        data.image = await uploadFile.uploadFile(files[0])
        // let date = new Date()
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        const formattedToday = dd + '/' + mm + '/' + yyyy;
        console.log(formattedToday)
        data.uploadedDate = formattedToday

        let imagedata = await imageModel.create(data)
        res.status(201).send({ status: true, message: "Success", data: imagedata })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}


const getImage = async function (req, res) {

    try {

        let data = req.query
        let { uploadedDate } = data

        console.log(uploadedDate)

        const imageData = await imageModel.find({ $and: [req.query] })

        
        console.log(imageData)
        res.status(200).send({ status: true, message: "Success", data: imageData })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { createImage, getImage }
