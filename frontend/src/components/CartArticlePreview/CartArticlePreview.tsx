import { Link } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";
import "./CartArticlePreview.scss";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { useAppSelector } from "../../store/hooks";
import { useDispatch } from "react-redux";
import { removeFromCart, updateCart } from "../../store/userReducer";

function CartArticlePreview(article: Article) {
  const cart = useAppSelector((state) => state.user.cart);
  const [cartArticle, setCartArticle] = useState<CartArticle>();
  const dispatch = useDispatch();
  const [inStock, setInStock] = useState<boolean>(true);
  const [quantityToBuy, setQuantityToBuy] = useState<number>(0);
  const axiosBaseUrl = axiosInstance.defaults.baseURL;

  useEffect(() => {
    const articleInCart = cart.find(
      (cartArticle) => cartArticle.id === article._id
    );
    setCartArticle(articleInCart);
    if (articleInCart) setQuantityToBuy(articleInCart.quantity);
  }, [article, cart]);

  useEffect(() => {
    if (quantityToBuy) changeArticleQuantityInCart();
  }, [quantityToBuy]);

  useEffect(() => {
    if (cartArticle)
      article.quantity - cartArticle.quantity >= 0
        ? setInStock(true)
        : setInStock(false);
  }, [cartArticle]);

  const removeArticleFromCart = () => dispatch(removeFromCart(article._id));

  const changeArticleQuantityInCart = () =>
    dispatch(updateCart({ id: article._id, quantity: quantityToBuy }));

  const getIsInStockHTML = inStock ? (
    <span className="text-green stock">Auf Lager</span>
  ) : (
    <span className="text-red stock">Nicht genug auf Lager</span>
  );

  return (
    <div className="CartArticlePreview">
      <img src={axiosBaseUrl + article.href} className="preview-image" />
      <div className="preview-content">
        <Link to={"/article/" + article._id}>
          <h3 className="preview-text">{article.name}</h3>
        </Link>
        <span className="price">{article.price} €</span>
        {getIsInStockHTML}
        <div className="preview-actions">
          <Button
            icon="pi pi-trash"
            className="remove-from-cart"
            rounded
            text
            severity="contrast"
            title="Aus Einkaufswagen entfernen"
            onClick={removeArticleFromCart}
          />
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Menge</span>
            <InputNumber
              value={quantityToBuy}
              onValueChange={(e) =>
                e.value ? setQuantityToBuy(e.value) : setQuantityToBuy(1)
              }
              mode="decimal"
              showButtons
              min={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartArticlePreview;
