<template>
  <q-card class="popup-form edit-goods-issue-popup-edit">
    <q-card-section class="section-header">
      <div class="popup-title">Edit GI Order</div>
    </q-card-section>
    <q-card-section class="section-body bg-white">
      <div class="form-component">
        <div class="popup-label">Reference No.</div>
        <q-input outlined dense clearable :model-value="editReferenceNo" placeholder="กรอกข้อมูล" />
      </div>
      <div class="form-component">
        <div class="popup-label">Owner<span class="text-red-14">*</span></div>
        <SelectField
          :list="ownerList"
          :value="editOwner"
          placeholder="เลือกข้อมูล"
          @onSelect="(label: string, val: string) => (editOwner = val)"
        />
      </div>
      <div class="form-component">
        <div class="popup-label">W/H<span class="text-red-14">*</span></div>
        <SelectField
          :list="wareHouseList"
          :value="editWHCode"
          placeholder="เลือกข้อมูล"
          @onSelect="(label: string, val: string) => (editWHCode = val)"
        />
      </div>
      <div class="form-component">
        <div class="popup-label">Customer<span class="text-red-14">*</span></div>
        <SelectField
          :list="masterCustomer"
          :value="editCustomerCode"
          placeholder="เลือกข้อมูล"
          @onSelect="onSelectCustomer"
        />
      </div>
      <div class="form-component">
        <div class="popup-label">Order Type<span class="text-red-14">*</span></div>
        <SelectField
          :list="orderTypeGeneralList"
          :value="editOrderType"
          placeholder="เลือกข้อมูล"
          @onSelect="(label: string, val: string) => (editOrderType = val)"
        />
      </div>
      <div class="form-component">
        <div class="popup-label">Bill To<span class="text-red-14">*</span></div>
        <SelectField
          :list="masterBillTo"
          :value="editBillTo"
          placeholder="เลือกข้อมูล"
          @onSelect="(label: string, val: string) => (editBillTo = val)"
        />
      </div>
      <div class="form-component">
        <div class="popup-label">Delivery To<span class="text-red-14">*</span></div>
        <SelectField
          :list="masterDeliveryTo"
          :value="editDeliveryTo"
          placeholder="เลือกข้อมูล"
          @onSelect="(label: string, val: string) => (editDeliveryTo = val)"
        />
      </div>
      <div class="form-component">
        <div class="popup-label">Doc. Date<span class="text-red-14">*</span></div>
        <DateField
          :value="editDocDate"
          @onUpdate="
            (value: string) => {
              editDocDate = value;
            }
          "
        />
      </div>
      <div class="form-component">
        <div class="popup-label">Delivery Date<span class="text-red-14">*</span></div>
        <DateField
          :value="editDeliveryDate"
          @onUpdate="
            (value: string) => {
              editDeliveryDate = value;
            }
          "
        />
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
        @click="onConfirmEditGoodsIssue"
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
import { defineComponent, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useMasterDataStore } from "@/stores/MasterDataStore";
import useUtilHook from "@/hooks/useUtil";
import useGoodsIssueHook from "@/hooks/useGoodsIssue";
import { useAuthStore } from "@/stores/AuthStore";
import type {
  IUpdateGoodsIssue_Request,
  IUpdateGoodsIssue_Response,
} from "@/interfaces/hooks/IGoodsIssue";
import type { IQSelectField } from "@/interfaces/quasar/IQuasar";

export default defineComponent({
  props: [
    "giOrder",
    "referenceNo",
    "ownerCode",
    "whCode",
    "customerCode",
    "customerName",
    "orderType",
    "billTo",
    "deliveryTo",
    "docDate",
    "deliveryDate",
  ],
  emits: ["onAlert", "onShowLoading", "onHideLoading", "onSave"],
  setup(props, { emit }) {
    const { ownerList, wareHouseList, orderTypeList } = storeToRefs(useMasterDataStore());
    const { userAuth } = useAuthStore();
    const {
      masterCustomer,
      masterBillTo,
      masterDeliveryTo,
      getMasterCustomer,
      getMasterBillTo,
      getMasterDeliveryTo,
    } = useGoodsIssueHook.useGoodsIssue();
    const { saveEditGoodsIssue } = useGoodsIssueHook.useGoodsIssueOrder();
    const { formatDate_DB } = useUtilHook.useUtil();
    const editReferenceNo = ref<string>(props.referenceNo);
    const editOwner = ref<string>(props.ownerCode);
    const editWHCode = ref<string>(props.whCode);
    const editCustomerCode = ref<string>(props.customerCode);
    const editCustomerName = ref<string>(props.customerName);
    const editOrderType = ref<string>(props.orderType);
    const editBillTo = ref<string>(props.billTo);
    const editDeliveryTo = ref<string>(props.deliveryTo);
    const editDocDate = ref<string>(props.docDate);
    const editDeliveryDate = ref<string>(props.deliveryDate);
    const orderTypeGeneralList = ref<Array<IQSelectField>>([]);

    const mapOrderType = () => {
      orderTypeGeneralList.value = orderTypeList.value.filter((x) => x.group == "GENERAL");
    };

    const LoadMaster = () => {
      let checkSucces = [false, false, false];
      getMasterCustomer(() => {
        checkSucces[0] = true;
        if (checkSucces.find((x) => x == false) == undefined) {
          emit("onHideLoading");
        }
      });
      getMasterBillTo(editCustomerCode.value, () => {
        checkSucces[1] = true;
        if (checkSucces.find((x) => x == false) == undefined) {
          emit("onHideLoading");
        }
      });
      getMasterDeliveryTo(editCustomerCode.value, () => {
        checkSucces[2] = true;
        if (checkSucces.find((x) => x == false) == undefined) {
          emit("onHideLoading");
        }
      });
    };

    const onSelectCustomer = (label: string, val: string) => {
      let wait_1 = false;
      let wait_2 = false;
      editCustomerCode.value = val;
      editCustomerName.value = label;
      editBillTo.value = "";
      editDeliveryTo.value = "";
      if (val == "") {
        masterBillTo.value = [];
        masterDeliveryTo.value = [];
      } else {
        emit("onShowLoading");
        getMasterBillTo(editCustomerCode.value, () => {
          wait_1 = true;
          if (wait_2 == true) {
            emit("onHideLoading");
          }
        });
        getMasterDeliveryTo(editCustomerCode.value, () => {
          wait_2 = true;
          if (wait_1 == true) {
            emit("onHideLoading");
          }
        });
      }
    };

    const onConfirmEditGoodsIssue = () => {
      if (
        editOwner.value == "" ||
        editCustomerCode.value == "" ||
        editOrderType.value == "" ||
        editBillTo.value == "" ||
        editDeliveryTo.value == "" ||
        editDocDate.value == "" ||
        editDeliveryDate.value == "" ||
        editWHCode.value == ""
      ) {
        emit("onAlert", "Please. Input All field !!", "warning");
      } else {
        emit("onShowLoading");
        const params: IUpdateGoodsIssue_Request = {
          goodIssue: {
            giorder: props.giOrder,
            billto: editBillTo.value,
            cuscode: editCustomerCode.value,
            cusname: editCustomerName.value,
            deliverydate: formatDate_DB(editDeliveryDate.value),
            deliveryto: editDeliveryTo.value,
            docdate: formatDate_DB(editDocDate.value),
            orderType: editOrderType.value,
            ownercode: editOwner.value,
            referenceno: editReferenceNo.value,
            whcodesource: editWHCode.value,
          },
          userid: userAuth.contactId,
        };
        saveEditGoodsIssue(params, (result: IUpdateGoodsIssue_Response) => {
          emit("onSave", result);
        });
      }
    };

    onMounted(() => {
      LoadMaster();
      mapOrderType();
    });

    return {
      masterBillTo,
      masterDeliveryTo,
      masterCustomer,
      orderTypeGeneralList,

      editReferenceNo,
      editOwner,
      editWHCode,
      editCustomerCode,
      editCustomerName,
      editOrderType,
      editBillTo,
      editDeliveryTo,
      editDocDate,
      editDeliveryDate,

      onSelectCustomer,
      onConfirmEditGoodsIssue,

      ownerList,
      wareHouseList,
    };
  },
});
</script>
