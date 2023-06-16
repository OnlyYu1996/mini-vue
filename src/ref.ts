import { hasChanged, isObject } from './shared/index';
import { isTracking, trackEffects, triggerEffects } from './effect';
import { reactive } from './reactive';

// ref 针对一个值类型
// 1 true '1' []
// reactive proxy => object

class RefImpl {
  private _value: any;
  public dep;
  // 用于存储转换前的原始值（调用reactive后，会变成一个proxy值，set的时候无法对比）
  private _rawValue: any;
  constructor(value) {
    this._rawValue = value;

    // value => reactive
    // 1、看看value是不是对象
    this._value = convert(value);

    this.dep = new Set();
  }
  get value() {
    // 依赖收集
    trackRefValue(this);
    return this._value;
  }
  set value(newValue) {
    if (hasChanged(newValue, this._rawValue)) {
      // 先修改值
      this._rawValue = newValue;
      this._value = convert(newValue);
      triggerEffects(this.dep);
    }
  }
}

function convert(value) {
  return isObject(value) ? reactive(value) : value;
}

function trackRefValue(ref) {
  if (isTracking()) {
    trackEffects(ref.dep);
  }
}

export function ref(val) {
  return new RefImpl(val);
}
