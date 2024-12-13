import LoginForm from "../LoginForm/LoginForm";
import SignupForm from "../SignupForm/SignupForm";
import "./LoginSignupSwitch.scss";
import { TabPanel, TabView } from "primereact/tabview";

function LoginSignupSwitch() {
  return (
    <div className="LoginSignupSwitch">
      <TabView>
        <TabPanel header="Anmelden">
          <LoginForm />
        </TabPanel>
        <TabPanel header="Registrieren">
          <SignupForm />
        </TabPanel>
      </TabView>
    </div>
  );
}

export default LoginSignupSwitch;
