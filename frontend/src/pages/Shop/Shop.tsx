import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import "./Shop.scss";
import {
  loadArticles,
  loadArticlesByCategory,
  loadArticlesBySubcategory,
} from "../../store/shopReducer";
import ArticlePreview from "../../components/ArticlePreview/ArticlePreview";
import { DataView } from "primereact/dataview";
import { useNavigate, useParams } from "react-router-dom";
import SortDropdown from "../../components/SortDropdown/SortDropdown";
import FilterDropdown from "../../components/FilterDropdown/FilterDropdown";

function Shop() {
  const { articles, categories, isLoading } = useAppSelector(
    (state) => state.shop
  );
  const dispatch = useAppDispatch();
  const { category, subcategory, searchParams } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadShownArticles();
  }, [category, subcategory, categories, searchParams]);

  const loadShownArticles = () => {
    if (isLoading) return;

    if (searchParams) return;

    if (!category) {
      dispatch(loadArticles());
      return;
    }

    const foundCategory = categories.find(
      (c) => c.name.toLowerCase() === category.toLowerCase()
    );
    const categoryId = foundCategory?._id;

    if (!categoryId) {
      navigate("/shop");
      return;
    }

    if (!subcategory) {
      dispatch(loadArticlesByCategory(categoryId));
      return;
    }

    const subcategoryId = foundCategory.subcategories?.find(
      (c) => c.name.toLowerCase() === subcategory.toLowerCase()
    )?._id;

    if (!subcategoryId) {
      navigate(`/shop/${category}`);
      return;
    }

    dispatch(loadArticlesBySubcategory({ categoryId, subcategoryId }));
  };

  const articlesPreviewHTML = (articles: Article[]) =>
    articles.map((article) => (
      <ArticlePreview {...article} key={article._id}></ArticlePreview>
    ));

  return (
    <div className="Shop">
      <h1>Shop</h1>
      <div className="article-filters">
        <FilterDropdown />
        <SortDropdown />
      </div>
      {isLoading ? (
        <></>
      ) : (
        <div>
          {articles?.length ? (
            <DataView
              value={articles}
              listTemplate={articlesPreviewHTML}
              paginator
              rows={10}
              className="articles-view"
            />
          ) : (
            <div>Es konnten leider keine passenden Artikel gefunden werden</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Shop;
