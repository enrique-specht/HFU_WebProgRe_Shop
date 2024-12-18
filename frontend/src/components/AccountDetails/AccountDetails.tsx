import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import LogoutButton from "../LogoutButton/LogoutButton";
import "./AccountDetails.scss";
import { loadOrders } from "../../store/userReducer";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Panel } from "primereact/panel";
import { Link } from "react-router-dom";

function AccountDetails() {
  const orders = useAppSelector((state) => state.user.orders);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadOrders());
  }, []);

  const dataArticleTemplate = (article: CheckoutArticle) => (
    <Link to={`/article/${article.articleId}`}>{article.articleId}</Link>
  );

  const dataPriceTemplate = (article: CheckoutArticle) => (
    <span>{article.price} €</span>
  );

  const orderListHTML = orders.map((order) => (
    <Panel
      key={order.orderNr}
      header={`${order.orderDate} | #${order.orderNr}`}
      toggleable
      collapsed
      className="order-panel"
    >
      <DataTable value={order.articles} stripedRows size="small">
        <Column field="articleId" header="Artikel" body={dataArticleTemplate} />
        <Column field="price" header="Preis" body={dataPriceTemplate} />
        <Column field="quantity" header="Menge" />
      </DataTable>
    </Panel>
  ));

  return (
    <div className="AccountDetails">
      <h1>Accountdetails</h1>
      <LogoutButton />
      <h2>Meine Bestellungen</h2>
      {orderListHTML}
    </div>
  );
}

export default AccountDetails;
