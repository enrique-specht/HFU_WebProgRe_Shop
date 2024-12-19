import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import "./ArticleSearch.scss";
import { loadArticles, updateArticles } from "../../store/shopReducer";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

function ArticleSearch() {
  const articlesForSearch = useAppSelector(
    (state) => state.shop.articlesForSearch
  );
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadArticles());
  }, []);

  const onSearch = () => {
    dispatch(
      updateArticles(
        [...articlesForSearch].filter((article) =>
          article.name.toLowerCase().includes(search.toLowerCase())
        )
      )
    );
    navigate(`/shop/search/${search}`);
  };

  const onKeyDown = (key: string) => {
    if (key != "Enter") return;
    onSearch();
  };

  return (
    <div className="ArticleSearch">
      <div className="p-inputgroup">
        <InputText
          placeholder="Suche"
          id="product-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => onKeyDown(e.key)}
        />
        <Button icon="pi pi-search" title="Suchen" onClick={onSearch} />
      </div>
    </div>
  );
}

export default ArticleSearch;
