const express = require('express');
const router = express.Router();
const { Project, validate } = require('../../models/project.model');
const loginRequired = require('../../middleware/jwt').loginRequired;
const generatePaginationHttpHeaders = require("../../middleware/paginationutils").generatePaginationHttpHeaders;
/*
 * GET
 */
router.get('/', loginRequired, async (req, res) => {
    /*const project = await Project
        .paginate(req.paging)
        .find()
        .sort({ 'name': 1 });*/
    // console.log(req.paging);
    const response = await Project.paginate({}, req.paging);

    generatePaginationHttpHeaders(res, response);
    res.send(response.docs);

    // , function (err, result) {
    //     // result.docs
    //     // result.total
    //     // result.limit - 10
    //     // result.offset - 20

    // }

});

/*
 * GET
 */
router.get('/:id', loginRequired, async (req, res) => {
    const project = await Project
        .findById(req.params.id);
    res.send(project);
});

/*
 * POST
 */
router.post('/', loginRequired, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let project = await Project.findOne({ name: req.body.name });
    if (project) return res.status(400).send({ message: 'project with this name already exists' });
    const createdBy = req.user.name;
    const createDate = new Date();
    project = new Project({
        name: req.body.name,
        description: req.body.description,
        createdDate: createDate,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        active: Boolean(req.body.active),
        createdBy: createdBy,
        updatedBy: null,
        updatedDate: null
    });
    const result = await project.save();
    res.send(result);

});

/*
 * PUT
 */
router.put('/:id', loginRequired, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // const project = new project({

    // });
    const result = await Project.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        createDate: req.body.createDate,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        active: req.body.active
    });
    res.send(result);
});

/*
 * DELETE
 */
router.delete('/:id', loginRequired, async (req, res) => {
    let result = await Project.findByIdAndRemove(req.params.id);
    if (result) {
        res.send({ 'success': true, 'response': result });
    } else {
        res.send({ 'success': fail, 'msg': 'Could not Delete', 'response': result });
    }
});

module.exports = router;
