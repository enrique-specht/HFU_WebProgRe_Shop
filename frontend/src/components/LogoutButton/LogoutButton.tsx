import { Button } from "primereact/button";
import axiosInstance from "../../services/axiosInstance";
import "./LogoutButton.scss";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const logout = () => {
    axiosInstance
      .post("/logout", {}, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="LogoutButton">
      <Button label="Ausloggen" icon="pi pi-sign-out" onClick={logout} />
    </div>
  );
}

export default LogoutButton;
