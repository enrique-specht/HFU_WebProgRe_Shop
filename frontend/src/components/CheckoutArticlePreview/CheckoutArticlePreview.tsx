import axiosInstance from "../../services/axiosInstance";
import "./CheckoutArticlePreview.scss";

function CheckoutArticlePreview(article: Article) {
  const axiosBaseUrl = axiosInstance.defaults.baseURL;

  return (
    <div className="CheckoutArticlePreview">
      <img
        src={axiosBaseUrl + article.href}
        className="article-preview-image"
      />
      <div className="article-information">
        <h3>{article.name}</h3>
        <span>Stückpreis: {article.price} €</span>
        <span>Stückzahl: {article.quantityInCart}</span>
        <span>
          <span>Gesamtpreis: </span>
          <span>
            {article.quantityInCart
              ? (article.price * article.quantityInCart).toFixed(2)
              : article.price}
            €
          </span>
        </span>
      </div>
    </div>
  );
}

export default CheckoutArticlePreview;
