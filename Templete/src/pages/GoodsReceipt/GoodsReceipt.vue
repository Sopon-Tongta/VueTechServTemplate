<template>
  <q-dialog v-model="criteriaSearchShow" class="templete_web" no-backdrop-dismiss>
    <q-card class="popup-form" :style="dragProps.dragStyle">
      <q-card-section class="section-header" v-touch-pan.mouse="onPan">
        <div class="popup-title flex justify-between">
          Search Order
          <q-btn flat round color="white" size="sm" icon="close" v-close-popup />
        </div>
      </q-card-section>
      <q-card-section class="section-body">
        <div class="form-component">
          <div class="popup-label">Reference No.</div>
          <q-input
            outlined
            clearable
            class="form-ui"
            v-model="searchRefNo"
            @clear="searchRefNo = ''"
            placeholder="กรอกข้อมูล"
          />
        </div>
        <div class="form-component">
          <div class="popup-label">Receipt No.</div>
          <q-input
            outlined
            clearable
            class="form-ui"
            v-model="searchReceiptNo"
            @clear="searchReceiptNo = ''"
            placeholder="กรอกข้อมูล"
          />
        </div>
        <div class="form-component">
          <div class="popup-label">Owner</div>
          <SelectField
            class="form-ui select-ui"
            :list="ownerList"
            :value="searchOwner"
            placeholder="- เลือก -"
            @onSelect="(_label: string, val: string) => (searchOwner = val)"
          />
        </div>
        <div class="form-component">
          <div class="popup-label">Order Type</div>
          <SelectField
            class="form-ui select-ui"
            :list="orderTypeGaneralList"
            :value="searchOrderType"
            placeholder="- เลือก -"
            @onSelect="(_label: string, val: string) => (searchOrderType = val)"
          />
        </div>
      </q-card-section>
      <q-card-actions class="section-action">
        <q-btn dense outline size="md" color="red" @click="onClearCriteriaSearch" no-caps>
          <div class="px-1 flex flex-row items-center">
            <q-icon name="close" size="20px" />
            <p class="font-thaibev-medium">Cancel</p>
          </div>
        </q-btn>
        <q-btn dense unelevated size="md" class="bg-teal-700" @click="searchData" no-caps>
          <div class="px-1 flex flex-row items-center">
            <q-icon name="search" color="white" size="20px" />
            <p class="font-thaibev-medium text-white">Search</p>
          </div>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="popupCreateOrderShow" class="templete_web" persistent>
    <CreateReceiptOrder @onCreate="onCreateReceiveOrder" />
  </q-dialog>
  <div class="view">
    <div class="box-title">
      <div class="flex flex-nowrap items-center mb-1 sm:mb-0">
        <span class="text">Goods Receipt</span>
        <q-btn
          dense
          class="ml-2"
          color="theme-color"
          @click="onPopupCreateOrder"
          no-caps
        >
          <div class="px-2 flex flex-row items-center">
            <q-icon name="post_add" color="white" size="20px" />
            <p class="pl-1 font-thaibev-medium text-white">Create</p>
          </div>
        </q-btn>
      </div>
      <q-space />
      <div class="flex flex-nowrap items-center mt-1 sm:mb-0">
        <q-btn
          round
          outline
          color="theme-color"
          icon="search"
          class="mr-2 text-[10px] sm:text-[12px]"
          @click="onDialogSearch"
        />
        <SelectField
          class="w-[182px] md:w-[180px]"
          :search="false"
          :clearable="false"
          :list="statusList"
          :value="searchStatus"
          @onSelect="onSearchStatus"
        />
      </div>
    </div>
    <div class="box-table">
      <q-table
        :grid="$q.screen.xs"
        table-class="sm:h-[calc(100vh-220px)] md:h-[calc(100vh-260px)] 2xl:h-[calc(100vh-300px)] [&>table>tbody>tr>td]:py-2"
        card-container-class="h-[calc(100vh-300px)] overflow-auto"
        :rows="rows"
        :columns="columns"
        row-key="receiptNo"
        :pagination="pagination"
        hide-pagination
        flat
        bordered
        dense
        :loading="loading"
      >
        <template v-slot:loading>
          <q-inner-loading showing color="theme-color" />
        </template>
        <template v-slot:top>
          <q-icon name="grid_view" class="cursor-pointer hover:text-red-500" color="theme-color" />
        </template>
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th
              v-for="col in (props.cols as Array<IQTableHeaderCols>)"
              :key="col.name"
              :props="props"
            >
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td
              v-for="col in (props.cols as Array<IQTableBodyCols>)"
              :key="col.name"
              :props="props"
            >
              <div
                v-if="col.name == 'receiptNo'"
                @click="onEditGoodsReceipt(props.row)"
                class="link-goto"
              >
                {{ col.value }}
              </div>
              <div v-else>{{ col.value }}</div>
            </q-td>
          </q-tr>
        </template>
        <template v-slot:item="props">
          <div class="p-2 col-xs-12 col-sm-6">
            <q-card flat bordered>
              <q-card-section class="bg-green-100">
                <div class="grid grid-cols-2 gap-2">
                  <span class="font-thaibev-bold text-[16px] text-teal-800 whitespace-nowrap">
                    Status
                  </span>
                  <span :class="getStatusClass(props.row.status)">
                    {{ props.row.status }}
                  </span>
                  <span class="font-thaibev-bold text-[16px] text-teal-800 whitespace-nowrap">
                    Receipt No
                  </span>
                  <span class="link-goto truncate" @click="onEditGoodsReceipt(props.row)">
                    {{ props.row.receiptNo }}
                  </span>
                </div>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <div class="grid grid-cols-2 gap-2">
                  <span class="font-thaibev-semibold whitespace-nowrap">OwnerCode</span>
                  <span class="font-thaibev-medium truncate">{{ props.row.ownerCode }}</span>
                  <span class="font-thaibev-semibold whitespace-nowrap">Reference No</span>
                  <span class="font-thaibev-medium truncate">{{ props.row.referenceNo }}</span>
                  <span class="font-thaibev-semibold whitespace-nowrap">Order Type</span>
                  <span class="font-thaibev-medium truncate">{{ props.row.orderType }}</span>
                  <span class="font-thaibev-semibold whitespace-nowrap">W/H</span>
                  <span class="font-thaibev-medium truncate">{{ props.row.whCodeSource }}</span>
                  <span class="font-thaibev-semibold whitespace-nowrap">Doc Date</span>
                  <span class="font-thaibev-medium truncate">{{ props.row.docDate }}</span>
                  <span class="font-thaibev-semibold whitespace-nowrap">Receipt Date</span>
                  <span class="font-thaibev-medium truncate">{{ props.row.receiptDate }}</span>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </template>
        <template v-slot:bottom>
          <span class="pagination-banner">
            {{ itemFirstPage }}-{{ itemFinalPage }} of {{ itemCount }}
          </span>
          <q-space />
          <q-pagination
            v-model="pagination.page"
            color="theme-color"
            :max="pageMax"
            :max-pages="3"
            direction-links
            boundary-links
            size="14px"
            @update:model-value="searchData"
          />
        </template>
      </q-table>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, computed, watch, type Ref } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/AuthStore";
import { useMasterDataStore } from "@/stores/MasterDataStore";
import useGoodsReceipt from "@/hooks/useGoodsReceipt";
import CreateReceiptOrder from "@/components/GoodsReceipt/createOrder.vue";
import type { QTableProps } from "quasar";
import type {
  IReceiptOrder_Data,
  ICreateReceiptOrderParams,
  ICreateReceiptOrder_Response,
} from "@/interfaces/hooks/IGoodsReceipt";
import type {
  IQSelectField,
  IQPagination,
  IQDragProps,
  IQDragEvent,
  IQSelectField_Group,
  IQTableBodyCols,
  IQTableHeaderCols,
} from "@/interfaces/quasar/IQuasar";

export default defineComponent({
  name: "goodsReceipt",
  emits: ["onRedirect", "showLoading", "hideLoading", "alert", "confirm", "confirmInput"],
  components: {
    CreateReceiptOrder,
  },
  setup(props, ctx) {
    const { ownerList, orderTypeList } = storeToRefs(useMasterDataStore());
    const { receiveOrderList, receiveOrderTotal, saveReceiveOrder, searchReceiveOrder } =
      useGoodsReceipt.useReceiveOrder();

    const statusList: Ref<Array<IQSelectField>> = ref([
      { label: "All Status", value: "all" },
      { label: "New", value: "new" },
      { label: "Check In", value: "checkin" },
      { label: "Put Away", value: "putaway" },
      { label: "Closed", value: "closed" },
    ]);
    const criteriaSearchShow = ref<boolean>(false);
    const popupCreateOrderShow = ref<boolean>(false);
    const itemCount = receiveOrderTotal;
    const itemFirstPage = ref<number>(0);
    const itemFinalPage = ref<number>(0);
    const pagination = ref<IQPagination>({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 10,
    });
    const pageMax = computed(() => Math.ceil(itemCount.value / pagination.value.rowsPerPage));
    const createColumns: QTableProps["columns"] = [
      {
        name: "receiptNo",
        label: "Receipt No",
        align: "left",
        field: "receiptNo",
      },
      {
        name: "ownerCode",
        label: "Owner",
        align: "left",
        field: "ownerCode",
      },
      {
        name: "referenceNo",
        label: "Reference No",
        align: "left",
        field: "referenceNo",
      },
      {
        name: "orderType",
        label: "Order Type",
        align: "left",
        field: "orderType",
      },
      {
        name: "warehouse",
        label: "W/H",
        align: "left",
        field: "whCodeSource",
      },
      {
        name: "docDate",
        label: "Doc Date",
        align: "left",
        field: "docDate",
      },
      {
        name: "receiptDate",
        label: "Receipt Date",
        align: "left",
        field: "receiptDate",
      },
      {
        name: "status",
        label: "Status",
        align: "left",
        field: "status",
        classes(row) {
          return getStatusClass(row.status!);
        },
      },
    ];
    const showLoading = () => ctx.emit("showLoading");
    const loading = ref<boolean>(false);
    const searchStatus = ref<string>("all");
    const searchRefNo = ref<string>("");
    const searchReceiptNo = ref<string>("");
    const searchOwner = ref<string>("");
    const searchOrderType = ref<string>("");
    const searchData = () => {
      loading.value = true;
      searchReceiveOrder(
        searchStatus.value,
        searchRefNo.value,
        searchReceiptNo.value,
        searchOwner.value,
        searchOrderType.value,
        pagination.value.page,
        pagination.value.rowsPerPage
      );
    };

    watch(receiveOrderList, () => {
      let page = pagination.value.page;
      let pageSize = pagination.value.rowsPerPage;
      let finalPage = page * pageSize;
      let firstPage = finalPage - (pageSize - 1);
      finalPage = finalPage > itemCount.value ? itemCount.value : finalPage;
      itemFinalPage.value = finalPage;
      itemFirstPage.value = firstPage;
      loading.value = false;
    });

    const onSearchStatus = (_label: string, val: string) => {
      searchStatus.value = val;
      searchData();
    };

    const onClearCriteriaSearch = () => {
      searchRefNo.value = "";
      searchReceiptNo.value = "";
      searchOwner.value = "";
      searchOrderType.value = "";
      searchData();
    };

    const onEditGoodsReceipt = (row: IReceiptOrder_Data) => {
      ctx.emit("onRedirect", "editGoodsReceipt", row);
    };

    const onPopupCreateOrder = () => {
      popupCreateOrderShow.value = true;
    };

    const onCreateReceiveOrder = (order: ICreateReceiptOrderParams) => {
      if (order.referenceNo == undefined || order.referenceNo.length == 0) {
        ctx.emit("alert", "โปรดระบุ Reference No", "warning");
        return;
      }
      if (order.ownerCode == undefined || order.ownerCode.length == 0) {
        ctx.emit("alert", "โปรดระบุ Owner", "warning");
        return;
      }
      if (order.supplierCode == undefined || order.supplierCode.length == 0) {
        ctx.emit("alert", "โปรดระบุ Supplier", "warning");
        return;
      }
      if (order.orderType == undefined || order.orderType.length == 0) {
        ctx.emit("alert", "โปรดระบุ Order Type", "warning");
        return;
      }
      if (order.warehouse == undefined || order.warehouse.length == 0) {
        ctx.emit("alert", "โปรดระบุ Warehouse", "warning");
        return;
      }
      if (order.docDate == undefined || order.docDate.length == 0) {
        ctx.emit("alert", "โปรดระบุ Doc Date", "warning");
        return;
      }
      if (order.receiveDate == undefined || order.receiveDate.length == 0) {
        ctx.emit("alert", "โปรดระบุ Receive Date", "warning");
        return;
      }

      showLoading();
      saveReceiveOrder(order, (result: ICreateReceiptOrder_Response) => {
        popupCreateOrderShow.value = false;
        ctx.emit("onRedirect", "editGoodsReceipt", result.receiptOrder);
      });
    };

    const dragProps = ref<IQDragProps>({
      dialogPosX: 0,
      dialogPosY: 0,
      dragStyle: "",
    });
    const onPan = (evt: IQDragEvent) => {
      dragProps.value.dialogPosX += evt.delta.x;
      dragProps.value.dialogPosY += evt.delta.y;
      dragProps.value.dragStyle = `transform: translate(${dragProps.value.dialogPosX}px, ${dragProps.value.dialogPosY}px)`;
    };

    const onDialogSearch = () => {
      criteriaSearchShow.value = true;
      dragProps.value = {
        dialogPosX: 0,
        dialogPosY: 0,
        dragStyle: "",
      };
    };

    const orderTypeGaneralList: Ref<Array<IQSelectField_Group>> = ref([]);
    const getOrderTypeGaneral = () => {
      orderTypeGaneralList.value = orderTypeList.value.filter((f) => f.group === "GENERAL");
    };
    watch(orderTypeList, getOrderTypeGaneral);

    onMounted(() => {
      getOrderTypeGaneral();
      searchData();
    });

    const getStatusClass = (status: String) => {
      let textColor = "";
      switch (status.toLowerCase()) {
        case "new":
          textColor = "text-[#1269bf]";
          break;
        case "putaway":
          textColor = "text-[#6e07d4]";
          break;
        case "partial putaway":
          textColor = "text-[#ecaf02]";
          break;
        case "checkin":
          textColor = "text-[#ecaf02]";
          break;
        case "partial checkin":
          textColor = "text-[#ecaf02]";
          break;
        case "closed":
          textColor = "text-[#707070]";
          break;
      }
      return "font-thaibev-bold " + textColor;
    };

    return {
      ownerList,
      orderTypeGaneralList,
      searchStatus,
      searchOwner,
      searchOrderType,
      searchRefNo,
      searchReceiptNo,
      statusList,
      searchData,
      onSearchStatus,
      onPopupCreateOrder,
      onCreateReceiveOrder,
      itemCount,
      itemFirstPage,
      itemFinalPage,
      pagination,
      columns: createColumns,
      rows: receiveOrderList,
      pageMax,
      loading,
      criteriaSearchShow,
      onClearCriteriaSearch,
      popupCreateOrderShow,
      onEditGoodsReceipt,
      onPan,
      dragProps,
      onDialogSearch,
      getStatusClass,
    };
  },
});
</script>
