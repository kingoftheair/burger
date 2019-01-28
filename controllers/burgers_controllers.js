let express = require("express");

let router = express.Router();

let burger = require("../models/burger.js");

router.get("/", function(req,res){
    burger.all(function(data){
        let handlebarObj = {
            burger: data
        };
        res.render("index",handlebarObj);
    });
});

router.post("/api/burger", function(req, res){
    burger.create([
        "name", "devoured"
    ], [
        req.body.name, req.body.devoured
    ], function(result) {
        res.json({ id: result.insertId });
    });
});

router.put("/api/burger:id", function(req,res) {
    let condition = "id = " + req.params.id;

    burger.update({
        devoured: req.body.devoured
    }, condition, function(result) {
        if (result.changeRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.delete("/api/burger/:id", function(req,res){
    let condition = "id = " + req.params.id;

    burger.delete(condition, function(result) {
        if(result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
})


module.exports = router;