function Instance() {
  this.running = []
}

Instance.prototype = {
  // 申请实例
  grant(context) {
    this.running.push(context)
  },
  // 释放实例
  revoke(context) {
    const index = this.findIndex(context)
    if (index >= 0) {
      this.running.splice(index, 1)
    }
  },
  // 检查是否通过
  access(context, immediate) {
    const allow = this.findIndex(context) < 0
    if (allow && immediate) {
      this.grant(context)
    }
    return allow
  },
  // 实例位置
  findIndex(context) {
    return this.running.findIndex((r) => r === context)
  }
}

export default Instance
