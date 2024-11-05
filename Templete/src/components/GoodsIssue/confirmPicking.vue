<template>
  <q-card class="popup-form edit-goods-issue-popup-confirm-item">
    <q-card-section class="section-header">
      <div class="popup-title">Item {{ itemNo }}</div>
    </q-card-section>
    <q-card-section class="section-body bg-white">
      <div class="form-component">
        <div class="popup-label">Item</div>
        <q-input v-model="itemName" standout disable />
      </div>
      <div class="form-component">
        <div class="popup-label">Zone</div>
        <q-input v-model="zoneCode" standout disable />
      </div>
      <div class="form-component">
        <div class="popup-label">Loc.</div>
        <SelectField
          :list="listLocation"
          :value="locationCode"
          placeholder="เลือกข้อมูล"
          @onSelect="onSelectLocation"
        />
      </div>
      <div class="form-component">
        <div class="popup-label">Pallet No.</div>
        <SelectField
          :list="opptionsMasterPallet"
          :value="palletNo"
          placeholder="เลือกข้อมูล"
          @onSelect="onSelectPallet"
        />
      </div>
      <div class="form-component">
        <div class="popup-label">Batch</div>
        <q-input v-model="batch" standout disable />
      </div>
      <div class="form-component">
        <div class="popup-label">Lot</div>
        <q-input v-model="lot" standout disable />
      </div>
      <div class="row form-component">
        <div class="col">
          <div class="form-half-component">
            <div class="popup-label">MFG</div>
            <q-input v-model="MFG" standout disable />
          </div>
        </div>
        <div class="col">
          <div class="form-half-component" style="margin-left: 10px">
            <div class="popup-label">EXP</div>
            <q-input v-model="EXP" standout disable />
          </div>
        </div>
      </div>
      <div class="form-component">
        <div class="popup-label">Total</div>
        <div class="row items-start q-gutter-x-md">
          <q-input
            v-if="uomBase.uomCode != uomOrder.uomCode"
            class="form-ui qty-confirm"
            input-class="text-center"
            mask="######"
            v-model="totalOrder"
            standout
            disable
          />
          <q-input
            class="form-ui qty-confirm"
            input-class="text-center"
            mask="######"
            v-model="totalBase"
            standout
            disable
          />
        </div>
      </div>
      <div class="form-component">
        <div class="popup-label">Issue<span class="text-red">*</span></div>
        <div class="row items-start q-gutter-x-md">
          <q-input
            v-if="uomBase.uomCode != uomOrder.uomCode"
            outlined
            dense
            class="form-ui qty-confirm"
            input-class="text-center"
            mask="######"
            v-model="qtyOrder"
            :placeholder="uomOrder.uomNameTH"
            @update:model-value="onUpdateQty('order')"
          />
          <q-input
            outlined
            dense
            class="form-ui qty-confirm"
            input-class="text-center"
            mask="######"
            v-model="qtyBase"
            :placeholder="uomBase.uomNameTH"
            @update:model-value="onUpdateQty('base')"
          />
        </div>
        <div v-if="!isValidIssue" class="font-thaibev-semibold text-[14px] text-red-500">**จำนวนเกินค่าที่มี !!</div>
      </div>
      <div class="form-component">
        <div class="popup-label text-red">Remaining</div>
        <div class="row items-start q-gutter-x-md">
          <q-input
            v-if="uomBase.uomCode != uomOrder.uomCode"
            class="form-ui qty-confirm"
            input-class="text-center text-red"
            mask="######"
            v-model="remainOrder"
            standout
            disable
          />
          <q-input
            class="form-ui qty-confirm"
            input-class="text-center text-red"
            mask="######"
            v-model="remainBase"
            standout
            disable
          />
        </div>
      </div>
    </q-card-section>
    <q-card-actions class="section-action">
      <q-btn
        dense
        outline
        size="md"
        color="red"
        @click="onClearPopupConfirmPicking('all')"
        no-caps
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
        @click="onConfirmPicking"
        no-caps
        :disable="!isValidIssue"
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
import { defineComponent, onMounted, ref } from "vue";
import useGoodsIssueHook from "@/hooks/useGoodsIssue";
import type { IViewGoodsIssueItem } from "@/interfaces/hooks/IGoodsIssue";
import type {
  IUom,
  IGetLocationByZone_Response_Data,
  IGetPalletLocation_Response_Data,
} from "@/interfaces/hooks/IUtil";
import type { IQSelectField } from "@/interfaces/quasar/IQuasar";

export default defineComponent({
  props: ["getRecord"],
  emits: ["alert", "showLoading", "hideLoading", "onSave"],
  setup(props, { emit }) {
    const { getLocation, getPalletFromLocation } = useGoodsIssueHook.useGoodsIssueOrder();

    const giOrder = ref<string>(props.getRecord.giOrder);
    const ownerCode = ref<string>(props.getRecord.ownerCode);
    const whCodeSource = ref<string>(props.getRecord.whCodeSource);
    const itemNo = ref<string>(props.getRecord.itemNo);
    const itemName = ref<string>(props.getRecord.itemName);
    const zoneCode = ref<string>(props.getRecord.zoneCode);
    const locationCode = ref<string>(props.getRecord.locationCode);
    const palletNo = ref<string>(props.getRecord.palletNo);
    const batch = ref<string>(props.getRecord.batch);
    const lot = ref<string>(props.getRecord.lot);
    const MFG = ref<string>(props.getRecord.MFG);
    const EXP = ref<string>(props.getRecord.EXP);
    const totalBase = ref("");
    const totalOrder = ref("");
    const qtyBase = ref<string>(props.getRecord.qtyConfirmBase);
    const qtyOrder = ref<string>(props.getRecord.qtyConfirmOrder);
    const remainBase = ref("");
    const remainOrder = ref("");
    const listLocation = ref<Array<IQSelectField>>([]);
    const uomBase = ref<IUom>(props.getRecord.uomBase);
    const uomOrder = ref<IUom>(props.getRecord.uomOrder);
    const opptionsMasterPallet = ref<Array<IQSelectField>>([]);
    var masterLocation: Array<IGetLocationByZone_Response_Data> = [];
    var masterPallet: Array<IGetPalletLocation_Response_Data> = [];

    const isValidIssue = ref(true);

    var timeout_qty: number = 0;
    const onUpdateQty = (box: string) => {
      clearTimeout(timeout_qty);
      timeout_qty = window.setTimeout(() => {
        isValidIssue.value = true;
        let total = uomBase.value.qty;
        let qty =
          parseInt(qtyOrder.value == "" ? "0" : qtyOrder.value) * uomOrder.value.convertQty +
          parseInt(qtyBase.value == "" ? "0" : qtyBase.value);
        let remain = total - qty;
        if (remain < 0 || remain > total) {
          if (box == "base") {
            //qtyBase.value = "";
            isValidIssue.value = false;
          } else {
            //qtyOrder.value = "";
            isValidIssue.value = false;
          }
          qty =
            parseInt(qtyOrder.value == "" ? "0" : qtyOrder.value) * uomOrder.value.convertQty +
            parseInt(qtyBase.value == "" ? "0" : qtyBase.value);
        }
        if (isValidIssue.value) {
          remainBase.value = (
            total -
            parseInt(qtyOrder.value == "" ? "0" : qtyOrder.value) * uomOrder.value.convertQty -
            parseInt(qtyBase.value == "" ? "0" : qtyBase.value)
          ).toString();

          if (uomOrder.value.convertQty > 1) {
            remainBase.value = (parseInt(remainBase.value) % uomOrder.value.convertQty).toString();
          }
          remainOrder.value = Math.floor((total - qty) / uomOrder.value.convertQty).toString();
        } else {
          remainBase.value = "0";
          remainOrder.value = "0";
        }
      }, 200);
    };
    const onClearPopupConfirmPicking = (type: string) => {
      if (type == "all") {
        opptionsMasterPallet.value = [];
      }
      palletNo.value = "";
      batch.value = "";
      lot.value = "";
      MFG.value = "";
      EXP.value = "";
    };
    const onConfirmPicking = () => {
      let qty =
        parseInt(qtyOrder.value == "" ? "0" : qtyOrder.value) * uomOrder.value.convertQty +
        parseInt(qtyBase.value == "" ? "0" : qtyBase.value);
      if (qty <= 0) {
        emit("alert", "ระบุจำนวน Issue", "warning");
      } else {
        const params: IViewGoodsIssueItem = {
          Grade: props.getRecord.grade,
          Lot: lot.value,
          batch: batch.value,
          confirm: props.getRecord.uomConfirm,
          description: itemName.value,
          expdate: EXP.value,
          giorder: giOrder.value,
          lineno: props.getRecord.lineNo,
          locationcode: locationCode.value,
          mfgdate: MFG.value,
          ownercode: ownerCode.value,
          palletno: palletNo.value,
          qtyDisplay: props.getRecord.qtyDisplay,
          skucode: itemNo.value,
          status: props.getRecord.status,
          uom: props.getRecord.uom,
          uomBackOrder: props.getRecord.uomBackOrder,
          uomBase: props.getRecord.uomBase,
          uomDisplay: props.getRecord.uomDisplay,
          uomItemMaster: props.getRecord.uomItemMaster,
          uomOrder: props.getRecord.uomOrder,
          zonecode: props.getRecord.zoneCode,
          qtyConfirmBase: qtyBase.value == "" ? 0 : parseInt(qtyBase.value),
          qtyConfirmOrder: qtyOrder.value == "" ? 0 : parseInt(qtyOrder.value),
          tranOrder: props.getRecord.tranOrder,
          recNum: props.getRecord.recNum,
          total: 0,
          issue: 0,
          remain: 0,
          totalDisplay: "",
          issueDisplay: "",
          remainDisplay: "",
        };
        emit("onSave", params);
      }
    };
    const onSelectLocation = (label: string, val: string) => {
      locationCode.value = val;
      onClearPopupConfirmPicking("all");
      loadPallet();
    };
    const onSelectPallet = (label: string, val: string) => {
      palletNo.value = val;
      if (palletNo.value == "") {
        onClearPopupConfirmPicking("");
      } else {
        let dataPallet = masterPallet.find((x) => x.palletNo == palletNo.value);
        batch.value = dataPallet!.batch;
        lot.value = dataPallet!.lot;
        MFG.value = dataPallet!.mfgDate;
        EXP.value = dataPallet!.expDate;
      }
    };
    const loadLocation = () => {
      getLocation(zoneCode.value, (result) => {
        masterLocation = result.list;
        listLocation.value = masterLocation.map((data) => {
          return {
            label: data.value,
            value: data.value,
          };
        });
      });
    };
    const initQty = () => {
      if (uomBase.value.uomCode == uomOrder.value.uomCode) {
        totalBase.value = props.getRecord.qtyDisplay;
      } else {
        let s_qty = props.getRecord.qtyDisplay.split("/");
        totalBase.value = s_qty[1];
        totalOrder.value = s_qty[0];
      }
      remainBase.value = (
        parseInt(totalBase.value == "" ? "0" : totalBase.value) -
        parseInt(qtyBase.value == "" ? "0" : qtyBase.value)
      ).toString();
      remainOrder.value = (
        parseInt(totalOrder.value == "" ? "0" : totalOrder.value) -
        parseInt(qtyOrder.value == "" ? "0" : qtyOrder.value)
      ).toString();
    };
    const loadPallet = () => {
      let params = {
        locationCode: locationCode.value,
        skuCode: itemNo.value,
      };
      getPalletFromLocation(params, (result_list) => {
        masterPallet = result_list.Ok;
        opptionsMasterPallet.value = masterPallet.map((x) => {
          return {
            label: x.palletNo,
            value: x.palletNo,
          };
        });
      });
    };

    onMounted(() => {
      loadLocation();
      loadPallet();
      initQty();
    });

    return {
      giOrder,
      ownerCode,
      whCodeSource,
      itemNo,
      itemName,
      zoneCode,
      locationCode,
      palletNo,
      batch,
      lot,
      MFG,
      EXP,
      totalBase,
      totalOrder,
      qtyBase,
      qtyOrder,
      remainBase,
      remainOrder,
      uomBase,
      uomOrder,

      listLocation,
      opptionsMasterPallet,

      onUpdateQty,
      onClearPopupConfirmPicking,
      onConfirmPicking,
      onSelectLocation,
      onSelectPallet,

      isValidIssue,
    };
  },
});
</script>

<style lang="scss">
.templete_web .edit-goods-issue-popup-confirm-item {
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
    .qty-confirm {
      max-width: 30%;
    }
  }
  .form-half-component {
    width: 140px;
  }
}
</style>
