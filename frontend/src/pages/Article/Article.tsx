import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import "./Article.scss";
import { loadArticles } from "../../store/shopReducer";
import { useParams } from "react-router-dom";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { addToCart } from "../../store/userReducer";

function Article() {
  const axiosBaseUrl = axiosInstance.defaults.baseURL;
  const articles = useAppSelector((state) => state.shop.articles);
  const dispatch = useAppDispatch();
  const { articleId } = useParams(); //https://api.reactrouter.com/v7/functions/react_router.useParams.html
  const [article, setArticle] = useState<Article>();
  const [quantityToBuy, setQuantityToBuy] = useState<number>(1);
  const [inStock, setInStock] = useState<boolean>(true);

  useEffect(() => {
    dispatch(loadArticles());
  }, []);

  useEffect(() => {
    const articleTemp = articles.find((article) => article._id === articleId);
    if (articleTemp) {
      setArticle(articleTemp);
      articleTemp.quantity > 0 ? setInStock(true) : setInStock(false);
    }
  }, [articles]);

  if (!article) return <></>;

  const onAddToCartClick = () => {
    const articleForCart: CartArticle = {
      id: article._id,
      quantity: quantityToBuy,
    };
    dispatch(addToCart(articleForCart));
  };

  const getIsInStockHTML = inStock ? (
    <span className="text-green">Auf Lager</span>
  ) : (
    <span className="text-red">Ausverkauft</span>
  );

  return (
    <div className="Article">
      <div className="article-shop">
        <div className="article-title">
          <h3>{article.name}</h3>
          <Rating value={article.rating} disabled cancel={false} />
        </div>
        <div className="article-image">
          <img src={axiosBaseUrl + article.href} />
        </div>
        <div className="article-actions">
          <span>
            <h4>{article.price} €</h4>
            {getIsInStockHTML}
          </span>
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
              max={article.quantity}
              disabled={!inStock}
            />
          </div>
          <Button
            icon="pi pi-shopping-cart"
            label="Zum Einkaufswagen hinzufügen"
            className="add-to-cart"
            disabled={!inStock}
            onClick={onAddToCartClick}
          />
        </div>
      </div>
      <div className="article-description">
        <h3>Beschreibung</h3>
        {article.description}
      </div>
    </div>
  );
}

export default Article;
