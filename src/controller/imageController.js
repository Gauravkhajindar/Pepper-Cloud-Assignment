// ==+==+==+==+==+==+==+==+==+==[Requirements]==+==+==+==+==+==+==+==+==+==
const imageModel = require("../model/ImageModel")
const validator = require("../validations/validator")
const uploadFile = require('../aws/uploadFile')

// ==+==+==+==+==+==+==+==+==+==[Create Image]==+==+==+==+==+==+==+==+==+==
const createImage = async function (req, res) {
    try {

        let files = req.files
        let data1 = req.body

        if (Object.keys(data1).length > 0) return res.status(400).send({ status: false, message: `you can't create field ${Object.keys(data1)} key` })

        let data = {}

        // validation for image
        if (files.length == 0) return res.status(400).send({ status: false, message: "Please Provide Image" })
        if (files.length > 1) return res.status(400).send({ status: false, message: "Please Provide Only One Image" })
        if (!validator.isValidFile(files[0].originalname)) return res.status(400).send({ status: false, message: 'Image type should be png|jpeg' })
        if (files[0].size > 1024 * 1024) return res.status(400).send({ status: false, message: 'Image should not be greater than 2MB' })


        data.image = await uploadFile.uploadFile(files[0])
        let today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        const formattedToday = yyyy + '-' + mm + '-' + dd;
        data.uploadedDate = formattedToday

        let imagedata = await imageModel.create(data)
        res.status(201).send({ status: true, message: "Success", data: imagedata })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

// ==+==+==+==+==+==+==+==+==+==[Get Image]==+==+==+==+==+==+==+==+==+==
const getImage = async function (req, res) {

    try {

        let data = req.query
        let { uploadedDate, uploadedDateGreaterThan, uploadedDateLessThan, uploadedDateSort, page, limit, ...rest } = data


        let filters
        let searchObj = {}
        uploadedDateSort = parseInt(uploadedDateSort)
        if (Object.keys(rest).length > 0) return res.status(400).send({ status: false, message: `you can't update on ${Object.keys(rest)} key` })

        // validation for uploadedDate
        if (uploadedDate) {
            if (!validator.Dateregex(uploadedDate)) return res.status(400).send({ status: false, message: "uploadedDate is invalid it must be yyyy-MM-dd format" })
            if (uploadedDate) searchObj.uploadedDate = { $eq: uploadedDate }
        }

        // validation for uploadedDateGreaterThan
        if (uploadedDateGreaterThan) {
            if (!validator.Dateregex(uploadedDateGreaterThan)) return res.status(400).send({ status: false, message: "uploadedDateGreaterThan is invalid it must be yyyy-MM-dd format" })
            if (uploadedDateGreaterThan) searchObj.uploadedDate = { $gt: uploadedDateGreaterThan }
        }

        // validation for uploadedDateLessThan
        if (uploadedDateLessThan) {
            if (!validator.Dateregex(uploadedDateLessThan)) return res.status(400).send({ status: false, message: "uploadedDateLessThan is invalid it must be yyyy-MM-dd format" })
            if (uploadedDateLessThan) searchObj.uploadedDate = { $lt: uploadedDateLessThan }
        }

        if (uploadedDateGreaterThan && uploadedDateLessThan) searchObj.uploadedDate = { $gt: uploadedDateGreaterThan, $lt: uploadedDateLessThan }

        if (uploadedDateSort > 1 || uploadedDateSort < -1 || uploadedDateSort == 0) return res.status(400).send({ status: false, message: 'Please enter either 1 or -1 is uploadedDateSort' })
        if (uploadedDateSort) filters = { uploadedDate: uploadedDateSort }

        // validation for page
        if (page) {
            if (!validator.isValidNumber(page)) return res.status(400).send({ status: false, message: "Please enter valid number in page" })
        }

        // validation for limit
        if (limit) {
            if (!validator.isValidNumber(limit)) return res.status(400).send({ status: false, message: "Please enter valid number in limit" })
        }
        if (page || 1) { parseInt(page) }
        if (limit || 3) { parseInt(limit) }
        let skip = (page - 1) * limit

        const imageData = await imageModel.find(searchObj).sort(filters).skip(skip).limit(limit)
        const totalCount = imageData.length
        res.status(200).send({ status: true, message: "Success", data: imageData, totalCount })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { createImage, getImage }
