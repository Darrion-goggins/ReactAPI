const daoClass = require('../../dao/prometheusDao');
const dao = new daoClass();

const express = require('express');
const router = express.Router();

// ALL ROLES ROUTE
router.get('/roles', (req, res) => {
    dao.findDPS(req, res);
});

// FIND BY CLASS ID
router.get('/classes/:id', (req, res) => {
    dao.findSingleClass(req, res, req.params.id)
});

// FIND DPS
router.get('/dps', (req,res, id) => {
    dao.findDPS(req,res, req.paramas.id)
});

router.get('/spell_list/:school_name', (req, res) => { 
    dao.findBySpell(req, res, req.params.school_name);
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


module.exports = router;