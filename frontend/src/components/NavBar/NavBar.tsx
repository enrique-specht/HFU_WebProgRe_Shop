import { Button } from "primereact/button";
import "./NavBar.scss";
import { InputText } from "primereact/inputtext";
import { useEffect } from "react";
import { loadCategories } from "../../store/shopReducer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Link } from "react-router-dom";

function NavBar() {
  const categories = useAppSelector((state) => state.shop.categories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadCategories());
  });

  const categoriesHTML = categories.map((category) => (
    <Link to={"/shop/" + category.name} key={category._id} className="category">
      {category.name}
    </Link>
  ));

  return (
    <div className="NavBar">
      <div className="navigation">
        <Link to="/">
          <i className="pi pi-home" title="Start"></i>
        </Link>
        <div className="p-inputgroup">
          <InputText placeholder="Suche" />
          <Button icon="pi pi-search" title="Suchen" />
        </div>
        <Link to="/account">
          <i className="pi pi-user" title="Account"></i>
        </Link>
        <Link to="/cart">
          <i className="pi pi-shopping-cart" title="Warenkorb"></i>
        </Link>
      </div>
      <div className="categories">{categoriesHTML}</div>
    </div>
  );
}

export default NavBar;
