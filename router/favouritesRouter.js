const express = require('express');
const db = require("../db");
const router = express.Router();

router.get('/', (req, res) => {
    db.all("select * from cities", [], (err, rows) => {
        if (err) {
            res.status(500).send();
            return;
        }
        res.json(rows).send();
    })
})

router.post('/', (req, res) => {
    db.run("insert into cities (id, name) values (?, ?)", [req.query.id, req.query.name], (err, _) => {
        if (err) {
            console.log(err);
            if (err.errno === 19) {
                res.status(400).send();
                return;
            }

            res.status(500).send();
            return;
        }
        res.status(201).send();
    })
})

router.delete('/', (req, res) => {
    db.run("delete from cities where id = ?", req.query.id, (err, _) => {
        if (err) {
            res.status(500).send();
            return;
        }
        res.status(200).send();
    })
})

module.exports = router;
