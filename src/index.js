import Instance from './Instance'
// eslint-disable-next-line no-undef
const Promise = Promise || global.Promise

const prevent = 'SINGLETON_PREVENT'

function singleton (callback, feedback) {
  const instance = new Instance()
  return function () {
    const context = this
    const args = arguments
    return new Promise((resolve, reject) => {
      if (instance.access(context, true)) {
        Promise.resolve(callback.apply(context, args))
          .then((result) => {
            instance.revoke(context)
            resolve(result)
          })
          .catch((error) => {
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
