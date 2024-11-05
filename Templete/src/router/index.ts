import { createRouter, createWebHistory } from "vue-router";
import routes from "@/router/routes";
import environment from "@/config/environment";
import { qiankunWindow } from "vite-plugin-qiankun/dist/helper";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/AuthStore";
import { useConfigStore } from "@/stores/ConfigStore";

const router = createRouter({
  history: createWebHistory(
    qiankunWindow.__POWERED_BY_QIANKUN__ ? environment.environment.sub_path : "/"
  ),
  routes: routes,
});

router.beforeEach((_to, _from, next) => {
  const { userAuth } = useAuthStore();
  const { env } = storeToRefs(useConfigStore());
  if (!userAuth.isLoggedIn && env.value.render_qiankun) {
    window.location.href = env.value.portal_sub_path;
  } else {
    next();
  }
});

export default router;
