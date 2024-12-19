import { Dropdown } from "primereact/dropdown";
import "./FilterDropdown.scss";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { useNavigate, useParams } from "react-router-dom";

function FilterDropdown() {
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory>();
  const categories = useAppSelector((state) => state.shop.categories);
  const [subcategories, setSubcategories] = useState<Subcategory[]>();
  const { category, subcategory } = useParams();
  const navigate = useNavigate();

  const onSelectionChange = (subcategory: Subcategory) => {
    setSelectedSubcategory(subcategory);
    if (!subcategory) {
      navigate(`/shop/${category}`);
      return;
    }
    navigate(`/shop/${category}/${subcategory.name}`);
  };

  useEffect(() => {
    const subcategories = categories.find(
      (c) => c.name.toLowerCase() === category?.toLowerCase()
    )?.subcategories;
    setSubcategories(subcategories);

    const subcategoryObject = subcategories?.find(
      (c) => c.name.toLowerCase() === subcategory?.toLowerCase()
    );
    setSelectedSubcategory(subcategoryObject);
  }, [category, subcategory, categories]);

  return subcategories ? (
    <div className="FilterDropdown">
      <div className="p-inputgroup">
        <span className="p-inputgroup-addon">
          <i className="pi pi-filter"></i>
        </span>
        <Dropdown
          value={selectedSubcategory}
          onChange={(e) => onSelectionChange(e.value)}
          options={subcategories}
          optionLabel="name"
          placeholder="Unterkategorie"
          checkmark
          highlightOnSelect
          showClear
        />
      </div>
    </div>
  ) : (
    <></>
  );
}

export default FilterDropdown;
