import { BaseService } from "../../app/api/base.service";
import type { ResponseSuccess } from "../../app/interface";
import type {
  OrderRequest,
  CreateOrderRequest,
  OrderDetailRequest,
  ChangeOrderStatusRequest,
  MyOrderRequest,
  GetOrderByIdRequest,
} from "../../types/order/Order.req.type";
import type { OrderResponse } from "../../types/order/Order.res.type";
import { API_PATH } from "../../consts/api.path.const";

export const OrderService = {
  getOrders(params: OrderRequest) {
    return BaseService.get<ResponseSuccess<OrderResponse[]>>({
      url: API_PATH.ORDER.GET_ORDERS,
      payload: params,
    });
  },
  createOrder(params: CreateOrderRequest) {
    return BaseService.post<ResponseSuccess<OrderResponse>>({
      url: API_PATH.ORDER.CREATE_ORDER,
      payload: params,
    });
  },
  getOrderById(params: OrderDetailRequest) {
    return BaseService.get<ResponseSuccess<OrderResponse>>({
      url: API_PATH.ORDER.GET_ORDER_BY_ID(params.orderId),
      payload: params,
    });
  },
  changeOrderStatus(params: ChangeOrderStatusRequest) {
    return BaseService.put<ResponseSuccess<OrderResponse>>({
      url: API_PATH.ORDER.CHANGE_ORDER_STATUS(params.orderId, params.newStatus),
      payload: undefined,
    });
  },
  getOrderByUserId: (params: MyOrderRequest) => {
    return BaseService.get<ResponseSuccess<OrderResponse[]>>({
      url: API_PATH.ORDER.GET_ORDER_BY_USER_ID,
      payload: params,
    });
  },
  getOrderByIdRequest: (params: GetOrderByIdRequest) => {
    return BaseService.get<ResponseSuccess<OrderResponse>>({
      url: API_PATH.ORDER.GET_ORDER_BY_ID(params.orderId),
      payload: params,
    });
  },
};
