const axios = require('axios')
const fs = require('fs')
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
}

const dealFile = ctx => {
  const { file } = ctx.request.files;

  const reader = fs.createReadStream(file.path);
  const writer = fs.createWriteStream(
    // 文件上传到 image 文件夹中
    path.resolve(__dirname, './image', file.name)
  );

  return new Promise((resove, reject) => {

    reader.pipe(writer);

    reader.on('end', () => {
      resove(true);
    });

    reader.on('error', err => {
      throw err;
    })

  });
}

module.exports = shanbei