# vue-singleton

vue 单例模式 method

一般场景为：用户提交表单或其他异步操作时，在上一次请求反馈前，阻止发起相同操作。

相比使用单例http请求，提前到操作发起点阻止。

## 安装

```
npm i vue-singleton -save
```


## 使用

```
import singleton from 'vue-singleton'

export default {
  // code...
  methods: {
    confirm: singleton(async function (config) {
      // code...
      // eg code.  const message = await axios.post(config)
      // eg code.  this.$notice(message)
    })
  }
}
```


## 捕获

如果需要捕获内部错误或被阻止的操作，可传feedback参数为true

```
import singleton from 'vue-singleton'

export default {
  // code...
  methods: {
    save (config) {
      // code...
      this.confirm(config).catch((error) => {
        if (error === singleton.prevent) {
          this.$notice('正在处理，请稍后。。。')
        }
      })
    },
    confirm: singleton(async function (config) {
      const message = await axios.post(config)
      this.$notice(message)
    }, true)
  }
}
```

## 参数

用法：singleton(callback, [feedback])
功能：返回Promise类型的单例方法

- `callback` Promise类型 回调函数（不能使用箭头函数），在上一次 调用resolve/reject 前，将阻住再次调用。
- `feedback` 是否捕获异常，可以使用 `singleton.prevent` 判断是否为单例阻止事件。

## 注意

回调函数不能使用 箭头函数，否则作用域为 undefined ！
