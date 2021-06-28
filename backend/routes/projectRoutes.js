const express = require('express')
const authenticateJWT = require('../middleware/AuthenticateJWT.js')
const authenticatePerms = require('../middleware/AuthenticatePerms.js')
const ProjectsCollection = require('../config/models/project.js')
const router = express.Router()
const path = require('path')
const multer = require('multer')
// Declare date globally so as that multer and the create have the same date 
const date = Date.now()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, (file.originalname.split('.')[0] + '-' + date + path.extname(file.originalname)).replaceAll(' ', ''))
    }
})
const upload = multer({ storage: storage })

router.use(upload.any())

router.get('', async (req, res) => {
    ProjectsCollection.find({}, function (err, projects) {
        res.send(projects);
    });
})

router.post('/create', authenticateJWT, authenticatePerms, async (req, res) => {
    try {
        if (req.body === null || req.files.length < 1) {
            res.status(422).send('All inputs are missing')
            return
        }

        const body = req.body
        const file = req.files[0]
        const imgPath = (file.originalname.split('.')[0] + '-' + date + path.extname(file.originalname)).replaceAll(' ', '')
        if (imgPath === undefined || body.projectName === undefined || body.projectDescription === undefined) {
            res.status(422).send('One or more required fields are missing')
            return
        }

        const lastId = await ProjectsCollection.find({}).limit(1).sort({ $natural: -1 }).then(res => {
            return res[res.length - 1] === undefined ? "0" : res[res.length - 1].projectid
        })

        upload.single('projectFile')

        await ProjectsCollection.create({
            projectid: String(Number(lastId) + 1),
            projectname: body.projectName,
            projectdescription: body.projectDescription,
            projectimagepath: imgPath,
            projectsiteurl: body.projectSiteUrl,
            projectgithuburl: body.projectGithubUrl
        })

        res.status(200).json({ message: "Project created" })
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/:id', authenticateJWT, async (req, res) => {
    try {
        const id = req.params.id
        await ProjectsCollection.deleteOne({ projectid: id })
        res.status(200).json({ message: "Succesfully deleted" })
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router