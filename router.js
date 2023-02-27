var express = require("express");
var axios = require("axios");
const fetch = require("node-fetch");
const fs = require("fs");
//链接数据库
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "webxrj.top",
  // host:'localhost',//本地
  user: "yuzhu",
  password: "yuzhu",
  database: "yuzhu",
});
connection.end();
var router = express.Router();
function conDb(sql, callback) {
  connection = mysql.createConnection(connection.config);
  connection.connect();
  connection.query(sql, callback);
  connection.end();
}

// 换 openID
router.post("/usr/openid", function (req, res) {
  let data = req.body;
  let code = data.code;
  fetch(
    `https://api.weixin.qq.com/sns/jscode2session?appid=wx145d391ff6c4eb36&secret=c9c7b12f141abd8a9b4141fc1a502a8d&js_code=${code}&grant_type=authorization_code`
  )
    .then((res) => res.json())
    .then((json) => {
      if (json.openid) {
        let sql = `select * from user where openid='${json.openid}'`;
        conDb(sql, function (error, data) {
          if (error) {
            console.log(error);
            res.send({
              msg: "查询出错了",
            });
            return;
          }
          if (data.length < 1) {
            let sql1 = `insert into user(openid) values ('${json.openid}')`;
            conDb(sql1, function (error, data) {
              if (error) {
                console.log(error);
                res.send({
                  msg: "插入出错了",
                });
                return;
              }
              res.send(data);
            });
            return;
          }
          res.send(data);
        });
      } else {
        res.send(json);
      }
    });
});

// 插入日记
router.post("/daily/insert", function (req, res) {
  const data = req.body;
  const id = data.id;
  const type = data.type;
  const content = data.content;
  const title = data.title;
  const time = data.time;
  let sql1 = `insert into record(id,type,title,content,time) values ('${id}','${type}','${title}','${content}','${time}')`;
  conDb(sql1, function (error, data) {
    if (error) {
      console.log(error);
      res.send({
        msg: "插入出错",
        error: error,
      });
      return;
    }
    res.send({ msg: "插入成功" });
  });
});

// 获取日记
router.get("/daily/:id", function (req, res) {
  console.log(req.params);
  const { id } = { ...req.params };
  let sql = `select * from record where id='${id}'`;
  conDb(sql, function (error, data) {
    if (error) {
      console.log(error);
      res.send({
        msg: "查询出错了",
      });
      return;
    }
    res.send(data);
  });
});

module.exports = router;
