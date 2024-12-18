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
  const { orders, user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  if (!user) return;

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

  const accountDataHTML = (
    <div className="account-data-wrapper">
      <div className="contact-data">
        <h4>Kontaktdaten</h4>
        <span>
          {user.firstname} {user.lastname}
        </span>
        <span>{user.email}</span>
        <span>{user.phone}</span>
      </div>
      <div className="adress-data">
        <h4>Adressdaten</h4>
        <span>{user.street}</span>
        <span>
          {user.postcode}, {user.city}
        </span>
        <span>{user.country}</span>
      </div>
    </div>
  );

  return (
    <div className="AccountDetails">
      <div className="header-logout">
        <h1>Accountdetails</h1>
        <LogoutButton />
      </div>
      <h2>Meine Daten</h2>
      {accountDataHTML}
      <h2>Meine Bestellungen</h2>
      {orderListHTML}
    </div>
  );
}

export default AccountDetails;
