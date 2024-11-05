const routes: any = [
  {
    path: "/",
    component: () => import("@/layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "index",
        component: () => import("@/pages/IndexPage.vue"),
      },
      {
        path: "goodsReceipt",
        name: "goodsReceipt",
        component: () => import("@/pages/GoodsReceipt/GoodsReceipt.vue"),
      },
      {
        path: "editGoodsReceipt",
        name: "editGoodsReceipt",
        component: () => import("@/pages/GoodsReceipt/EditGoodsReceipt.vue"),
      },
      {
        path: "goodsIssue",
        name: "goodsIssue",
        component: () => import("@/pages/GoodsIssue/GoodsIssue.vue"),
      },
      {
        path: "editGoodsIssue",
        name: "editGoodsIssue",
        component: () => import("@/pages/GoodsIssue/EditGoodsIssue.vue"),
      },
      {
        path: "confirmGoodsIssue",
        name: "confirmGoodsIssue",
        component: () => import("@/pages/GoodsIssue/ConfirmGoodsIssue.vue"),
      }
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("@/layouts/ErrorNotFound.vue"),
  },
];

export default routes;
