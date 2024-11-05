import type { IQSelectField_ZoneCode } from "@/interfaces/quasar/IQuasar";

export interface IGoodsReceipt_PopupEditOrder_Params {
  receiptNo?: string;
  referenceNo?: string;
  ownerCode?: string;
  supplierCode?: string;
  orderType?: string;
  warehouse?: string;
  docDate?: string;
  receiveDate?: string;
}

export interface IGoodsReceipt_PopupEditItemNew_Params {
  lineNo?: number;
  skuCode?: string;
  description?: string;
  loc?: string;
  palletNo?: string;
  batch?: string;
  lot?: string;
  mfg?: string;
  exp?: string;
  qty1?: number;
  uom1?: string;
  uomDisplay1?: string;
  qty2?: number;
  uom2?: string;
  uomDisplay2?: string;
  receiveQty1?: number;
  receiveUom1?: string;
  receiveQty2?: number;
  receiveUom2?: string;
  baseConvertQty?: number;
  baseUomCode?: string;
  baseUomName?: string;
  saleConvertQty?: number;
  saleUomCode?: string;
  saleUomName?: string;
  confirmConvertQty?: number;
  confirmUomCode?: string;
  confirmUomName?: string;
  selectLoc?: Array<IQSelectField_ZoneCode>;
}

export interface IGoodsReceipt_PopupEditItemCheckIn_Params {
  lineNo?: number;
  skuCode?: string;
  description?: string;
  loc?: string;
  palletNo?: string;
  batch?: string;
  lot?: string;
  mfg?: string;
  exp?: string;
  qty1?: number;
  uom1?: string;
  uomDisplay1?: string;
  qty2?: number;
  uom2?: string;
  uomDisplay2?: string;
  receiveQty1?: number;
  receiveUom1?: string;
  receiveQty2?: number;
  receiveUom2?: string;
  baseConvertQty?: number;
  baseUomCode?: string;
  baseUomName?: string;
  saleConvertQty?: number;
  saleUomCode?: string;
  saleUomName?: string;
  confirmConvertQty?: number;
  confirmUomCode?: string;
  confirmUomName?: string;
  selectLoc?: Array<IQSelectField_ZoneCode>;
}

export interface IGoodsReceipt_PopupEditItemNew_Saving {
  lineNo: number;
  loc: string;
  zoneCode: string;
  palletNo: string;
  receiveQty1: number;
  receiveUom1: string;
  receiveQty2: number;
  receiveUom2: string;
  reasonNotFull: string;
  remainQty1: number;
  remainQty2: number;
}

export interface IGoodsReceipt_PopupEditItemCheclIn_Saving {
  lineNo: number;
  loc: string;
  zoneCode: string;
}
