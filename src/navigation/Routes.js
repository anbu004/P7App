import {
  createSwitchNavigator,
  createAppContainer,
  NavigationActions,
  StackActions,
} from 'react-navigation';
import LoginScreen from '../screen/LoginPage/Login';
import Splash from '../screen/Splash'
import Setpin from '../screen/Setpin'
import QRScan from '../screen/QRCodeScan'
import SetasecureSetpin from '../screen/Setasecurepin'
import Checkpin from '../screen/Checkpin'
import ForgetPin from '../screen/ForgetPin'
import DashboardScreen from '../screen/Dashboard/Dashboardpage'
import EnquiryScreen from '../screen/Enquiry/Enquiry'
import EnquiryFormScreen from '../screen/EnquiryForm/Enquiryformpage'
import SubDashboardScreen from '../screen/SubDashboard/Subdashboard'
import QuotationScreen from '../screen/Quotation/Quotation'
import QuotationFormScreen from '../screen/QuotationForm/Quotationform'
import CustomerScreen from '../screen/Customer/Customer'
import CustomerFormScreen from '../screen/CustomerForm/Customerform'
import OpportunityScreen from '../screen/Opportunity/Opportunity'
import OpportunityFormScreen from '../screen/OpportunityForm/Opportunityform'
import SalesSubDashboardScreen from '../screen/SalesSubDashboard/SalesSubdashboard'
import QuotationOrderdetailScreen from '../screen/QuotationForm/QuotationOrderdetails'
import ProductScreen from '../screen/Product/Product'
import ProductFormScreen from '../screen/ProductForm/Productform'
import InvoiceScreen from '../screen/Invoice/Invoice'
import InvoiceFormScreen from '../screen/Invoiceform/Invoiceform'
import InvoiceOrderdetailScreen from '../screen/Invoiceform/InvoiceOrderdetails'
import HRModuleSubDashboardScreen from '../screen/HRModuleDashbard/HRModuleDashboard'
import LeaveScreen from '../screen/Leave/Leave'
import LeaveFormScreen from '../screen/LeaveForm/Leaveform'
import AttendanceScreen from '../screen/Attendance/Attendance'
import SalesScreen from '../screen/Sales/Sales'
import SalesFormScreen from '../screen/SalesForm/Salesform'
import SalesOrderdetailScreen from '../screen/SalesForm/SalesOrderdetails'
import SettingsDashboardScreen from '../screen/SettingsDashboard/SettingDashboard'
import PurchaseScreen from '../screen/Purchase/Purchase'
import PurchaseFormScreen from '../screen/PurchaseForm/Purchaseform'
import PurchaseOrderdetailScreen from '../screen/PurchaseForm/Purchaseordetail'
import VendorInvoiceScreen from '../screen/Vendor Invoice/VendorInvoice'
import VendorsScreen from '../screen/Vendors/Vendors'
import VendorsFormScreen from '../screen/VendorsForm/Vendorsform'
import InventoryDashboardScreen from '../screen/InventoryDashboard/InventoryDashboard'
import PurchaseDashboardScreen from '../screen/PurchaseDashboard/PurchaseDashboard'
import VendorInvoiceFormScreen from '../screen/VendorInvoiceForm/VendorInvoiceform'
import CheckinCheckoutScreen from '../screen/CheckinCheckout/CheckinCheckout'
import ReceiptsScreen from '../screen/Receipts/Receipts'
import ReceiptFormScreen from '../screen/ReceiptsForm/Receiptsform'
import DeliveryScreen from '../screen/DeliveryOrder/Deliveryorder'
import DeliveryFormScreen from '../screen/DeliveryOrderForm/Deliveryorderform'
import VendorInvoiceOrderdetailScreen from '../screen/VendorInvoiceForm/VendorInvoiceorderdetails'

//========== Stack navigator routing start ===============//

const AppSwitchNavigator = createSwitchNavigator({

  Login: { screen: LoginScreen },
  Dashboardpage: { screen: DashboardScreen },
  Enquiry: { screen: EnquiryScreen },
  EnquiryForm: { screen: EnquiryFormScreen },
  Quotation: { screen: QuotationScreen },
  QuotationForm: { screen: QuotationFormScreen },
  Customer: { screen: CustomerScreen },
  CustomerForm: { screen: CustomerFormScreen },
  Opportunity: { screen: OpportunityScreen },
  OpportunityForm: { screen: OpportunityFormScreen },
  QuotationOrderdetail: { screen: QuotationOrderdetailScreen },
  Product: { screen: ProductScreen },
  ProductForm: { screen: ProductFormScreen },
  Sales: { screen: SalesScreen },
  SalesForm: { screen: SalesFormScreen },
  SalesOrderdetails: { screen: SalesOrderdetailScreen },
  Invoice: { screen: InvoiceScreen },
  InvoiceForm: { screen: InvoiceFormScreen },
  InvoiceOrderdetail: { screen: InvoiceOrderdetailScreen },
  SubDashboard: { screen: SubDashboardScreen },
  SalesSubDashboard: { screen: SalesSubDashboardScreen },
  HRModuleSubDashboard: { screen: HRModuleSubDashboardScreen },
  Leave: { screen: LeaveScreen },
  LeaveForm: { screen: LeaveFormScreen },
  Attendance: { screen: AttendanceScreen },
  Settings: { screen: SettingsDashboardScreen },
  Splash: { screen: Splash },
  Setpin: { screen: Setpin },
  QRScan: { screen: QRScan },
  SetasecureSetpin: { screen: SetasecureSetpin },
  Purchase: { screen: PurchaseScreen },
  PurchaseForm: { screen: PurchaseFormScreen },
  PurchaseOrderdetail: { screen: PurchaseOrderdetailScreen },
  VendorInvoice: { screen: VendorInvoiceScreen },
  VendorInvoiceForm: { screen: VendorInvoiceFormScreen },
  VendorInvoiceOrderdetail: { screen: VendorInvoiceOrderdetailScreen },
  PurchaseDashboard: { screen: PurchaseDashboardScreen },
  Vendors: { screen: VendorsScreen },
  VendorsForm: { screen: VendorsFormScreen },
  InventoryDashboard: { screen: InventoryDashboardScreen },
  CheckinCheckout: { screen: CheckinCheckoutScreen },
  Receipts: { screen: ReceiptsScreen },
  ReceiptForm: { screen: ReceiptFormScreen },
  Delivery: { screen: DeliveryScreen },
  Deliveryform: { screen: DeliveryFormScreen },
  Checkpin: { screen: Checkpin },
  ForgetPin: { screen: ForgetPin },

},
  {
    initialRouteName: 'Splash'
  });
//========== Bottom Tab navigator routing ==================//
const resetStack = (navigation) => {
  let parentNavigation = navigation.dangerouslyGetParent();
  let prevRoute = parentNavigation.state.routes[parentNavigation.state.index];
  let nextRoute = navigation.state;
  if (prevRoute.key !== nextRoute.key) {
    navigation.dispatch(StackActions.reset({
      index: 0, key: nextRoute.routeName,
      actions: [NavigationActions.navigate({ routeName: nextRoute.routeName })],
    }));
    navigation.dispatch(NavigationActions.navigate({ routeName: nextRoute.routeName }));
  }
}
//============ Switch navigation section end==========//

export default AppRoutes = createAppContainer(AppSwitchNavigator);