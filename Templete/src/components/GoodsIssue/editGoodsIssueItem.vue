<template>
  <q-card class="popup-form edit-goods-issue-popup-edit-item">
    <q-card-section class="section-header">
      <div class="popup-title">Edit GI Item {{ editItemNo }}</div>
    </q-card-section>
    <q-card-section class="section-body bg-white">
      <div class="form-component">
        <div class="popup-label">Item</div>
        <q-input v-model="editItemName" standout disable />
      </div>
      <div class="form-component">
        <div class="popup-label">Zone</div>
        <SelectField :list="zoneList" :value="editZoneCode" @onSelect="onSelectZoneEdit" />
      </div>
      <div class="form-component">
        <div class="popup-label">Pallet No.</div>
        <SelectField
          :list="palletSelectList"
          :value="editPalletNo"
          @onSelect="onSelectPalletEdit"
        />
      </div>
      <div class="form-component">
        <div class="popup-label">Batch</div>
        <q-input v-if="disableControl" v-model="editBatch" standout disable />
        <q-input v-else outlined dense clearable v-model="editBatch" />
      </div>
      <div class="form-component">
        <div class="popup-label">Lot</div>
        <q-input v-if="disableControl" v-model="editLot" standout disable />
        <q-input v-else outlined dense clearable v-model="editLot" />
      </div>
      <div class="row form-component">
        <div class="col">
          <div class="form-half-component">
            <div class="popup-label">MFG</div>
            <q-input v-if="disableControl" v-model="editMFG" standout disable />
            <DateField
              v-else
              :value="editMFG"
              @onUpdate="
                (value: string) => {
                  editMFG = value;
                }
              "
            />
          </div>
        </div>
        <div class="col">
          <div class="form-half-component" style="margin-left: 10px">
            <div class="popup-label">EXP</div>
            <q-input v-if="disableControl" v-model="editEXP" standout disable />
            <DateField
              v-else
              :value="editEXP"
              @onUpdate="
                (value: string) => {
                  editEXP = value;
                }
              "
            />
          </div>
        </div>
      </div>
      <div class="form-component">
        <div class="popup-label">Qty<span class="text-red">*</span></div>
        <div class="row items-start">
          <q-input outlined dense clearable class="qty-input" mask="######" v-model="editQty1" />
          <SelectField
            class="qty-select"
            :list="editUOMList"
            :value="editUnit1"
            @onSelect="(label: string, val: string) => (editUnit1 = val)"
          />
        </div>
        <div v-if="editUOMList.length > 1" class="row q-my-xs items-start">
          <q-input outlined dense clearable class="qty-input" mask="######" v-model="editQty2" />
          <SelectField
            class="qty-select"
            :list="editUOMList"
            :value="editUnit2"
            @onSelect="(label: string, val: string) => (editUnit2 = val)"
          />
        </div>
      </div>
    </q-card-section>
    <q-card-actions class="section-action">
      <q-btn dense outline size="md" color="red" no-caps v-close-popup>
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
        @click="onConfirmPopupEditTransferItem"
        no-caps
      >
        <div class="px-2 flex flex-row items-center">
          <q-icon name="save_as" color="white" size="20px" />
          <p class="pl-1 font-thaibev-medium text-white">Save</p>
        </div>
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref,watch } from "vue";
import useGoodsIssueHook from "@/hooks/useGoodsIssue";
import useUtilHook from "@/hooks/useUtil";
import { useAuthStore } from "@/stores/AuthStore";
import type {
  IUpdateGoodsIssueItem_Request,
  IUpdateGoodsIssueItem_Response,
} from "@/interfaces/hooks/IGoodsIssue";
import type { IUom, IGetPallet_Response_Data,IUOMConvertData } from "@/interfaces/hooks/IUtil";
import type { IQSelectField } from "@/interfaces/quasar/IQuasar";

export default defineComponent({
  props: [
    "ownerCode",
    "whCodeSource",
    "giOrder",
    "lineNo",
    "locationCode",
    "itemNo",
    "itemName",
    "zoneCode",
    "palletNo",
    "batch",
    "lot",
    "MFG",
    "EXP",
    "uomBase",
    "uomOrder",
    "UOMItemMaster",
    "UOMList",
    "qty1",
    "qty2",
    "unit1",
    "unit2",
    "zoneList",
    "masterPalletList",
  ],
  emits: ["alert", "showLoading", "hideLoading", "onSave"],
  setup(props, { emit }) {
    const { userAuth } = useAuthStore();
    const { getPallet, saveEditGoodsIssueItem } = useGoodsIssueHook.useGoodsIssueOrder();
    const { formatDate_DB,GetFilterUOMConvertByProduct } = useUtilHook.useUtil();
    const ownerCode = ref<string>(props.ownerCode);
    const whCodeSource = ref<string>(props.whCodeSource);
    const giOrder = ref<string>(props.giOrder);
    const lineNo = ref<number>(props.lineNo);
    const editLocationCode = ref<string>(props.locationCode);
    const editItemNo = ref<string>(props.itemNo);
    const editItemName = ref<string>(props.itemName);
    const editZoneCode = ref<string>(props.zoneCode);
    const editPalletNo = ref<string>(props.palletNo);
    const editBatch = ref<string>(props.batch);
    const editLot = ref<string>(props.lot);
    const editMFG = ref<string>(props.MFG);
    const editEXP = ref<string>(props.EXP);
    const editQty1 = ref<string>(props.qty1);
    const editQty2 = ref<string>(props.qty2);
    const editUnit1 = ref<string>(props.unit1);
    const editUnit2 = ref<string>(props.unit2);
    const editUOMList = ref<Array<IQSelectField>>([]);
    const palletSelectList = ref<Array<IQSelectField>>([]);
    var editMaxQty = 0;
    const palletMasterList = ref<Array<IGetPallet_Response_Data>>(props.masterPalletList);
    const disableControl = ref<boolean>(props.palletNo == "" ? false : true);


    const onSelectZoneEdit = (_label: string, val: string) => {
      editZoneCode.value = val;
      LoadPallet();
    };

    const LoadPallet = () => {
      onClearPopupEditItem("clear pallet");
      if (editZoneCode.value != "") {
        emit("showLoading");
        getPallet(whCodeSource.value, editZoneCode.value, editItemNo.value, (result_list) => {
          palletMasterList.value = result_list.list;
          palletSelectList.value = palletMasterList.value.map((data) => {
            return {
              label: data.palletNo,
              value: data.palletNo,
            };
          });
          emit("hideLoading");
        });
      }
    };

    const onSelectPalletEdit = (_label: string, val: string) => {
      editPalletNo.value = val;
      if (editPalletNo.value == "") {
        onClearPopupEditItem("");
      } else {
        let dataPallet = palletMasterList.value.find((x) => x.palletNo == editPalletNo.value);
        editLocationCode.value = dataPallet!.locationCode;
        editBatch.value = dataPallet!.batch;
        editLot.value = dataPallet!.lot;
        editMFG.value = dataPallet!.mfgDate;
        editEXP.value = dataPallet!.expDate;
        editMaxQty = dataPallet!.Qty;
        disableControl.value = true;
      }
    };

    const onClearPopupEditItem = (type: string) => {
      if (type == "clear pallet") {
        editPalletNo.value = "";
        palletSelectList.value = [];
      }
      editPalletNo.value = "";
      editLocationCode.value = "";
      editBatch.value = "";
      editLot.value = "";
      editMFG.value = "";
      editEXP.value = "";
      editMaxQty = 0;
      editQty1.value = "";
      editQty2.value = "";
      editUnit1.value = "";
      editUnit2.value = "";
      disableControl.value = false;
    };

    const onConfirmPopupEditTransferItem = () => {
      if (editQty1.value == "" || editUnit1.value == "") {
        emit("alert", "ระบุจำนวน Qty และเลือกหน่วย", "warning");
      } else {
        //let uom1 = editUOMItemMaster.value.find((x) => x.uomCode == editUnit1.value);
        let qty = parseInt(editQty1.value);
        // if (uom1!.convertQty > 1) {
        //   qty = qty * uom1!.convertQty;
        // }
        // if (editQty2.value != "") {
        //   let uom2 = editUOMItemMaster.value.find((x) => x.uomCode == editUnit2.value);
        //   if (uom2!.convertQty > 1) {
        //     qty = qty + parseInt(editQty2.value) * uom2!.convertQty;
        //   }
        // }
        if (qty == 0) {
          emit("alert", "จำนวน Qty ต้องมากกว่า 0", "warning");
        } else if (editMaxQty > 0 && qty > editMaxQty) {
          emit("alert", "เกินจำนวนของที่มีอยู่ (" + editMaxQty + ")", "warning");
        } else {
          emit("showLoading");
          var editData: IUpdateGoodsIssueItem_Request = {
            giitem: [
              {
                Grade: "01",
                Lot: editLot.value,
                batch: editBatch.value,
                description: editItemName.value,
                expdate: formatDate_DB(editEXP.value),
                giorder: giOrder.value,
                lineno: lineNo.value,
                locationcode: editLocationCode.value,
                mfgdate: formatDate_DB(editMFG.value),
                ownercode: ownerCode.value,
                palletno: editPalletNo.value,
                qty: 0,
                qtybackorder: 0,
                qtyconfirm: 0,
                skucode: editItemNo.value,
                status: "",
                uom: "",
                zonecode: editZoneCode.value,
                udf: [
                  {
                    qty: parseInt(editQty1.value),
                    uom: editUnit1.value,
                  },
                  {
                    qty: parseInt(editQty2.value == "" ? "0" : editQty2.value),
                    uom: editUnit2.value,
                  },
                ],
              },
            ],
            order: giOrder.value,
            owner: ownerCode.value,
            userid: userAuth.contactId,
          };
          saveEditGoodsIssueItem(editData, (result: IUpdateGoodsIssueItem_Response) => {
            emit("hideLoading");
            emit("onSave", result);
          });
        }
      }
    };

    const loadMasterPallet = () => {
      palletSelectList.value = palletMasterList.value.map((data) => {
        return {
          label: data.palletNo,
          value: data.palletNo,
        };
      });
      let pallet = palletMasterList.value.find((x) => x.palletNo == editPalletNo.value);
      if (pallet != undefined) {
        editMaxQty = pallet.Qty;
      } else {
        editMaxQty = 0;
      }
    };
    //#region 1
    //#endregion
    onMounted( async() => {
      await GetFilterUOMConvertByProduct(props.itemNo, (uomResult: Array<IUOMConvertData>) => {
        uomResult.forEach((item) => {
          if (item.unitCode != "") {
            editUOMList.value.push({
              label: item.nameTH,
              value: item.unitCode,
            });
          }
        });
      });
      loadMasterPallet();
    });

    return {
      editItemNo,
      editItemName,
      editZoneCode,
      editPalletNo,
      editBatch,
      editLot,
      editMFG,
      editEXP,
      editQty1,
      editQty2,
      editUnit1,
      editUnit2,
      editUOMList,
      palletSelectList,
      disableControl,
      onSelectZoneEdit,
      onSelectPalletEdit,
      onConfirmPopupEditTransferItem,
    };
  },
});
</script>

<style lang="scss">
.templete_web .edit-goods-issue-popup-edit-item {
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
