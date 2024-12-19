import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import "./Checkout.scss";
import CheckoutArticlePreview from "../../components/CheckoutArticlePreview/CheckoutArticlePreview";
import { Button } from "primereact/button";
import axiosInstance from "../../services/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";
import { clearCart, loadUserState } from "../../store/userReducer";
import LoginSignupSwitch from "../../components/LoginSignupSwitch/LoginSignupSwitch";
import { Toast } from "primereact/toast";
import { MenuItem } from "primereact/menuitem";
import { Steps } from "primereact/steps";
import PaymentMethod from "../../components/PaymentMethods/PaymentMethods";
import DeliveryAddressForm from "../../components/DeliveryAddressForm/DeliveryAddressForm";

function Checkout() {
  const navigate = useNavigate();
  const locationState = useLocation().state as CheckoutRouterState; //https://dev.to/thatfemicode/passing-data-states-through-react-router-8dh
  const { isLoggedIn, user, isLoading } = useAppSelector((state) => state.user);
  const { paymentMethod, address } = useAppSelector((state) => state.checkout);
  const dispatch = useAppDispatch();
  const toast = useRef<Toast>(null);

  useEffect(() => {
    dispatch(loadUserState());
  }, []);

  useEffect(() => {
    if (!locationState) navigate("/");
  }, [locationState, navigate]);

  if (isLoading) return;

  const onBuyClick = () => {
    const body = locationState.articlesForCheckout.reduce<CheckoutRequest>(
      (checkoutArticles, article) => {
        checkoutArticles.push({
          articleId: article._id,
          quantity: article.quantityInCart!,
          price: article.price,
        });

        return checkoutArticles;
      },
      []
    );

    axiosInstance
      .post("shop/order", body, { withCredentials: true })
      .then(() => {
        dispatch(clearCart());
        navigate("/checkout/thank-you");
      })
      .catch((err) => {
        console.error(err);
        toast.current?.show({
          severity: "error",
          summary: "Bestellungen fehlgeschlagen",
          detail: "Etwas ist schiefgelaufen, bitte versuche es erneut.",
          life: 3000,
        });
      });
  };

  const validateAddress = (): boolean => {
    return Object.values(address).every((field) => field);
  };

  const checkoutSteps: MenuItem[] = [
    {
      label: "Anmelden",
    },
    {
      label: "Prüfen & Absenden",
    },
  ];

  const checkoutArticlesPreviewHTML = locationState.articlesForCheckout.map(
    (article) => (
      <CheckoutArticlePreview
        {...article}
        key={article._id}
      ></CheckoutArticlePreview>
    )
  );

  const stepLoginHTML = (
    <div>
      <h3 className="account-header">
        Ein Account ist notwendig um fortzufahren!
      </h3>
      <LoginSignupSwitch />
    </div>
  );

  const stepDataCheckHTML = (
    <div>
      <div>
        <h3>Zahlungsmethode</h3>
        <PaymentMethod />
      </div>
      <div>
        <h3>Lieferadresse</h3>
        <DeliveryAddressForm {...user} />
      </div>
      <div>
        <h3>Bestellung prüfen</h3>
        {checkoutArticlesPreviewHTML}
      </div>
    </div>
  );

  return (
    <div className="Checkout">
      <h1>Kaufvorgang</h1>
      <div className="checkout-wrapper">
        <div className="content">
          <Steps
            readOnly
            model={checkoutSteps}
            activeIndex={!isLoggedIn ? 0 : 1}
            className="checkout-steps"
          />
          {isLoggedIn ? stepDataCheckHTML : stepLoginHTML}
        </div>
        <div className="sidebar">
          <div className="buy-summary">
            <span>Artikel ({locationState.articlesSum})</span>
            <span className="summary-right">
              {locationState.priceSum.toFixed(2)} €
            </span>

            <span>Versand</span>
            <span className="summary-right">Kostenlos</span>

            <span className="combined-price">Gesamt</span>
            <span className="combined-price summary-right">
              {locationState.priceSum.toFixed(2)} €
            </span>
          </div>

          <Button
            label="Kaufen"
            onClick={onBuyClick}
            disabled={!user || !paymentMethod || !validateAddress()}
          />
        </div>
      </div>
      <Toast ref={toast} position="bottom-center" />
    </div>
  );
}

export default Checkout;
