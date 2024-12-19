import { RadioButton } from "primereact/radiobutton";
import { updatePaymentMethod } from "../../store/checkoutReducer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import "./PaymentMethods.scss";

function PaymentMethod() {
  const paymentMethod = useAppSelector((state) => state.checkout.paymentMethod);
  const dispatch = useAppDispatch();

  return (
    <div className="PaymentMethods">
      <span className="payment-method">
        <RadioButton
          inputId="payment-sepa"
          name="payment-sepa"
          value="SEPA"
          onChange={(e) => dispatch(updatePaymentMethod(e.value))}
          checked={paymentMethod === "SEPA"}
        />
        <label htmlFor="payment-sepa">SEPA-Lastschrift</label>
      </span>
      <span className="payment-method">
        <RadioButton
          inputId="payment-creditcard"
          name="payment-creditcard"
          value="creditCard"
          onChange={(e) => dispatch(updatePaymentMethod(e.value))}
          checked={paymentMethod === "creditCard"}
        />
        <label htmlFor="payment-creditcard">Kreditkarte</label>
      </span>
    </div>
  );
}

export default PaymentMethod;
