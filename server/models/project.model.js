const mongoose = require('mongoose');
const Joi = require('joi');
const projectSchema = new mongoose.Schema({});


function validateProject(project){
    const schema = {
        // name : Joi.string().min(5).max(50).required(),
        // email : Joi.string().min(5).max(255).required().email(),
        // password : Joi.string().min(8).max(1024).required(),
        // isAdmin : Joi.boolean()
    }
    return Joi.validate(project, schema);
}
exports.Project = mongoose.model('Project', projectSchema);
exports.validate = validateProject;