const prevent = 'SINGLETON_PREVENT'

function Instance() {
  this.running = []
}

Instance.prototype = {
  // 申请实例
  grant (context) {
    this.running.push(context)
  },
  // 释放实例
  revoke (context) {
    const index = this.findIndex(context)
    if (index >= 0) {
      this.running.splice(index, 1)
    }
  },
  // 检查是否通过
  access (context, immediate) {
    const allow = this.findIndex(context) < 0
    if (allow && immediate) {
      this.grant(context)
    }
    return allow
  },
  // 实例位置
  findIndex (context) {
    return this.running.findIndex((r) => r === context)
  }
}

function singleton (callback, feedback) {
  const instance = new Instance()
  return function () {
    const context = this
    const args = arguments
    return new Promise(function (resolve, reject) {
      if (instance.access(context, true)) {
        Promise.resolve(callback.apply(context, args))
          .then(function (result) {
            instance.revoke(context)
            resolve(result)
          })
          .catch(function (error) {
            instance.revoke(context)
            if (feedback) {
              reject(error)
            }
          })
        return true
      }
      if (feedback) {
        reject(singleton.prevent)
      }
    })
  }
}

singleton.prevent = prevent

export default singleton
