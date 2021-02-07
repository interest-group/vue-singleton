import { findIndex, splice } from './util'

function Instance() {
  this.running
    =
    [];


}

Instance.prototype = {
  // 申请实例
  grant (context) {
    this.running.push(context)
  },
  // 释放实例
  revoke (context) {
    const index = findIndex(this.running, (ref) => ref === context)
    if (index >= 0) {
      splice(this.running, index, 1)
    }
  },
  // 检查是否通过
  access (context, immediate) {
    const allow = findIndex(this.running, (ref) => ref === context) < 0
    if (allow && immediate) {
      this.grant(context)
    }
    return allow
  }
}



export default Instance
