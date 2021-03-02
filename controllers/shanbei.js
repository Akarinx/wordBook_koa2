const axios = require('axios')
const fs = require('fs')
const path = require('path')
const userServices = require('../services').user
const shanbei = {}
shanbei.dailyquote = async (ctx, next) => {
  const data = await axios.get('https://apiv3.shanbay.com/weapps/dailyquote/quote/')
  ctx.result = {
    content: data.data.content,
    translation: data.data.translation
  }
  return next()
}
shanbei.uploadFiles = async (ctx, next) => {
  const res = await dealFile(ctx)
  if (res) {
    ctx.result = {
      msg: 'complete'
    }
    ctx.msg = '1'
  } else {
    ctx.result = {
      msg: 'fail'
    }
    ctx.msg = '-1'
  }
  return next()
}
// 上传文件主函数
// 文件名: [username]__[filename].[...]  区分用户并放入对应文件夹内
const dealFile = ctx => {
  const {
    file
  } = ctx.request.files;
  console.log(file.path, 'abc')
  const reader = fs.createReadStream(file.path); // 可读流 读取文件路径
  const [user, filename] = file.name.split('__')
  const writer = fs.createWriteStream( // 可写流 写入文件的路径
    // 文件上传到 image 文件夹中
    path.resolve(__dirname, `../public/${user}`, filename)
  );

  return new Promise((resolve, reject) => {

    reader.pipe(writer); // 可读流通过管道保存可写流

    reader.on('end', () => {
      resolve(true);
    });

    reader.on('error', err => {
      throw err;
    })

  });
}
// 获取用户信息并创建文件夹
shanbei.getUserDetail = async (ctx, next) => {
  const {
    username
  } = ctx.request.body
  const userDetail = await userServices.userdetail(username)
  if (userDetail) {
    fs.mkdir(`./public/${username}`, (err) => {
      if (err) {
        console.log(`用户${username}文件夹目录已创建`)
      } else {
        console.log(`用户${username}文件目录创建成功`)
      }
    })
    ctx.msg = '1'
    ctx.result = userDetail
  } else {
    ctx.msg = '0'
    ctx.result = null
  }
  return next()
}
// 存储更新用户当日登录时长
shanbei.postUserTime = async (ctx, next) => {
  const {
    username,
    date,
    time
  } = ctx.request.body
  const res = await userServices.postUserTime({
    username,
    date,
    time
  })
  ctx.msg = '1'
  ctx.result = res
  return next()
}

module.exports = shanbei