import { ref } from "vue";
import useUtil from "@/hooks/useUtil";
import { storeToRefs } from "pinia";
import { useConfigStore } from "@/stores/ConfigStore";
import { useAuthStore } from "@/stores/AuthStore";
import type {
  IReceiptOrder_Data,
  ICreateReceiptOrderParams,
  ICreateReceiptOrder_Response,
  ICreateReceiptOrder_Request,
  IEditReceiptOrder_Params,
  IUpdateReceiptOrder_Response,
  IUpdateReceiptOrder_Request,
  IDeleteReceiptOrder_Params,
  IDeleteReceiptOrder_Response,
  IDeleteReceiptOrder_Request,
  IGetReceiptOrder_Response,
  IGetReceiptOrder_Request,
  IViewReceiveItem,
  IReceiptOrderItem_Data,
  IGetReceiptOrderItem_Response,
  ICreateReceiptOrderItem_Params,
  ICreateReceiptOrderItem_Response,
  ICreateReceiptOrderItem_Request_Data,
  ICreateReceiptOrderItem_Request,
  IEditReceiptOrderItem_Params,
  IDeleteReceiptOrderItem_Response,
  IDeleteReceiptOrderItem_Request,
  ICheckInReceiptOrderItem_Request,
  ICheckInReceiptOrderItem_Response,
  ICheckPalletDup_Response,
  IPutawayLocation_Request,
  IPutawayLocation_Response,
  IReversReceiptOrderRequest,
  IReversReceiptOrderRespones,
} from "@/interfaces/hooks/IGoodsReceipt";
import type { IUomItemMaster, IUdf } from "@/interfaces/hooks/IUtil";

const { env } = storeToRefs(useConfigStore());
const { userAuth } = useAuthStore();

const useReceiveOrder = () => {
  const { formatDate_DB, alertFetchError } = useUtil.useUtil();
  const receiveOrderList = ref<Array<IReceiptOrder_Data>>([]);
  const receiveOrderTotal = ref<number>(0);

  const saveReceiveOrder = (
    saveOrder: ICreateReceiptOrderParams,
    callBackFn?: (arg: ICreateReceiptOrder_Response) => void
  ) => {
    const receiptOrder: IReceiptOrder_Data = {
      referenceNo: saveOrder.referenceNo,
      ownerCode: saveOrder.ownerCode,
      supplierCode: saveOrder.supplierCode,
      orderType: saveOrder.orderType,
      whCodeDes: saveOrder.warehouse,
      whCodeSource: saveOrder.warehouse,
      docDate: formatDate_DB(saveOrder.docDate),
      receiptDate: formatDate_DB(saveOrder.receiveDate),
    };

    const params: ICreateReceiptOrder_Request = {
      receiptOrder: receiptOrder,
      userId: userAuth.contactId,
      userCode: userAuth.contactId.toString(),
    };

    fetch(`${env.value.inventory_api}/api/v1/receiptorder`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`${res.status}: ${res.statusText}`);
      })
      .then((resJson: ICreateReceiptOrder_Response) => {
        if (typeof callBackFn === "function") {
          callBackFn(resJson);
        }
      })
      .catch((error) => {
        alertFetchError(error.message);
      });
  };

  const editReceiveOrder = (
    editOrder: IEditReceiptOrder_Params,
    callBackFn?: (arg: IUpdateReceiptOrder_Response) => void
  ) => {
    const receiptOrder: IReceiptOrder_Data = {
      referenceNo: editOrder.referenceNo,
      ownerCode: editOrder.ownerCode,
      supplierCode: editOrder.supplierCode,
      orderType: editOrder.orderType,
      whCodeDes: editOrder.warehouse,
      whCodeSource: editOrder.warehouse,
      docDate: formatDate_DB(editOrder.docDate!),
      receiptDate: formatDate_DB(editOrder.receiveDate!),
      receiptNo: editOrder.receiptNo,
    };
    const params: IUpdateReceiptOrder_Request = {
      receiptOrder: receiptOrder,
      userId: userAuth.contactId,
    };
    fetch(
      `${env.value.inventory_api}/api/v1/receiptorder/owner/${editOrder.ownerCode}/receipt/${editOrder.receiptNo}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`${res.status}: ${res.statusText}`);
      })
      .then((resJson: IUpdateReceiptOrder_Response) => {
        if (typeof callBackFn === "function") {
          callBackFn(resJson);
        }
      })
      .catch((error) => {
        alertFetchError(error.message);
      });
  };

  const deleteReceiveOrder = (
    delOrder: IDeleteReceiptOrder_Params,
    callBackFn?: (arg: IDeleteReceiptOrder_Response) => void
  ) => {
    const delParams: IDeleteReceiptOrder_Request = {
      UserId: 7,
      owner: delOrder.ownerCode,
      receiptNo: delOrder.receiptNo,
      remark: delOrder.remark,
    };

    fetch(`${env.value.inventory_api}/api/v1/receiptorder`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(delParams),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`${res.status}: ${res.statusText}`);
      })
      .then((resJson: IDeleteReceiptOrder_Response) => {
        if (typeof callBackFn === "function") {
          callBackFn(resJson);
        }
      })
      .catch((error) => {
        alertFetchError(error.message);
      });
  };

  const searchReceiveOrder = (
    status: string | null,
    refNo: string | null,
    receiptNo: string | null,
    owner: string | null,
    orderType: string | null,
    page: number,
    pageSize: number,
    callBackFn?: (arg: IGetReceiptOrder_Response) => void
  ) => {
    const params: IGetReceiptOrder_Request = {
      orderType: orderType == null ? "" : orderType.toLowerCase(),
      ownerCode: owner == null ? "" : owner.toLowerCase(),
      page: page,
      pageSize: pageSize,
      receiptCode: receiptNo == null ? "" : receiptNo.toLowerCase(),
      refNo: refNo == null ? "" : refNo.toLowerCase(),
      status: status == null ? "" : status.toLowerCase() == "all" ? "" : status.toLowerCase(),
      supplier: "",
    };

    const res: IGetReceiptOrder_Response = {
      list: [{
        receiptNo: "10001",
        ownerCode: "Test-001",
        referenceNo: "XXX1",
        orderType: "SAP-DO",
        whCodeSource: "AYUTTAYA",
        docDate: "2024-05-05",
        receiptDate: "2024-05-05",
        status: "NEW"
      }],
      total: 1,
    };
    receiveOrderList.value = res.list;
    receiveOrderTotal.value = res.total;

    // fetch(`${env.value.inventory_api}/api/v1/receiptorder/list`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(params),
    // })
    //   .then((res) => {
    //     if (res.ok) {
    //       return res.json();
    //     }
    //     throw new Error(`${res.status}: ${res.statusText}`);
    //   })
    //   .then((resJson: IGetReceiptOrder_Response) => {
    //     receiveOrderList.value = resJson.list;
    //     receiveOrderTotal.value = resJson.total;
    //     if (typeof callBackFn === "function") {
    //       callBackFn(resJson);
    //     }
    //   })
    //   .catch((error) => {
    //     alertFetchError(error.message);
    //   });
  };

  const reversReceiptOrder = (
    req: IReversReceiptOrderRequest,
    callBackFn?: (arg: IReversReceiptOrderRespones) => void
  ) => {
    fetch(`${env.value.inventory_api}/api/v1/miscellaneous/reversgoodreceipt`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`${res.status} : ${res.statusText}`);
      })
      .then((resJson: IReversReceiptOrderRespones) => {
        if (typeof callBackFn === "function") {
          callBackFn(resJson);
        }
      })
      .catch((error) => {
        alertFetchError(error.message);
      });
  };

  return {
    receiveOrderList,
    receiveOrderTotal,
    saveReceiveOrder,
    editReceiveOrder,
    deleteReceiveOrder,
    searchReceiveOrder,
    reversReceiptOrder,
  };
};

const useReceiveItem = () => {
  const { uid, formatDate_DB, alertFetchError, addComma } = useUtil.useUtil();
  const receiveItemList = ref<Array<IViewReceiveItem>>([]);
  const receiveItemTotal = ref<number>(0);

  const isComponentCheckItem = (data: IViewReceiveItem): boolean => {
    switch (data.status) {
      case "NEW":
        return data.receiveQty1 > 0 || data.receiveQty2 > 0;
      case "CHECKIN":
        return data.loc !== undefined && data.loc.length > 0;
    }
    return false;
  };

  const calculateOrderStatus = (callBackFn?: (arg: string) => void) => {
    let orderStatus = "";
    let count_new = 0;
    let count_checkin = 0;
    let count_putaway = 0;

    receiveItemList.value.forEach((item) => {
      switch (item.status.toUpperCase()) {
        case "NEW":
          count_new++;
          break;
        case "CHECKIN":
          count_checkin++;
          break;
        case "PUTAWAY":
          count_putaway++;
          break;
      }
    });

    if (count_new >= 0 && count_checkin == 0 && count_putaway == 0) {
      orderStatus = "NEW";
    } else if (count_new > 0 && count_checkin > 0 && count_putaway == 0) {
      orderStatus = "PARTIAL CHECKIN";
    } else if (count_new > 0 && count_checkin > 0 && count_putaway > 0) {
      orderStatus = "PARTIAL PUTAWAY";
    } else if (count_new == 0 && count_checkin > 0 && count_putaway > 0) {
      orderStatus = "PARTIAL PUTAWAY";
    } else if (count_new == 0 && count_checkin > 0 && count_putaway == 0) {
      orderStatus = "CHECKIN";
    } else if (count_new == 0 && count_checkin == 0 && count_putaway > 0) {
      orderStatus = "CLOSE";
    } else if (count_new > 0 && count_checkin == 0 && count_putaway > 0) {
      orderStatus = "PARTIAL PUTAWAY";
    }

    if (typeof callBackFn === "function") {
      callBackFn(orderStatus);
    }
  };

  const calculateRemainItem = (
    itemFromAPI: Array<IReceiptOrderItem_Data>,
    callBackFn?: (arg: Array<IViewReceiveItem>) => void
  ) => {
    receiveItemList.value = [];
    itemFromAPI.forEach((itemResult) => {
      const uomItemMaster: Array<IUomItemMaster> = [];
      let uomDisplay1 = "";
      let uomDisplay2 = "";
      let itemQty1 = 0;
      let itemQty2 = 0;
      let itemUom1 = "";
      let itemUom2 = "";
      let receiveQty1 = 0;
      let receiveQty2 = 0;
      let remainQty1 = 0;
      let remainQty2 = 0;
      if (itemResult.uomBase.uomCode == itemResult.uomOrder.uomCode) {
        uomDisplay1 = itemResult.uomBase.uomNameTH;
        itemQty1 = itemResult.uomBase.qty;
        itemQty2 = 0;
        itemUom1 = itemResult.uomBase.uomCode;
        itemUom2 = "";
        receiveQty1 = itemResult.confirm.qty;
        receiveQty2 = 0;
        remainQty1 = itemResult.uomBase.qty - itemResult.confirm.qty;
        remainQty2 = 0;
        uomItemMaster.push({
          uomCode: itemResult.uomBase.uomCode,
          uomLabel: itemResult.uomBase.uomNameTH,
          convertQty: itemResult.uomBase.convertQty,
        });
      } else {
        uomDisplay1 = itemResult.uomOrder.uomNameTH;
        uomDisplay2 = itemResult.uomBase.uomNameTH;
        itemQty1 = itemResult.uomBase.qty / itemResult.uomOrder.convertQty;
        itemQty2 = itemResult.uomBase.qty % itemResult.uomOrder.convertQty;
        itemUom1 = itemResult.uomOrder.uomCode;
        itemUom2 = itemResult.uomBase.uomCode;

        receiveQty1 = itemResult.confirm.qty / itemResult.uomOrder.convertQty;
        receiveQty2 = itemResult.confirm.qty % itemResult.uomOrder.convertQty;

        let minusQty = itemResult.uomBase.qty - itemResult.confirm.qty;
        minusQty = minusQty < 0 ? 0 : minusQty;

        remainQty1 = minusQty / itemResult.uomOrder.convertQty;
        remainQty2 = minusQty % itemResult.uomOrder.convertQty;

        uomItemMaster.push({
          uomCode: itemResult.uomOrder.uomCode,
          uomLabel: itemResult.uomOrder.uomNameTH,
          convertQty: itemResult.uomOrder.convertQty,
        });

        uomItemMaster.push({
          uomCode: itemResult.uomBase.uomCode,
          uomLabel: itemResult.uomBase.uomNameTH,
          convertQty: itemResult.uomBase.convertQty,
        });
      }

      let qtyDisplay = addComma(itemQty1);
      let uomDisplay = uomDisplay1;
      let receiveDisplay = addComma(receiveQty1);
      let receiveUomDisplay = uomDisplay1;
      let remainQtyDisplay = addComma(remainQty1);
      let remainUomDisplay = uomDisplay1;

      if (itemUom1.length > 0 && itemUom2.length > 0 && itemUom1 !== itemUom2) {
        qtyDisplay = qtyDisplay.concat("/", addComma(itemQty2));
        uomDisplay = uomDisplay.concat("/", uomDisplay2);

        if (receiveQty1 > 0 || receiveQty2 > 0) {
          receiveDisplay = receiveDisplay.concat("/", addComma(receiveQty2));
        } else {
          receiveDisplay = "-/-";
        }
        receiveUomDisplay = receiveUomDisplay.concat("/", uomDisplay2);

        remainQtyDisplay = remainQtyDisplay.concat("/", addComma(remainQty2));
        remainUomDisplay = remainUomDisplay.concat("/", uomDisplay2);
      } else {
        if (receiveQty1 > 0) {
          receiveDisplay = addComma(receiveQty1);
        } else {
          receiveDisplay = "-";
        }
      }

      const viewItemPush: IViewReceiveItem = {
        clientId: uid(),
        lineNo: itemResult.lineno,
        receiptNo: itemResult.receiptNo,
        skuCode: itemResult.skuCode,
        description: itemResult.description,
        palletNo: itemResult.palletNo,
        lot: itemResult.lot,
        batch: itemResult.batch,
        qty1: itemQty1,
        uom1: itemUom1,
        uomDisplay1: uomDisplay1,
        qty2: itemQty2,
        uom2: itemUom2,
        uomDisplay2: uomDisplay2,
        receiveQty1: receiveQty1,
        receiveUom1: itemUom1,
        receiveQty2: receiveQty2,
        receiveUom2: itemUom2,
        zone: itemResult.zoneCode,
        loc: itemResult.locationCode,
        mfgDate: itemResult.mfgDate,
        expDate: itemResult.expDate,
        status: itemResult.status,
        qtyDisplay: qtyDisplay,
        uomDisplay: uomDisplay,
        receiveDisplay: receiveDisplay,
        receiveUomDisplay: receiveUomDisplay,
        remainQtyDisplay: remainQtyDisplay,
        remainUomDisplay: remainUomDisplay,
        uomItemMaster: uomItemMaster,
        baseConvertQty: itemResult.uomBase.convertQty,
        baseUomCode: itemResult.uomBase.uomCode,
        baseUomName: itemResult.uomBase.uomNameTH,
        saleConvertQty: itemResult.uomOrder.convertQty,
        saleUomCode: itemResult.uomOrder.uomCode,
        saleUomName: itemResult.uomOrder.uomNameTH,
        confirmConvertQty: itemResult.confirm.convertQty,
        confirmUomCode: itemResult.confirm.uomCode,
        confirmUomName: itemResult.confirm.uomNameTH,
        checkItem: itemResult.checkItem,
        isComponentCheckItem: false,
      };

      receiveItemList.value.push(viewItemPush);
    });

    receiveItemList.value.forEach((item) => {
      item.isComponentCheckItem = isComponentCheckItem(item);
    });

    if (typeof callBackFn === "function") {
      callBackFn(receiveItemList.value);
    }
  };

  const searchReceiveItem = (
    receiptNo: string,
    ownerCode: string,
    loadSS: boolean,
    callBackFn?: (arg: string) => void
  ) => {
    if (typeof callBackFn === "function") {
      callBackFn("NEW");
    }
    // const itemSessionJson = sessionStorage.getItem("inventory-goods-receipt-item");
    // if (itemSessionJson && loadSS) {
    //   const itemSession: Array<IReceiptOrderItem_Data> = JSON.parse(itemSessionJson);
    //   calculateRemainItem(itemSession, () => calculateOrderStatus(callBackFn));
    // } else {
    //   const url = `${env.value.inventory_api}/api/v1/receiptorder/item/owner/${ownerCode}/receipt/${receiptNo}`;
    //   fetch(url)
    //     .then((res) => {
    //       if (res.ok) {
    //         return res.json();
    //       }
    //       throw new Error(`${res.status}: ${res.statusText}`);
    //     })
    //     .then((resJson: IGetReceiptOrderItem_Response) => {
    //       const itemFromAPI: Array<IReceiptOrderItem_Data> = resJson.item;
    //       itemFromAPI.map((data: IReceiptOrderItem_Data) => {
    //         data.checkItem = false;
    //         data.reasonNotFull = "";
    //       });
    //       const jsonItem: string = JSON.stringify(itemFromAPI);
    //       sessionStorage.setItem("inventory-goods-receipt-item", jsonItem);
    //       calculateRemainItem(itemFromAPI, () => calculateOrderStatus(callBackFn));
    //     })
    //     .catch((error) => {
    //       alertFetchError(error.message);
    //     });
    // }
  };

  const createReceiveItem = (
    item: ICreateReceiptOrderItem_Params,
    callBackFn?: (arg: ICreateReceiptOrderItem_Response) => void
  ) => {
    const itemParam: Array<ICreateReceiptOrderItem_Request_Data> = [];
    const udfSave: Array<IUdf> = [];
    if (item.qty1 > 0) {
      udfSave.push({
        qty: item.qty1,
        uom: item.uom1,
      });
    }
    if (item.qty2 > 0) {
      udfSave.push({
        qty: item.qty2,
        uom: item.uom2,
      });
    }
    if (item.qty3 > 0) {
      udfSave.push({
        qty: item.qty3,
        uom: item.uom3,
      });
    }

    itemParam.push({
      ownerCode: item.ownerCode,
      batch: item.batch,
      description: item.itemName,
      expDate: formatDate_DB(item.expDate),
      locationCode: "",
      lot: item.lot,
      mfgDate: formatDate_DB(item.mfgDate),
      palletNo: item.palletNo,
      receiptNo: item.receiptNo,
      skuCode: item.itemCode,
      udf: udfSave,
    });

    const reqParams: ICreateReceiptOrderItem_Request = {
      owner: item.ownerCode,
      receipt: item.receiptNo,
      userId: userAuth.contactId,
      item: itemParam,
    };

    fetch(`${env.value.inventory_api}/api/v1/receiptorder/item`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqParams),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`${res.status}: ${res.statusText}`);
      })
      .then((resJson: ICreateReceiptOrderItem_Response) => {
        if (typeof callBackFn === "function") {
          callBackFn(resJson);
        }
      })
      .catch((error) => {
        alertFetchError(error.message);
      });
  };

  const saveReceiveItem = (
    saveMode: string,
    editData: IEditReceiptOrderItem_Params,
    callBackFn?: (arg: string) => void
  ) => {
    const itemSessionJson = sessionStorage.getItem("inventory-goods-receipt-item");
    if (itemSessionJson) {
      const itemSession: Array<IReceiptOrderItem_Data> = JSON.parse(itemSessionJson);
      itemSession.map((f) => {
        if (f.lineno == editData.lineNo) {
          if (saveMode.toUpperCase() == "CHECKIN") {
            let sumBaseReceiveQty = 0;
            if (f.uomBase.uomCode == editData.receiveUom1) {
              sumBaseReceiveQty += editData.receiveQty1!;
            } else {
              sumBaseReceiveQty += editData.receiveQty1! * f.uomOrder.convertQty;
            }

            if (f.uomBase.uomCode == editData.receiveUom2) {
              sumBaseReceiveQty += editData.receiveQty2!;
            } else {
              sumBaseReceiveQty += editData.receiveQty2! * f.uomOrder.convertQty;
            }
            f.confirm.qty = sumBaseReceiveQty;
            f.palletNo = editData.palletNo;
            f.locationCode = editData.loc;
            f.zoneCode = editData.zoneCode;
            f.reasonNotFull = editData.reasonNotFull;
            f.checkItem = true;
          } else if (saveMode.toUpperCase() == "PUTAWAY") {
            f.locationCode = editData.loc;
            f.zoneCode = editData.zoneCode;
            f.checkItem = true;
          }
        }
      });
      sessionStorage.setItem("inventory-goods-receipt-item", JSON.stringify(itemSession));
      calculateRemainItem(itemSession, () => calculateOrderStatus(callBackFn));
    }
  };

  const delelteReceiveItem = (
    lineNo: number,
    ownerCode: string,
    receiptNo: string,
    callBackFn?: (arg: IDeleteReceiptOrderItem_Response) => void
  ) => {
    const params: Array<IDeleteReceiptOrderItem_Request> = [
      {
        UserId: 7,
        lineNo: lineNo,
        owner: ownerCode,
        receiptNo: receiptNo,
      },
    ];
    fetch(`${env.value.inventory_api}/api/v1/receiptorder/item`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`${res.status}: ${res.statusText}`);
      })
      .then((resJson: IDeleteReceiptOrderItem_Response) => {
        if (typeof callBackFn === "function") {
          callBackFn(resJson);
        }
      })
      .catch((error) => {
        alertFetchError(error.message);
      });
  };

  const saveCheckItemToConfirm = (
    lineNoList: Array<number>,
    callBackFn?: (arg: string) => void
  ) => {
    const itemSessionJson = sessionStorage.getItem("inventory-goods-receipt-item");
    if (itemSessionJson) {
      const itemSession: Array<IReceiptOrderItem_Data> = JSON.parse(itemSessionJson);
      itemSession.map((ms: IReceiptOrderItem_Data) => {
        ms.checkItem = lineNoList.findIndex((lineNo) => lineNo == ms.lineno) > -1;
      });
      sessionStorage.setItem("inventory-goods-receipt-item", JSON.stringify(itemSession));
      calculateRemainItem(itemSession, () => calculateOrderStatus(callBackFn));
    }
  };

  const checkInReceiveItem = (
    checkInSaveList: Array<ICheckInReceiptOrderItem_Request>,
    callBackFn?: (arg: ICheckInReceiptOrderItem_Response) => void
  ) => {
    fetch(`${env.value.inventory_api}/api/v1/receiptorder/checkIn`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(checkInSaveList),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`${res.status}: ${res.statusText}`);
      })
      .then((resJson: ICheckInReceiptOrderItem_Response) => {
        if (typeof callBackFn === "function") {
          callBackFn(resJson);
        }
      })
      .catch((error) => {
        alertFetchError(error.message);
      });
  };

  const putAwayReceiveItem = (
    item: Array<IPutawayLocation_Request>,
    callBackFn?: (arg: IPutawayLocation_Response) => void
  ) => {
    fetch(`${env.value.inventory_api}/api/v1/receiptorder/putawaylocation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`${res.status}: ${res.statusText}`);
      })
      .then((resJson: IPutawayLocation_Response) => {
        if (typeof callBackFn === "function") {
          callBackFn(resJson);
        }
      })
      .catch((error) => {
        alertFetchError(error.message);
      });
  };

  const checkPalletDup = (palletName: string, callBackFn?: (arg: boolean) => void) => {
    fetch(`${env.value.inventory_api}/api/v1/pallet/${palletName}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`${res.status}: ${res.statusText}`);
      })
      .then((resJson: ICheckPalletDup_Response) => {
        const isDup = resJson.Ok !== null;
        if (typeof callBackFn === "function") {
          callBackFn(isDup);
        }
      })
      .catch((error) => {
        alertFetchError(error.message);
      });
  };

  return {
    receiveItemList,
    receiveItemTotal,
    searchReceiveItem,
    createReceiveItem,
    saveReceiveItem,
    delelteReceiveItem,
    saveCheckItemToConfirm,
    checkInReceiveItem,
    putAwayReceiveItem,
    checkPalletDup,
  };
};

export default { useReceiveOrder, useReceiveItem };
