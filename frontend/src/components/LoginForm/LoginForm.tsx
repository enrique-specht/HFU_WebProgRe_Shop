import { ChangeEvent, FormEvent, useState } from "react";
import "./LoginForm.scss";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import axiosInstance from "../../services/axiosInstance";
import { useAppDispatch } from "../../store/hooks";
import { loadUserState } from "../../store/userReducer";

function LoginForm() {
  const [loginData, setLoginData] = useState<LoginRequest>({
    email: "",
    password: "",
  });
  const disptach = useAppDispatch();

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
      .then((res) => {
        console.log(res.data);
        disptach(loadUserState());
      })
      .catch((err) => console.error(err));
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
        />
      ) : (
        <InputText
          id={data}
          value={loginData[data as keyof LoginRequest]}
          onChange={onLoginDataChange}
          required
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
    </div>
  );
}

export default LoginForm;
