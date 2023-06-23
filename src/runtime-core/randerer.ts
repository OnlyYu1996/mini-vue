import { isObject } from './../shared/index';
import { createComponentInstance, setupComponent } from './component';

export function render(vnode, continer) {
  // patch
  // 方便后续进行递归处理
  patch(vnode, continer);
}

function patch(vnode, container) {
  // 处理组件

  // 判断 是不是 element
  if (typeof vnode.type === 'string') {
    processElement(vnode, container);
  } else if (isObject(vnode.type)) {
    processComponent(vnode, container);
  }
}

function processElement(vnode, container) {
  mountElement(vnode, container);
}

function mountElement(vnode, container) {
  const el = document.createElement(vnode.type);
  const { children, props } = vnode;

  if (typeof children === 'string') {
    el.textContent = children;
  } else if (Array.isArray(children)) {
    mountChildren(vnode, el);
  }

  for (const key in props) {
    const val = props[key];
    el.setAttribute(key, val);
  }
  container.append(el);
}

function mountChildren(vnode, container) {
  vnode.children.forEach((v) => {
    patch(v, container);
  });
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
