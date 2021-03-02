const User = require('../models/index').getModel('user')

const user = {
  /**
   * @description: 登录请求
   * @param { username,password } 
   * @returns {  boolean }
   */
  async login(userData) {
    let result = await User.findOne(userData)
    console.log(result)
    return result
  },

  /**
   * @description:注册请求
   * @param {username,password}  
   * @returns {boolean}
   */
  async register(userData) {
    let result = await User.create(userData)
    console.log(result, '处理')
    return result
  },

  /**
   * @description: 获取用户详细信息
   * @param {username:string}  
   * @returns {User:Model}
   */
  async userdetail(username) {
    console.log(username)
    let result = await User.find({
      userName: username
    })
    return result
  },

  /**
   * @description:存储用户当日登录时长
   * @param {username:string,date:String,time:Number} 
   * @returns {Boolean}
   */
  async postUserTime({
    username,
    date,
    time
  }) {
    const add = { // 增加调用
      $push: {
        usingtime: {
          date,
          time
        }
      }
    }
    const update = { // 更新调用
      $set: {
        'usingtime.$.date': date,
        'usingtime.$.time': time
      }
    }
    const query = { // 查询条件
      "usingtime.date": date,
      userName: username,
    }
    // await User.updateOne({ // 测试用 删除usingtime数组末尾元素
    //   userName: username
    // }, {
    //   '$pop': {
    //     usingtime: 1
    //   }
    // })
    let res = await User.find(query, { // 查询是否有对应用户和日期的数据
      usingtime: 1
    })
    if (res.length !== 0) { // 有则需修改数据
      const usingtimeArr = res[0].usingtime
      let flag = false // 是否是当日time最高数据
      usingtimeArr.forEach((obj) => {
        if (obj.date === date) {
          if (obj.time < time) {
            flag = true
          }
        }
      })
      if (flag) { // 不是则修改当日time最高数据
        await User.updateOne(query, update)
      }
    } else { // 否则插入新一条数据
      await User.updateOne({
        userName: username
      }, add)
    }
    return await User.find({ // @todo:测试用
      userName: username
    })
  }

}

module.exports = user