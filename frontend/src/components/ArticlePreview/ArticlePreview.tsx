import { Button } from "primereact/button";
import "./ArticlePreview.scss";
import axiosInstance from "../../services/axiosInstance";
import { Rating } from "primereact/rating";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { addToCart } from "../../store/userReducer";

function ArticlePreview(article: Article) {
  const dispatch = useAppDispatch();
  const axiosBaseUrl = axiosInstance.defaults.baseURL;

  const onAddToCartClick = () => {
    const articleForCart: CartArticle = {
      id: article._id,
      quantity: 1,
    };
    dispatch(addToCart(articleForCart));
  };

  return (
    <div className="ArticlePreview">
      <img src={axiosBaseUrl + article.href} className="preview-image" />
      <div className="preview-content">
        <Link to={"/article/" + article._id} className="preview-text">
          <h3>{article.name}</h3>
          <Rating value={article.rating} disabled cancel={false} />
          <span>{article.shortdescription}</span>
        </Link>
        <div className="preview-actions">
          <span className="price">{article.price} €</span>
          <Button
            icon="pi pi-shopping-cart"
            label="Zum Einkaufswagen hinzufügen"
            className="add-to-cart"
            onClick={onAddToCartClick}
            disabled={article.quantity === 0}
          />
        </div>
      </div>
    </div>
  );
}

export default ArticlePreview;
