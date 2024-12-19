import { ChangeEvent, FormEvent, useRef, useState } from "react";
import "./LoginForm.scss";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import axiosInstance from "../../services/axiosInstance";
import { useAppDispatch } from "../../store/hooks";
import { loadUserState } from "../../store/userReducer";
import { Toast } from "primereact/toast";

function LoginForm() {
  const [loginData, setLoginData] = useState<LoginRequest>({
    email: "",
    password: "",
  });
  const disptach = useAppDispatch();
  const toast = useRef<Toast>(null);
  const [invalid, setInvalid] = useState<boolean>(false);

  const loginFields = [
    { data: "email", label: "Email" },
    { data: "password", label: "Passwort" },
  ];

  const onLoginDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const onLoginSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!Object.values(loginData).every((field) => field)) return;

    login();
  };

  const login = () => {
    axiosInstance
      .post("/login", loginData, { withCredentials: true })
      .then(() => disptach(loadUserState()))
      .catch((err) => {
        console.error(err);
        setInvalid(true);
        toast.current?.show({
          severity: "error",
          summary: "Anmeldung fehlgeschlagen",
          detail: "Email oder Passwort falsch!",
          life: 3000,
        });
      });
  };

  const loginFormularHTML = loginFields.map(({ data, label }) => (
    <FloatLabel key={data}>
      {data === "password" ? (
        <Password
          inputId={data}
          value={loginData[data]}
          onChange={onLoginDataChange}
          required
          toggleMask
          invalid={invalid}
        />
      ) : (
        <InputText
          id={data}
          value={loginData[data as keyof LoginRequest]}
          onChange={onLoginDataChange}
          required
          invalid={invalid}
        />
      )}
      <label htmlFor={data}>{label}</label>
    </FloatLabel>
  ));

  return (
    <div className="LoginForm">
      <h2>Anmelden</h2>
      <form onSubmit={onLoginSubmit}>
        <div className="input-wrapper">{loginFormularHTML}</div>
        <Button type="submit" label="Anmelden" />
      </form>
      <Toast ref={toast} position="bottom-center" />
    </div>
  );
}

export default LoginForm;
