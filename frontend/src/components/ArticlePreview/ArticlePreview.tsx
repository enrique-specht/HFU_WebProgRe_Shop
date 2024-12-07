import { Button } from "primereact/button";
import "./ArticlePreview.scss";
import axios from "../../services/axiosInstance";
import { Rating } from "primereact/rating";

function ArticlePreview(article: Article) {
  const axiosBaseUrl = axios.defaults.baseURL;

  return (
    <div className="ArticlePreview">
      <img src={axiosBaseUrl + article.href} className="preview-image" />
      <div className="preview-content">
        <div className="preview-text">
          <h3>{article.name}</h3>
          <Rating value={article.rating} disabled cancel={false} />
          <span>{article.shortdescription}</span>
        </div>
        <div className="preview-actions">
          <span className="price">{article.price} €</span>
          <Button
            icon="pi pi-shopping-cart"
            label="Zum Einkaufswagen hinzufügen"
            className="add-to-cart"
          />
        </div>
      </div>
    </div>
  );
}

export default ArticlePreview;
