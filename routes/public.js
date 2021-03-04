'use strict'

const Router = require('koa-router')
const controllers = require('../controllers')

const router = new Router()
router.prefix('/api')

router.get('/dailyquote', controllers.shanbei.dailyquote)
router.post('/login', controllers.login.login)
router.post('/register', controllers.register.register)
router.post('/upload', controllers.shanbei.uploadFiles)
router.post('/userDetail', controllers.shanbei.getUserDetail)
router.post('/postUserTime', controllers.shanbei.postUserTime)
router.post('/postUserWords', controllers.shanbei.postUserWords)
router.post('/postWrongWords', controllers.shanbei.postUserWrongWordBook)
module.exports = router