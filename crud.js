const express = require('express');
const {Pool,Client} = require('pg');
const {select_delegations,select_clients,insert_client,delete_client,edit_client} = require('./query_strings.json');
const router = express.Router();
const autocatch = require('./autocatch');

const pool = new Pool();

router.get('/delegations', autocatch(async(req,res)=>{
    const result = await pool.query(select_delegations);
    res.status(200).send(result.rows);
}));

router.get('/getClients', autocatch(async(req,res)=>{
    const result = await pool.query(select_clients);
    res.status(200).send(result.rows);
}));

router.post('/insertClient', autocatch(async(req,res)=>{
    const {NIP,REGON,NAZWA,VAT,ULICA,NRDOMU,NRMIESZKANIA} = req.body;
    const result = await pool.query(insert_client,[NIP,REGON,NAZWA,VAT,ULICA,NRDOMU,NRMIESZKANIA]);
    res.status(200).send(result);
}));

router.post('/deleteClient', autocatch(async(req,res)=>{
    const {ID} = req.body;
    const result = await pool.query(delete_client,[ID]);
    res.status(200).send(result);
}));

router.post('/updateClient', autocatch(async(req,res)=>{
    const {NIP,REGON,NAZWA,VAT,ULICA,NRDOMU,NRMIESZKANIA,ID} = req.body;
    const result = await pool.query(edit_client,[NIP,REGON,NAZWA,VAT,ULICA,NRDOMU,NRMIESZKANIA,ID]);
    res.status(200).send(result);
}));

module.exports = router;