import {
  mutableHandlers,
  readonlyHandlers,
  shallowReadonlyHandlers,
} from './baseHandlers';

export const enum ReactiveFlag {
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly',
}

export function reactive(raw) {
  return createActiveObject(raw, mutableHandlers);
}

export function readonly(raw) {
  return createActiveObject(raw, readonlyHandlers);
}

export function shallowReadonly(raw) {
  return createActiveObject(raw, shallowReadonlyHandlers);
}

export function isReadonly(value) {
  return !!value[ReactiveFlag.IS_READONLY];
}

export function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}

export function isReactive(value) {
  return !!value[ReactiveFlag.IS_REACTIVE];
}

function createActiveObject(raw: any, baseHandlers) {
  return new Proxy(raw, baseHandlers);
}
