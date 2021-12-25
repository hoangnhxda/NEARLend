import { createApp } from 'vue'
import App from './App.vue'


import { Button, Card } from 'ant-design-vue';
import './assets/styles/ant.less';


const app = createApp(App)
app.config.productionTip = false;
app.use(Button)
app.use(Card)
.mount('#app')

