const express = require("express");
const authenticateJWT = require('../middleware/AuthenticateJWT.js')
const ProjectsCollection = require('../config/models/project.js')
const router = express.Router();

router.get('', async (req, res) => {
    ProjectsCollection.find({}, function (err, projects) {
        const projectMap = [];

        projects.forEach(function (project) {
            projectMap.push(project)
        });

        res.send(projectMap);
    });
})


router.post('/create', authenticateJWT, async (req, res) => {
    try {
        const body = req.body
        const files = req.files

        const imgPath = files[0]?.originalname

        if (imgPath === undefined || body.projectName === undefined || body.projectDescription === undefined) {
            res.status(422).send('One or more required fields are missing')
            return
        }

        const lastId = await ProjectsCollection.find({}).limit(1).sort({ $natural: -1 }).then(res => {
            return res[res.length - 1] === undefined ? "0" : res[res.length - 1].projectid
        })

        console.log(String(Number(lastId) + 1))

        await ProjectsCollection.create({
            projectid: String(Number(lastId) + 1),
            projectname: body.projectName,
            projectdescription: body.projectDescription,
            projectimagepath: imgPath
        })

        res.status(200).json({ message: "Project created" })
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router