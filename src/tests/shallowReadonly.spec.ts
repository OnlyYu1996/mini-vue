import { isReadonly, shallowReadonly } from '../reactivity/reactive';

describe('shallowReadonly', () => {
  test('should not make non-reactive properties reactive', () => {
    //  shallowReactive创建的props，只有最外层的对象是响应式对象，内部的属性n不是响应式对象
    // shallowReadonly创建的props，只有最外层的对象是只读的，内部的属性n不是只读的
    const props = shallowReadonly({ n: { foo: 1 } });
    expect(isReadonly(props)).toBe(true);
    expect(isReadonly(props.n)).toBe(false);
  });
  it('warn then call set', () => {
    console.warn = jest.fn();
    const user = shallowReadonly({
      age: 10,
    });
    user.age = 11;
    expect(console.warn).toBeCalled();
  });
});
