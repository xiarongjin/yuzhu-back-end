# yuzhu-back-end

node 服务接口

// 微信用户登录
post /usr/openid

    req
      {
        code:string
      }

    res
      出错：

      {
      msg: "查询出错了"/"插入出错了",
      }

      成功：

      重复查询：
      {
          "errcode": 40163,
          "errmsg": "code been used, rid: 63e60657-344dd3ee-28b67950"
      }

      查询成功：
      {
        "id": 4,
        "openid": "ocJ1E4wToLvcCuFhgMHMfJn2ijC8",
        "name": null,
        "desc": null
      }
      插入成功:
      {
          "fieldCount": 0,
          "affectedRows": 1,
          "insertId": 5,
          "serverStatus": 2,
          "warningCount": 0,
          "message": "",
          "protocol41": true,
          "changedRows": 0
      }

// 新增日记
post /daily/insert

    req {
      id: number
      type: string
      content: string
      title: string
      time: string
    }

    res

      {
        msg: "插入出错",
        error: error,
      }
      { msg: "插入成功" }

//根据 id 获取日记
get /daily/:id

    url /daily/3
    req.params {id:3}

    res [
      {
        rid:number
        type:string
        title:string
        id:string
        content:string
        time:string
      }
    ]
