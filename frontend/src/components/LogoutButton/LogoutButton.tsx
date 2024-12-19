import { Button } from "primereact/button";
import axiosInstance from "../../services/axiosInstance";
import "./LogoutButton.scss";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import { useDispatch } from "react-redux";
import { clearUserData } from "../../store/userReducer";

function LogoutButton() {
  const dispatch = useDispatch();
  const toast = useRef<Toast>(null);

  const logout = () => {
    axiosInstance
      .post("/logout", {}, { withCredentials: true })
      .then(() => dispatch(clearUserData()))
      .catch((err) => {
        console.error(err);
        toast.current?.show({
          severity: "error",
          summary: "Abmelden fehlgeschlagen",
          detail: "Etwas ist schiefgelaufen, bitte versuche es erneut.",
          life: 3000,
        });
      });
  };

  return (
    <div className="LogoutButton">
      <Button label="Ausloggen" icon="pi pi-sign-out" onClick={logout} />
      <Toast ref={toast} position="bottom-center" />
    </div>
  );
}

export default LogoutButton;
