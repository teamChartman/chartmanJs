const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Joi = require('joi');
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50
        },
        email: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 255,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            maxlength: 1024,
        },
        activated: {
            type: Boolean,
            default: true
        },
        authorities: {
            type: Array,
            default: ['ROLE_USER']
        },
        imageUrl: String
    }
);

userSchema.plugin(mongoosePaginate);

function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(1024).required(),
        activated: Joi.boolean(),
        authorities: Joi.array(),
        imageUrl: Joi.string()
    }
    return Joi.validate(user, schema);
}
exports.User = mongoose.model('User', userSchema);
exports.validate = validateUser