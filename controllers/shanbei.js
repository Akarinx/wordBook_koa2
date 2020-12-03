const axios = require('axios')
const fs = require('fs')
const path = require('path')
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
  console.log(ctx.request.files, '123')
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

const dealFile = ctx => {
  const { file } = ctx.request.files;
  console.log(file.path, 'abc')
  const reader = fs.createReadStream(file.path); // 可读流 读取文件路径
  const writer = fs.createWriteStream( // 可写流 写入文件的路径
    // 文件上传到 image 文件夹中
    path.resolve(__dirname, '../public', file.name)
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

module.exports = shanbei