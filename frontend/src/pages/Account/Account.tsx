import { useEffect } from "react";
import "./Account.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loadUserState } from "../../store/userReducer";
import AccountDetails from "../../components/AccountDetails/AccountDetails";
import LoginSignupSwitch from "../../components/LoginSignupSwitch/LoginSignupSwitch";

function Account() {
  const { isLoggedIn, isLoading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUserState());
  }, []);

  if (isLoading) return;

  const loadAccountHTML = isLoggedIn ? (
    <AccountDetails />
  ) : (
    <LoginSignupSwitch />
  );

  return <div className="Account">{loadAccountHTML}</div>;
}

export default Account;
