"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var prevent = 'SINGLETON_PREVENT';

function Instance() {
  this.running = [];
}

Instance.prototype = {
  // 申请实例
  grant: function grant(context) {
    this.running.push(context);
  },
  // 释放实例
  revoke: function revoke(context) {
    var index = this.findIndex(context);

    if (index >= 0) {
      this.running.splice(index, 1);
    }
  },
  // 检查是否通过
  access: function access(context, immediate) {
    var allow = this.findIndex(context) < 0;

    if (allow && immediate) {
      this.grant(context);
    }

    return allow;
  },
  // 实例位置
  findIndex: function findIndex(context) {
    return this.running.findIndex(function (r) {
      return r === context;
    });
  }
};

function singleton(callback, feedback) {
  var instance = new Instance();
  return function () {
    var context = this;
    var args = arguments;
    return new _promise.default(function (resolve, reject) {
      if (instance.access(context, true)) {
        _promise.default.resolve(callback.apply(context, args)).then(function (result) {
          instance.revoke(context);
          resolve(result);
        }).catch(function (error) {
          instance.revoke(context);

          if (feedback) {
            reject(error);
          }
        });

        return true;
      }

      if (feedback) {
        reject(singleton.prevent);
      }
    });
  };
}

singleton.prevent = prevent;
var _default = singleton;
exports.default = _default;