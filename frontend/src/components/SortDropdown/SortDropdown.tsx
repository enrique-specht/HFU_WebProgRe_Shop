import { Dropdown } from "primereact/dropdown";
import "./SortDropdown.scss";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateArticles } from "../../store/shopReducer";
import { useLocation } from "react-router-dom";

function SortDropdown() {
  const sortMethods: SortMethod[] = [
    { label: "Bewertung", sortMethod: "rating" },
    { label: "Name", sortMethod: "name" },
    { label: "Preis: Aufsteigend", sortMethod: "price_up" },
    { label: "Preis: Absteigend", sortMethod: "price_down" },
  ];

  const [selectedSort, setSelectedSort] = useState<SortMethod>(sortMethods[0]);
  const { articles, isLoading } = useAppSelector((state) => state.shop);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const onSelectionChange = (sort: SortMethod) => {
    setSelectedSort(sort);
    sortByMethod(sort);
  };

  const sortByMethod = (sort: SortMethod) => {
    switch (sort?.sortMethod) {
      case "name":
        dispatch(
          updateArticles(
            [...articles].sort((a, b) => a.name.localeCompare(b.name))
          )
        );
        break;
      case "price_up":
        dispatch(
          updateArticles([...articles].sort((a, b) => a.price - b.price))
        );
        break;
      case "price_down":
        dispatch(
          updateArticles([...articles].sort((a, b) => b.price - a.price))
        );
        break;
      case "rating":
        dispatch(
          updateArticles([...articles].sort((a, b) => b.rating - a.rating))
        );
        break;
      default:
        dispatch(
          updateArticles([...articles].sort((a, b) => b.rating - a.rating))
        );
    }
  };

  useEffect(() => {
    if (selectedSort) sortByMethod(selectedSort);
  }, [location, isLoading]);

  return (
    <div className="SortDropdown">
      <div className="p-inputgroup">
        <span className="p-inputgroup-addon">
          <i className="pi pi-sort-alt"></i>
        </span>
        <Dropdown
          value={selectedSort}
          onChange={(e) => onSelectionChange(e.value)}
          options={sortMethods}
          optionLabel="label"
          placeholder="Sortieren"
          checkmark
          highlightOnSelect
        />
      </div>
    </div>
  );
}

export default SortDropdown;
