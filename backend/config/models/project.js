const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
    projectid: { type: String, required: true },
    projectname: { type: String, required: true },
    projectdescription: { type: String, required: true },
    projectimagepath: { type: String, required: true },
    projectsiteurl: { type: String, required: false },
    projectgithuburl: { type: String, required: false }
}, { collection: 'projects' })

ProjectSchema.index({ projectid: 1 }, { unique: true })

const model = mongoose.model('Projects', ProjectSchema)

module.exports = model