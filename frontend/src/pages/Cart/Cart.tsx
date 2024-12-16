import { Button } from "primereact/button";
import CartArticlePreview from "../../components/CartArticlePreview/CartArticlePreview";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import "./Cart.scss";
import { useEffect, useState } from "react";
import { loadArticles } from "../../store/shopReducer";
import { Link } from "react-router-dom";

function Cart() {
  const cart = useAppSelector((store) => store.user.cart);
  const articles = useAppSelector((store) => store.shop.articles);
  const dispatch = useAppDispatch();
  const [articlesInCart, setArticlesInCart] = useState<Article[]>([]);
  const [priceSum, setPriceSum] = useState<number>(0);
  const [articlesSum, setArticlesSum] = useState<number>(0);

  const getSumInfo = () => {
    let priceSum = 0;
    let articlesSum = 0;
    articlesInCart.forEach((article, index) => {
      priceSum += cart[index].quantity * article.price;
      articlesSum += cart[index].quantity;
    });
    setPriceSum(priceSum);
    setArticlesSum(articlesSum);
  };

  useEffect(() => {
    dispatch(loadArticles());
  }, []);

  useEffect(() => {
    const articlesInCart = articles.filter((article) =>
      cart.some((cartArticle) => cartArticle.id === article._id)
    );
    setArticlesInCart(articlesInCart);
  }, [cart, articles]);

  useEffect(() => {
    getSumInfo();
  }, [articlesInCart]);

  const articlesInCartHTML = articlesInCart.map((article) => (
    <CartArticlePreview {...article} key={article._id} />
  ));

  return (
    <div className="Cart">
      <h1>Einkaufswagen</h1>
      <div className="cart-wrapper">
        <div className="cart-preview">{articlesInCartHTML}</div>
        <div className="sidebar">
          <span>
            Zwischensumme ({articlesSum} Artikel):
            <span className="price-sum">{priceSum} €</span>
          </span>
          <Link to="/checkout">
            <Button label="Zur Kasse" className="to-checkout" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
