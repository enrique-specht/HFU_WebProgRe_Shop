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
  }, []);

  const categoriesHTML = categories.map((category) => (
    <Link
      to={"/shop/" + category.name.toLowerCase()}
      key={category._id}
      className="category"
    >
      {category.name}
    </Link>
  ));

  return (
    <div className="NavBar">
      <div className="navigation">
        <Link to="/">
          <Button
            icon="pi pi-home"
            rounded
            text
            severity="contrast"
            title="Start"
          />
        </Link>
        <div className="p-inputgroup">
          <InputText placeholder="Suche" id="product-search" />
          <Button icon="pi pi-search" title="Suchen" />
        </div>
        <Link to="/account">
          <Button
            icon="pi pi-user"
            rounded
            text
            severity="contrast"
            title="Account"
          />
        </Link>
        <Link to="/cart">
          <Button
            icon="pi pi-shopping-cart"
            rounded
            text
            severity="contrast"
            title="Warenkorb"
          />
        </Link>
      </div>
      <div className="categories">{categoriesHTML}</div>
    </div>
  );
}

export default NavBar;
