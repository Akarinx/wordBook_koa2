const userServices = require('../services').user
const register = {}
register.register = async (ctx, next) => {
  const { userName, password } = ctx.request.body
  const user = await userServices.login({
    userName: userName,
  })
  if (user) {
    ctx.result = '用户已存在'
    ctx.msg = '0'
  } else {
    const result = await userServices.register({
      userName,
      password
    })
    if (result) {
      ctx.result = '注册成功'
      ctx.msg = '1'
    } else {
      ctx.result = '注册失败'
      ctx.msg = '-1'
    }
  }
  return next()
}
module.exports = register