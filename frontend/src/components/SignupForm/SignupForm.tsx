import { FloatLabel } from "primereact/floatlabel";
import "./SignupForm.scss";
import { InputText } from "primereact/inputtext";
import { ChangeEvent, FormEvent, useState } from "react";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import axiosInstance from "../../services/axiosInstance";
import { useAppDispatch } from "../../store/hooks";
import { loadUserState } from "../../store/userReducer";

function SignupForm() {
  const [signupData, setSignupData] = useState<SignupRequest>({
    firstname: "",
    lastname: "",
    street: "",
    postcode: "",
    city: "",
    country: "",
    phone: "",
    email: "",
    password: "",
  });
  const disptach = useAppDispatch();

  const signupFields = [
    { data: "firstname", label: "Vorname" },
    { data: "lastname", label: "Nachname" },
    { data: "street", label: "Straße + Nr." },
    { data: "postcode", label: "Postleitzahl" },
    { data: "city", label: "Stadt" },
    { data: "country", label: "Land" },
    { data: "phone", label: "Telefonnummer" },
    { data: "email", label: "Email" },
    { data: "password", label: "Passwort" },
  ];

  const onSignupDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSignupData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const onSignupSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!Object.values(signupData).every((field) => field)) return;

    signupAndLogin();
  };

  const login = () => {
    const { email, password } = signupData;
    const loginData: LoginRequest = { email, password };

    axiosInstance
      .post("/login", loginData, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        disptach(loadUserState());
      })
      .catch((err) => console.error(err));
  };

  const signupAndLogin = () => {
    axiosInstance
      .post("/signup", signupData, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        login();
      })
      .catch((err) => console.error(err));
  };

  const signupFormularHTML = signupFields.map(({ data, label }) => (
    <FloatLabel key={data}>
      {data === "password" ? (
        <Password
          inputId={data}
          value={signupData[data]}
          onChange={onSignupDataChange}
          required
          toggleMask
        />
      ) : (
        <InputText
          id={data}
          value={signupData[data as keyof SignupRequest]}
          onChange={onSignupDataChange}
          required
        />
      )}
      <label htmlFor={data}>{label}</label>
    </FloatLabel>
  ));

  return (
    <div className="SignupForm">
      <h2>Registrieren</h2>
      <form onSubmit={onSignupSubmit}>
        <div className="input-wrapper">{signupFormularHTML}</div>
        <Button type="submit" label="Registrieren" />
      </form>
    </div>
  );
}

export default SignupForm;
