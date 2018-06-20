var express = require('express');
var app = express();
var db = require("./dbconfig");
var bodyParser = require('body-parser');
var crypto = require('crypto');
function md5(text) {
    return crypto.createHash('md5').update(text).digest('hex');
};

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res, next) {
    res.render("index.ejs",{json :'null' });
});

app.get("/index.html", function (req, res, next) {
    res.render("index.ejs",{json :'null' });
});


app.get("/set", function (req, res) {
    res.render("set.ejs");
});

app.get("/set.html", function (req, res) {
    res.render("set.ejs");
});

/**
 * 添加URL
 */
app.post("/set", function (req, res) {
    var json = JSON.stringify(req.body.json.replace(/\"/g, "\\\""));
    var md5str = md5(json);
    db.query("SELECT `id`,`md5` FROM `id` WHERE md5 = '" + md5str + "'", function (err, rows) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            if (rows[0] !== undefined) {
                if (md5str == rows[0].md5) {
                    console.log(rows[0].md5);
                    console.log("重复记录")
                    res.send("/id/" + rows[0].id);
                }
            } else {
                db.query("insert into id(json,md5) values('" + json + "','" + md5(json) + "')", function (err, rows) {
                    if (err) {
                        console.log(err);
                        res.send(err);
                    } else {
                        res.send("/id/" + rows.insertId);
                    }
                });
            }
        }
    });

});

app.get("/id/:id", function (req, res) {
    var id = req.params.id;
    db.query("SELECT json FROM `id` WHERE id=" + id + "", function (err, rows) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(rows[0].json);
            res.render("index.ejs",{json : rows[0].json });
        }
    });
});
app.listen(3000);