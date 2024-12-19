import { Button } from "primereact/button";
import "./ThankYou.scss";
import { useNavigate } from "react-router-dom";

function ThankYou() {
  const navigate = useNavigate();

  return (
    <div className="ThankYou">
      <h1>Vielen Dank für Ihren Einkauf!</h1>
      <span>
        Sie können Ihre Bestellung nun in Ihrem Account-Dashboard finden
      </span>
      <Button label="Zum Dashboard" onClick={() => navigate("/account")} />
    </div>
  );
}

export default ThankYou;
