import { createEffectHook } from '@formily/core'
const CUSTOM_EVENT_TYPE = 'custom-event'

export interface ICustomEventProps {
  event: string
  body?: any
}

/**
 * 监听自定义事件
 */
export const onCustomEvent = createEffectHook(
  CUSTOM_EVENT_TYPE,
  (payload, form) => (listener) => {
    listener(payload, form)
  }
)

/**
 * 发送自定义事件
 * @param payload
 */
export const notifyCustomEvent = (payload: ICustomEventProps, form) => {
  form.notify(CUSTOM_EVENT_TYPE, payload)
}

/**
 * 订阅自定义事件
 * @param form
 * @param callback
 */
export const subscribeCustomEvent = (form, callback) => {
  form.subscribe((subscriber) => {
    const { payload } = subscriber
    if (payload && payload.event) {
      callback && callback(payload)
    }
  })
}
