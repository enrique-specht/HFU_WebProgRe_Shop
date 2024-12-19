import { createAction, createReducer } from "@reduxjs/toolkit";

export const updatePaymentMethod = createAction<PaymentMethod>(
  "checkout/updatePaymentMethod"
);
export const updateAddress = createAction<Address>("checkout/updateAddress");

const initialState: CheckoutReducer = {
  paymentMethod: "" as PaymentMethod,
  address: { street: "", postcode: "", city: "", country: "" },
};

const checkoutReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updatePaymentMethod, (state, action) => ({
      ...state,
      paymentMethod: action.payload,
    }))
    .addCase(updateAddress, (state, action) => ({
      ...state,
      address: action.payload,
    }));
});

export default checkoutReducer;
