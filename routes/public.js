'use strict'

const Router = require('koa-router')
const controllers = require('../controllers')

const router = new Router()
router.prefix('/api')

router.post('/login', controllers.login.login)
router.post('/register', controllers.register.register)
router.get('/dailyquote', controllers.shanbei.dailyquote)
router.post('/upload', controllers.shanbei.uploadFiles)
router.post('/userDetail', controllers.shanbei.getUserDetail)
router.post('/postUserTime', controllers.shanbei.postUserTime)
module.exports = router