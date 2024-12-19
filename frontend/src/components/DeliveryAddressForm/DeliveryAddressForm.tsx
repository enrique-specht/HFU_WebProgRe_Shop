import { ChangeEvent, useEffect } from "react";
import "./DeliveryAddressForm.scss";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateAddress } from "../../store/checkoutReducer";

function DeliveryAddressForm(user: User) {
  const address = useAppSelector((state) => state.checkout.address);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) setAddressByUserData();
  }, []);

  const addressFields = [
    { data: "street", label: "Straße + Nr." },
    { data: "postcode", label: "Postleitzahl" },
    { data: "city", label: "Stadt" },
    { data: "country", label: "Land" },
  ];

  const onSignupDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateAddress({ ...address, [e.target.id]: e.target.value }));
  };

  const setAddressByUserData = () => {
    const userAddress: Address = {
      street: user.street,
      postcode: user.postcode,
      city: user.city,
      country: user.country,
    };
    dispatch(updateAddress(userAddress));
  };

  const addressFormHTML = addressFields.map(({ data, label }) => (
    <FloatLabel key={data}>
      <InputText
        id={data}
        value={address[data as keyof Address]}
        onChange={onSignupDataChange}
        required
      />
      <label htmlFor={data}>{label}</label>
    </FloatLabel>
  ));

  return (
    <div className="DeliveryAddressForm">
      <div className="input-wrapper">{addressFormHTML}</div>
    </div>
  );
}

export default DeliveryAddressForm;
