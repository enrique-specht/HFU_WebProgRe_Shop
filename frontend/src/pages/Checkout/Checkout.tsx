import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import "./Checkout.scss";
import { loadArticles } from "../../store/shopReducer";
import CheckoutArticlePreview from "../../components/CheckoutArticlePreview/CheckoutArticlePreview";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";
import axiosInstance from "../../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { clearCart, loadUserState } from "../../store/userReducer";
import LoginSignupSwitch from "../../components/LoginSignupSwitch/LoginSignupSwitch";

function Checkout() {
  const { cart, isLoggedIn } = useAppSelector((state) => state.user);
  const articles = useAppSelector((state) => state.shop.articles);
  const dispatch = useAppDispatch();
  const [articlesInCart, setArticlesInCart] = useState<Article[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("SEPA");
  const [priceSum, setPriceSum] = useState<number>(0);
  const [articlesSum, setArticlesSum] = useState<number>(0);
  const [loginVisibility, setLoginVisibility] = useState<boolean>(false);
  const navigate = useNavigate();

  const getSumInfo = () => {
    let priceSum = 0;
    let articlesSum = 0;
    articlesInCart.forEach((article) => {
      if (!article.quantityInCart) return;
      priceSum += article.quantityInCart * article.price;
      articlesSum += article.quantityInCart;
    });
    setPriceSum(priceSum);
    setArticlesSum(articlesSum);
  };

  useEffect(() => {
    dispatch(loadArticles());
    dispatch(loadUserState());
  }, []);

  useEffect(() => {
    const articlesInCart = articles.reduce<Article[]>(
      (filteredArticles, article) => {
        const cartArticle = cart.find(
          (cartArticle) => cartArticle.id === article._id
        );

        if (cartArticle) {
          filteredArticles.push({
            ...article,
            quantityInCart: cartArticle.quantity,
          });
        }
        return filteredArticles;
      },
      []
    );
    setArticlesInCart(articlesInCart);
  }, [cart, articles]);

  useEffect(() => {
    getSumInfo();
  }, [articlesInCart]);

  useEffect(() => {
    setLoginVisibility(false);
  }, [isLoggedIn]);

  const onBuyClick = () => {
    if (!isLoggedIn) {
      setLoginVisibility(true);
      return;
    }

    const body = articlesInCart.reduce<CheckoutRequest>(
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
      .then((res) => {
        console.log(res.data);
        dispatch(clearCart());
        navigate("/checkout/thank-you");
      })
      .catch((err) => console.error(err));
  };

  const checkoutArticlesPreviewHTML = articlesInCart.map((article) => (
    <CheckoutArticlePreview
      {...article}
      key={article._id}
    ></CheckoutArticlePreview>
  ));

  return (
    <div className="Checkout">
      <h1>Kaufvorgang</h1>
      <div className="checkout-wrapper">
        <div className="content">
          <div>
            <h3>Zahlungsmethode</h3>
            <span className="payment-method">
              <RadioButton
                inputId="payment-sepa"
                name="payment-sepa"
                value="SEPA"
                onChange={(e) => setPaymentMethod(e.value)}
                checked={paymentMethod === "SEPA"}
              />
              <label htmlFor="payment-sepa">SEPA-Lastschrift</label>
            </span>
            <span className="payment-method">
              <RadioButton
                inputId="payment-creditcard"
                name="payment-creditcard"
                value="creditCard"
                onChange={(e) => setPaymentMethod(e.value)}
                checked={paymentMethod === "creditCard"}
              />
              <label htmlFor="payment-creditcard">Kreditkarte</label>
            </span>
          </div>
          <div>
            <h3>Lieferadresse</h3>
          </div>
          <div>
            <h3>Bestellung prüfen</h3>
            {checkoutArticlesPreviewHTML}
          </div>
        </div>
        <div className="sidebar">
          <div className="buy-summary">
            <span>Artikel ({articlesSum})</span>
            <span className="summary-right">{priceSum.toFixed(2)} €</span>

            <span>Versand</span>
            <span className="summary-right">Kostenlos</span>

            <span className="combined-price">Gesamt</span>
            <span className="combined-price summary-right">
              {priceSum.toFixed(2)} €
            </span>
          </div>

          <Button label="Kaufen" onClick={onBuyClick} />
          <Dialog
            visible={loginVisibility}
            modal
            onHide={() => {
              setLoginVisibility(false);
            }}
            header="Ein Account ist notwendig um fortzufahren!"
            draggable={false}
          >
            <LoginSignupSwitch />
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
