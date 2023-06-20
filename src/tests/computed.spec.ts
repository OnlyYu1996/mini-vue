import { reactive } from '../reactive';
import { computed } from '../computed';

describe('computed', () => {
  it('happy path', () => {
    // ref
    // .value
    // 1、缓存
    const user = reactive({
      age: 1,
    });
    const age = computed(() => {
      return user.age;
    });
    expect(age.value).toBe(1);
  });

  it('should compute lazoly', () => {
    const value = reactive({
      foo: 1,
    });
    const getter = jest.fn(() => {
      return value.foo;
    });
    const cValue = computed(getter);

    // lazy 不获取值就不调用函数
    expect(getter).not.toHaveBeenCalled();

    // 取值，调用一次
    expect(cValue.value).toBe(1);
    expect(getter).toHaveBeenCalledTimes(1);

    // 再次触发，缓存
    cValue.value;
    expect(getter).toHaveBeenCalledTimes(1);

    value.foo = 2; // 触发trigger => effect
    expect(getter).toHaveBeenCalledTimes(1);

    // now it should compute
    expect(cValue.value).toBe(2);
    expect(getter).toHaveBeenCalledTimes(2);

    // should bot compute again
    cValue.value;
    expect(getter).toHaveBeenCalledTimes(2);
  });
});
