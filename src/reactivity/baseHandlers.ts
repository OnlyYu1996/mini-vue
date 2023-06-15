import { track, trigger } from './effect';
import { ReactiveFlag, readonly } from './reactive';
import { reactive } from './reactive';
import { isObject } from '../shared';

const get = createCetter();
const set = creatSetter();
const readonlyGet = createCetter(true);

function createCetter(isReadonly = false) {
  return function get(target, key) {
    if (key === ReactiveFlag.IS_REACTIVE) {
      return !isReadonly;
    } else if (key === ReactiveFlag.IS_READONLY) {
      return isReadonly;
    }

    const res = Reflect.get(target, key);

    // 判断 res 是不是一个object
    if (isObject(res)) {
      return isReadonly ? readonly(res) : reactive(res);
    }
    // TODO 依赖收集
    if (!isReadonly) track(target, key);
    return res;
  };
}

function creatSetter() {
  return function set(target, key, value) {
    const res = Reflect.set(target, key, value);
    // TODO 触发依赖
    trigger(target, key);
    return res;
  };
}

export const mutableHandlers = {
  get,
  set,
};
export const readonlyHandlers = {
  get: readonlyGet,
  set(target, key, value) {
    console.warn(`key:${key} is readonly`);
    return true;
  },
};
