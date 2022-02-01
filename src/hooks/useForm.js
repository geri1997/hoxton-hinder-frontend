import { useState } from "react";
import { capitalise } from "../utils/capitalise";

export function useForm(initialData) {
  const [formData, setFormData] = useState(initialData);
  const [stage, setStage] = useState(1);

  function nextStage() {
    setStage((prevStage) => prevStage + 1);
  }

  function onChange(e) {
    if (
      e.nativeEvent.data !== " " ||
      e.target.name === "aboutMe" ||
      e.target.name === "likes" ||
      e.target.name === "dislikes"
    )
      setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function setInterestedIn(gender) {
    setFormData({ ...formData, interestedIn: gender });
  }

  function onBlurHandler(e, name, length) {
    if (
      formData[name].length < length &&
      !document.querySelector("span")?.classList.contains(name)
    ) {
      //shake input
      e.target.classList.add("shake");
      //display too short msg
      const tooShortSpan = document.createElement("span");
      tooShortSpan.classList.add("too-short", name);
      tooShortSpan.textContent =
        name === "phone"
          ? "Phone number is too short."
          : capitalise(name) + " is too short.";
      document
        .querySelector(`input[name=${name}]`)
        .parentNode.insertBefore(
          tooShortSpan,
          document.querySelector(`input[name=${name}]`).nextSibling
        );
      setTimeout((a) => {
        //remove msg and shake
        document.querySelector(`span.${name}`) &&
          document.querySelector(`span.${name}`).remove();
        e.target.classList.remove("shake");
      }, 2000);
    }
  }

  function fileUpload() {
    // @ts-ignore
    const file = document.querySelector("input[type=file]").files[0];
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      function () {
        // convert image file to base64 string
        setFormData({ ...formData, photo: reader.result });
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  return {
    formData,
    onChange,
    setInterestedIn,
    onBlurHandler,
    stage,
    nextStage,
    fileUpload,
  };
}
