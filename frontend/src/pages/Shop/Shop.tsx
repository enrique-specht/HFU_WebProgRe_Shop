import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import "./Shop.scss";
import { loadArticles } from "../../store/shopReducer";
import ArticlePreview from "../../components/ArticlePreview/ArticlePreview";
import { DataView } from "primereact/dataview";

function Shop() {
  const articles = useAppSelector((state) => state.shop.articles);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadArticles());
  });

  const articlesPreviewHTML = (articles: Article[]) =>
    articles.map((article) => (
      <ArticlePreview {...article} key={article._id}></ArticlePreview>
    ));

  return (
    <div className="Shop">
      <h1>Shop</h1>
      <DataView
        value={articles}
        listTemplate={articlesPreviewHTML}
        paginator
        rows={10}
        className="articles-view"
      />
    </div>
  );
}

export default Shop;
