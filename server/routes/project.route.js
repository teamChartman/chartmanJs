const express = require('express');
const router = express.Router();
const {Project, validate} = require('../models/project.model');
const passport = require('passport');
const userUtilites = require('../middleware/user.utilities')
/*
 * GET
 */
router.get('/', async(req, res)=>{
    const project = await Project
    .find()
    .sort({'name' : 1});

    res.send(project);
});

/*
 * GET
 */
router.get('/:id', async(req, res)=>{
    const project = await Project
    .findById(req.params.id);
    res.send(project);
});

/*
 * POST
 */
router.post('/', passport.authenticate('jwt', {session : false}), async(req, res)=>{
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let project = await Project.findOne({ name : req.body.name});
    if(project) return res.status(400).send({ message : 'project with this name already exists'});
    

    
    const user = userUtilites.getUserObject(req.headers.authorization);
    if(!user)
        return res.status(500).send('You do not seem to have authorization to create project');
    const createdBy = user.name;
    const createDate = new Date();
    project = new Project({
        name : req.body.name,
        description : req.body.description,
        createdDate : createDate,
        startDate : req.body.startDate,
        endDate : req.body.endDate,
        active : Boolean(req.body.active),
        createdBy : createdBy,
        updatedBy : null,
        updatedDate : null
    });
    const result = await project.save();
    res.send(result);

});

/*
 * PUT
 */
router.put('/:id', async(req, res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    // const project = new project({
        
    // });
    const result = await Project.findByIdAndUpdate(req.params.id, {
        name : req.body.name,
        description : req.body.description,
        createDate : req.body.createDate,
        startDate : req.body.startDate,
        endDate : req.body.endDate,
        active : req.body.active
    });
    res.send(result);
});

/*
 * DELETE
 */
router.delete('/:id', async(req, res)=>{
    let result = await Project.findByIdAndRemove(req.params.id);
    if(result){
        res.send({'success': true, 'response' : result});
    }else{
        res.send({'success': fail, 'msg':'Could not Delete', 'response' : result});
    }
});

module.exports = router;
