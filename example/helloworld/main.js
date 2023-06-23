import {App} from './App.js'
import {createApp} from  '../../lib/guide-mini-vue.esm.js'

console.log(12456);
const rootContainer = document.querySelector('#app')
createApp(App).mount(rootContainer);
