import { createComponentInstance, setupComponent } from './component';

export function render(vnode, continer) {
  // patch
  // 方便后续进行递归处理
  patch(vnode, continer);
}

function patch(vnode, container) {
  // 处理组件

  // 判断 是不是 element
  // if()

  processElement()

  processComponent(vnode, container);
}

function processComponent(vnode, container) {
  mountComponent(vnode, container);
}

function mountComponent(vnode, container) {
  const instance = createComponentInstance(vnode);
  setupComponent(instance);
  setupRenderEffect(instance, container);
}

function setupRenderEffect(instance, container) {
  // App.js render函数 return 出来的h
  const subTree = instance.render();
  // vnode => patch
  // vnode => element => mountElement
  patch(subTree, container);
}
