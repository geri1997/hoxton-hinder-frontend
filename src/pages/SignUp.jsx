import React, { useEffect } from "react";
import Button from "../Components/Button";
import { useStore } from "../Store/store";
import "../assets/formPage.css";
import { useForm } from "../hooks/useForm";
import { createUser } from "../utils/api";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const currentUser = useStore((store) => store.currentUser);
  const enter = useStore((store) => store.enter);
  const userAlreadyExists = useStore((store) => store.userAlreadyExists);
  const toggleUserAlreadyExists = useStore(
    (store) => store.toggleUserAlreadyExists
  );

  const {
    formData,
    onChange,
    setInterestedIn,
    onBlurHandler,
    stage,
    nextStage,
    fileUpload
  } = useForm({
    username: "",
    phone: "",
    password: "",
    age: "",
    gender: "male",
    interestedIn: "men",
    photo: "",
    aboutMe: "",
    likes: "",
    dislikes: "",
    likedPeople: [],
    dislikedPeople: [],
  });
  const navigate = useNavigate();
  useEffect(() => {
    currentUser && navigate("/home");
  }, [currentUser]);

  if (stage === 1) {
    return (
      <>
        <main className="sign-up not-logged-in">
          <h1>hinder</h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              createUser(
                formData,
                enter,
                toggleUserAlreadyExists,
                stage,
                nextStage
              );
            }}
            className="enter sign-up"
          >
            <label htmlFor="username">Username</label>
            <input
              required
              minLength={3}
              onBlur={(e) => {
                onBlurHandler(e, e.target.name, 3);
              }}
              onChange={onChange}
              name="username"
              type="text"
              value={formData.username}
            />
            <label htmlFor="phone">Phone Number</label>
            <input
              required
              minLength={10}
              maxLength={10}
              onBlur={(e) => {
                onBlurHandler(e, e.target.name, 10);
              }}
              name="phone"
              type="text"
              value={formData.phone}
              placeholder="06xxxxxxxx"
              onChange={(e) => {
                //only change value if key entered is number
                if (!/[a-zA-Z]/.test(e.target.value)) onChange(e);
              }}
            />
            {userAlreadyExists && (
              <span className="phone-exists">
                A user with this phone number already exists.
              </span>
            )}
            <label htmlFor="age">Age</label>
            <input onChange={onChange} type="number" name="age" id="age" />
            <label htmlFor="password">Password</label>
            <input
              required
              minLength={5}
              onBlur={(e) => {
                onBlurHandler(e, e.target.name, 5);
              }}
              name="password"
              type="password"
              value={formData.password}
              onChange={onChange}
            />

            <label htmlFor="">I am interested in</label>
            <div className="men-women">
              <div
                onClick={(e) => {
                  // @ts-ignore
                  //move selector right
                  document.querySelector(".select").style.right = "50%";
                  // change text color if selector is on top or not
                  document
                    .querySelector("span.women")
                    .classList.remove("selected");
                  document.querySelector("span.men").classList.add("selected");
                  //set InterestedIn in formData
                  setInterestedIn("men");
                }}
                className="men"
              >
                <span className="text men selected">Men</span>
              </div>
              <div
                onClick={(e) => {
                  // @ts-ignore
                  //move selector right
                  document.querySelector(".select").style.right = 0;
                  // change text color if selector is on top or not
                  document
                    .querySelector("span.men")
                    .classList.remove("selected");
                  document
                    .querySelector("span.women")
                    .classList.add("selected");
                  //set InterestedIn in formData
                  setInterestedIn("women");
                }}
                className="women"
              >
                <span className="text women ">Women</span>
              </div>
              <div className="select"></div>
            </div>

            <Button type="submit" className="btn user-enter">
              Next
            </Button>
          </form>
        </main>
      </>
    );
  } else {
    return (
      <>
        <main className="sign-up not-logged-in">
          <h1>hinder</h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              createUser(
                formData,
                enter,
                toggleUserAlreadyExists,
                stage,
                nextStage
              );
            }}
            className="enter sign-up"
          >
            <label htmlFor="photo">Profile photo </label>
            <input
              required
              id="photo"
              minLength={3}
              onChange={onChange}
              name="photo"
              type="text"
              value={formData.photo}
            />
            <input onChange={fileUpload} type="file" id="file-input" name="photo" />
            <label htmlFor="gender">Gender</label>
            <select required onChange={onChange} name="gender" id="gender">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <label htmlFor="aboutMe">About me</label>
            <textarea
              required
              id="aboutMe"
              name="aboutMe"
              value={formData.aboutMe}
              onChange={onChange}
            />

            <label htmlFor="likes">Likes (separated by commas)</label>
            <textarea
              id="likes"
              name="likes"
              value={formData.likes}
              onChange={onChange}
              required
            />

            <label htmlFor="dislikes">Dislikes (separated by commas)</label>
            <textarea
              id="dislikes"
              name="dislikes"
              value={formData.dislikes}
              onChange={onChange}
              required
            />

            <Button type="submit" className="btn user-enter">
              create account
            </Button>
          </form>
        </main>
      </>
    );
  }
};

export default SignUp;
