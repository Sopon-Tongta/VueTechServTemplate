<template>
  <q-card class="popup-form edit-goods-issue-popup-create-item">
    <q-card-section class="section-header">
      <div class="popup-title">Add GI Item</div>
    </q-card-section>
    <q-card-section class="section-body bg-white">
      <div class="form-component">
        <div class="popup-label">Item Code<span class="text-red">*</span></div>
        <SelectField
          :list="addItemNoList"
          :value="addItemNo"
          placeholder="เลือกข้อมูล"
          @onSelect="onSelectItem"
        />
      </div>
      <div class="form-component">
        <div class="popup-label">Item</div>
        <q-input v-model="addItemName" standout disable />
      </div>
      <div class="form-component">
        <div class="popup-label">Zone</div>
        <SelectField
          :list="addZoneList"
          :value="addZoneCode"
          placeholder="เลือกข้อมูล"
          @onSelect="onSelectZone"
        />
      </div>
      <div class="form-component">
        <div class="popup-label">Pallet No.</div>
        <SelectField
          :list="palletSelectList"
          :value="addPalletNo"
          placeholder="เลือกข้อมูล"
          @onSelect="onSelectPalletAdd"
        />
      </div>
      <div class="form-component">
        <div class="popup-label">Batch</div>
        <q-input v-if="disableControl" v-model="addBatch" standout disable />
        <q-input v-else outlined dense clearable v-model="addBatch" />
      </div>
      <div class="form-component">
        <div class="popup-label">Lot</div>
        <q-input v-if="disableControl" v-model="addLot" standout disable />
        <q-input v-else outlined dense clearable v-model="addLot" />
      </div>
      <div class="row form-component">
        <div class="col">
          <div class="form-half-component">
            <div class="popup-label">MFG</div>
            <q-input v-if="disableControl" v-model="addMFG" standout disable />
            <DateField
              v-else
              :value="addMFG"
              @onUpdate="
                (value: string) => {
                  addMFG = value;
                }
              "
            />
          </div>
        </div>
        <div class="col">
          <div class="form-half-component" style="margin-left: 10px">
            <div class="popup-label">EXP</div>
            <q-input v-if="disableControl" v-model="addEXP" standout disable />
            <DateField
              v-else
              :value="addEXP"
              @onUpdate="
                (value: string) => {
                  addEXP = value;
                }
              "
            />
          </div>
        </div>
      </div>
      <div class="form-component">
        <div class="popup-label">Qty<span class="text-red">*</span></div>
        <div class="row items-start">
          <q-input outlined dense clearable class="qty-input" mask="######" v-model="addQty1" />
          <q-select
            outlined
            dense
            options-dense
            clearable
            class="qty-select"
            v-model="addUnit1"
            :options="addUOMList"
            map-options
            emit-value
            popup-content-class="templete_web"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey font-thaibev-regular"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="row q-my-xs items-start">
          <q-input outlined dense clearable class="qty-input" mask="######" v-model="addQty2" />
          <q-select
            outlined
            dense
            options-dense
            clearable
            class="qty-select"
            v-model="addUnit2"
            :options="addUOMList"
            map-options
            emit-value
            popup-content-class="templete_web"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey font-thaibev-regular"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="row q-my-xs items-start">
          <q-input outlined dense clearable class="qty-input" mask="######" v-model="addQty3" />
          <q-select
            outlined
            dense
            options-dense
            clearable
            class="qty-select"
            v-model="addUnit3"
            :options="addUOMList"
            map-options
            emit-value
            popup-content-class="templete_web"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey font-thaibev-regular"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
      </div>
    </q-card-section>
    <q-card-actions class="section-action">
      <q-btn
        dense
        outline
        size="md"
        color="red"
        no-caps
        @click="onClearPopupAddItem('all')"
        v-close-popup
      >
        <div class="px-1 flex flex-row items-center">
          <q-icon name="close" size="20px" />
          <p class="font-thaibev-medium">Cancel</p>
        </div>
      </q-btn>
      <q-btn
        dense
        unelevated
        size="md"
        class="bg-teal-700"
        @click="onConfirmPopupAddTransferItem"
        no-caps
      >
        <div class="px-3 flex flex-row items-center">
          <q-icon name="post_add" color="white" size="20px" />
          <p class="pl-1 font-thaibev-medium text-white">Add</p>
        </div>
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import useUtilHook from "@/hooks/useUtil";
import useGoodsIssueHook from "@/hooks/useGoodsIssue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/AuthStore";
import type {
  ICreateGoodsIssueItem_Request,
  ICreateGoodsIssueItem_Response,
} from "@/interfaces/hooks/IGoodsIssue";
import type {
  IGetProductByOwner_Response_Data,
  IGetPallet_Response_Data,
  IUOMConvertData,
  IProductData,
} from "@/interfaces/hooks/IUtil";
import type { IQSelectField } from "@/interfaces/quasar/IQuasar";

export default defineComponent({
  props: ["ownerCode", "whCode", "giOrder", "itemNoList", "zoneList", "masterGoodsIssueItemsList"],
  emits: ["alert", "showLoading", "hideLoading", "onSave"],
  setup(props, { emit }) {
    const { getPallet, saveCreateGoodsIssueItem } = useGoodsIssueHook.useGoodsIssueOrder();
    const { uomProductV2,formatDate_DB, GetFilterUOMConvertByProduct } = useUtilHook.useUtil();
    const { userAuth } = useAuthStore();
    const ownerCode = ref<string>(props.ownerCode);
    const giOrder = ref<string>(props.giOrder);
    const addItemNoList = ref<Array<IQSelectField>>(props.itemNoList);
    const addItemNo = ref("");
    const addItemName = ref("");
    const addZoneList = ref<Array<IQSelectField>>(props.zoneList);
    const addZoneCode = ref("");
    const addPalletNo = ref("");
    const addBatch = ref("");
    const addLot = ref("");
    const addMFG = ref("");
    const addEXP = ref("");
    const addQty1 = ref("");
    const addQty2 = ref("");
    const addQty3 = ref("");
    const addUnit1 = ref("");
    const addUnit2 = ref("");
    const addUnit3 = ref("");
    const addUOMList = ref<Array<IQSelectField>>([]);
    const palletSelectList = ref<Array<IQSelectField>>([]);
    const masterGoodsIssueItemsList = ref<Array<IProductData>>(
      props.masterGoodsIssueItemsList
    );
    console.log(masterGoodsIssueItemsList.value);
    var addMaxQty = 0;
    var palletMasterList: Array<IGetPallet_Response_Data> = [];
    const disableControl = ref(false);

    const onSelectItem = (label: string, val: string) => {
      addItemNo.value = val;
      let s_label = label.split("] ");
      addItemName.value = s_label[s_label.length - 1];
      addZoneCode.value = "";
      LoadPallet();
      LoadUOM();
    };

    const onSelectZone = (_label: string, val: string) => {
      addZoneCode.value = val;
      LoadPallet();
    };

    const LoadUOM = () => {
      addUOMList.value = [];
      addUOMList.value.push({
        label: "",
        value: "",
      });
      GetFilterUOMConvertByProduct(addItemNo.value, (uomResult: Array<IUOMConvertData>) => {
        uomResult.forEach((item) => {
          if (item.unitCode != "") {
            addUOMList.value.push({
              label: item.nameTH,
              value: item.unitCode,
            });
          }
        });
        addUnit1.value = "";
        addUnit2.value = "";
        addUnit3.value = "";
      });
    };

    const LoadPallet = () => {
      if (addZoneCode.value != "" && addItemNo.value != "") {
        onClearPopupAddItem("");
        emit("showLoading");
        getPallet(props.whCode, addZoneCode.value, addItemNo.value, (result_list) => {
          palletMasterList = result_list.list;
          palletSelectList.value = result_list.list.map((data) => {
            return {
              label: data.palletNo,
              value: data.palletNo,
            };
          });
          emit("hideLoading");
        });
      } else {
        onClearPopupAddItem("clear pallet");
      }
    };

    const onSelectPalletAdd = (_label: string, val: string) => {
      addPalletNo.value = val;
      if (addPalletNo.value == "") {
        onClearPopupAddItem("");
      } else {
        let dataPallet = palletMasterList.find((x) => x.palletNo == addPalletNo.value);
        addBatch.value = dataPallet!.batch;
        addLot.value = dataPallet!.lot;
        addMFG.value = dataPallet!.mfgDate;
        addEXP.value = dataPallet!.expDate;
        addMaxQty = dataPallet!.Qty;
        disableControl.value = true;
      }
    };

    const onClearPopupAddItem = (type: string) => {
      if (type == "all") {
        addItemNo.value = "";
        addItemName.value = "";
        palletSelectList.value = [];
      } else if (type == "clear pallet") {
        palletSelectList.value = [];
      }
      addPalletNo.value = "";
      addBatch.value = "";
      addLot.value = "";
      addMFG.value = "";
      addEXP.value = "";
      addMaxQty = 0;
      addQty1.value = "";
      addQty2.value = "";
      addQty3.value = "";
      addUnit1.value = "";
      addUnit2.value = "";
      addUnit3.value = "";
      disableControl.value = false;
    };

    const onConfirmPopupAddTransferItem = () => {
      let c_add_1 = true;
      let c_add_2 = true;
      let c_add_3 = true;
      let c_qty = true;
      let c_unit = true;
      if (addQty1.value != "" && (addUnit1.value == "" || addUnit1.value == null)) {
        c_add_1 = false;
      }
      if (addQty2.value != "" && (addUnit2.value == "" || addUnit2.value == null)) {
        c_add_2 = false;
      }
      if (addQty3.value != "" && (addUnit3.value == "" || addUnit3.value == null)) {
        c_add_3 = false;
      }
      if (addQty1.value == "" && addQty2.value == "" && addQty3.value == "") {
        c_qty = false;
      }
      if (
        (addUnit1.value == "" || addUnit1.value == null) &&
        (addUnit2.value == "" || addUnit2.value == null) &&
        (addUnit3.value == "" || addUnit3.value == null)
      ) {
        c_unit = false;
      }
      if (addItemNo.value == "") {
        emit("alert", "ระบุ Item No.", "warning");
      } else if (
        c_add_1 == false ||
        c_add_2 == false ||
        c_add_3 == false ||
        c_qty == false ||
        c_unit == false
      ) {
        emit("alert", "ระบุจำนวน Qty และเลือกหน่วย", "warning");
      } else {
        let uom1 = uomProductV2.value.find(
          (x) =>
            x.unitCode == (addUnit1.value == null || addUnit1.value == "" ? "" : addUnit1.value)
        );
        let qty1 = Math.ceil(
          (parseInt(addQty1.value == "" ? "0" : addQty1.value) * uom1?.baseQuantity!) /
            uom1?.orderQuantity!
        );
        let uom2 = uomProductV2.value.find(
          (x) =>
            x.unitCode == (addUnit2.value == null || addUnit2.value == "" ? "" : addUnit2.value)
        );
        let qty2 = Math.ceil(
          (parseInt(addQty2.value == "" ? "0" : addQty2.value) * uom2?.baseQuantity!) /
            uom2?.orderQuantity!
        );
        let uom3 = uomProductV2.value.find(
          (x) =>
            x.unitCode == (addUnit3.value == null || addUnit3.value == "" ? "" : addUnit3.value)
        );
        let qty3 = Math.ceil(
          (parseInt(addQty3.value == "" ? "0" : addQty2.value) * uom3?.baseQuantity!) /
            uom3?.orderQuantity!
        );
        if (qty1 + qty2 + qty3 == 0) {
          emit("alert", "จำนวน Qty ต้องมากกว่า 0", "warning");
        } else if (addMaxQty > 0 && qty1 + qty2 + qty3 > addMaxQty) {
          emit("alert", "เกินจำนวนของที่มีอยู่ (" + addMaxQty + ")", "warning");
        } else {
          emit("showLoading");
          let locationCode = "";
          if (addPalletNo.value != "") {
            let pallet = palletMasterList.find((x) => x.palletNo == addPalletNo.value);
            locationCode = pallet!.locationCode;
          }
          const params: ICreateGoodsIssueItem_Request = {
            giitem: [
              {
                Grade: "01",
                Lot: addLot.value,
                batch: addBatch.value,
                description: addItemName.value,
                expdate: formatDate_DB(addEXP.value),
                giorder: giOrder.value,
                lineno: 0,
                locationcode: locationCode,
                mfgdate: formatDate_DB(addMFG.value),
                ownercode: ownerCode.value,
                palletno: addPalletNo.value,
                qty: 0,
                qtybackorder: 0,
                qtyconfirm: 0,
                skucode: addItemNo.value,
                status: "",
                udf: [
                  {
                    qty: parseInt(addQty1.value == "" ? "0" : addQty1.value),
                    uom: addUnit1.value == null || addUnit1.value == "" ? "" : addUnit1.value,
                  },
                  {
                    qty: parseInt(addQty2.value == "" ? "0" : addQty2.value),
                    uom: addUnit2.value == null || addUnit2.value == "" ? "" : addUnit2.value,
                  },
                  {
                    qty: parseInt(addQty3.value == "" ? "0" : addQty3.value),
                    uom: addUnit3.value == null || addUnit3.value == "" ? "" : addUnit3.value,
                  },
                ],
                uom: "",
                zonecode: addZoneCode.value,
              },
            ],
            order: giOrder.value,
            owner: ownerCode.value,
            userid: userAuth.contactId,
          };
          saveCreateGoodsIssueItem(params, (result: ICreateGoodsIssueItem_Response) => {
            emit("hideLoading");
            emit("onSave", result);
          });
        }
      }
    };

    return {
      addItemNoList,
      addZoneList,
      addItemNo,
      addItemName,
      addZoneCode,
      addPalletNo,
      addBatch,
      addLot,
      addMFG,
      addEXP,
      addUOMList,
      addQty1,
      addQty2,
      addQty3,
      addUnit1,
      addUnit2,
      addUnit3,
      palletSelectList,
      disableControl,
      onSelectItem,
      onSelectZone,
      onSelectPalletAdd,
      onClearPopupAddItem,
      onConfirmPopupAddTransferItem,
    };
  },
});
</script>

<style lang="scss">
.templete_web .edit-goods-issue-popup-create-item {
  .form-component {
    margin-bottom: 10px;
    width: 300px;
    .qty-input {
      max-width: 50%;
      .q-field__control {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
    .qty-select {
      max-width: 50%;
      width: 100%;
      .q-field__control {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  }
  .form-half-component {
    width: 140px;
  }
}
</style>
