const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Joi = require('joi');
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 6,
        maxlength: 100,
        unique: true
    },
    description: {
        type: String,
        minlength: 6,
        maxlength: 400
    },
    createdDate: {
        type: Date
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    updatedDate: {
        type: Date
    },
    active: {
        type: Boolean,
        default: true,
        required: true
    },
    createdBy: {
        type: String
    },
    updatedBy: {
        type: String
    }
});
projectSchema.plugin(mongoosePaginate);

function validateProject(project) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        description: Joi.string().min(5).max(450),
        createdDate: Joi.date().allow(null),
        active: Joi.boolean(),
        startDate: Joi.date(),
        endDate: Joi.date(),
        updatedDate: Joi.date().allow(null),
        createdBy: Joi.string(),
        updatedBy: Joi.string().allow('').allow(null)
    }
    return Joi.validate(project, schema);
}
exports.Project = mongoose.model('Project', projectSchema);
exports.validate = validateProject;