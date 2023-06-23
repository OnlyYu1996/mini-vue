'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function createVNode(type, props, children) {
    var vnode = {
        type: type,
        props: props,
        children: children,
    };
    return vnode;
}

function createComponentInstance(vnode) {
    var component = {
        vnode: vnode,
        type: vnode.type,
    };
    return component;
}
function setupComponent(instance) {
    // initProps()
    // initSlots()
    setupStatefulComponent(instance);
}
function setupStatefulComponent(instance) {
    var Component = instance.type;
    var setup = Component.setup;
    if (setup) {
        // function object
        var setupResult = setup();
        handleSetupResult(instance, setupResult);
    }
}
function handleSetupResult(instance, setupResult) {
    // function
    if (typeof setupResult === 'object') {
        instance.setupState = setupResult;
    }
    finishComponentSetup(instance);
}
function finishComponentSetup(instance) {
    var Component = instance.type;
    instance.render = Component.render;
}

function render(vnode, continer) {
    // patch
    // 方便后续进行递归处理
    patch(vnode);
}
function patch(vnode, container) {
    // 处理组件
    // 判断 是不是 element
    // if()
    processElement();
    processComponent(vnode);
}
function processComponent(vnode, container) {
    mountComponent(vnode);
}
function mountComponent(vnode, container) {
    var instance = createComponentInstance(vnode);
    setupComponent(instance);
    setupRenderEffect(instance);
}
function setupRenderEffect(instance, container) {
    // App.js render函数 return 出来的h
    var subTree = instance.render();
    // vnode => patch
    // vnode => element => mountElement
    patch(subTree);
}

function createApp(rootComponent) {
    return {
        mount: function (rootComponent) {
            // 先转换成虚拟节点
            // 所有逻辑操作都会基于 vnode 做处理
            var vNode = createVNode(rootComponent);
            render(vNode);
        },
    };
}

function h(type, props, children) {
    return createVNode(type, props, children);
}

exports.createApp = createApp;
exports.h = h;
