import type { IUom, IUomItemMaster, IUdf, IErrorResponse } from "@/interfaces/hooks/IUtil";

export interface IReceiptOrder_Data {
  area?: string;
  carLicent?: string;
  displaystatus?: string;
  docDate?: string;
  id?: number;
  orderType?: string;
  ownerCode?: string;
  ownerName?: string;
  poNO?: string;
  receiptDate?: string;
  receiptNo?: string;
  referenceNo?: string;
  status?: string;
  supplierCode?: string;
  supplierName?: string;
  whCodeDes?: string;
  whCodeSource?: string;
  whDesName?: string;
  whSourceName?: string;
  sapFlag?: number;
  sapMessages?: string;
  reservation?: string;
  materialDocument?: string;
}

export interface IReceiptOrderItem_Data {
  ownerCode?: string;
  receiptNo?: string;
  lineno?: number;
  poNO?: string;
  poLine?: number;
  skuCode?: string;
  description?: string;
  zoneCode?: string;
  locationCode?: string;
  palletNo?: string;
  lot?: string;
  batch?: string;
  mfgDate?: string;
  expDate?: string;
  grade?: string;
  uomBase: IUom;
  uomOrder: IUom;
  confirm: IUom;
  status: string;
  checkItem?: boolean;
  reasonNotFull?: string;
}

//=== Get ReceiptOrder ============================
export interface IGetReceiptOrder_Request {
  orderType?: string;
  ownerCode?: string;
  page?: number;
  pageSize?: number;
  receiptCode?: string;
  refNo?: string;
  status?: string;
  supplier?: string;
}
export interface IGetReceiptOrder_Response {
  list: Array<IReceiptOrder_Data>;
  total: number;
}
//==================================================

//=== Create ReceiptOrder ==========================
export interface ICreateReceiptOrderParams {
  referenceNo?: string;
  ownerCode?: string;
  supplierCode?: string;
  orderType?: string;
  warehouse?: string;
  docDate: string;
  receiveDate: string;
}
export interface ICreateReceiptOrder_Request {
  receiptOrder?: IReceiptOrder_Data;
  userCode?: string;
  userId?: number;
}
export interface ICreateReceiptOrder_Response {
  receiptOrder?: IReceiptOrder_Data;
}
//==================================================

//=== Update ReceiptOrder ==========================
export interface IEditReceiptOrder_Params {
  referenceNo?: string;
  ownerCode?: string;
  supplierCode?: string;
  orderType?: string;
  warehouse?: string;
  docDate?: string;
  receiveDate?: string;
  receiptNo?: string;
}
export interface IUpdateReceiptOrder_Request {
  receiptOrder?: IReceiptOrder_Data;
  userCode?: string;
  userId?: number;
}
export interface IUpdateReceiptOrder_Response {
  receiptOrder?: IReceiptOrder_Data;
}
//==================================================

//=== Delete ReceiptOrder ==========================
export interface IDeleteReceiptOrder_Params {
  ownerCode?: string;
  receiptNo?: string;
  remark?: string;
}
export interface IDeleteReceiptOrder_Request {
  UserId?: number;
  owner?: string;
  receiptNo?: string;
  remark?: string;
}
export interface IDeleteReceiptOrder_Response {
  result?: string;
}
//==================================================

//=== Get ReceiptOrder Item ========================
export interface IGetReceiptOrderItem_Response {
  item: Array<IReceiptOrderItem_Data>;
}
export interface IViewReceiveItem {
  baseConvertQty?: number;
  baseUomCode?: string;
  baseUomName?: string;
  batch?: string;
  isComponentCheckItem: boolean;
  checkItem?: boolean;
  clientId?: string;
  confirmConvertQty?: number;
  confirmUomCode?: string;
  confirmUomName?: string;
  description?: string;
  expDate?: string;
  lineNo?: number;
  loc?: string;
  lot?: string;
  mfgDate?: string;
  palletNo?: string;
  qty1?: number;
  qty2?: number;
  qtyDisplay?: string;
  receiptNo?: string;
  receiveDisplay?: string;
  receiveQty1: number;
  receiveQty2: number;
  receiveUom1?: string;
  receiveUom2?: string;
  receiveUomDisplay?: string;
  remainQtyDisplay?: string;
  remainUomDisplay?: string;
  saleConvertQty?: number;
  saleUomCode?: string;
  saleUomName?: string;
  skuCode?: string;
  status: string;
  uom1?: string;
  uom2?: string;
  uomDisplay?: string;
  uomDisplay1?: string;
  uomDisplay2?: string;
  uomItemMaster?: Array<IUomItemMaster>;
  zone?: string;
}
//==================================================

//=== Create ReceiptOrder Item =====================
export interface ICreateReceiptOrderItem_Params {
  ownerCode: string;
  batch: string;
  itemName: string;
  expDate: string;
  lot: string;
  mfgDate: string;
  palletNo: string;
  receiptNo: string;
  itemCode: string;
  qty1: number;
  uom1: string;
  qty2: number;
  uom2: string;
  qty3: number;
  uom3: string;
  batchReq: boolean;
  lotReq: boolean;
  mfgReq: boolean;
  expReq: boolean;
}
export interface ICreateReceiptOrderItem_Request {
  item: Array<ICreateReceiptOrderItem_Request_Data>;
  owner?: string;
  receipt?: string;
  refPO?: string;
  userCode?: string;
  userId?: number;
}
export interface ICreateReceiptOrderItem_Request_Data {
  batch?: string;
  description?: string;
  expDate?: string;
  grade?: string;
  id?: number;
  lineno?: number;
  locationCode?: string;
  lot?: string;
  mfgDate?: string;
  ownerCode?: string;
  palletNo?: string;
  poLine?: number;
  poNO?: string;
  qty?: number;
  qtyConfirm?: number;
  qtyOrder?: number;
  qtyReturn?: number;
  receiptNo?: string;
  skuCode?: string;
  status?: string;
  udf?: Array<IUdf>;
  uom?: string;
  uomNameEN?: string;
  uomNameTH?: string;
  uomOrder?: string;
  uomOrderNameEN?: string;
  uomOrderNameTH?: string;
  zoneCode?: string;
}
export interface ICreateReceiptOrderItem_Response {
  receiptorderItem: Array<IReceiptOrderItem_Data>;
}
//==================================================

//=== Update ReceiptOrder Item =====================
export interface IEditReceiptOrderItem_Params {
  lineNo?: number;
  receiveUom1?: string;
  receiveQty1?: number;
  receiveUom2?: string;
  receiveQty2?: number;
  palletNo?: string;
  loc?: string;
  zoneCode?: string;
  reasonNotFull?: string;
}
//==================================================

//=== Delete ReceiptOrder Item =====================
export interface IDeleteReceiptOrderItem_Request {
  UserId?: number;
  lineNo?: number;
  owner?: string;
  receiptNo?: string;
}
export interface IDeleteReceiptOrderItem_Response {
  result?: string;
}
//==================================================

//=== CheckIn ReceiptOrder Item ====================
export interface ICheckInReceiptOrderItem_Request {
  batch?: string;
  expDate?: string;
  lineNo?: number;
  locationCode?: string;
  lot?: string;
  mfgDate?: string;
  ownerCode?: string;
  palletNo?: string;
  qtyReturn?: number;
  receiptNo?: string;
  skuCode?: string;
  udf?: Array<IUdf>;
  userId?: number;
  usercode?: string;
  zoneCode?: string;
}
export interface ICheckInReceiptOrderItem_Response {
  error?: IErrorResponse;
  receiptOrderItem?: Array<IReceiptOrderItem_Data>;
  receitpOrder?: string;
}
//==================================================

//=== Putaway Location =============================
export interface IPutawayLocation_Request {
  locationCode?: string;
  zoneCode?: string;
  owner?: string;
  palletNo?: string;
  userId?: number;
}
export interface IPutawayLocation_Response {
  error?: IErrorResponse;
  receiptOrderItem?: Array<IReceiptOrderItem_Data>;
  receitpOrder?: string;
}
//==================================================

//=== Check Pallet Dupplicate ======================
export interface ICheckPalletDup_Response {
  Ok?: string;
}
//==================================================

//=========  Revers by json receiptorder ==============

export interface IReversReceiptOrderRequest {
  order: string;
  owner: string;
  remark: string;
  userId: number;
}

export interface IReversReceiptOrderRespones {
  status?: number;
  message?: string;
  error?: string;
}

//=====================================================
