import { createApp } from "vue";
import { createPinia } from "pinia";
import { Quasar, Loading, Notify } from "quasar";
import VCalendar from "v-calendar";
import "quasar/src/css/index.sass";
import "v-calendar/style.css";
import App from "@/App.vue";
import router from "@/router";
import "@/css/main.scss";
import { renderWithQiankun, type QiankunProps } from "vite-plugin-qiankun/dist/helper";
import BevPortalService from "@/services/BevPortalService";
import DatefieldVue from "@/components/utils/DateField.vue";
import SelectfieldVue from "@/components/utils/SelectField.vue";
import SelectfieldMultiVue from "@/components/utils/SelectFieldMulti.vue";
import environment from "@/config/environment";

if (environment.environment.render_qiankun) {
  if (!window.location.origin.includes(environment.environment.portal_path)) {
    window.location.href = environment.environment.portal_sub_path;
  }
  let app: any = null;
  const render = async (props: QiankunProps = {}) => {
    app = createApp(App);
    app.use(createPinia());

    if (Object.keys(props).length > 0) {
      await BevPortalService.setGlobalService(props);
      //Subscribe BevPortal State Change
      BevPortalService.subscribeGlobalStateChange();
    }

    app.use(router);
    app.use(Quasar, {
      plugins: {
        Loading,
        Notify,
      }, // import Quasar plugins and add here
    });
    app.use(VCalendar, {});
    app
      .component("DateField", DatefieldVue)
      .component("SelectField", SelectfieldVue)
      .component("SelectFieldMulti", SelectfieldMultiVue);
    const { container } = props;
    app.mount(container!.querySelector("#app"));
  };
  renderWithQiankun({
    bootstrap() {},
    mount(props: QiankunProps) {
      props.setGlobalHeader({
        color: "#1c6758",
        title: "Inventory",
      });
      render(props);
    },
    unmount(props: QiankunProps) {
      props.clearGlobalHeader();
      app.unmount();
      app._container.innerHTML = "";
      app = null;
    },
    update() {},
  });
} else {
  const _app = createApp(App);
  _app.use(createPinia());
  _app.use(router);
  _app.use(Quasar, {
    plugins: {
      Loading,
      Notify,
    }, // import Quasar plugins and add here
  });
  _app
    .component("DateField", DatefieldVue)
    .component("SelectField", SelectfieldVue)
    .component("SelectFieldMulti", SelectfieldMultiVue);
  _app.mount("#app");
}
