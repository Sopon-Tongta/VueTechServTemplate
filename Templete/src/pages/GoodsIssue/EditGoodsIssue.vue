<template>
  <q-dialog v-model="popupEditGoodsIssue" class="templete_web" persistent>
    <CMP_EditGoodsIssue
      :giOrder="giOrder"
      v-bind="paramsEditGoodsIssue"
      @onSave="onConfirmEditGoodsIssue"
      @onAlert="onAlert"
      @onShowLoading="onShowLoading"
      @onHideLoading="onHideLoading"
    />
  </q-dialog>
  <q-dialog v-model="popupEditGoodsIssueItem" class="templete_web" persistent>
    <CMP_EditGoodsIssueItem
      :ownerCode="ownerCode"
      :whCode="whCode"
      :giOrder="giOrder"
      v-bind="paramsEditGoodsIssueItem"
      @onSave="onConfirmEditGoodsIssueItem"
      @alert="onAlert"
      @showLoading="onShowLoading"
      @hideLoading="onHideLoading"
    />
  </q-dialog>
  <q-dialog v-model="popupCreateGoodsIssueItem" class="templete_web" persistent>
    <CMP_CreateGoodsIssueItem
      :ownerCode="ownerCode"
      :whCode="whCode"
      :giOrder="giOrder"
      :masterGoodsIssueItemsList="productOwnerV2"
      v-bind="paramsCreateGoodsIssueItem"
      @onSave="onConfirmCreateGoodsIssueItem"
      @alert="onAlert"
      @showLoading="onShowLoading"
      @hideLoading="onHideLoading"
    />
  </q-dialog>
  <q-dialog v-model="popupConfirmPickGoodsIssueItem" class="templete_web" persistent>
    <CMP_ConfirmPicking
      v-bind="paramsConfirmPickGoodsIssueItem"
      @onSave="onConfirmPickGoodsIssueItem"
      @alert="onAlert"
      @showLoading="onShowLoading"
      @hideLoading="onHideLoading"
    />
  </q-dialog>
  <div class="info-2">
    <div class="box-title">
      <div class="w-[calc(100vw-80px)] md:w-auto flex flex-row">
        <span class="text truncate">GI Order No: {{ giOrder }}</span>
      </div>
      <q-icon
        v-if="statusMaster == 'new'"
        name="edit_note"
        size="md"
        color="theme-color"
        class="ml-2 cursor-pointer hover:text-red-500"
        @click="onPopupEditGoodsIssue"
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
            <div v-if="statusMaster != 'picking'">Document Detail</div>
            <q-breadcrumbs v-else separator-color="grey-14">
              <q-breadcrumbs-el
                label="Document Detail"
                :class="`cursor-pointer ${menu_switch_data_1}`"
                @click="onGIItem"
              />
              <q-breadcrumbs-el
                label="To Do Picking"
                :class="`cursor-pointer ${menu_switch_data_2}`"
                @click="onStockMovement"
              />
            </q-breadcrumbs>
          </div>
          <q-btn
            v-if="statusMaster == 'new'"
            dense
            size="md"
            color="theme-color"
            @click="onPopupCreateGoodsIssueItem"
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
          row-key="id"
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
            <q-space />
            <q-checkbox
              v-if="selectType == 'multiple'"
              :model-value="selectedAll"
              color="theme-color"
              @update:model-value="onSelectedAll"
            />
          </template>
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th
                v-if="statusMaster != 'new' && status != 'StockMovement'"
                style="padding: 0; width: 60px"
              />
              <q-th v-if="selectType == 'multiple'" style="padding: 0; width: 60px">
                <q-checkbox
                  :model-value="selectedAll"
                  size="xs"
                  dark
                  color="theme-color"
                  @update:model-value="onSelectedAll"
                />
              </q-th>
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
              <q-td v-if="statusMaster != 'new' && status != 'StockMovement'">
                <div class="text-center">
                  <q-btn
                    size="xs"
                    color="theme-color"
                    round
                    dense
                    @click="props.row.expand = !props.row.expand"
                    :icon="props.row.expand ? 'expand_less' : 'expand_more'"
                  />
                </div>
              </q-td>
              <q-td
                v-if="selectType == 'multiple' && props.row.qtyConfirmBase != undefined"
                style="padding: 0; width: 60px; text-align: center"
              >
                <q-checkbox
                  :model-value="props.row.checkItem"
                  size="xs"
                  color="theme-color"
                  @update:model-value="onUpdateCheckItem(props.row)"
                />
              </q-td>
              <q-td
                v-else-if="selectType == 'multiple' && props.row.qtyConfirmBase == undefined"
                class="text-center"
              >
              </q-td>
              <q-td
                v-for="col in (props.cols as Array<IQTableBodyCols>)"
                :key="col.name"
                :props="props"
              >
                <div
                  v-if="
                    col.name == 'status' &&
                    statusMaster == 'picking' &&
                    status == 'Pick' &&
                    props.row.status.toLowerCase() == 'backorder'
                  "
                  style="display: flex; align-items: center"
                >
                  {{ col.value }}
                  <q-btn
                    size="xs"
                    color="orange"
                    class="ml-2"
                    round
                    dense
                    @click="onReGeneratePick(props.row)"
                    icon="autorenew"
                  >
                    <q-tooltip
                      class="templete_web-tooltip"
                      anchor="top middle"
                      self="bottom middle"
                    >
                      Re-Generate Pick
                    </q-tooltip>
                  </q-btn>
                </div>
                <div
                  v-else-if="
                    col.name == 'skucode' &&
                    statusMaster == 'new' &&
                    props.row.status.toLowerCase() == 'new'
                  "
                  @click="onPopupEditGoodsIssueItem(props.row)"
                  class="link-goto"
                >
                  {{ col.value }}
                </div>
                <div
                  v-else-if="
                    col.name == 'skucode' &&
                    statusMaster == 'picking' &&
                    status == 'StockMovement' &&
                    (props.row.status.toLowerCase() == 'picking' ||
                      props.row.status.toLowerCase() == 'backorder')
                  "
                  @click="onPopupConfirmPickGoodsIssueItem(props.row)"
                  class="link-goto"
                >
                  {{ col.value }}
                </div>
                <div v-else-if="col.name == 'delRecord'">
                  <q-btn
                    round
                    class="bg-red text-white"
                    size="6px"
                    icon="remove"
                    @click="onDeleteGoodsIssueItem(props.row)"
                  />
                </div>
                <div v-else>{{ col.value }}</div>
              </q-td>
            </q-tr>
            <q-tr
              v-show="props.row.expand"
              :props="props"
              v-for="row in (props.row.detail as Array<IGetGoodsIssueItem_Request_Data_Detail>)"
              :key="row.id"
            >
              <q-td> <div class="px-4"></div></q-td>
              <q-td></q-td>
              <q-td>{{ row.skucode }}</q-td>
              <q-td>{{ row.description }}</q-td>
              <q-td>{{ row.totalDisplay }}</q-td>
              <q-td>{{ row.issueDisplay }}</q-td>
              <q-td>{{ row.remainDisplay }}</q-td>
              <q-td>{{ props.row.uomDisplay }}</q-td>
              <q-td>{{ row.zonecode }}</q-td>
              <q-td>{{ row.palletno }}</q-td>
              <q-td>{{ row.batch }}</q-td>
              <q-td>{{ row.Lot }}</q-td>
              <q-td>{{ row.locationcode }}</q-td>
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
                      <span>
                        <q-btn
                          v-if="
                            statusMaster == 'picking' &&
                            status == 'Pick' &&
                            props.row.status.toLowerCase() == 'backorder'
                          "
                          size="sm"
                          color="orange"
                          round
                          dense
                          @click="onReGeneratePick(props.row)"
                          icon="autorenew"
                        />
                        <q-btn
                          size="sm"
                          color="red"
                          class="ml-1"
                          round
                          dense
                          @click="onDeleteGoodsIssueItem(props.row)"
                          icon="remove"
                        />
                        <q-checkbox
                          v-if="selectType == 'multiple' && props.row.qtyConfirmBase != undefined"
                          dense
                          :model-value="props.row.checkItem"
                          @update:model-value="onUpdateCheckItem(props.row)"
                          color="theme-color"
                          class="ml-1"
                        />
                      </span>
                    </span>
                    <span class="font-thaibev-bold text-[16px] text-teal-800 whitespace-nowrap">
                      Item Code
                    </span>
                    <span
                      v-if="statusMaster == 'new' && props.row.status.toLowerCase() == 'new'"
                      class="link-goto truncate"
                      @click="onPopupEditGoodsIssueItem(props.row)"
                    >
                      {{ props.row.skucode }}
                    </span>
                    <span
                      v-else-if="
                        statusMaster == 'picking' &&
                        status == 'StockMovement' &&
                        (props.row.status.toLowerCase() == 'picking' ||
                          props.row.status.toLowerCase() == 'backorder')
                      "
                      class="link-goto truncate"
                      @click="onPopupConfirmPickGoodsIssueItem(props.row)"
                    >
                      {{ props.row.skucode }}
                    </span>
                    <span v-else class="font-thaibev-medium">
                      {{ props.row.skucode }}
                    </span>
                  </div>
                </q-card-section>
                <q-card-section>
                  <div class="grid grid-cols-2 gap-2">
                    <span class="font-thaibev-semibold whitespace-nowrap">Item Name</span>
                    <span class="font-thaibev-medium truncate">{{ props.row.description }}</span>
                    <span class="font-thaibev-semibold whitespace-nowrap">Total</span>
                    <span class="font-thaibev-medium truncate">{{ props.row.totalDisplay }}</span>
                    <span class="font-thaibev-semibold whitespace-nowrap">Issue</span>
                    <span class="font-thaibev-medium truncate">{{ props.row.issueDisplay }}</span>
                    <span class="font-thaibev-semibold whitespace-nowrap">Remaining</span>
                    <span class="font-thaibev-medium truncate">
                      {{ props.row.remainDisplay }}
                    </span>
                    <span class="font-thaibev-semibold whitespace-nowrap">Qty</span>
                    <span class="font-thaibev-medium truncate">{{ props.row.qtyDisplay }}</span>
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
                  </div>
                </q-card-section>
                <q-card-section
                  class="bg-green-100 p-2"
                  v-if="statusMaster != 'new' && status != 'StockMovement'"
                >
                  <div>
                    <q-icon
                      color="theme-color"
                      :name="props.row.expand ? 'expand_less' : 'expand_more'"
                      @click="props.row.expand = !props.row.expand"
                    />
                    <span class="font-thaibev-semibold text-green-800">Details</span>
                  </div>
                </q-card-section>
                <q-card-section
                  :class="`${props.row.expand ? 'opacity-1' : 'opacity-0 p-0 h-0'} duration-500`"
                >
                  <div
                    v-for="row in (props.row.detail as Array<IGetGoodsIssueItem_Request_Data_Detail>)"
                    :key="row.id"
                  >
                    <fieldset
                      :class="`${
                        props.row.expand ? 'p-3 opacity-1 border-2' : 'p-0 opacity-0 border-0'
                      } rounded-md border-green-700 duration-200`"
                    >
                      <div class="grid grid-cols-2 gap-2">
                        <span class="font-thaibev-semibold whitespace-nowrap">Item Code</span>
                        <span class="font-thaibev-medium truncate">{{ row.skucode }}</span>
                        <span class="font-thaibev-semibold whitespace-nowrap">Item Name</span>
                        <span class="font-thaibev-medium truncate">{{ row.description }}</span>
                        <span class="font-thaibev-semibold whitespace-nowrap">Total</span>
                        <span class="font-thaibev-medium truncate">{{ row.totalDisplay }}</span>
                        <span class="font-thaibev-semibold whitespace-nowrap">Issue</span>
                        <span class="font-thaibev-medium truncate">{{ row.issueDisplay }}</span>
                        <span class="font-thaibev-semibold whitespace-nowrap">Remaining</span>
                        <span class="font-thaibev-medium truncate">
                          {{ row.remainDisplay }}
                        </span>
                        <span class="font-thaibev-semibold whitespace-nowrap">Uom</span>
                        <span class="font-thaibev-medium truncate">{{ props.row.uomDisplay }}</span>
                        <span class="font-thaibev-semibold whitespace-nowrap">Zone</span>
                        <span class="font-thaibev-medium truncate">{{ row.zonecode }}</span>
                        <span class="font-thaibev-semibold whitespace-nowrap">Pallet</span>
                        <span class="font-thaibev-medium truncate">{{ row.palletno }}</span>
                        <span class="font-thaibev-semibold whitespace-nowrap">Batch</span>
                        <span class="font-thaibev-medium truncate">{{ row.batch }}</span>
                        <span class="font-thaibev-semibold whitespace-nowrap">Lot</span>
                        <span class="font-thaibev-medium truncate">{{ row.Lot }}</span>
                        <span class="font-thaibev-semibold whitespace-nowrap">Loc.</span>
                        <span class="font-thaibev-medium truncate">{{ row.locationcode }}</span>
                      </div>
                    </fieldset>
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
        v-if="statusMaster == 'new'"
        dense
        size="md"
        color="red"
        @click="onDeleteGoodsIssue"
        no-caps
      >
        <div class="px-2 flex flex-row items-center">
          <q-icon name="delete" size="20px" />
          <p class="font-thaibev-medium">Delete</p>
        </div>
      </q-btn>
      <q-btn
        v-if="statusMaster == 'new'"
        class="ml-2"
        dense
        size="md"
        color="theme-color"
        @click="onGeneratePick"
        no-caps
      >
        <div class="px-2 flex flex-row items-center">
          <q-icon name="token" size="20px" />
          <p class="px-1 font-thaibev-medium">Generate Pick</p>
        </div>
      </q-btn>
      <q-btn
        v-if="statusMaster == 'picking' || statusMaster == 'picked'"
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
        v-if="status == 'StockMovement' && statusMaster == 'picking' && isCheckbtnNext"
        class="ml-2"
        dense
        size="md"
        color="theme-color"
        @click="onConfirmPickingSuccess"
        no-caps
      >
        <div class="px-2 flex flex-row items-center">
          <p class="px-1 font-thaibev-medium">Next</p>
          <q-icon name="arrow_forward_ios" size="20px" />
        </div>
      </q-btn>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, computed } from "vue";
import useUtilHook from "@/hooks/useUtil";
import useGoodsIssueHook from "@/hooks/useGoodsIssue";
import CMP_EditGoodsIssue from "@/components/GoodsIssue/editGoodsIssue.vue";
import CMP_EditGoodsIssueItem from "@/components/GoodsIssue/editGoodsIssueItem.vue";
import CMP_CreateGoodsIssueItem from "@/components/GoodsIssue/createGoodsIssueItem.vue";
import CMP_ConfirmPicking from "@/components/GoodsIssue/confirmPicking.vue";
import { useRouterStore } from "@/stores/RouterStore";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/AuthStore";
import type { QTableProps } from "quasar";
import type {
  IViewGoodsIssueItem,
  IPickByLocationLineItem_Request,
  IPickByLocationLineItem_Response,
  IPickByLocation_Request,
  IPickByLocation_Response,
  ICreateGoodsIssueItem_Response,
  IUpdateGoodsIssueItem_Response,
  IUpdateGoodsIssue_Response,
  IDeleteGoodsIssue_Params,
  IGetGoodsIssueItem_Request_Data_Detail,
  IReversGoodsIssue_Response,
} from "@/interfaces/hooks/IGoodsIssue";
import type { IProductData, IUOMConvertData } from "@/interfaces/hooks/IUtil";
import type { IUom, IGetZoneByWH_Response, IGetPallet_Response } from "@/interfaces/hooks/IUtil";
import type {
  IGoodsIssue_PopupEditItem_Params,
  IGoodsIssue_PopupEditOrder_Params,
  IGoodsIssue_PopupCreateItem_Params,
  IGoodsIssue_PopupConfirmItem_Params,
} from "@/interfaces/pages/IGoodsIssue";
import type {
  IQSelectField,
  IQTableBodyCols,
  IQTableHeaderCols,
} from "@/interfaces/quasar/IQuasar";

export default defineComponent({
  name: "editGoodsIssue",
  emits: ["onRedirect", "showLoading", "hideLoading", "alert", "confirm", "confirmInput"],
  components: {
    CMP_EditGoodsIssue,
    CMP_EditGoodsIssueItem,
    CMP_CreateGoodsIssueItem,
    CMP_ConfirmPicking,
  },
  setup(props, ctx) {
    //////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////// emit
    //////////////////////////////////////////////////////////////////////////////////
    const onAlert = (body: string, type: string) => {
      ctx.emit("alert", body, type);
    };
    const onShowLoading = () => {
      ctx.emit("showLoading");
    };
    const onHideLoading = () => {
      ctx.emit("hideLoading");
    };
    //////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////// Variable
    //////////////////////////////////////////////////////////////////////////////////
    const { router_params } = storeToRefs(useRouterStore());
    const { userAuth } = useAuthStore();

    const {
      goodsIssueItemsList,
      getGoodsIssueItems,
      deleteGoodsIssueItem,
      deleteGoodsIssue,
      getZone,
      getPallet,
      generatePicking,
      reGeneratePicking,
      reverseDocument,
    } = useGoodsIssueHook.useGoodsIssueOrder();

    const { setStorage, getStorage, setStorageRouteParam } = useGoodsIssueHook.useSessionStorage();
    const { productOwnerV2, getProductByOwnerCodeV2 } = useUtilHook.useUtil();
    const loading = ref(false);
    const toggleDetail = ref(router_params.value.viewHeader == undefined ? true : false);
    const giOrder = ref<string>(router_params.value.giOrder);
    const ownerCode = ref<string>(router_params.value.ownerCode);
    const ownerName = ref<string>(router_params.value.ownerName);
    const customerCode = ref<string>(router_params.value.cusCode);
    const customerName = ref<string>(router_params.value.cusName);
    const referenceNo = ref<string>(router_params.value.referenceNo);
    const docDate = ref<string>(router_params.value.docDate);

    const billTo = ref<string>(router_params.value.billTo);
    const deliveryTo = ref<string>(router_params.value.deliveryTo);
    const whCode = ref<string>(router_params.value.whCodeSource);
    const whName = ref<string>(router_params.value.whSourceName);
    const deliveryDate = ref<string>(router_params.value.deliveryDate);
    const orderType = ref<string>(router_params.value.orderType);
    const statusMaster = ref<string>(router_params.value.status.toString().toLowerCase());
    const status = ref<string>(
      router_params.value.status.toString().toLowerCase() == "picking" ? "StockMovement" : "Pick"
    );
    const statusPage = ref<string | undefined>(router_params.value.statusPage);

    const menu_switch_data_1 = ref("menu-switch-data text-grey-13");
    const menu_switch_data_2 = ref("menu-switch-data text-theme-color");

    const checkItemForNext = ref(false);

    const popupEditGoodsIssueItem = ref(false);
    const paramsEditGoodsIssueItem = ref<IGoodsIssue_PopupEditItem_Params>({});

    const popupEditGoodsIssue = ref(false);
    const paramsEditGoodsIssue = ref<IGoodsIssue_PopupEditOrder_Params>({});

    const popupCreateGoodsIssueItem = ref(false);
    const paramsCreateGoodsIssueItem = ref<IGoodsIssue_PopupCreateItem_Params>({});

    const popupConfirmPickGoodsIssueItem = ref(false);
    const paramsConfirmPickGoodsIssueItem = ref<IGoodsIssue_PopupConfirmItem_Params>({
      getRecord: {},
    });

    const selectType = ref("none");
    const selectedAll = ref(false);
    const c_regenerated = ref(0);
    const createColumns = ref<QTableProps["columns"]>([
      {
        name: "id",
        label: "Id",
        field: "id",
      },
      {
        name: "lineno",
        label: "LineNo",
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
        name: "total",
        label: "Total",
        align: "left",
        field: "totalDisplay",
      },
      {
        name: "issue",
        label: "Issue",
        align: "left",
        field: "issueDisplay",
      },
      {
        name: "remain",
        label: "Remain",
        align: "left",
        field: "remainDisplay",
      },
      {
        name: "qtyDisplay",
        label: "Qty",
        align: "left",
        field: "qtyDisplay",
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
        name: "delRecord",
        label: "",
        align: "center",
        field: "delRecord",
        style: "width: 50px;",
      },
    ]);
    const visibleColumnsStock = ref([
      "status",
      "skucode",
      "description",
      "qtyDisplay",
      "uomDisplay",
      "zonecode",
      "palletno",
      "batch",
      "Lot",
      "locationcode",
    ]);
    const visibleColumnsGI = ref([
      "status",
      "skucode",
      "description",
      "total",
      "issue",
      "remain",
      "uomDisplay",
      "zonecode",
      "palletno",
      "batch",
      "Lot",
      "locationcode",
    ]);
    const visibleColumns = ref<Array<string>>([]);

    const checkError = (result: any) => {
      if (result.error != undefined) {
        onAlert(result.error.Message, "error");
      }
    };
    //////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////// Load data
    //////////////////////////////////////////////////////////////////////////////////
    const loadGoodsIssueItems = () => {
      if (statusMaster.value == "new" && visibleColumns.value.slice(-1)[0] != "delRecord") {
        visibleColumns.value.push("delRecord");
      } else if (statusMaster.value != "new" && visibleColumns.value.slice(-1)[0] == "delRecord") {
        visibleColumns.value.pop();
      }
      loading.value = true;
      getGoodsIssueItems(
        ownerCode.value,
        giOrder.value,
        statusMaster.value == "new" ? "GoodIssue" : status.value,
        () => {
          loading.value = false;
          if (statusMaster.value == "picking" && status.value == "StockMovement") {
            selectType.value = "multiple";
            setSessionStorageTable("");
          }
        }
      );
    };

    const setSessionStorageTable = (type: string) => {
      if ((statusPage.value == undefined && statusMaster.value == "picking") || type == "confirm") {
        router_params.value.statusPage = undefined;
        let tabelGiItem: Array<IViewGoodsIssueItem> = [];
        goodsIssueItemsList.value.forEach((row) => {
          row.checkItem = row.checkItem == undefined ? false : row.checkItem;
          tabelGiItem.push(row);
        });
        setStorage(tabelGiItem, () => {
          getStorage((result: Array<IViewGoodsIssueItem>) => {
            goodsIssueItemsList.value = result;
          });
        });
      } else if (statusPage.value == "back" && statusMaster.value == "picking") {
        getStorage((result: Array<IViewGoodsIssueItem>) => {
          goodsIssueItemsList.value = result;
          let c_checkbox = goodsIssueItemsList.value.find((x) => x.checkItem == true);
          if (c_checkbox != undefined) {
            checkItemForNext.value = true;
          }
        });
      } else if (statusPage.value == "back_doc" && statusMaster.value == "picking") {
        getStorage((result: Array<IViewGoodsIssueItem>) => {
          goodsIssueItemsList.value = result;
          let c_checkbox = goodsIssueItemsList.value.find((x) => x.checkItem == true);
          if (c_checkbox != undefined) {
            checkItemForNext.value = true;
          }
          onGIItem();
        });
      }
    };

    const onBackClick = () => {
      ctx.emit("onRedirect", "goodsIssue");
    };

    const onReGeneratePick = (argu: IViewGoodsIssueItem) => {
      ctx.emit(
        "confirm",
        "ยืนยัน Re-Generate Picking",
        "ต้องการ Re-Generate Picking หรือไม่ ?",
        () => {
          ctx.emit("showLoading");
          let params: IPickByLocationLineItem_Request = {
            lineno: argu.lineno,
            order: giOrder.value,
            owner: ownerCode.value,
            userid: userAuth.contactId,
          };
          reGeneratePicking(params, (result: IPickByLocationLineItem_Response) => {
            checkError(result);
            if (result.error != undefined) {
              ctx.emit("hideLoading");
              return;
            }
            onGIItem();
            ctx.emit("hideLoading");
            c_regenerated.value++;
          });
        }
      );
    };

    const onGeneratePick = () => {
      ctx.emit("confirm", "ยืนยัน Generate Picking", "ต้องการ Generate Picking หรือไม่ ?", () => {
        ctx.emit("showLoading");
        let params: IPickByLocation_Request = {
          order: giOrder.value,
          owner: ownerCode.value,
          userid: userAuth.contactId,
        };
        generatePicking(params, (result: IPickByLocation_Response) => {
          checkError(result);
          if (result.error != undefined) {
            ctx.emit("hideLoading");
            return;
          }
          statusMaster.value = "picking";
          status.value = "StockMovement";

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
            whCodeSource: whCode.value,
            whSourceName: whName.value,
            deliveryDate: deliveryDate.value,
            orderType: orderType.value,
            status: statusMaster.value,
          };
          setStorageRouteParam(route_params, () => {
            loadGoodsIssueItems();
          });
          toggleDetail.value = true;
          ctx.emit("hideLoading");
        });
      });
    };

    const toggleClassMenu = (argu: number) => {
      let class_normal = "menu-switch-data text-grey-13";
      let class_active = "menu-switch-data text-theme-color";
      if (argu == 2) {
        menu_switch_data_1.value = class_normal;
        menu_switch_data_2.value = class_active;
      } else if (argu == 1) {
        menu_switch_data_1.value = class_active;
        menu_switch_data_2.value = class_normal;
      }
    };

    const onGIItem = () => {
      status.value = "Pick";
      selectType.value = "none";
      visibleColumns.value = visibleColumnsGI.value;
      loadGoodsIssueItems();
      toggleClassMenu(1);
    };

    const onStockMovement = () => {
      status.value = "StockMovement";
      selectType.value = "multiple";
      if (c_regenerated.value == 0) {
        statusPage.value = "back";
      } else {
        statusPage.value = undefined;
        c_regenerated.value = 0;
      }
      visibleColumns.value = visibleColumnsStock.value;
      loadGoodsIssueItems();
      toggleClassMenu(2);
    };

    const onSelectedAll = () => {
      let isConfirm = false;
      for (let i = 0; i < goodsIssueItemsList.value.length; i++) {
        let tempItem = goodsIssueItemsList.value[i];
        if (tempItem.qtyConfirmBase != undefined) {
          isConfirm = true;
          break;
        }
      }
      if (status.value == "StockMovement" && statusMaster.value == "picking" && isConfirm) {
        selectedAll.value = !selectedAll.value;
        goodsIssueItemsList.value.map((value) => {
          if (value.qtyConfirmBase != undefined) {
            value.checkItem = selectedAll.value;
          }
        });
      }
    };

    const onConfirmPickingSuccess = () => {
      setSessionStorageTable("confirm");

      let route_params = {
        giOrder: giOrder.value,
        ownerCode: ownerCode.value,
        ownerName: ownerName.value,
        customerCode: customerCode.value,
        customerName: customerName.value,
        referenceNo: referenceNo.value,
        docDate: docDate.value,

        billTo: billTo.value,
        deliveryTo: deliveryTo.value,
        whCode: whCode.value,
        whName: whName.value,
        deliveryDate: deliveryDate.value,
        orderType: orderType.value,
        status: statusMaster.value,
      };
      ctx.emit("onRedirect", "confirmGoodsIssue", route_params);
    };

    const onUpdateCheckItem = (result: IViewGoodsIssueItem) => {
      for (let i = 0; i < goodsIssueItemsList.value.length; i++) {
        let tempItem = goodsIssueItemsList.value[i];

        if (
          tempItem.recNum == result.recNum &&
          tempItem.lineno == result.lineno &&
          tempItem.tranOrder == result.tranOrder
        ) {
          goodsIssueItemsList.value[i].checkItem = !result.checkItem;
        }
      }
    };

    const isCheckbtnNext = computed(() => {
      for (let i = 0; i < goodsIssueItemsList.value.length; i++) {
        if (goodsIssueItemsList.value[i].checkItem === true) {
          return true;
        }
      }
      selectedAll.value = false;
      return false;
    });

    //////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////// popup
    //////////////////////////////////////////////////////////////////////////////////
    const onPopupEditGoodsIssueItem = async (row: IViewGoodsIssueItem) => {
      let editUOMItemMaster: Array<IUom> = [];
      let editUOMList: Array<IQSelectField> = [];
      let editQty1 = "";
      let editQty2 = "";
      let editUnit1 = "";
      let editUnit2 = "";
      editUOMItemMaster.push({
        convertQty: row.uomBase.convertQty,
        orderQty: row.uomBase.orderQty,
        qty: row.uomBase.qty,
        uomCode: row.uomBase.uomCode,
        uomNameTH: row.uomBase.uomNameTH,
        uomNameEN: row.uomBase.uomNameEN,
      });
      if (row.uomBase.uomCode != row.uomOrder.uomCode) {
        editUOMItemMaster.push({
          convertQty: row.uomOrder.convertQty,
          orderQty: row.uomOrder.orderQty,
          qty: row.uomOrder.qty,
          uomCode: row.uomOrder.uomCode,
          uomNameTH: row.uomOrder.uomNameTH,
          uomNameEN: row.uomBase.uomNameEN,
        });

        editQty1 = (row.uomBase.qty % row.uomOrder.convertQty).toString();
        editQty2 = Math.floor(row.uomBase.qty / row.uomOrder.convertQty).toString();
        editUnit1 = row.uomBase.uomCode;
        editUnit2 = row.uomOrder.uomCode;
      } else {
        editQty1 = row.uomBase.qty.toString();
        editUnit1 = row.uomBase.uomCode;
      }
      paramsEditGoodsIssueItem.value.itemNo = row.skucode;
      paramsEditGoodsIssueItem.value.itemName = row.description;
      paramsEditGoodsIssueItem.value.locationCode = row.locationcode;
      paramsEditGoodsIssueItem.value.zoneCode = row.zonecode;
      paramsEditGoodsIssueItem.value.palletNo = row.palletno;
      paramsEditGoodsIssueItem.value.batch = row.batch;
      paramsEditGoodsIssueItem.value.lot = row.Lot;
      paramsEditGoodsIssueItem.value.MFG = row.mfgdate;
      paramsEditGoodsIssueItem.value.EXP = row.expdate;
      paramsEditGoodsIssueItem.value.lineNo = row.lineno;
      paramsEditGoodsIssueItem.value.uomBase = row.uomBase;
      paramsEditGoodsIssueItem.value.uomOrder = row.uomOrder;
      paramsEditGoodsIssueItem.value.UOMItemMaster = editUOMItemMaster;
      paramsEditGoodsIssueItem.value.UOMList = editUOMList;
      paramsEditGoodsIssueItem.value.qty1 = editQty1;
      paramsEditGoodsIssueItem.value.qty2 = editQty2;
      paramsEditGoodsIssueItem.value.unit1 = editUnit1;
      paramsEditGoodsIssueItem.value.unit2 = editUnit2;
      let checkLoadData = [false, false];
      getZone(whCode.value, (result: IGetZoneByWH_Response) => {
        checkLoadData[0] = true;
        let zoneList: Array<IQSelectField> = result.list.map((val) => {
          return {
            label: "[".concat(val.zoneCode, "] ", val.zoneName),
            value: val.zoneCode,
          };
        });
        paramsEditGoodsIssueItem.value.zoneList = zoneList;
        if (checkLoadData.find((x) => x == false) == undefined) {
          popupEditGoodsIssueItem.value = true;
          ctx.emit("hideLoading");
        }
      });
      if (row.zonecode != "") {
        getPallet(whCode.value, row.zonecode, row.skucode, (result: IGetPallet_Response) => {
          checkError(result);
          checkLoadData[1] = true;
          let masterPalletList = result.list;
          paramsEditGoodsIssueItem.value.masterPalletList = masterPalletList;
          if (checkLoadData.find((x) => x == false) == undefined) {
            popupEditGoodsIssueItem.value = true;
            ctx.emit("hideLoading");
          }
        });
      } else {
        paramsEditGoodsIssueItem.value.masterPalletList = [];
        checkLoadData[1] = true;
      }
    };

    const onPopupEditGoodsIssue = () => {
      ctx.emit("showLoading");
      paramsEditGoodsIssue.value.referenceNo = referenceNo.value;
      paramsEditGoodsIssue.value.ownerCode = ownerCode.value;
      paramsEditGoodsIssue.value.whCode = whCode.value;
      paramsEditGoodsIssue.value.customerCode = customerCode.value;
      paramsEditGoodsIssue.value.customerName = customerName.value;
      paramsEditGoodsIssue.value.orderType = orderType.value;
      paramsEditGoodsIssue.value.billTo = billTo.value;
      paramsEditGoodsIssue.value.deliveryTo = deliveryTo.value;
      paramsEditGoodsIssue.value.docDate = docDate.value;
      paramsEditGoodsIssue.value.deliveryDate = deliveryDate.value;
      popupEditGoodsIssue.value = true;
    };

    const onPopupCreateGoodsIssueItem = () => {
      ctx.emit("showLoading");
      let checkLoadData = [false, false];
      getProductByOwnerCodeV2(ownerCode.value, (productResult: Array<IProductData>) => {
        checkLoadData[0] = true;
        let itemNoList: Array<IQSelectField> = [];
        for (let i = 0; i < productResult.length; i++) {
          itemNoList.push({
            label: "[".concat(productResult[i].skuCode, "] ", productResult[i].nameTH),
            value: productResult[i].skuCode,
          });
        }
        paramsCreateGoodsIssueItem.value.itemNoList = itemNoList;
        if (checkLoadData.find((x) => x == false) == undefined) {
          popupCreateGoodsIssueItem.value = true;
          ctx.emit("hideLoading");
        }
      });
      getZone(whCode.value, (result: IGetZoneByWH_Response) => {
        checkError(result);
        checkLoadData[1] = true;
        let zoneList = result.list.map((val) => {
          return {
            label: "[".concat(val.zoneCode, "] ", val.zoneName),
            value: val.zoneCode,
          };
        });
        paramsCreateGoodsIssueItem.value.zoneList = zoneList;
        if (checkLoadData.find((x) => x == false) == undefined) {
          popupCreateGoodsIssueItem.value = true;
          ctx.emit("hideLoading");
        }
      });
    };

    const onPopupConfirmPickGoodsIssueItem = (argu: IViewGoodsIssueItem) => {
      paramsConfirmPickGoodsIssueItem.value.getRecord = {
        giOrder: argu.giorder,
        ownerCode: argu.ownercode,
        whCode: whCode.value,
        lineNo: argu.lineno,
        status: argu.status,
        itemNo: argu.skucode,
        itemName: argu.description,
        locationCode: argu.locationcode,
        zoneCode: argu.zonecode,
        palletNo: argu.palletno,
        lot: argu.Lot,
        batch: argu.batch,
        MFG: argu.mfgdate,
        EXP: argu.expdate,
        qtyDisplay: argu.qtyDisplay,
        uomDispaly: argu.uomDisplay,
        uomBase: argu.uomBase,
        uomOrder: argu.uomOrder,
        uom: argu.uom,
        uomConfirm: argu.confirm,
        uomBackOrder: argu.uomBackOrder,
        uomItemMaster: argu.uomItemMaster,
        grade: argu.Grade,
        qtyConfirmBase: argu.qtyConfirmBase == undefined ? "" : argu.qtyConfirmBase.toString(),
        qtyConfirmOrder: argu.qtyConfirmOrder == undefined ? "" : argu.qtyConfirmOrder.toString(),
        tranOrder: argu.tranOrder,
        recNum: argu.recNum,
      };
      popupConfirmPickGoodsIssueItem.value = true;
    };
    //////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////// Confirm popup
    //////////////////////////////////////////////////////////////////////////////////
    const onConfirmCreateGoodsIssueItem = (result: ICreateGoodsIssueItem_Response) => {
      if (result.error != undefined) {
        ctx.emit("alert", result.error.Message, "error");
      } else {
        ctx.emit("alert", "Successful.", "success");
      }
      loading.value = true;
      loadGoodsIssueItems();
      popupCreateGoodsIssueItem.value = false;
    };

    const onConfirmEditGoodsIssueItem = (result: IUpdateGoodsIssueItem_Response) => {
      if (result.error != undefined) {
        ctx.emit("alert", result.error.Message, "error");
      } else {
        ctx.emit("alert", "Successful.", "success");
      }
      loading.value = true;
      loadGoodsIssueItems();
      popupEditGoodsIssueItem.value = false;
    };

    const onConfirmEditGoodsIssue = (result: IUpdateGoodsIssue_Response) => {
      checkError(result);
      if (result.goodissue != undefined) {
        setStorageRouteParam(result.goodissue, () => {});
        giOrder.value = result.goodissue.giOrder;
        ownerCode.value = result.goodissue.ownerCode;
        ownerName.value = result.goodissue.ownerName;
        customerCode.value = result.goodissue.cusCode;
        customerName.value = result.goodissue.cusName;
        referenceNo.value = result.goodissue.referenceNo;
        docDate.value = result.goodissue.docDate;

        billTo.value = result.goodissue.billTo;
        deliveryTo.value = result.goodissue.deliveryTo;
        deliveryDate.value = result.goodissue.deliveryDate;
        orderType.value = result.goodissue.orderType;
        whCode.value = result.goodissue.whCodeSource;
        whName.value = result.goodissue.whSourceName;
        statusMaster.value = result.goodissue.status.toLowerCase();
        status.value = statusMaster.value == "picking" ? "StockMovement" : "Pick";
        popupEditGoodsIssue.value = false;
      }
      ctx.emit("hideLoading");
    };

    const onConfirmPickGoodsIssueItem = (result: IViewGoodsIssueItem) => {
      for (let i = 0; i < goodsIssueItemsList.value.length; i++) {
        let tempItem = goodsIssueItemsList.value[i];
        if (
          tempItem.recNum == result.recNum &&
          tempItem.lineno == result.lineno &&
          tempItem.tranOrder == result.tranOrder
        ) {
          goodsIssueItemsList.value[i].zonecode = result.zonecode;
          goodsIssueItemsList.value[i].locationcode = result.locationcode;
          goodsIssueItemsList.value[i].palletno = result.palletno;
          goodsIssueItemsList.value[i].batch = result.batch;
          goodsIssueItemsList.value[i].Lot = result.Lot;
          goodsIssueItemsList.value[i].mfgdate = result.mfgdate;
          goodsIssueItemsList.value[i].expdate = result.expdate;
          goodsIssueItemsList.value[i].qtyConfirmBase = result.qtyConfirmBase;
          goodsIssueItemsList.value[i].qtyConfirmOrder = result.qtyConfirmOrder;
          goodsIssueItemsList.value[i].checkItem = true;
        }
      }
      setSessionStorageTable("confirm");
      popupConfirmPickGoodsIssueItem.value = false;
      checkItemForNext.value = true;
    };
    //////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////// On click Delete
    //////////////////////////////////////////////////////////////////////////////////
    const onDeleteGoodsIssueItem = (row: IViewGoodsIssueItem) => {
      ctx.emit("confirm", "ยืนยันการลบ", "ต้องการลบ Item นี้ใช่หรือไม่?", () => {
        loading.value = true;
        deleteGoodsIssueItem(row, () => {
          loadGoodsIssueItems();
        });
      });
    };

    const onDeleteGoodsIssue = () => {
      ctx.emit("confirmInput", "สาเหตุที่ลบ", "ระบุเหตุผล", (reason: string) => {
        if (reason.replaceAll(" ", "").length == 0) {
          onAlert("โปรดระบุ สาเหตุที่ลบ", "warning");
          return;
        }
        ctx.emit("showLoading");
        const params: IDeleteGoodsIssue_Params = {
          giOrder: giOrder.value,
          ownerCode: ownerCode.value,
          remark: reason,
        };
        deleteGoodsIssue(params, () => {
          ctx.emit("hideLoading");
          ctx.emit("onRedirect", "goodsIssue");
        });
      });
    };
    //////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////// Reverse
    //////////////////////////////////////////////////////////////////////////////////
    const onReverseDocument = () => {
      ctx.emit(
        "confirmInput",
        "Please type in the reason for deletion to confirm",
        "Reason",
        (reason: string) => {
          ctx.emit("showLoading");
          let params = {
            order: giOrder.value,
            owner: ownerCode.value,
            remark: reason,
            userId: userAuth.contactId,
          };
          reverseDocument(params, (resJson: IReversGoodsIssue_Response) => {
            if (resJson.error !== undefined) {
              var type = "warning";
              ctx.emit("hideLoading");
              ctx.emit("alert", resJson.error, type);
            } else {
              statusMaster.value = "new";
              status.value = "Pick";
              visibleColumns.value = visibleColumnsStock.value;
              loadGoodsIssueItems();
              ctx.emit("hideLoading");
              var type = "success";
              ctx.emit("alert", resJson.message, type);
            }
          });
        }
      );
    };
    //////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////// Vue 3
    //////////////////////////////////////////////////////////////////////////////////
    onMounted(() => {
      if (statusMaster.value == "new" || status.value == "StockMovement") {
        visibleColumns.value = visibleColumnsStock.value;
      } else {
        visibleColumns.value = visibleColumnsGI.value;
      }
      loadGoodsIssueItems();
    });

    const getStatusClass = (statusValue: String) => {
      let textColor = "";
      switch (statusValue.toLowerCase()) {
        case "new":
          textColor = "text-[#3a82ca]";
          break;
        case "picking":
          textColor = "text-[#eec03d]";
          break;
        case "picked":
          textColor = "text-[#027740]";
          break;
        case "closed":
          textColor = "text-[#979797]";
          break;
        case "backorder":
          if (status.value == "StockMovement") {
            textColor = "text-[#eec03d]";
          }
          break;
      }
      return "font-thaibev-bold " + textColor;
    };

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
      statusMaster,
      menu_switch_data_1,
      menu_switch_data_2,
      checkItemForNext,
      popupEditGoodsIssue,
      paramsEditGoodsIssue,
      popupEditGoodsIssueItem,
      paramsEditGoodsIssueItem,
      productOwnerV2,
      popupCreateGoodsIssueItem,
      paramsCreateGoodsIssueItem,
      popupConfirmPickGoodsIssueItem,
      paramsConfirmPickGoodsIssueItem,
      selectType,
      selectedAll,
      onSelectedAll,
      createColumns,
      goodsIssueItemsList,
      initialPagination: {
        sortBy: "lineno",
        descending: false,
      },
      visibleColumns,
      isCheckbtnNext,
      loadGoodsIssueItems,
      onUpdateCheckItem,
      onBackClick,
      onReGeneratePick,
      onGeneratePick,
      onGIItem,
      onStockMovement,
      onDeleteGoodsIssueItem,
      onDeleteGoodsIssue,
      onPopupEditGoodsIssue,
      onPopupCreateGoodsIssueItem,
      onPopupEditGoodsIssueItem,
      onPopupConfirmPickGoodsIssueItem,
      onConfirmEditGoodsIssue,
      onConfirmEditGoodsIssueItem,
      onConfirmCreateGoodsIssueItem,
      onConfirmPickGoodsIssueItem,
      onConfirmPickingSuccess,
      onAlert,
      onShowLoading,
      onHideLoading,
      onReverseDocument,
      getStatusClass,
    };
  },
});
</script>
