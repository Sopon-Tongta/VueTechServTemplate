<template>
  <q-dialog v-model="popupSearch" class="templete_web" no-backdrop-dismiss>
    <CMP_SearchGoodsIssue
      :referenceNo="searchReferenceNo"
      :GINo="searchGINo"
      :orderType="searchOrderType"
      :owner="searchOwner"
      :docDate="searchDocDate"
      @onSearch="onSearchPopupSearch"
      @onClear="onClearPopupSearch"
    />
  </q-dialog>
  <q-dialog v-model="popupCreate" class="templete_web" persistent>
    <CMP_CreateGoodsIssue
      @onAlert="onAlert"
      @onShowLoading="onShowLoading"
      @onHideLoading="onHideLoading"
      @onSave="onSavePopupCreate"
    />
  </q-dialog>
  <div class="view">
    <div class="box-title">
      <div class="flex flex-nowrap items-center mb-1 sm:mb-0">
        <span class="text">Goods Issue</span>
        <q-btn
          dense
          class="ml-2"
          color="theme-color"
          @click="onPopupCreate"
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
          @click="onPopupSearch"
        />
        <q-select
          class="w-[163px] md:w-[180px]"
          outlined
          dense
          options-dense
          v-model="searchStatus"
          :options="masterStatus"
          map-options
          emit-value
          @update:model-value="loadGoodsIssue"
          color="theme-color"
          popup-content-class="font-thaibev-medium templete_web"
          options-selected-class="font-thaibev-semibold text-green-600"
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
        row-key="giOrder"
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
              v-for="col in  (props.cols as Array<IQTableBodyCols>)"
              :key="col.name"
              :props="props"
            >
              <div
                v-if="col.name == 'giOrder'"
                @click="onEditGoodsIssue(props.row)"
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
                    GI No.
                  </span>
                  <span class="link-goto truncate" @click="onEditGoodsIssue(props.row)">
                    {{ props.row.giOrder }}
                  </span>
                </div>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <div class="grid grid-cols-2 gap-2">
                  <span class="font-thaibev-semibold whitespace-nowrap">Owner</span>
                  <span class="font-thaibev-medium truncate">{{ props.row.ownerName }}</span>
                  <span class="font-thaibev-semibold whitespace-nowrap">Reference No</span>
                  <span class="font-thaibev-medium truncate">{{ props.row.referenceNo }}</span>
                  <span class="font-thaibev-semibold whitespace-nowrap">Order Type</span>
                  <span class="font-thaibev-medium truncate">{{ props.row.orderType }}</span>
                  <span class="font-thaibev-semibold whitespace-nowrap">W/H</span>
                  <span class="font-thaibev-medium truncate">{{ props.row.whSourceName }}</span>
                  <span class="font-thaibev-semibold whitespace-nowrap">Customer</span>
                  <span class="font-thaibev-medium truncate">
                    {{ props.row.cusCode.concat(" - ", props.row.cusName) }}
                  </span>
                  <span class="font-thaibev-semibold whitespace-nowrap">Bill To</span>
                  <span class="font-thaibev-medium truncate">{{ props.row.billTo }}</span>
                  <span class="font-thaibev-semibold whitespace-nowrap">Delivery To</span>
                  <span class="font-thaibev-medium truncate">{{ props.row.deliveryTo }}</span>
                  <span class="font-thaibev-semibold whitespace-nowrap">Doc Date</span>
                  <span class="font-thaibev-medium truncate">{{ props.row.docDate }}</span>
                  <span class="font-thaibev-semibold whitespace-nowrap">Delivery Date</span>
                  <span class="font-thaibev-medium truncate">{{ props.row.deliveryDate }}</span>
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
            :max="pageMax"
            :max-pages="3"
            color="theme-color"
            direction-links
            boundary-links
            size="14px"
            @update:model-value="loadGoodsIssue"
          />
        </template>
      </q-table>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useAuthStore } from "@/stores/AuthStore";
import useGoodsIssue from "@/hooks/useGoodsIssue";
import CMP_SearchGoodsIssue from "@/components/GoodsIssue/searchGoodsIssue.vue";
import CMP_CreateGoodsIssue from "@/components/GoodsIssue/createGoodsIssue.vue";
import type { QTableProps } from "quasar";
import type {
  IGoodsIssue_Data,
  IGetGoodsIssue_Params,
  ICreateGoodsIssue_Response,
} from "@/interfaces/hooks/IGoodsIssue";
import type { IGoodsIssue_SearchOrder_Params } from "@/interfaces/pages/IGoodsIssue";
import type { IQPagination, IQTableBodyCols, IQTableHeaderCols } from "@/interfaces/quasar/IQuasar";

export default defineComponent({
  name: "goodsIssue",
  emits: ["onRedirect", "showLoading", "hideLoading", "alert", "confirm", "confirmInput"],
  components: {
    CMP_SearchGoodsIssue,
    CMP_CreateGoodsIssue,
  },
  setup(props, { emit }) {
    const { masterStatus, goodsIssueList, goodsIssueTotal, getMasterStatus, loadStoreGoodsIssue } =
      useGoodsIssue.useGoodsIssue();
    const itemCount = ref(goodsIssueTotal);
    const itemFirstPage = ref(0);
    const itemFinalPage = ref(0);
    const pagination = ref<IQPagination>({
      page: 1,
      rowsPerPage: 10,
    });
    const pageMax = computed(() => Math.ceil(itemCount.value / pagination.value.rowsPerPage));
    const createColumns: QTableProps["columns"] = [
      {
        name: "giOrder",
        label: "GI No.",
        align: "left",
        field: "giOrder",
      },
      {
        name: "ownerName",
        label: "Owner",
        align: "left",
        field: "ownerName",
      },
      {
        name: "referenceNo",
        label: "Reference No.",
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
        name: "whSourceName",
        label: "W/H",
        align: "left",
        field: "whSourceName",
      },
      {
        name: "cusName",
        label: "Customer",
        align: "left",
        field: (row: IGoodsIssue_Data) => {
          return row.cusCode.concat(" - ", row.cusName);
        },
      },
      {
        name: "billTo",
        label: "Bill To",
        align: "left",
        field: "billTo",
      },
      {
        name: "deliveryTo",
        label: "Delivery To",
        align: "left",
        field: "deliveryTo",
      },
      {
        name: "docDate",
        label: "Doc. Date",
        align: "left",
        field: "docDate",
      },
      {
        name: "deliveryDate",
        label: "Delivery Date",
        align: "left",
        field: "deliveryDate",
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
    const loading = ref(true);
    const popupSearch = ref(false);
    const searchStatus = ref("");
    const searchReferenceNo = ref("");
    const searchGINo = ref("");
    const searchOwner = ref("");
    const searchDocDate = ref("");
    const searchOrderType = ref("");
    const popupCreate = ref(false);

    //////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////// emit
    //////////////////////////////////////////////////////////////////////////////////
    const onAlert = (body: string, type: string) => {
      emit("alert", body, type);
    };
    const onShowLoading = () => {
      emit("showLoading");
    };
    const onHideLoading = () => {
      emit("hideLoading");
    };
    //////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////// Load Data
    //////////////////////////////////////////////////////////////////////////////////
    const getParamsLoad = (): IGetGoodsIssue_Params => {
      return {
        giOrder: searchGINo.value,
        orderType: searchOrderType.value,
        ownerCode: searchOwner.value,
        referenceNo: searchReferenceNo.value,
        status: searchStatus.value == undefined ? "" : searchStatus.value,
        docDate: searchDocDate.value,
        pageNumber: pagination.value.page,
        pageSize: pagination.value.rowsPerPage,
      };
    };

    const loadGoodsIssue = () => {
      loading.value = true;
      loadStoreGoodsIssue(getParamsLoad());
    };
    //////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////// On Click
    //////////////////////////////////////////////////////////////////////////////////
    const onEditGoodsIssue = (route_params: IGoodsIssue_Data) => {
      emit("onRedirect", "editGoodsIssue", route_params);
    };
    //////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////// Popup Search
    //////////////////////////////////////////////////////////////////////////////////
    const onPopupSearch = () => {
      popupSearch.value = true;
    };

    const onClearPopupSearch = () => {
      searchOwner.value = "";
      searchReferenceNo.value = "";
      searchGINo.value = "";
      searchDocDate.value = "";
      searchOrderType.value = "";
      loadGoodsIssue();
    };

    const onSearchPopupSearch = (result: IGoodsIssue_SearchOrder_Params) => {
      searchOwner.value = result.searchOwner;
      searchReferenceNo.value = result.searchReferenceNo;
      searchGINo.value = result.searchGINo;
      searchDocDate.value = result.searchDocDate;
      searchOrderType.value = result.searchOrderType;
      loadGoodsIssue();
    };

    //////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////// Popup Search
    //////////////////////////////////////////////////////////////////////////////////
    const onPopupCreate = () => {
      onShowLoading();
      popupCreate.value = true;
    };

    const onSavePopupCreate = (result: ICreateGoodsIssue_Response) => {
      popupCreate.value = true;
      result.goodissue.viewHeader = false;
      emit("onRedirect", "editGoodsIssue", result.goodissue);
    };
    //////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////// Vue 3
    //////////////////////////////////////////////////////////////////////////////////
    watch(goodsIssueList, () => {
      let page = pagination.value.page;
      let pageSize = pagination.value.rowsPerPage;
      let finalPage = page * pageSize;
      let firstPage = finalPage - (pageSize - 1);
      finalPage = finalPage > itemCount.value ? itemCount.value : finalPage;
      itemFinalPage.value = finalPage;
      itemFirstPage.value = firstPage;
      loading.value = false;
    });

    onMounted(() => {
      getMasterStatus();
      loadStoreGoodsIssue(getParamsLoad());
    });

    const getStatusClass = (status: String) => {
      let textColor = "";
      switch (status.toLowerCase()) {
        case "new":
          textColor = "text-blue-500";
          break;
        case "picking":
          textColor = "text-orange-500";
          break;
        case "picked":
          textColor = "text-green-500";
          break;
        case "closed":
          textColor = "text-grey-500";
          break;
        case "cancelled":
          textColor = "text-red-500";
          break;
      }
      return "font-thaibev-bold " + textColor;
    };

    return {
      masterStatus,
      popupSearch,
      searchStatus,
      searchReferenceNo,
      searchGINo,
      searchOwner,
      searchDocDate,
      searchOrderType,
      popupCreate,
      itemCount,
      itemFirstPage,
      itemFinalPage,
      pagination,
      columns: createColumns,
      rows: goodsIssueList,
      pageMax,
      loading,
      loadGoodsIssue,
      onAlert,
      onShowLoading,
      onHideLoading,
      onEditGoodsIssue,
      onPopupSearch,
      onClearPopupSearch,
      onSearchPopupSearch,
      onPopupCreate,
      onSavePopupCreate,
      getStatusClass,
    };
  },
});
</script>
