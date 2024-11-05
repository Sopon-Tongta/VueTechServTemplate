import { ref } from "vue";
import useUtil from "@/hooks/useUtil";
import { useConfigStore } from "@/stores/ConfigStore";
import { storeToRefs } from "pinia";
import type {
  IGetGoodsIssueStatus_Response,
  IGetGoodsIssueStatus_Data,
  IGetCustomer_Response,
  IGetCustomer_Data,
  IGetBillTo_Response,
  IGetBillTo_Data,
  IGetDeliveryTo_Response,
  IGetDeliveryTo_Data,
  IGetGoodsIssue_Params,
  IGetGoodsIssue_Request,
  IGetGoodsIssue_Response,
  IGoodsIssue_Data,
  ICreateGoodsIssue_Request,
  ICreateGoodsIssue_Response,
  IGetGoodsIssueItem_Request,
  IGetGoodsIssueItem_Request_Data,
  IGetGoodsIssueItem_Request_Data_Detail,
  IViewGoodsIssueItem,
  IDeleteGoodsIssueItem_Params,
  IDeleteGoodsIssueItem_Request,
  IDeleteGoodsIssueItem_Response,
  IDeleteGoodsIssue_Params,
  IDeleteGoodsIssue_Request,
  IDeleteGoodsIssue_Response,
  IUpdateGoodsIssue_Request,
  IUpdateGoodsIssue_Response,
  IUpdateGoodsIssueItem_Request,
  IUpdateGoodsIssueItem_Response,
  ICreateGoodsIssueItem_Request,
  ICreateGoodsIssueItem_Response,
  IPickByLocation_Request,
  IPickByLocation_Response,
  IPickByLocationLineItem_Request,
  IPickByLocationLineItem_Response,
  IConfirmPick_Request,
  IConfirmPick_Response,
  IReversGoodsIssue_Request,
  IReversGoodsIssue_Response,
} from "@/interfaces/hooks/IGoodsIssue";
import type {
  IGetLocationByZone_Response,
  IGetPalletLocation_Params,
  IGetPalletLocation_Response,
  IGetPallet_Response,
  IGetProductByOwner_Response,
  IGetProductByOwner_Response_Data,
  IGetZoneByWH_Response,
  IUomItemMaster,
} from "@/interfaces/hooks/IUtil";
import { useAuthStore } from "@/stores/AuthStore";
import type { IQSelectField } from "@/interfaces/quasar/IQuasar";

const { env } = storeToRefs(useConfigStore());
const { userAuth } = useAuthStore();

const useGoodsIssue = () => {
  const { formatDate_DB, alertFetchError } = useUtil.useUtil();
  const masterStatus = ref<Array<IQSelectField>>([]);
  const goodsIssueList = ref<Array<IGoodsIssue_Data>>([]);
  const goodsIssueTotal = ref<number>(0);
  const masterCustomer = ref<Array<IQSelectField>>([]);
  const masterBillTo = ref<Array<IQSelectField>>([]);
  const masterDeliveryTo = ref<Array<IQSelectField>>([]);

  const getMasterStatus = () => {
    // fetch(`${env.value.inventory_api}/api/v1/system/goodissuestatus`)
    //   .then((res_raw) => {
    //     if (res_raw.ok) {
    //       return res_raw.json();
    //     }
    //     throw new Error(`${res_raw.status}: ${res_raw.statusText}`);
    //   })
    //   .then((res_json: IGetGoodsIssueStatus_Response) => {
    //     masterStatus.value = res_json.data.map((data: IGetGoodsIssueStatus_Data): IQSelectField => {
    //       return {
    //         label: data.value,
    //         value: data.key,
    //       };
    //     });
    //   })
    //   .catch((error) => {
    //     alertFetchError(error.message);
    //   });
  };

  const getMasterCustomer = (callBackFn?: (arg: string) => void) => {
    fetch(`${env.value.inventory_api}/api/v1/customer`)
      .then((res_raw) => {
        if (res_raw.ok) {
          return res_raw.json();
        }
        throw new Error(`${res_raw.status}: ${res_raw.statusText}`);
      })
      .then((res_json: IGetCustomer_Response) => {
        masterCustomer.value = res_json.Ok.map((data: IGetCustomer_Data): IQSelectField => {
          return {
            label: data.cusName,
            value: data.cusCode,
          };
        });
        if (typeof callBackFn === "function") {
          callBackFn("Success");
        }
      })
      .catch((error) => {
        alertFetchError(error.message);
      });
  };

  const getMasterBillTo = (customer: string, callBackFn?: (arg: string) => void) => {
    fetch(`${env.value.inventory_api}/api/v1/customer/billto/cus/${customer}`)
      .then((res_raw) => {
        if (res_raw.ok) {
          return res_raw.json();
        }
        throw new Error(`${res_raw.status}: ${res_raw.statusText}`);
      })
      .then((res_json: IGetBillTo_Response) => {
        masterBillTo.value = res_json.customerBillTo.map((data: IGetBillTo_Data): IQSelectField => {
          return {
            label: `[${data.billCode}] - ${data.address} ${data.tambon} ${data.district} ${data.province}`,
            value: data.billCode,
          };
        });
        if (typeof callBackFn === "function") {
          callBackFn("Success");
        }
      })
      .catch((error) => {
        alertFetchError(error.message);
      });
  };

  const getMasterDeliveryTo = (customer: string, callBackFn?: (arg: string) => void) => {
    fetch(`${env.value.inventory_api}/api/v1/customer/deliveryto/cus/${customer}`)
      .then((res_raw) => {
        if (res_raw.ok) {
          return res_raw.json();
        }
        throw new Error(`${res_raw.status}: ${res_raw.statusText}`);
      })
      .then((res_json: IGetDeliveryTo_Response) => {
        masterDeliveryTo.value = res_json.customerDeliveryTo.map(
          (data: IGetDeliveryTo_Data): IQSelectField => {
            return {
              label: `[${data.deliveryCode}] - ${data.address} ${data.tambon} ${data.district} ${data.province}`,
              value: data.deliveryCode,
            };
          }
        );
        if (typeof callBackFn === "function") {
          callBackFn("Success");
        }
      })
      .catch((error) => {
        alertFetchError(error.message);
      });
  };

  const loadStoreGoodsIssue = (argu: IGetGoodsIssue_Params) => {
    const reqParams: IGetGoodsIssue_Request = {
      referenceNo: argu.referenceNo,
      giOrder: argu.giOrder,
      ownerCode: argu.ownerCode,
      orderType: argu.orderType,
      docDate: formatDate_DB(argu.docDate),
      status: argu.status,
      pageNumber: argu.pageNumber,
      pageSize: argu.pageSize,
      whCodeDes: "",
      whCodeSource: "",
    };

    const res: IGetGoodsIssue_Response = {
      list: [{
        giOrder: "10001",
        ownerCode: "Test-001",
        referenceNo: "XXX1",
        orderType: "SAP-DO",
        whCodeSource: "AYUTTAYA",
        docDate: "2024-05-05",
        billTo: "",
        cusCode: "",
        cusName: "",
        deliveryDate: "",
        deliveryTo: "",
        ownerName: "",
        whCodeDes: "",
        whDesName: "",
        whSourceName: "",
        status: "NEW"
      }],
      total: 1,
    };
    goodsIssueList.value = res.list;
    goodsIssueTotal.value = res.total;

    // fetch(`${env.value.inventory_api}/api/v1/goodissue/list`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(reqParams),
    // })
    //   .then((res_raw) => {
    //     if (res_raw.ok) {
    //       return res_raw.json();
    //     }
    //     throw new Error(`${res_raw.status}: ${res_raw.statusText}`);
    //   })
    //   .then((res_json: IGetGoodsIssue_Response) => {
    //     goodsIssueList.value = res_json.list;
    //     goodsIssueTotal.value = res_json.total;
    //   })
    //   .catch((error) => {
    //     alertFetchError(error.message);
    //   });
  };

  const saveCreateGoodsIssue = (
    argu: ICreateGoodsIssue_Request,
    callBackFn?: (arg: ICreateGoodsIssue_Response) => void
  ) => {
    fetch(`${env.value.inventory_api}/api/v1/goodissue`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(argu),
    })
      .then((res_raw) => {
        if (res_raw.ok) {
          return res_raw.json();
        }
        throw new Error(`${res_raw.status}: ${res_raw.statusText}`);
      })
      .then((res_json: ICreateGoodsIssue_Response) => {
        if (typeof callBackFn === "function") {
          callBackFn(res_json);
        }
      })
      .catch((error) => {
        alertFetchError(error.message);
      });
  };

  return {
    masterStatus,
    masterCustomer,
    masterBillTo,
    masterDeliveryTo,
    goodsIssueList,
    goodsIssueTotal,
    getMasterStatus,
    getMasterCustomer,
    getMasterBillTo,
    getMasterDeliveryTo,
    loadStoreGoodsIssue,
    saveCreateGoodsIssue,
  };
};

const useGoodsIssueOrder = () => {
  const { alertFetchError, addComma } = useUtil.useUtil();
  const goodsIssueItemsList = ref<Array<IViewGoodsIssueItem>>([]);
  const masterGoodsIssueItemsList = ref<Array<IGetProductByOwner_Response_Data>>([]);

  const getGoodsIssueItems = (
    ownerCode: string,
    giOrder: string,
    status: string,
    callBackFn?: (arg: string) => void
  ) => {
    fetch(
      `${env.value.inventory_api}/api/v1/goodissue/item/owner/${ownerCode}/giorder/${giOrder}/status/${status}`
    )
      .then((res_raw) => {
        if (res_raw.ok) {
          return res_raw.json();
        }
        throw new Error(`${res_raw.status}: ${res_raw.statusText}`);
      })
      .then((res_json: IGetGoodsIssueItem_Request) => {
        goodsIssueItemsList.value = [];
        res_json.item.forEach((itemResult: IGetGoodsIssueItem_Request_Data) => {
          const uomItemMaster: Array<IUomItemMaster> = [];
          let qtyDisplay: string = "";
          let uomDisplay: string = "";
          let statusDisplay: string = "";
          let totalDisplay: string = "";
          let issueDisplay: string = "";
          let remainDisplay: string = "";

          uomItemMaster.push({
            uomCode: itemResult.uomBase.uomCode,
            uomLabel: itemResult.uomBase.uomNameTH,
            convertQty: itemResult.uomBase.convertQty,
          });

          if (itemResult.uomBase.uomCode == itemResult.uomOrder.uomCode) {
            statusDisplay = "single";
            qtyDisplay = addComma(itemResult.uomBase.qty);
            uomDisplay = itemResult.uomBase.uomNameTH;
            totalDisplay = addComma(itemResult.total);
            issueDisplay = addComma(itemResult.issue);
            remainDisplay = addComma(itemResult.remain);
          } else {
            statusDisplay = "multi";
            uomItemMaster.push({
              uomCode: itemResult.uomOrder.uomCode,
              uomLabel: itemResult.uomOrder.uomNameTH,
              convertQty: itemResult.uomOrder.convertQty,
            });
            const itemQty1 = Math.floor(itemResult.uomBase.qty / itemResult.uomOrder.convertQty);
            const itemQty2 = itemResult.uomBase.qty % itemResult.uomOrder.convertQty;
            qtyDisplay = addComma(itemQty1).concat("/", addComma(itemQty2));
            uomDisplay = itemResult.uomOrder.uomNameTH.concat("/", itemResult.uomBase.uomNameTH);
            const totalQty1 = Math.floor(itemResult.total / itemResult.uomOrder.convertQty);
            const totalQty2 = itemResult.total % itemResult.uomOrder.convertQty;
            totalDisplay = addComma(totalQty1).concat("/", addComma(totalQty2));
            const issueQty1 = Math.floor(itemResult.issue / itemResult.uomOrder.convertQty);
            const issueQty2 = itemResult.issue % itemResult.uomOrder.convertQty;
            issueDisplay = addComma(issueQty1).concat("/", addComma(issueQty2));
            const remainQty1 = Math.floor(itemResult.remain / itemResult.uomOrder.convertQty);
            const remainQty2 = itemResult.remain % itemResult.uomOrder.convertQty;
            remainDisplay = addComma(remainQty1).concat("/", addComma(remainQty2));
          }

          itemResult.detail?.forEach((row: IGetGoodsIssueItem_Request_Data_Detail) => {
            if (statusDisplay == "single") {
              row.totalDisplay = addComma(row.total);
              row.issueDisplay = addComma(row.issue);
              row.remainDisplay = addComma(row.remain);
            } else {
              const totalQty1 = Math.floor(row.total / row.uomOrder.convertQty);
              const totalQty2 = row.total % row.uomOrder.convertQty;
              const issueQty1 = Math.floor(row.issue / row.uomOrder.convertQty);
              const issueQty2 = row.issue % row.uomOrder.convertQty;
              const remainQty1 = Math.floor(row.remain / row.uomOrder.convertQty);
              const remainQty2 = row.remain % row.uomOrder.convertQty;

              row.totalDisplay = addComma(totalQty1).concat("/", addComma(totalQty2));
              row.issueDisplay = addComma(issueQty1).concat("/", addComma(issueQty2));
              row.remainDisplay = addComma(remainQty1).concat("/", addComma(remainQty2));
            }
          });

          goodsIssueItemsList.value.push({
            ownercode: itemResult.ownercode,
            giorder: itemResult.giorder,
            tranOrder: itemResult.tranOrder,
            lineno: itemResult.lineno,
            skucode: itemResult.skucode,
            description: itemResult.description,
            zonecode: itemResult.zonecode,
            locationcode: itemResult.locationcode,
            palletno: itemResult.palletno,
            total: itemResult.total,
            issue: itemResult.issue,
            remain: itemResult.remain,
            qtyDisplay: qtyDisplay,
            uomDisplay: uomDisplay,
            uom: itemResult.uom,
            Lot: itemResult.Lot,
            batch: itemResult.batch,
            mfgdate: itemResult.mfgdate,
            expdate: itemResult.expdate,
            Grade: itemResult.Grade,
            status: itemResult.status,
            confirm: itemResult.confirm,
            uomBackOrder: itemResult.uomBackOrder,
            uomBase: itemResult.uomBase,
            uomOrder: itemResult.uomOrder,
            uomItemMaster: uomItemMaster,
            recNum: itemResult.recNum,
            detail: itemResult.detail,
            totalDisplay: totalDisplay,
            issueDisplay: issueDisplay,
            remainDisplay: remainDisplay,
          });
        });
        if (typeof callBackFn === "function") {
          callBackFn("Success");
        }
      })
      .catch((error) => {
        alertFetchError(error.message);
      });
  };

  const getZone = (whCode: string, callBackFn?: (arg: IGetZoneByWH_Response) => void) => {
    fetch(`${env.value.inventory_api}/api/v1/zone/wh/${whCode}`)
      .then((res_raw) => {
        if (res_raw.ok) {
          return res_raw.json();
        }
        throw new Error(`${res_raw.status}: ${res_raw.statusText}`);
      })
      .then((res_json: IGetZoneByWH_Response) => {
        if (typeof callBackFn === "function") {
          callBackFn(res_json);
        }
      })
      .catch((error) => {
        alertFetchError(error.message);
      });
  };

  const getPallet = (
    wh: string,
    zone: string,
    itemNo: string,
    callBackFn?: (arg: IGetPallet_Response) => void
  ) => {
    fetch(
      `${env.value.inventory_api}/api/v1/palletlocation/wh/${wh}/zone/${zone}/product/${itemNo}`
    )
      .then((res_raw) => {
        if (res_raw.ok) {
          return res_raw.json();
        }
        throw new Error(`${res_raw.status}: ${res_raw.statusText}`);
      })
      .then((res_json: IGetPallet_Response) => {
        if (typeof callBackFn === "function") {
          callBackFn(res_json);
        }
      })
      .catch((error) => {
        alertFetchError(error.message);
      });
  };

  const deleteGoodsIssueItem = (
    argu: IDeleteGoodsIssueItem_Params,
    callBackFn?: (arg: IDeleteGoodsIssueItem_Response) => void
  ) => {
    const params: IDeleteGoodsIssueItem_Request = {
      lineNo: argu.lineno,
      order: argu.giorder,
      owner: argu.ownercode,
      userId: userAuth.contactId,
    };
    fetch(`${env.value.inventory_api}/api/v1/goodissue/item`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    })
      .then((res_raw) => {
        if (res_raw.ok) {
          return res_raw.json();
        }
        throw new Error(`${res_raw.status}: ${res_raw.statusText}`);
      })
      .then((res_json: IDeleteGoodsIssueItem_Response) => {
        if (typeof callBackFn === "function") {
          callBackFn(res_json);
        }
      })
      .catch((error) => {
        alertFetchError(error.message);
      });
  };

  const deleteGoodsIssue = (
    argu: IDeleteGoodsIssue_Params,
    callBackFn?: (arg: IDeleteGoodsIssue_Response) => void
  ) => {
    const params: IDeleteGoodsIssue_Request = {
      order: argu.giOrder,
      owner: argu.ownerCode,
      remark: argu.remark,
      userid: userAuth.contactId,
    };
    fetch(`${env.value.inventory_api}/api/v1/goodissue`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    })
      .then((res_raw) => {
        if (res_raw.ok) {
          return res_raw.json();
        }
        throw new Error(`${res_raw.status}: ${res_raw.statusText}`);
      })
      .then((res_json: IDeleteGoodsIssue_Response) => {
        if (typeof callBackFn === "function") {
          callBackFn(res_json);
        }
      })
      .catch((error) => {
        alertFetchError(error.message);
      });
  };

  const saveEditGoodsIssue = (
    argu: IUpdateGoodsIssue_Request,
    callBackFn?: (arg: IUpdateGoodsIssue_Response) => void
  ) => {
    fetch(
      `${env.value.inventory_api}/api/v1/goodissue/owner/${argu.goodIssue.ownercode}/goodissue/${argu.goodIssue.giorder}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(argu),
      }
    )
      .then((res_raw) => {
        if (res_raw.ok) {
          return res_raw.json();
        }
        throw new Error(`${res_raw.status}: ${res_raw.statusText}`);
      })
      .then((res_json: IUpdateGoodsIssue_Response) => {
        if (typeof callBackFn === "function") {
          callBackFn(res_json);
        }
      })
      .catch((error) => {
        alertFetchError(error.message);
      });
  };

  const saveEditGoodsIssueItem = (
    argu: IUpdateGoodsIssueItem_Request,
    callBackFn?: (arg: IUpdateGoodsIssueItem_Response) => void
  ) => {
    fetch(`${env.value.inventory_api}/api/v1/goodissue/updateitem`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(argu),
    })
      .then((res_raw) => {
        if (res_raw.ok) {
          return res_raw.json();
        }
        throw new Error(`${res_raw.status}: ${res_raw.statusText}`);
      })
      .then((res_json: IUpdateGoodsIssueItem_Response) => {
        if (typeof callBackFn === "function") {
          callBackFn(res_json);
        }
      })
      .catch((error) => {
        alertFetchError(error.message);
      });
  };

  const getMasterGoodsIssueItems = (
    ownerCode: string,
    whCode: string,
    callBackFn?: (arg: string) => void
  ) => {
    fetch(
      // `${env.value.inventory_api}/api/v1/product/filter/owner/${ownerCode}/wh/${whCode}`
      `${env.value.inventory_api}/api/v1/product/filter/owner/${ownerCode}`
    )
      .then((res_raw) => {
        if (res_raw.ok) {
          return res_raw.json();
        }
        throw new Error(`${res_raw.status}: ${res_raw.statusText}`);
      })
      .then((res_json: IGetProductByOwner_Response) => {
        masterGoodsIssueItemsList.value = res_json.list;
        if (typeof callBackFn === "function") {
          callBackFn("Success");
        }
      })
      .catch((error) => {
        alertFetchError(error.message);
      });
  };

  const saveCreateGoodsIssueItem = (
    argu: ICreateGoodsIssueItem_Request,
    callBackFn?: (arg: ICreateGoodsIssueItem_Response) => void
  ) => {
    fetch(`${env.value.inventory_api}/api/v1/goodissue/createitem`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(argu),
    })
      .then((res_raw) => {
        if (res_raw.ok) {
          return res_raw.json();
        }
        throw new Error(`${res_raw.status}: ${res_raw.statusText}`);
      })
      .then((res_json: ICreateGoodsIssueItem_Response) => {
        if (typeof callBackFn === "function") {
          callBackFn(res_json);
        }
      })
      .catch((error) => {
        alertFetchError(error.message);
      });
  };

  const generatePicking = (
    argu: IPickByLocation_Request,
    callBackFn?: (arg: IPickByLocation_Response) => void
  ) => {
    fetch(`${env.value.inventory_api}/api/v1/goodissue/pickbylocation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(argu),
    })
      .then((res_raw) => {
        if (res_raw.ok) {
          return res_raw.json();
        }
        throw new Error(`${res_raw.status}: ${res_raw.statusText}`);
      })
      .then((res_json: IPickByLocation_Response) => {
        if (typeof callBackFn === "function") {
          callBackFn(res_json);
        }
      })
      .catch((error) => {
        alertFetchError(error.message);
      });
  };

  const reGeneratePicking = (
    argu: IPickByLocationLineItem_Request,
    callBackFn?: (arg: IPickByLocationLineItem_Response) => void
  ) => {
    fetch(`${env.value.inventory_api}/api/v1/goodissue/pickbylocationLine`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(argu),
    })
      .then((res_raw) => {
        if (res_raw.ok) {
          return res_raw.json();
        }
        throw new Error(`${res_raw.status}: ${res_raw.statusText}`);
      })
      .then((res_json: IPickByLocationLineItem_Response) => {
        if (typeof callBackFn === "function") {
          callBackFn(res_json);
        }
      })
      .catch((error) => {
        alertFetchError(error.message);
      });
  };

  const getLocation = (
    zoneCode: string,
    callBackFn?: (arg: IGetLocationByZone_Response) => void
  ) => {
    fetch(`${env.value.inventory_api}/api/v1/location/dropdown/zone/${zoneCode}`)
      .then((res_raw) => {
        if (res_raw.ok) {
          return res_raw.json();
        }
        throw new Error(`${res_raw.status}: ${res_raw.statusText}`);
      })
      .then((res_json: IGetLocationByZone_Response) => {
        if (typeof callBackFn === "function") {
          callBackFn(res_json);
        }
      })
      .catch((error) => {
        alertFetchError(error.message);
      });
  };

  const getPalletFromLocation = (
    argu: IGetPalletLocation_Params,
    callBackFn?: (arg: IGetPalletLocation_Response) => void
  ) => {
    fetch(
      `${env.value.inventory_api}/api/v1/palletlocation/location/${argu.locationCode}/product/${argu.skuCode}`
    )
      .then((res_raw) => {
        if (res_raw.ok) {
          return res_raw.json();
        }
        throw new Error(`${res_raw.status}: ${res_raw.statusText}`);
      })
      .then((res_json: IGetPalletLocation_Response) => {
        if (typeof callBackFn === "function") {
          callBackFn(res_json);
        }
      })
      .catch((error) => {
        alertFetchError(error.message);
      });
  };

  const confirmPick = (
    argu: Array<IConfirmPick_Request>,
    callBackFn?: (arg: IConfirmPick_Response) => void
  ) => {
    fetch(`${env.value.inventory_api}/api/v1/goodissue/confirmpick`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(argu),
    })
      .then((res_raw) => {
        if (res_raw.ok) {
          return res_raw.json();
        }
        throw new Error(`${res_raw.status}: ${res_raw.statusText}`);
      })
      .then((res_json: IConfirmPick_Response) => {
        if (typeof callBackFn === "function") {
          callBackFn(res_json);
        }
      })
      .catch((error) => {
        alertFetchError(error.message);
      });
  };

  const reverseDocument = (
    argu: IReversGoodsIssue_Request,
    callBackFn?: (arg: IReversGoodsIssue_Response) => void
  ) => {
    fetch(`${env.value.inventory_api}/api/v1/miscellaneous/reversgoodissue`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(argu),
    })
      .then((res_raw) => {
        if (res_raw.ok) {
          return res_raw.json();
        }
        throw new Error(`${res_raw.status}: ${res_raw.statusText}`);
      })
      .then((res_json: IReversGoodsIssue_Response) => {
        if (typeof callBackFn === "function") {
          callBackFn(res_json);
        }
      })
      .catch((error) => {
        alertFetchError(error.message);
      });
  };

  return {
    goodsIssueItemsList,
    masterGoodsIssueItemsList,
    getGoodsIssueItems,
    getZone,
    getPallet,
    deleteGoodsIssueItem,
    deleteGoodsIssue,
    saveEditGoodsIssue,
    saveEditGoodsIssueItem,
    getMasterGoodsIssueItems,
    saveCreateGoodsIssueItem,
    generatePicking,
    reGeneratePicking,
    getLocation,
    getPalletFromLocation,
    confirmPick,
    reverseDocument,
  };
};

const useSessionStorage = () => {
  const setStorage = (argu: Array<IViewGoodsIssueItem>, callBackFn?: (arg: string) => void) => {
    sessionStorage.setItem("inventory-goods-issue-picking", JSON.stringify(argu));
    if (typeof callBackFn === "function") {
      callBackFn("success");
    }
  };

  const getStorage = (callBackFn?: (arg: Array<IViewGoodsIssueItem>) => void) => {
    const ses_st = sessionStorage.getItem("inventory-goods-issue-picking");
    let storage: Array<IViewGoodsIssueItem> = [];
    if (ses_st) {
      storage = JSON.parse(ses_st);
    }
    if (typeof callBackFn === "function") {
      callBackFn(storage);
    }
  };

  const setStorageRouteParam = (argu: any, callBackFn?: (arg: string) => void) => {
    sessionStorage.setItem("templete_params", JSON.stringify(argu));
    if (typeof callBackFn === "function") {
      callBackFn("success");
    }
  };

  return {
    setStorage,
    getStorage,
    setStorageRouteParam,
  };
};

export default { useGoodsIssue, useGoodsIssueOrder, useSessionStorage };
