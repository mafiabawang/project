import { createApp } from 'vue'
import './style.css'
// import App from './App.vue'
import App from './App.vue'
import BaseInput from './components/form/BaseInput.vue'
import BaseSelect from './components/form/BaseSelect.vue'
import BaseRadio from './components/form/BaseRadio.vue'
import BaseRadioGroup from './components/form/BaseRadioGroup.vue'
import BaseCheckbox from './components/form/BaseCheckbox.vue'
import router from './routes'

const app = createApp(App);

app.use(router)
.component("base-input", BaseInput)
.component("base-select",BaseSelect)
.component("base-radio",BaseRadio)
.component("base-radio-group", BaseRadioGroup)
.component('base-checkbox',BaseCheckbox)
app.mount('#app')
