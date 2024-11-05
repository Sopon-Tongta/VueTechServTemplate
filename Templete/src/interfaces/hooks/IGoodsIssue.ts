import type { IUdf, IUom, IUomItemMaster, IError_Response } from "@/interfaces/hooks/IUtil";

//=== Get Goods IssueStatus ========================
export interface IGetGoodsIssueStatus_Response {
  data: Array<IGetGoodsIssueStatus_Data>;
}
export interface IGetGoodsIssueStatus_Data {
  key: string;
  value: string;
}
//==================================================

//=== Get Customer =================================
export interface IGetCustomer_Response {
  Ok: Array<IGetCustomer_Data>;
}

export interface IGetCustomer_Data {
  id: number;
  cusCode: string;
  cusName: string;
  contact: string;
  tel: string;
  email: string;
}
//==================================================

//=== Get BillTo =================================
export interface IGetBillTo_Response {
  customerBillTo: Array<IGetBillTo_Data>;
}
export interface IGetBillTo_Data {
  id: number;
  cusCode: string;
  billCode: string;
  address: string;
  tambon: string;
  district: string;
  province: string;
  country: string;
  postCode: string;
  lat: string;
  long: string;
}
//==================================================

//=== Get DeliveryTo ===============================
export interface IGetDeliveryTo_Response {
  customerDeliveryTo: Array<IGetDeliveryTo_Data>;
}
export interface IGetDeliveryTo_Data {
  id: number;
  cusCode: string;
  deliveryCode: string;
  address: string;
  tambon: string;
  district: string;
  province: string;
  country: string;
  postCode: string;
  lat: string;
  long: string;
}
//==================================================

//=== Get Goods Issue ==============================
export interface IGetGoodsIssue_Params {
  docDate: string;
  giOrder: string;
  orderType: string;
  ownerCode: string;
  pageNumber: number;
  pageSize: number;
  referenceNo: string;
  status: string;
  whCodeDes?: string;
  whCodeSource?: string;
}
//==================================================

//=== Get Goods Issue ==============================
export interface IGetGoodsIssue_Request {
  docDate: string;
  giOrder: string;
  orderType: string;
  ownerCode: string;
  pageNumber: number;
  pageSize: number;
  referenceNo: string;
  status: string;
  whCodeDes: string;
  whCodeSource: string;
}
export interface IGetGoodsIssue_Response {
  list: Array<IGoodsIssue_Data>;
  total: number;
}

export interface IGoodsIssue_Data {
  ownerCode: string;
  ownerName: string;
  giOrder: string;
  referenceNo: string;
  orderType: string;
  whCodeSource: string;
  whCodeDes: string;
  whSourceName: string;
  whDesName: string;
  cusCode: string;
  cusName: string;
  billTo: string;
  deliveryTo: string;
  docDate: string;
  deliveryDate: string;
  status: string;
}
//==================================================

//=== Create Goods Issue ===========================
export interface ICreateGoodsIssue_Request {
  goodIssue: ICreateGoodsIssue_Request_Data;
  goodIssueItem?: Array<ICreateGoodsIssue_Item>;
  usercode?: string;
  userid: number;
}
export interface ICreateGoodsIssue_Request_Data {
  billto: string;
  cuscode: string;
  cusname: string;
  deliverydate: string;
  deliveryto: string;
  docdate: string;
  giorder?: string;
  orderType: string;
  ownercode: string;
  referenceno: string;
  status?: string;
  whcodedes?: string;
  whcodesource: string;
}
export interface ICreateGoodsIssue_Item {
  Grade: string;
  Lot: string;
  Remark: string;
  batch: string;
  description: string;
  expdate: string;
  giorder: string;
  lineno: number;
  locationcode: string;
  mfgdate: string;
  ownercode: string;
  palletno: string;
  qty: number;
  qtybackorder: number;
  qtyconfirm: number;
  skucode: string;
  status: string;
  udf: Array<IUdf>;
  uom: string;
  zonecode: string;
}
export interface ICreateGoodsIssue_Response {
  goodissue: ICreateGoodsIssue_Response_Data;
}
export interface ICreateGoodsIssue_Response_Data {
  billTo: string;
  cusCode: string;
  cusName: string;
  deliveryDate: string;
  deliveryTo: string;
  docDate: string;
  giOrder: string;
  orderType: string;
  ownerCode: string;
  ownerName: string;
  referenceNo: string;
  status: string;
  whCodeDes: string;
  whCodeSource: string;
  whDesName: string;
  whSourceName: string;
  viewHeader?: boolean;
}
//==================================================

//=== Get Goods Issue Item =========================
export interface IGetGoodsIssueItem_Request {
  item: Array<IGetGoodsIssueItem_Request_Data>;
}
export interface IGetGoodsIssueItem_Request_Data {
  id: number;
  ownercode: string;
  giorder: string;
  lineno: number;
  recNum: number;
  tranOrder: string;
  skucode: string;
  description: string;
  zonecode: string;
  locationcode: string;
  palletno: string;
  uomBase: IUom;
  uomOrder: IUom;
  uomBackOrder: IUom;
  confirm: IUom;
  uom: string;
  Lot: string;
  batch: string;
  mfgdate: string;
  expdate: string;
  Grade: string;
  status: string;
  total: number;
  issue: number;
  remain: number;
  detail?: Array<IGetGoodsIssueItem_Request_Data_Detail>;
}
export interface IGetGoodsIssueItem_Request_Data_Detail {
  id: number;
  ownercode: string;
  giorder: string;
  lineno: number;
  recNum: number;
  tranOrder: string;
  skucode: string;
  description: string;
  zonecode: string;
  locationcode: string;
  palletno: string;
  uomBase: IUom;
  uomOrder: IUom;
  uomBackOrder: IUom;
  confirm: IUom;
  uom: string;
  Lot: string;
  batch: string;
  mfgdate: string;
  expdate: string;
  Grade: string;
  status: string;
  total: number;
  issue: number;
  remain: number;
  totalDisplay?: string;
  issueDisplay?: string;
  remainDisplay?: string;
}
export interface IViewGoodsIssueItem {
  ownercode: string;
  giorder: string;
  tranOrder: string;
  lineno: number;
  skucode: string;
  description: string;
  zonecode: string;
  locationcode: string;
  palletno: string;
  total: number;
  issue: number;
  remain: number;
  qtyDisplay: string;
  uomDisplay: string;
  uom: string;
  Lot: string;
  batch: string;
  mfgdate: string;
  expdate: string;
  Grade: string;
  status: string;
  confirm: IUom;
  uomBackOrder: IUom;
  uomBase: IUom;
  uomOrder: IUom;
  uomItemMaster: Array<IUomItemMaster>;
  recNum: number;
  detail?: Array<IGetGoodsIssueItem_Request_Data_Detail>;
  totalDisplay: string;
  issueDisplay: string;
  remainDisplay: string;
  checkItem?: boolean;
  qtyConfirmBase?: number;
  qtyConfirmOrder?: number;
  qtyConfirm?: string;
  qtyRemain?: string;
}
//==================================================

//=== Delete Goods Issue ======================
export interface IDeleteGoodsIssue_Params {
  giOrder: string;
  ownerCode: string;
  remark: string;
}
export interface IDeleteGoodsIssue_Request {
  order: string;
  owner: string;
  remark: string;
  userid: number;
}
export interface IDeleteGoodsIssue_Response {
  result: string;
}
//==================================================

//=== Delete Goods Issue Item ======================
export interface IDeleteGoodsIssueItem_Params {
  lineno: number;
  giorder: string;
  ownercode: string;
}
export interface IDeleteGoodsIssueItem_Request {
  lineNo: number;
  order: string;
  owner: string;
  userId: number;
}
export interface IDeleteGoodsIssueItem_Response {
  result: string;
}
//==================================================

//=== Update Goods Issue ===========================
export interface IUpdateGoodsIssue_Request {
  goodIssue: IUpdateGoodsIssue_Request_Data;
  goodIssueItem?: Array<IUpdateGoodsIssue_Request_Item>;
  usercode?: string;
  userid: number;
}
export interface IUpdateGoodsIssue_Request_Data {
  billto: string;
  cuscode: string;
  cusname: string;
  deliverydate: string;
  deliveryto: string;
  docdate: string;
  giorder: string;
  orderType: string;
  ownercode: string;
  referenceno: string;
  status?: string;
  whcodedes?: string;
  whcodesource: string;
}
export interface IUpdateGoodsIssue_Request_Item {
  Grade: string;
  Lot: string;
  Remark: string;
  batch: string;
  description: string;
  expdate: string;
  giorder: string;
  lineno: 0;
  locationcode: string;
  mfgdate: string;
  ownercode: string;
  palletno: string;
  qty: 0;
  qtybackorder: 0;
  qtyconfirm: 0;
  skucode: string;
  status: string;
  udf: Array<IUdf>;
  uom: string;
  zonecode: string;
}
export interface IUpdateGoodsIssue_Response {
  goodissue: IUpdateGoodsIssue_Response_Data;
}
export interface IUpdateGoodsIssue_Response_Data {
  billTo: string;
  cusCode: string;
  cusName: string;
  deliveryDate: string;
  deliveryTo: string;
  docDate: string;
  giOrder: string;
  orderType: string;
  ownerCode: string;
  ownerName: string;
  referenceNo: string;
  status: string;
  whCodeDes: string;
  whCodeSource: string;
  whDesName: string;
  whSourceName: string;
}
//==================================================

//=== Update Goods Issue Item =======================
export interface IUpdateGoodsIssueItem_Request {
  giitem: Array<IUpdateGoodsIssueItem_Request_Data>;
  order: string;
  owner: string;
  userid: number;
}
export interface IUpdateGoodsIssueItem_Request_Data {
  Grade: string;
  Lot: string;
  Remark?: string;
  batch: string;
  description: string;
  expdate: string;
  giorder: string;
  lineno: number;
  locationcode: string;
  mfgdate: string;
  ownercode: string;
  palletno: string;
  qty: number;
  qtybackorder: number;
  qtyconfirm: number;
  skucode: string;
  status: string;
  udf: Array<IUdf>;
  uom: string;
  zonecode: string;
}
export interface IUpdateGoodsIssueItem_Response {
  receiptItem: Array<IUpdateGoodsIssueItem_Response_Data>;
  error?: IError_Response;
}
export interface IUpdateGoodsIssueItem_Response_Data {
  Grade: string;
  Lot: string;
  batch: string;
  confirm: IUom;
  description: string;
  expdate: string;
  giorder: string;
  id: number;
  issue: number;
  lineno: number;
  locationcode: string;
  mfgdate: string;
  ownercode: string;
  palletno: string;
  recNum: number;
  remain: number;
  skucode: string;
  status: string;
  total: number;
  tranOrder: string;
  uom: string;
  uomBackOrder: IUom;
  uomBase: IUom;
  uomOrder: IUom;
  zonecode: string;
}
//==================================================

//=== Create Goods Issue Item ======================
export interface ICreateGoodsIssueItem_Request {
  giitem: Array<ICreateGoodsIssueItem_Request_Data>;
  order: string;
  owner: string;
  userid: number;
}
export interface ICreateGoodsIssueItem_Request_Data {
  Grade: string;
  Lot: string;
  Remark?: string;
  batch: string;
  description: string;
  expdate: string;
  giorder: string;
  lineno: number;
  locationcode: string;
  mfgdate: string;
  ownercode: string;
  palletno: string;
  qty: number;
  qtybackorder: number;
  qtyconfirm: number;
  skucode: string;
  status: string;
  udf: Array<IUdf>;
  uom: string;
  zonecode: string;
}
export interface ICreateGoodsIssueItem_Response {
  receiptItem: Array<ICreateGoodsIssueItem_Response_Data>;
  error?: IError_Response;
}
export interface ICreateGoodsIssueItem_Response_Data {
  Grade: string;
  Lot: string;
  batch: string;
  confirm: IUom;
  description: string;
  expdate: string;
  giorder: string;
  id: number;
  issue: number;
  lineno: number;
  locationcode: string;
  mfgdate: string;
  ownercode: string;
  palletno: string;
  recNum: number;
  remain: number;
  skucode: string;
  status: string;
  total: number;
  tranOrder: string;
  uom: string;
  uomBackOrder: IUom;
  uomBase: IUom;
  uomOrder: IUom;
  zonecode: string;
}
//==================================================

//=== PickByLocation ===============================
export interface IPickByLocation_Request {
  lineno?: number;
  order: string;
  owner: string;
  usercode?: string;
  userid: number;
}
export interface IPickByLocation_Response {
  result: string;
  error?: IError_Response;
}
//==================================================

//=== PickByLocation ===============================
export interface IPickByLocationLineItem_Request {
  lineno: number;
  order: string;
  owner: string;
  usercode?: string;
  userid: number;
}
export interface IPickByLocationLineItem_Response {
  result?: string;
  error?: {
    Status: number;
    Message: string;
    Code: number;
  };
}
//==================================================

//=== Confirm Pick =================================
export interface IConfirmPick_Request {
  location: string;
  owner: string;
  palletNo: string;
  qtyPick: number;
  recNum: number;
  lineNo: number;
  skuCode: string;
  transOrder: string;
  userId: number;
}
export interface IConfirmPick_Response {
  goodissue: IConfirmPick_Response_Data;
}
export interface IConfirmPick_Response_Data {
  billTo: string;
  cusCode: string;
  cusName: string;
  deliveryDate: string;
  deliveryTo: string;
  docDate: string;
  giOrder: string;
  orderType: string;
  ownerCode: string;
  ownerName: string;
  referenceNo: string;
  status: string;
  whCodeDes: string;
  whCodeSource: string;
  whDesName: string;
  whSourceName: string;
}
//==================================================

//=== Revers Goods Issue ===========================
export interface IReversGoodsIssue_Request {
  order: string;
  owner: string;
  remark: string;
  userId: number;
}
export interface IReversGoodsIssue_Response {
  message: string;
  status: number;
  error?: string;
}
//==================================================
