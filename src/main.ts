import { createApp, defineAsyncComponent } from "vue";
import * as Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

window["@vue/composition-api"] = Vue;

const app = createApp(App);
const ComponentA = defineAsyncComponent({
  loader: () =>
    import(/* webpackChunkName: "component-a" */ "@/components/ComponentA.vue"),
  delay: 2000,
  timeout: 3000,
});
const ComponentB = defineAsyncComponent({
  loader: () =>
    import(/* webpackChunkName: "component-b" */ "@/components/ComponentB.vue"),
  delay: 2000,
  timeout: 3000,
});

app.component("component-a", ComponentA);
app.component("component-b", ComponentB);

app.use(store).use(router).mount("#app");
