import { createVNode } from './vnode';
import { render } from './randerer';

export function createApp(rootComponent) {
  return {
    mount(rootComponent) {
      // 先转换成虚拟节点
      // 所有逻辑操作都会基于 vnode 做处理
      const vNode = createVNode(rootComponent);
      render(vNode, rootComponent);
    },
  };
}
