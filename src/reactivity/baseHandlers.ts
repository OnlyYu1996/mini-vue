import { track, trigger } from './effect';

const get = createCetter();
const set = creatSetter();
const readonlyGet = createCetter(true);

function createCetter(readonly = false) {
  return function get(target, key) {
    const res = Reflect.get(target, key);
    // TODO 依赖收集
    if (!readonly) track(target, key);
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
