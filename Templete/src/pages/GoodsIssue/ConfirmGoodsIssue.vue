<template>
  <div class="info-2">
    <div class="box-title">
      <div class="w-[calc(100vw-80px)] md:w-auto flex flex-row">
        <span class="text truncate">Confirm Issue Detail</span>
      </div>
      <q-space />
      <q-icon
        flat
        round
        class="cursor-pointer hover:text-red-500"
        color="theme-color"
        :name="toggleDetail ? 'expand_less' : 'expand_more'"
        @click="toggleDetail = !toggleDetail"
      >
        <q-tooltip
          v-if="!$q.screen.xs"
          class="border border-green-700 bg-green-50"
          anchor="center left"
          self="center right"
          :offset="[5, 5]"
          transition-show="jump-left"
          transition-hide="jump-right"
        >
          <p class="font-thaibev-semibold-italic text-base text-green-700">
            {{ toggleDetail ? "Hide Details" : "Show Details" }}
          </p>
        </q-tooltip>
      </q-icon>
    </div>
    <div class="box-content">
      <div :class="toggleDetail ? 'content-info' : 'content-info-hide'">
        <div class="content">
          <div class="title">Owner</div>
          <div class="data">
            {{ ownerName }}
            <q-tooltip class="templete_web-tooltip" anchor="bottom left" self="center left">
              {{ ownerName }}
            </q-tooltip>
          </div>
        </div>
        <div class="content">
          <div class="title">Customer</div>
          <div class="data">
            {{ customerCode }} - {{ customerName }}
            <q-tooltip class="templete_web-tooltip" anchor="bottom left" self="center left">
              {{ customerCode }} - {{ customerName }}
            </q-tooltip>
          </div>
        </div>
        <div class="content">
          <div class="title">Reference No.</div>
          <div class="data">
            {{ referenceNo }}
            <q-tooltip class="templete_web-tooltip" anchor="bottom left" self="center left">
              {{ referenceNo }}
            </q-tooltip>
          </div>
        </div>
        <div class="content">
          <div class="title">Doc. Date</div>
          <div class="data">
            {{ docDate }}
            <q-tooltip class="templete_web-tooltip" anchor="bottom left" self="center left">
              {{ docDate }}
            </q-tooltip>
          </div>
        </div>
        <div class="content">
          <div class="title">Bill To</div>
          <div class="data">
            {{ billTo }}
            <q-tooltip class="templete_web-tooltip" anchor="bottom left" self="center left">
              {{ billTo }}
            </q-tooltip>
          </div>
        </div>
        <div class="content">
          <div class="title">Delivery To</div>
          <div class="data">
            {{ deliveryTo }}
            <q-tooltip class="templete_web-tooltip" anchor="bottom left" self="center left">
              {{ deliveryTo }}
            </q-tooltip>
          </div>
        </div>
        <div class="content">
          <div class="title">W/H</div>
          <div class="data">
            {{ whName }}
            <q-tooltip class="templete_web-tooltip" anchor="bottom left" self="center left">
              {{ whName }}
            </q-tooltip>
          </div>
        </div>
        <div class="content">
          <div class="title">Delivery Date</div>
          <div class="data">
            {{ deliveryDate }}
            <q-tooltip class="templete_web-tooltip" anchor="bottom left" self="center left">
              {{ deliveryDate }}
            </q-tooltip>
          </div>
        </div>
        <div class="content">
          <div class="title">Order Type</div>
          <div class="data">
            {{ orderType }}
            <q-tooltip class="templete_web-tooltip" anchor="bottom left" self="center left">
              {{ orderType }}
            </q-tooltip>
          </div>
        </div>
      </div>
      <div class="content-table">
        <div class="py-1 flex flex-row items-center">
          <div class="font-thaibev-semibold text-theme-color text-sm md:text-xl mr-2">
            <q-breadcrumbs separator-color="grey-14">
              <q-breadcrumbs-el
                label="Document Detail"
                class="text-grey-13 menu-switch-data cursor-pointer"
                @click="onBackClick('back_doc')"
              />
              <q-breadcrumbs-el
                label="To Do Picking"
                class="text-grey-13 menu-switch-data cursor-pointer"
                @click="onBackClick('back')"
              />
              <q-breadcrumbs-el class="menu-switch-data" label="Confirm Picking" />
            </q-breadcrumbs>
          </div>
        </div>
        <q-table
          :grid="$q.screen.xs"
          :table-class="`${
            toggleDetail
              ? 'md:h-[calc(100vh-440px)] 2xl:h-[calc(100vh-480px)]'
              : 'md:h-[calc(100vh-290px)] 2xl:h-[calc(100vh-330px)]'
          } [&>table>tbody>tr>td]:py-2 duration-500`"
          card-container-class="h-[calc(100vh-320px)] overflow-auto"
          flat
          bordered
          dense
          row-key="lineno"
          :rows="goodsIssueItemsList"
          :columns="createColumns"
          :visible-columns="visibleColumns"
          :loading="loading"
          :pagination="initialPagination"
          :rows-per-page-options="[0]"
          hide-bottom
        >
          <template v-slot:loading>
            <q-inner-loading showing color="theme-color" />
          </template>
          <template v-slot:top="props">
            <q-icon
              name="grid_view"
              class="cursor-pointer hover:text-red-500"
              color="theme-color"
            />
          </template>
          <template v-slot:item="props">
            <div class="p-2 col-xs-12 col-sm-6">
              <q-card flat bordered>
                <q-card-section class="bg-green-100">
                  <div class="grid grid-cols-2 gap-2">
                    <span class="font-thaibev-bold text-[16px] text-teal-800 whitespace-nowrap">
                      Item Code
                    </span>
                    <span class="font-thaibev-medium">
                      {{ props.row.skucode }}
                    </span>
                  </div>
                </q-card-section>
                <q-card-section>
                  <div class="grid grid-cols-2 gap-2">
                    <span class="font-thaibev-semibold whitespace-nowrap">Item Name</span>
                    <span class="font-thaibev-medium truncate">{{ props.row.description }}</span>
                    <span class="font-thaibev-semibold whitespace-nowrap">Total</span>
                    <span class="font-thaibev-medium truncate">{{ props.row.qtyDisplay }}</span>
                    <span class="font-thaibev-semibold whitespace-nowrap">Issue</span>
                    <span class="font-thaibev-medium text-green-500">{{ props.row.qtyConfirm }}</span>
                    <span class="font-thaibev-semibold whitespace-nowrap">Remaining</span>
                    <span class="font-thaibev-medium text-red-500 truncate">
                      {{ props.row.qtyRemain }}
                    </span>
                    <span class="font-thaibev-semibold whitespace-nowrap">Uom</span>
                    <span class="font-thaibev-medium truncate">{{ props.row.uomDisplay }}</span>
                    <span class="font-thaibev-semibold whitespace-nowrap">Zone</span>
                    <span class="font-thaibev-medium truncate">{{ props.row.zonecode }}</span>
                    <span class="font-thaibev-semibold whitespace-nowrap">Pallet</span>
                    <span class="font-thaibev-medium truncate">{{ props.row.palletno }}</span>
                    <span class="font-thaibev-semibold whitespace-nowrap">Batch</span>
                    <span class="font-thaibev-medium truncate">{{ props.row.batch }}</span>
                    <span class="font-thaibev-semibold whitespace-nowrap">Lot</span>
                    <span class="font-thaibev-medium truncate">{{ props.row.Lot }}</span>
                    <span class="font-thaibev-semibold whitespace-nowrap">Loc.</span>
                    <span class="font-thaibev-medium truncate">{{ props.row.locationcode }}</span>
                    <span class="font-thaibev-semibold whitespace-nowrap">MFG</span>
                    <span class="font-thaibev-medium truncate">{{ props.row.mfgdate }}</span>
                    <span class="font-thaibev-semibold whitespace-nowrap">EXP</span>
                    <span class="font-thaibev-medium truncate">{{ props.row.expdate }}</span>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </template>
        </q-table>
      </div>
    </div>
    <div class="box-footer">
      <q-btn dense outline size="md" color="theme-color" @click="onBackClick('back')" no-caps>
        <div class="px-3 flex flex-row items-center">
          <q-icon name="arrow_back_ios" size="20px" />
          <p class="font-thaibev-medium">Back</p>
        </div>
      </q-btn>
      <q-space />
      <q-btn class="ml-2" dense size="md" color="theme-color" @click="onConfirmPick" no-caps>
        <div class="px-2 flex flex-row items-center">
          <q-icon name="check" size="20px" />
          <p class="pl-1 font-thaibev-medium">Confirm</p>
        </div>
      </q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import useUtil from "@/hooks/useUtil";
import { defineComponent, onMounted, ref } from "vue";
import useGoodsIssue from "@/hooks/useGoodsIssue";
import { storeToRefs } from "pinia";
import { useRouterStore } from "@/stores/RouterStore";
import { useAuthStore } from "@/stores/AuthStore";
import type { QTableProps } from "quasar";
import type { IViewGoodsIssueItem, IConfirmPick_Request } from "@/interfaces/hooks/IGoodsIssue";

export default defineComponent({
  name: "confirmGoodsIssue",
  emits: ["onRedirect", "showLoading", "hideLoading", "alert", "confirm", "confirmInput"],
  setup(props, { emit }) {
    const { confirmPick } = useGoodsIssue.useGoodsIssueOrder();
    const { getStorage } = useGoodsIssue.useSessionStorage();
    const { addComma } = useUtil.useUtil();

    const goodsIssueItemsList = ref<Array<IViewGoodsIssueItem>>([]);
    const { router_params } = storeToRefs(useRouterStore());
    const { userAuth } = useAuthStore();

    const loading = ref(false);
    const toggleDetail = ref(router_params.value.viewHeader == undefined ? true : false);
    const giOrder = ref<string>(router_params.value.giOrder);
    const ownerCode = ref<string>(router_params.value.ownerCode);
    const ownerName = ref<string>(router_params.value.ownerName);
    const customerCode = ref<string>(router_params.value.customerCode);
    const customerName = ref<string>(router_params.value.customerName);
    const referenceNo = ref<string>(router_params.value.referenceNo);
    const docDate = ref<string>(router_params.value.docDate);

    const billTo = ref<string>(router_params.value.billTo);
    const deliveryTo = ref<string>(router_params.value.deliveryTo);
    const whCode = ref<string>(router_params.value.whCode);
    const whName = ref<string>(router_params.value.whName);
    const deliveryDate = ref<string>(router_params.value.deliveryDate);
    const orderType = ref<string>(router_params.value.orderType);

    const status = ref<string>(router_params.value.status);

    const createColumns = ref<QTableProps["columns"]>([
      {
        name: "lineno",
        label: "Line No",
        field: "lineno",
      },
      {
        name: "skucode",
        label: "Item Code",
        align: "left",
        field: "skucode",
      },
      {
        name: "description",
        label: "Item",
        align: "left",
        field: "description",
        style: "width: 20%;",
      },
      {
        name: "qtyDisplay",
        label: "Total",
        align: "center",
        field: "qtyDisplay",
        style: "color: green; font-weight: bold;",
      },
      {
        name: "qtyConfirm",
        label: "Issue",
        align: "center",
        field: "qtyConfirm",
        style: "color: black; font-weight: bold;",
      },
      {
        name: "qtyRemain",
        label: "Remaining",
        align: "center",
        field: "qtyRemain",
        style: "color: red; font-weight: bold;",
      },
      {
        name: "uomDisplay",
        label: "UoM",
        align: "left",
        field: "uomDisplay",
      },
      {
        name: "zonecode",
        label: "Zone",
        align: "left",
        field: "zonecode",
      },
      {
        name: "palletno",
        label: "Pallet No",
        align: "left",
        field: "palletno",
      },
      {
        name: "batch",
        label: "Batch",
        align: "left",
        field: "batch",
      },
      {
        name: "Lot",
        label: "Lot",
        align: "left",
        field: "Lot",
      },
      {
        name: "locationcode",
        label: "Loc.",
        align: "left",
        field: "locationcode",
      },
      {
        name: "mfgdate",
        label: "MFG",
        align: "left",
        field: "mfgdate",
      },
      {
        name: "expdate",
        label: "EXP",
        align: "left",
        field: "expdate",
      },
    ]);
    const visibleColumns = ref([
      "skucode",
      "description",
      "qtyDisplay",
      "qtyConfirm",
      "qtyRemain",
      "uomDisplay",
      "zonecode",
      "palletno",
      "batch",
      "Lot",
      "locationcode",
      "mfgdate",
      "expdate",
    ]);

    const loadSessionStorage = () => {
      goodsIssueItemsList.value = [];
      getStorage((result) => {
        result.forEach((element) => {
          if (element.checkItem == true) {
            let qtyRemain =
              element.uomBase.qty -
              (element.qtyConfirmBase! + element.qtyConfirmOrder! * element.uomOrder.convertQty);
            if (element.uomDisplay.split("/").length == 1) {
              element.qtyConfirm = addComma(element.qtyConfirmBase!);
              element.qtyRemain = addComma(qtyRemain);
            } else {
              element.qtyConfirm =
                addComma(element.qtyConfirmOrder!) + "/" + addComma(element.qtyConfirmBase!);
              element.qtyRemain =
                addComma(Math.floor(qtyRemain / element.uomOrder.convertQty)) +
                "/" +
                addComma(qtyRemain % element.uomOrder.convertQty);
            }
            goodsIssueItemsList.value.push(element);
          }
        });
      });
    };

    const onBackClick = (statusPage: string) => {
      let params = {
        giOrder: giOrder.value,
        ownerCode: ownerCode.value,
        ownerName: ownerName.value,
        cusCode: customerCode.value,
        cusName: customerName.value,
        referenceNo: referenceNo.value,
        docDate: docDate.value,

        billTo: billTo.value,
        deliveryTo: deliveryTo.value,
        orderType: orderType.value,
        deliveryDate: deliveryDate.value,
        whCodeSource: whCode.value,
        whSourceName: whName.value,
        status: status.value,
        statusPage: statusPage,
      };
      emit("onRedirect", "editGoodsIssue", params);
    };

    const onConfirmPick = () => {
      emit("confirm", "ข้อความจากระบบ", "ยืนยันการหยิบ Item", () => {
        emit("showLoading");
        let params: Array<IConfirmPick_Request> = [];
        goodsIssueItemsList.value.forEach((element) => {
          params.push({
            location: element.locationcode,
            owner: element.ownercode,
            palletNo: element.palletno,
            qtyPick:
              element.qtyConfirmBase! + element.qtyConfirmOrder! * element.uomOrder.convertQty,
            skuCode: element.skucode,
            transOrder: element.tranOrder,
            recNum: element.recNum,
            lineNo: element.lineno,
            userId: userAuth.contactId,
          });
        });
        confirmPick(params, () => {
          let route_params = {
            giOrder: giOrder.value,
            ownerCode: ownerCode.value,
            ownerName: ownerName.value,
            cusCode: customerCode.value,
            cusName: customerName.value,
            referenceNo: referenceNo.value,
            docDate: docDate.value,

            billTo: billTo.value,
            deliveryTo: deliveryTo.value,
            orderType: orderType.value,
            deliveryDate: deliveryDate.value,
            whCodeSource: whCode.value,
            whSourceName: whName.value,
            status: status.value,
          };
          emit("onRedirect", "editGoodsIssue", route_params);
        });
      });
    };

    onMounted(() => {
      loadSessionStorage();
    });

    return {
      loading,
      toggleDetail,
      giOrder,
      ownerCode,
      ownerName,
      customerCode,
      customerName,
      referenceNo,
      docDate,

      billTo,
      deliveryTo,
      whCode,
      whName,
      deliveryDate,
      orderType,

      status,

      goodsIssueItemsList,
      createColumns,
      visibleColumns,
      initialPagination: {
        sortBy: "lineno",
        descending: false,
      },

      onBackClick,
      onConfirmPick,
    };
  },
});
</script>

<style lang="scss"></style>
