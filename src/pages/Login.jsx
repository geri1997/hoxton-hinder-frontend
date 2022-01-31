import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Button";
import { useForm } from "../hooks/useForm";
import { useStore } from "../Store/store";
import { signIn } from "../utils/api";

const Login = () => {
  const { formData, onChange } = useForm({ phone: "", password: "" });
  const currentUser = useStore((store) => store.currentUser);
  const enter = useStore((store) => store.enter);
  const wrongInfo = useStore((store) => store.wrongInfo);
  const toggleWrongInfo = useStore((store) => store.toggleWrongInfo);

  const navigate = useNavigate();

  useEffect(() => {
    currentUser && navigate("/home");
  }, [currentUser]);
  return (
    <>
      <main className="login not-logged-in">
        <h1>hinder</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            signIn(formData, enter, toggleWrongInfo);
          }}
          className="enter sign-up"
        >
          <label htmlFor="phone">Phone Number</label>
          <input
            required
            minLength={10}
            maxLength={10}
            name="phone"
            type="text"
            value={formData.phone}
            placeholder="06xxxxxxxx"
            onChange={(e) => {
              //   only change value if key entered is number
              if (!/[a-zA-Z]/.test(e.target.value)) onChange(e);
            }}
          />

          <label htmlFor="password">Password</label>
          <input
            required
            minLength={5}
            name="password"
            type="password"
            value={formData.password}
            onChange={onChange}
          />
          {wrongInfo && (
            <span className="phone-exists">Wrong credentials.</span>
          )}

          <Button type="submit" className="btn user-enter">
            login
          </Button>
        </form>
      </main>
    </>
  );
};

export default Login;
