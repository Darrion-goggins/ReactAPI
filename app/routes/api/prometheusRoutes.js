const daoClass = require('../../dao/prometheusDao');
const dao = new daoClass();

const express = require('express');
const router = express.Router();

// ALL CLASS ROUTE -> /api/class/
router.get('/classes', (req, res) => {
    dao.findByClass(req, res);
});

router.get('/roles', (req, res) => {
    dao.findByRole(req, res);
});

// FIND BY MAKE ROUTE -> /api/cars/make/:make
router.get('/spell_list', (req, res) => { 
    dao.findBySpell(req, res);
});

router.get('/spell_type', (req, res) => { 
    dao.findBySpellType(req, res);
});

router.post('/create', (req, res) => {
    console.log(req.body);

    dao.create(req, res);
});

router.delete('/delete/:id', (req, res) => {
    console.log(req.body);

    dao.delete(req, res);
})

// /api/cars/post
router.post('/post', (req,res) => {
    console.log(req.body);

    /* dao.updateById(req, res);

    dao.updateByColor(req, res); */

    dao.updateMPG(req, res);
});

module.exports = router;