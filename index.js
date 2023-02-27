//index.js 使用路由
const express = require("express");
const app = express();
const path = require("path");
/* body-parser是一个HTTP请求体解析的中间件
 * 使用这个模块可以解析JSON、Raw、文本、URL-encoded格式的请求体
 * */
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

/* 设置静态资源目录 */
app.use("/static", express.static(path.join(__dirname, "static")));

// var expressWs = require("express-ws")(app);
// var Wss = expressWs.getWss();
//设置跨域访问
app.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == "options") res.send(200);
  //让options尝试请求快速结束
  else next();
});

//路由
var router = require("./router.js");
app.use(router);

app.listen(3839, function () {
  console.log("3839端口服务器已启动");
});
