const axios = require('axios')
const shanbei = {}
shanbei.dailyquote = async (ctx, next) => {
  const data = await axios.get('https://apiv3.shanbay.com/weapps/dailyquote/quote/')
  ctx.result = {
    content: data.data.content,
    translation: data.data.translation
  }
  return next()
}
module.exports = shanbei