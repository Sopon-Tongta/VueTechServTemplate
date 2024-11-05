<template>
  <q-dialog v-model="popupEditOrder" class="templete_web" persistent>
    <EditReceiveOrder v-bind="paramsEditOrder" @onEdit="onEditReceiveOrder" />
  </q-dialog>
  <q-dialog v-model="popupCreateItem" class="templete_web" persistent>
    <CreateReceiveItem
      :selectItem="itemFromOwnerList"
      @showLoading="showLoading"
      @hideLoading="hideLoading"
      @onSave="onConfirmCreateReceiveItem"
    />
  </q-dialog>
  <q-dialog v-model="popupEditItemNew" class="templete_web" persistent>
    <EditReceiveItemNew v-bind="paramsEditItemNew" @onAlert="onAlert" @onSave="onSaveEditItemNew" />
  </q-dialog>
  <q-dialog v-model="popupEditItemCheckIn" class="templete_web" persistent>
    <EditReceiveItemCheckIn v-bind="paramsEditItemCheckIn" @onSave="onSaveEditItemCheckIn" />
  </q-dialog>
  <div class="info-2">
    <div class="box-title">
      <div class="w-[calc(100vw-80px)] md:w-auto flex flex-row">
        <span class="text truncate">Receipt No: {{ receiptNo }}</span>
      </div>
      <q-icon
        v-if="status == 'NEW'"
        name="edit_note"
        size="md"
        color="theme-color"
        class="ml-2 cursor-pointer hover:text-red-500"
        @click="onPopupEditReceiveOrder"
      >
        <q-tooltip
          v-if="!$q.screen.xs"
          class="border border-green-700 bg-green-50"
          anchor="bottom middle"
          self="top middle"
          :offset="[5, 5]"
        >
          <p class="font-thaibev-semibold-italic text-base text-green-700">Edit Order</p>
        </q-tooltip>
      </q-icon>
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
          <div class="title">W/H</div>
          <div class="data">
            {{ whSourceName }}
            <q-tooltip class="templete_web-tooltip" anchor="bottom left" self="center left">
              {{ whSourceName }}
            </q-tooltip>
          </div>
        </div>
        <div class="content">
          <div class="title">Supplier</div>
          <div class="data">
            {{ supplierCode }} - {{ supplierName }}
            <q-tooltip class="templete_web-tooltip" anchor="bottom left" self="center left">
              {{ supplierCode }} - {{ supplierName }}
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
          <div class="title">Owner</div>
          <div class="data">
            {{ ownerName }}
            <q-tooltip class="templete_web-tooltip" anchor="bottom left" self="center left">
              {{ ownerName }}
            </q-tooltip>
          </div>
        </div>
        <div class="content">
          <div class="title">Receiving Date</div>
          <div class="data">
            {{ receiptDate }}
            <q-tooltip class="templete_web-tooltip" anchor="bottom left" self="center left">
              {{ receiptDate }}
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
          <div class="font-thaibev-semibold text-theme-color text-base sm:text-xl mr-2">
            Receive Item
          </div>
          <q-btn
            v-if="status == 'NEW'"
            dense
            size="md"
            color="theme-color"
            @click="onPopupAddReceiveItem"
            no-caps
          >
            <div class="px-2 flex flex-row items-center">
              <q-icon name="post_add" color="white" size="20px" />
              <p class="pl-1 font-thaibev-medium text-white">Add Item</p>
            </div>
          </q-btn>
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
          hide-bottom
          :visible-columns="visibleColumn"
          :pagination="initialPagination"
          :rows="rows"
          :columns="columns"
          :loading="loading"
          :rows-per-page-options="[0]"
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
            <q-space />
            <q-checkbox
              v-if="isCheckAll"
              v-model="selectedAll"
              color="theme-color"
              @update:model-value="onSelectAllChange"
            />
          </template>
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th v-if="isCheckAll">
                <div class="p-0 w-[40px] text-center">
                  <q-checkbox
                    v-model="selectedAll"
                    size="xs"
                    color="theme-color"
                    @update:model-value="onSelectAllChange"
                  />
                </div>
              </q-th>
              <q-th
                v-for="col in (props.cols as Array<IQTableHeaderCols>)"
                :key="col.name"
                :props="props"
              >
                {{ col.label }}
              </q-th>
              <q-th style="padding: 0"></q-th>
            </q-tr>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td v-if="props.row.isComponentCheckItem">
                <div class="p-0 w-[40px] text-center">
                  <q-checkbox
                    v-model="props.row.checkItem"
                    size="xs"
                    color="theme-color"
                    @update:model-value="onSelectRowChange"
                  />
                </div>
              </q-td>
              <q-td v-else-if="isCheckAll"> <div class="p-0 w-[40px] text-center"></div></q-td>
              <q-td
                v-for="col in (props.cols as Array<IQTableBodyCols>)"
                :key="col.name"
                :props="props"
              >
                <div
                  v-if="col.name == 'skuCode' && props.row.status.toUpperCase() !== 'PUTAWAY'"
                  @click="onEditReceiveItem(props.row)"
                  class="link-goto"
                >
                  {{ col.value }}
                </div>
                <div v-else>{{ col.value }}</div>
              </q-td>
              <q-td>
                <div>
                  <q-btn
                    v-if="status == 'NEW'"
                    round
                    unelevated
                    class="bg-red text-white"
                    size="6px"
                    icon="remove"
                    @click="onDeleteReceiptItem(props.row)"
                  />
                </div>
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
                    <span class="flex flex-row flex-nowrap justify-between">
                      <span :class="`${getStatusClass(props.row.status)} truncate`">
                        {{ props.row.status }}
                      </span>
                      <q-checkbox
                        v-if="props.row.isComponentCheckItem"
                        dense
                        v-model="props.row.checkItem"
                        @update:model-value="onSelectRowChange"
                        color="theme-color"
                      />
                    </span>
                    <span class="font-thaibev-bold text-[16px] text-teal-800 whitespace-nowrap">
                      Receipt No
                    </span>
                    <span
                      v-if="props.row.status.toUpperCase() !== 'PUTAWAY'"
                      class="link-goto truncate"
                      @click="onEditReceiveItem(props.row)"
                    >
                      {{ props.row.skuCode }}
                    </span>
                  </div>
                </q-card-section>
                <q-card-section>
                  <div class="grid grid-cols-2 gap-2">
                    <span class="font-thaibev-semibold whitespace-nowrap">Item</span>
                    <span class="font-thaibev-medium truncate">{{ props.row.description }}</span>
                    <span class="font-thaibev-semibold whitespace-nowrap">Total</span>
                    <span class="font-thaibev-medium truncate">{{ props.row.qtyDisplay }}</span>
                    <span class="font-thaibev-semibold whitespace-nowrap">Received</span>
                    <span class="font-thaibev-medium truncate">{{ props.row.receiveDisplay }}</span>
                    <span class="font-thaibev-semibold whitespace-nowrap">Remaining</span>
                    <span class="font-thaibev-medium truncate">
                      {{ props.row.remainQtyDisplay }}
                    </span>
                    <span class="font-thaibev-semibold whitespace-nowrap">UoM</span>
                    <span class="font-thaibev-medium truncate">{{ props.row.uomDisplay }}</span>
                    <span class="font-thaibev-semibold whitespace-nowrap">Pallet No</span>
                    <span class="font-thaibev-medium truncate">{{ props.row.palletNo }}</span>
                    <span class="font-thaibev-semibold whitespace-nowrap">Batch</span>
                    <span class="font-thaibev-medium truncate">{{ props.row.batch }}</span>
                    <span class="font-thaibev-semibold whitespace-nowrap">Lot</span>
                    <span class="font-thaibev-medium truncate">{{ props.row.lot }}</span>
                    <span class="font-thaibev-semibold whitespace-nowrap">Loc</span>
                    <span class="font-thaibev-medium truncate">{{ props.row.loc }}</span>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </template>
        </q-table>
      </div>
    </div>
    <div class="box-footer">
      <q-btn dense outline size="md" color="theme-color" @click="onBackClick" no-caps>
        <div class="px-3 flex flex-row items-center">
          <q-icon name="arrow_back_ios" size="20px" />
          <p class="font-thaibev-medium">Back</p>
        </div>
      </q-btn>
      <q-space />
      <q-btn
        v-if="status == 'CHECKIN' || status == 'CLOSED' || status == 'CLOSE'"
        dense
        size="md"
        color="red"
        @click="onReverseDocument"
        no-caps
      >
        <div class="px-2 flex flex-row items-center">
          <q-icon name="settings_backup_restore" size="20px" />
          <p class="font-thaibev-medium">Reverse</p>
        </div>
      </q-btn>
      <q-btn
        v-if="status == 'NEW'"
        dense
        size="md"
        color="red"
        @click="onDeleteReceiptOrder"
        no-caps
      >
        <div class="px-2 flex flex-row items-center">
          <q-icon name="delete" size="20px" />
          <p class="font-thaibev-medium">Delete</p>
        </div>
      </q-btn>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch, reactive } from "vue";
import useUtilHook from "@/hooks/useUtil";
import useGoodsReceipt from "@/hooks/useGoodsReceipt";
import EditReceiveOrder from "@/components/GoodsReceipt/editReceiveOrder.vue";
import CreateReceiveItem from "@/components/GoodsReceipt/createReceiveItem.vue";
import EditReceiveItemNew from "@/components/GoodsReceipt/editReceiveItemNew.vue";
import EditReceiveItemCheckIn from "@/components/GoodsReceipt/editReceiveItemCheckin.vue";
import { storeToRefs } from "pinia";
import { useRouterStore } from "@/stores/RouterStore";
import { useAuthStore } from "@/stores/AuthStore";
import type { QTableProps } from "quasar";
import type {
  IViewReceiveItem,
  IEditReceiptOrder_Params,
  IUpdateReceiptOrder_Response,
  IDeleteReceiptOrder_Params,
  ICreateReceiptOrderItem_Params,
  IEditReceiptOrderItem_Params,
  IReversReceiptOrderRespones,
} from "@/interfaces/hooks/IGoodsReceipt";
import type { IGetLocationByWH_Response_Data, IProductData } from "@/interfaces/hooks/IUtil";
import type {
  IGoodsReceipt_PopupEditOrder_Params,
  IGoodsReceipt_PopupEditItemNew_Params,
  IGoodsReceipt_PopupEditItemCheckIn_Params,
  IGoodsReceipt_PopupEditItemNew_Saving,
  IGoodsReceipt_PopupEditItemCheclIn_Saving,
} from "@/interfaces/pages/IGoodsReceipt";
import type {
  IQSelectField_ZoneCode,
  IQSelectField_OwnerData,
  IQTableBodyCols,
  IQTableHeaderCols,
} from "@/interfaces/quasar/IQuasar";

export default defineComponent({
  name: "editGoodsReceipt",
  emits: ["onRedirect", "showLoading", "hideLoading", "alert", "confirm", "confirmInput"],
  components: {
    EditReceiveOrder,
    CreateReceiveItem,
    EditReceiveItemNew,
    EditReceiveItemCheckIn,
  },
  setup(_props, ctx) {
    const { getLocationFromWH, getProductByOwnerCodeV2 } = useUtilHook.useUtil();
    const { editReceiveOrder, deleteReceiveOrder, reversReceiptOrder } =
      useGoodsReceipt.useReceiveOrder();
    const {
      receiveItemList,
      searchReceiveItem,
      createReceiveItem,
      saveReceiveItem,
      saveCheckItemToConfirm,
      delelteReceiveItem,
      checkPalletDup,
    } = useGoodsReceipt.useReceiveItem();
    const { router_params } = storeToRefs(useRouterStore());
    const { userAuth } = useAuthStore();
    const loading = ref<boolean>(false);
    const isCheckAll = ref(false);
    const receiptNo = ref<string>(router_params.value.receiptNo);
    const supplierCode = ref<string>(router_params.value.supplierCode);
    const supplierName = ref<string>(router_params.value.supplierName);
    const referenceNo = ref<string>(router_params.value.referenceNo);
    const docDate = ref<string>(router_params.value.docDate);
    const receiptDate = ref<string>(router_params.value.receiptDate);
    const ownerCode = ref<string>(router_params.value.ownerCode);
    const ownerName = ref<string>(router_params.value.ownerName);
    const orderType = ref<string>(router_params.value.orderType);
    const whCodeSource = ref<string>(router_params.value.whCodeSource);
    const whSourceName = ref<string>(router_params.value.whSourceName);
    const whCodeDes = ref<string>(router_params.value.whCodeDes);
    const whDesName = ref<string>(router_params.value.whDesName);
    const status = ref<string>(router_params.value.status);
    const backPage: boolean = router_params.value.backPage;
    const createColumns: QTableProps["columns"] = [
      {
        name: "lineno",
        label: "LineNo",
        align: "left",
        field: "lineno",
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
      {
        name: "skuCode",
        label: "Item Code",
        align: "left",
        field: "skuCode",
      },
      {
        name: "description",
        label: "Item",
        align: "left",
        field: "description",
        style: "width: 25%;",
      },
      {
        name: "qtyDisplay",
        label: "Total",
        align: "left",
        field: "qtyDisplay",
        style: "color:black; font-weight: bold;",
      },
      {
        name: "receiveDisplay",
        label: "Received",
        align: "left",
        field: "receiveDisplay",
        style: "color:green; font-weight: bold;",
      },
      {
        name: "remainQtyDisplay",
        label: "Remaining",
        align: "left",
        field: "remainQtyDisplay",
        style: "color:red; font-weight: bold;",
      },
      {
        name: "uomDisplay",
        label: "UoM",
        align: "left",
        field: "uomDisplay",
      },
      {
        name: "palletNo",
        label: "Pallet No",
        align: "left",
        field: "palletNo",
      },
      {
        name: "batch",
        label: "Batch",
        align: "left",
        field: "batch",
      },
      {
        name: "lot",
        label: "Lot",
        align: "left",
        field: "lot",
      },
      {
        name: "loc",
        label: "Loc",
        align: "left",
        field: "loc",
      },
    ];

    const visibleColumns = ref<Array<string>>([
      "status",
      "skuCode",
      "description",
      "qtyDisplay",
      "receiveDisplay",
      "remainQtyDisplay",
      "uomDisplay",
      "palletNo",
      "batch",
      "lot",
      "loc",
    ]);
    const selectedAll = ref<boolean>(false);
    const locationFromWHList = ref<Array<IQSelectField_ZoneCode>>([]);
    const itemFromOwnerList = ref<Array<IQSelectField_OwnerData>>([]);
    const popupEditOrder = ref<boolean>(false);
    const popupCreateItem = ref<boolean>(false);
    const popupEditItemNew = ref<boolean>(false);
    const popupEditItemCheckIn = ref<boolean>(false);
    const paramsEditOrder = reactive<IGoodsReceipt_PopupEditOrder_Params>({});
    const paramsEditItemNew = reactive<IGoodsReceipt_PopupEditItemNew_Params>({});
    const paramsEditItemCheckIn = reactive<IGoodsReceipt_PopupEditItemCheckIn_Params>({});

    const showLoading = () => ctx.emit("showLoading");
    const hideLoading = () => ctx.emit("hideLoading");

    const onPopupAddReceiveItem = () => {
      showLoading();
      getProductByOwnerCodeV2(ownerCode.value, (productResult: Array<IProductData>) => {
        itemFromOwnerList.value = productResult.map((data: IProductData) => {
          return {
            label: "".concat("[", data.skuCode, "]", " ", data.nameTH),
            value: data.skuCode,
            itemName: data.nameTH,
            batchReq: data.batchCtrl,
            expReq: data.expCtrl,
            lotReq: data.lotCtrl,
            mfgReq: data.mfgCtrl,
          };
        });
        popupCreateItem.value = true;
        hideLoading();
      });
    };

    const checkSelectRowToAll = () => {
      let allowCheckTotal = 0;
      let countCheck = 0;
      receiveItemList.value.forEach((e) => {
        if (e.isComponentCheckItem) {
          allowCheckTotal++;
          if (e.checkItem && (e.receiveQty1 > 0 || e.receiveQty2 > 0)) {
            countCheck++;
          }
        }
      });
      if (allowCheckTotal > 0) {
        if (allowCheckTotal == countCheck) {
          selectedAll.value = true;
        } else {
          selectedAll.value = false;
        }
        isCheckAll.value = true;
      } else {
        isCheckAll.value = false;
      }
    };

    const onSelectAllChange = (value: boolean) => {
      receiveItemList.value.map((data) => {
        if (
          (data.status.toUpperCase() == "NEW" && (data.receiveQty1 > 0 || data.receiveQty2 > 0)) ||
          (data.status.toUpperCase() == "CHECKIN" && data.loc != undefined)
        ) {
          data.checkItem = value;
        }
      });
      let saveCheckItem: Array<number> = [];
      let checkItem = receiveItemList.value.filter((f) => f.checkItem == true);
      checkItem.forEach((e) => saveCheckItem.push(e.lineNo!));
      saveCheckItemToConfirm(saveCheckItem, checkSelectRowToAll);
    };

    const onSelectRowChange = (value: boolean) => {
      if (!value) {
        selectedAll.value = false;
      }
      let saveCheckItem: Array<number> = [];
      let checkItem = receiveItemList.value.filter((f) => f.checkItem == true);
      checkItem.forEach((e) => saveCheckItem.push(e.lineNo!));
      saveCheckItemToConfirm(saveCheckItem, checkSelectRowToAll);
    };

    const onPopupEditReceiveOrder = () => {
      paramsEditOrder.receiptNo = receiptNo.value;
      paramsEditOrder.referenceNo = referenceNo.value;
      paramsEditOrder.ownerCode = ownerCode.value;
      paramsEditOrder.supplierCode = supplierCode.value;
      paramsEditOrder.orderType = orderType.value;
      paramsEditOrder.warehouse = whCodeSource.value;
      paramsEditOrder.docDate = docDate.value;
      paramsEditOrder.receiveDate = receiptDate.value;
      popupEditOrder.value = true;
    };

    const onEditReceiveOrder = (editOrder: IEditReceiptOrder_Params) => {
      showLoading();

      editReceiveOrder(editOrder, (result: IUpdateReceiptOrder_Response) => {
        referenceNo.value = result.receiptOrder!.referenceNo!;
        ownerCode.value = result.receiptOrder!.ownerCode!;
        ownerName.value = result.receiptOrder!.ownerName!;
        orderType.value = result.receiptOrder!.orderType!;
        supplierCode.value = result.receiptOrder!.supplierCode!;
        supplierName.value = result.receiptOrder!.supplierName!;
        whCodeDes.value = result.receiptOrder!.whCodeDes!;
        whDesName.value = result.receiptOrder!.whDesName!;
        whCodeSource.value = result.receiptOrder!.whCodeSource!;
        whSourceName.value = result.receiptOrder!.whSourceName!;
        docDate.value = result.receiptOrder!.docDate!;
        receiptDate.value = result.receiptOrder!.receiptDate!;

        getLocationFromWH(
          whCodeSource.value,
          (locResult: Array<IGetLocationByWH_Response_Data>) => {
            locationFromWHList.value = locResult.map((data: IGetLocationByWH_Response_Data) => {
              return {
                label: data.locationCode,
                value: data.locationCode,
                zoneCode: data.zoneCode,
              };
            });
            popupEditOrder.value = false;
            hideLoading();
          }
        );
      });
    };

    const onEditReceiveItem = (row: IViewReceiveItem) => {
      if (row.status.toUpperCase() == "NEW") {
        paramsEditItemNew.lineNo = row.lineNo;
        paramsEditItemNew.skuCode = row.skuCode;
        paramsEditItemNew.description = row.description;
        paramsEditItemNew.loc = row.loc;
        paramsEditItemNew.palletNo = row.palletNo;
        paramsEditItemNew.batch = row.batch;
        paramsEditItemNew.lot = row.lot;
        paramsEditItemNew.mfg = row.mfgDate;
        paramsEditItemNew.exp = row.expDate;
        paramsEditItemNew.qty1 = row.qty1;
        paramsEditItemNew.uom1 = row.uom1;
        paramsEditItemNew.uomDisplay1 = row.uomDisplay1;
        paramsEditItemNew.qty2 = row.qty2;
        paramsEditItemNew.uom2 = row.uom2;
        paramsEditItemNew.uomDisplay2 = row.uomDisplay2;
        paramsEditItemNew.receiveQty1 = row.receiveQty1;
        paramsEditItemNew.receiveUom1 = row.receiveUom1;
        paramsEditItemNew.receiveQty2 = row.receiveQty2;
        paramsEditItemNew.receiveUom2 = row.receiveUom2;
        paramsEditItemNew.baseConvertQty = row.baseConvertQty;
        paramsEditItemNew.baseUomCode = row.baseUomCode;
        paramsEditItemNew.baseUomName = row.baseUomName;
        paramsEditItemNew.saleConvertQty = row.saleConvertQty;
        paramsEditItemNew.saleUomCode = row.saleUomCode;
        paramsEditItemNew.saleUomName = row.saleUomName;
        paramsEditItemNew.confirmConvertQty = row.confirmConvertQty;
        paramsEditItemNew.confirmUomCode = row.confirmUomCode;
        paramsEditItemNew.confirmUomName = row.confirmUomName;
        paramsEditItemNew.selectLoc = locationFromWHList.value;
        popupEditItemNew.value = true;
      } else if (row.status.toUpperCase() == "CHECKIN") {
        paramsEditItemCheckIn.lineNo = row.lineNo;
        paramsEditItemCheckIn.skuCode = row.skuCode;
        paramsEditItemCheckIn.description = row.description;
        paramsEditItemCheckIn.loc = row.loc;
        paramsEditItemCheckIn.palletNo = row.palletNo;
        paramsEditItemCheckIn.batch = row.batch;
        paramsEditItemCheckIn.lot = row.lot;
        paramsEditItemCheckIn.mfg = row.mfgDate;
        paramsEditItemCheckIn.exp = row.expDate;
        paramsEditItemCheckIn.qty1 = row.qty1;
        paramsEditItemCheckIn.uom1 = row.uom1;
        paramsEditItemCheckIn.uomDisplay1 = row.uomDisplay1;
        paramsEditItemCheckIn.qty2 = row.qty2;
        paramsEditItemCheckIn.uom2 = row.uom2;
        paramsEditItemCheckIn.uomDisplay2 = row.uomDisplay2;
        paramsEditItemCheckIn.receiveQty1 = row.receiveQty1;
        paramsEditItemCheckIn.receiveUom1 = row.receiveUom1;
        paramsEditItemCheckIn.receiveQty2 = row.receiveQty2;
        paramsEditItemCheckIn.receiveUom2 = row.receiveUom2;
        paramsEditItemCheckIn.baseConvertQty = row.baseConvertQty;
        paramsEditItemCheckIn.baseUomCode = row.baseUomCode;
        paramsEditItemCheckIn.baseUomName = row.baseUomName;
        paramsEditItemCheckIn.saleConvertQty = row.saleConvertQty;
        paramsEditItemCheckIn.saleUomCode = row.saleUomCode;
        paramsEditItemCheckIn.saleUomName = row.saleUomName;
        paramsEditItemCheckIn.confirmConvertQty = row.confirmConvertQty;
        paramsEditItemCheckIn.confirmUomCode = row.confirmUomCode;
        paramsEditItemCheckIn.confirmUomName = row.confirmUomName;
        paramsEditItemCheckIn.selectLoc = locationFromWHList.value;
        popupEditItemCheckIn.value = true;
      }
    };

    const onDeleteReceiptOrder = () => {
      ctx.emit("confirmInput", "สาเหตุที่ลบ", "ระบุเหตุผล", (reason: string) => {
        if (reason.replaceAll(" ", "").length == 0) {
          onAlert("โปรดระบุ สาเหตุที่ลบ", "warning");
          return;
        }
        const delData: IDeleteReceiptOrder_Params = {
          ownerCode: ownerCode.value,
          receiptNo: receiptNo.value,
          remark: reason,
        };
        deleteReceiveOrder(delData, () => {
          ctx.emit("alert", "ลบ Order สำเร็จ", "success", () => {
            onBackClick();
          });
        });
      });
    };

    const onBackClick = () => {
      ctx.emit("onRedirect", "goodsReceipt");
    };

    const onConfirmCreateReceiveItem = (item: ICreateReceiptOrderItem_Params) => {
      if (item.batchReq && item.batch.length == 0) {
        ctx.emit("alert", "โปรดระบุ Batch", "warning");
        return;
      }

      if (item.lotReq && item.lot.length == 0) {
        ctx.emit("alert", "โปรดระบุ Lot", "warning");
        return;
      }

      if (item.mfgReq && item.mfgDate.length == 0) {
        ctx.emit("alert", "โปรดระบุ MFG", "warning");
        return;
      }

      if (item.expReq && item.expDate.length == 0) {
        ctx.emit("alert", "โปรดระบุ EXP", "warning");
        return;
      }

      if (item.itemCode.length == 0) {
        ctx.emit("alert", "โปรดระบุ Item", "warning");
        return;
      }
      if (item.qty1 > 0 && item.uom1.length == 0) {
        ctx.emit("alert", "โปรดระบุ UOM ให้ถูกต้อง", "warning");
        return;
      }
      if (item.qty2 > 0 && item.uom2.length == 0) {
        ctx.emit("alert", "โปรดระบุ UOM ให้ถูกต้อง", "warning");
        return;
      }
      if (item.qty3 > 0 && item.uom3.length == 0) {
        ctx.emit("alert", "โปรดระบุ UOM ให้ถูกต้อง", "warning");
        return;
      }
      if (item.qty1 + item.qty2 + item.qty3 == 0) {
        ctx.emit("alert", "โปรดระบุ Qty", "warning");
        return;
      }
      item.ownerCode = ownerCode.value;
      item.receiptNo = receiptNo.value;
      showLoading();
      createReceiveItem(item, () => {
        searchReceiveItem(receiptNo.value, ownerCode.value, backPage, (orderStatus: string) => {
          status.value = orderStatus;
          checkSelectRowToAll();
          popupCreateItem.value = false;
          hideLoading();
        });
      });
    };

    const onSaveEditItemNew = (edit: IGoodsReceipt_PopupEditItemNew_Saving) => {
      const checkInItem = () => {
        const params: IEditReceiptOrderItem_Params = {
          lineNo: edit.lineNo,
          loc: edit.loc,
          zoneCode: edit.zoneCode,
          palletNo: edit.palletNo,
          receiveQty1: edit.receiveQty1,
          receiveUom1: edit.receiveUom1,
          receiveQty2: edit.receiveQty2,
          receiveUom2: edit.receiveUom2,
          reasonNotFull: edit.reasonNotFull,
        };
        saveReceiveItem("CHECKIN", params, (orderStatus: string) => {
          status.value = orderStatus;
          checkSelectRowToAll();
          popupEditItemNew.value = false;
        });
      };

      const checkQtyRemain = () => {
        if (edit.remainQty1 > 0 || edit.remainQty2 > 0) {
          ctx.emit("confirmInput", "สาเหตุการทำรับไม่เต็มจำนวน", "", (reason: string) => {
            edit.reasonNotFull = reason;
            checkInItem();
          });
          return;
        }
        checkInItem();
      };

      if (edit.palletNo.length > 0) {
        let dupPalletItem = receiveItemList.value.find((f) => {
          return f.lineNo !== edit.lineNo && f.palletNo == edit.palletNo;
        });
        if (dupPalletItem !== undefined) {
          ctx.emit("alert", "Pallet ใน Item ไม่สามารถซ้ำกันได้", "warning");
          return;
        }
        showLoading();
        checkPalletDup(edit.palletNo, (isDup: boolean) => {
          hideLoading();
          if (isDup) {
            ctx.emit("alert", "Pallet ซ้ำกับในระบบ", "warning");
            return;
          }
          checkQtyRemain();
        });
        return;
      }
      checkQtyRemain();
    };

    const onSaveEditItemCheckIn = (edit: IGoodsReceipt_PopupEditItemCheclIn_Saving) => {
      if (edit.loc.length > 0) {
        const params: IEditReceiptOrderItem_Params = {
          lineNo: edit.lineNo,
          loc: edit.loc,
          zoneCode: edit.zoneCode,
          receiveQty1: 0,
          receiveQty2: 0,
        };
        saveReceiveItem("PUTAWAY", params, (orderStatus: string) => {
          status.value = orderStatus;
          checkSelectRowToAll();
          popupEditItemCheckIn.value = false;
        });
      }
    };

    const onDeleteReceiptItem = (delRecord: IViewReceiveItem) => {
      ctx.emit("confirm", "ยืนยันการลบ", "ต้องการลบ Item นี้ใช่หรือไม่?", () => {
        showLoading();
        delelteReceiveItem(delRecord.lineNo!, ownerCode.value, receiptNo.value, () => {
          searchReceiveItem(receiptNo.value, ownerCode.value, false, (orderStatus: string) => {
            status.value = orderStatus;
            checkSelectRowToAll();
            hideLoading();
          });
        });
      });
    };

    const toggleDetail = ref<boolean>(true);
    const showNextBtn = ref<boolean>(false);

    watch(receiveItemList, (item) => {
      const find_selected = item.find((e) => {
        return e.checkItem !== undefined && e.checkItem && (e.receiveQty1 > 0 || e.receiveQty2 > 0);
      });
      showNextBtn.value = find_selected !== undefined;
    });

    onMounted(() => {
      // if (receiptNo.value.length > 0 && ownerCode.value.length > 0) {
      //   setTimeout(showLoading, 1);
      //   const warehouse: string = whCodeSource.value.length > 0 ? whCodeSource.value : "0";
      //   getLocationFromWH(warehouse, (locResult: Array<IGetLocationByWH_Response_Data>) => {
      //     locationFromWHList.value = locResult.map((data: IGetLocationByWH_Response_Data) => {
      //       return {
      //         label: data.locationCode,
      //         value: data.locationCode,
      //         zoneCode: data.zoneCode,
      //       };
      //     });
      //     searchReceiveItem(receiptNo.value, ownerCode.value, backPage, (orderStatus: string) => {
      //       status.value = orderStatus;
      //       checkSelectRowToAll();
      //       hideLoading();
      //     });
      //   });
      // }
    });

    const onAlert = (message: string, type: string) => {
      ctx.emit("alert", message, type);
    };

    const onReverseDocument = () => {
      ctx.emit(
        "confirmInput",
        "Please type in the reason for deletion to confirm",
        "Reason",
        (reason: string) => {
          ctx.emit("showLoading");
          let params = {
            order: receiptNo.value,
            owner: ownerCode.value,
            remark: reason,
            userId: userAuth.contactId,
          };
          reversReceiptOrder(params, (resJson: IReversReceiptOrderRespones) => {
            if (resJson.error !== undefined) {
              var type = "warning";
              hideLoading();
              ctx.emit("hideLoading");
              ctx.emit("alert", resJson.error, type);
            } else {
              status.value = "NEW";
              searchReceiveItem(
                receiptNo.value,
                ownerCode.value,
                backPage,
                (orderStatus: string) => {
                  status.value = orderStatus;
                  checkSelectRowToAll();
                  hideLoading();
                }
              );
              ctx.emit("hideLoading");
              var type = "success";
              ctx.emit("alert", resJson.message, type);
            }
          });
        }
      );
    };

    const getStatusClass = (status: String) => {
      let textColor = "";
      switch (status.toLowerCase()) {
        case "new":
          textColor = "text-[#027740]";
          break;
        case "putaway":
          textColor = "text-[#6e07d4]";
          break;
        case "checkin":
          textColor = "text-[#ecaf02]";
          break;
        case "closed":
          textColor = "text-[#707070]";
          break;
      }
      return "font-thaibev-bold " + textColor;
    };

    return {
      isCheckAll,
      loading,
      receiptNo,
      supplierCode,
      supplierName,
      ownerCode,
      referenceNo,
      docDate,
      whCodeSource,
      whCodeDes,
      receiptDate,
      orderType,
      status,
      whDesName,
      whSourceName,
      ownerName,
      columns: createColumns,
      visibleColumn: visibleColumns,
      rows: receiveItemList,
      initialPagination: {
        sortBy: "lineno",
        descending: false,
      },
      selectedAll,
      toggleDetail,
      showNextBtn,
      locationFromWHList,
      itemFromOwnerList,
      popupEditOrder,
      popupCreateItem,
      paramsEditOrder,
      paramsEditItemNew,
      paramsEditItemCheckIn,
      popupEditItemNew,
      popupEditItemCheckIn,
      onPopupAddReceiveItem,
      onSelectAllChange,
      onSelectRowChange,
      onPopupEditReceiveOrder,
      onEditReceiveOrder,
      onEditReceiveItem,
      onDeleteReceiptOrder,
      onBackClick,
      onSaveEditItemNew,
      onSaveEditItemCheckIn,
      onDeleteReceiptItem,
      onConfirmCreateReceiveItem,
      showLoading,
      hideLoading,
      onAlert,
      onReverseDocument,
      getStatusClass,
    };
  },
});
</script>
