import create from "zustand";
import { updateUser } from "../utils/api";

export const useStore = create((set, get) => ({
  currentUser: null,
  userAlreadyExists: false,
  wrongInfo: false,
  isMatch: false,
  allUsers: [],
  toggleIsMatch: (value) => set((state) => ({ isMatch: value })),
  toggleUserAlreadyExists: (value) =>
    set((state) => ({ userAlreadyExists: value })),
  enter: (user) => set((state) => ({ currentUser: user })),
  toggleWrongInfo: (value) => set((state) => ({ wrongInfo: value })),
  animateButtonOnClick: (buttonName) => {
    if (
      !document
        .querySelector(
          `img[src="/src/assets/images/${buttonName}.svg"].onclick-btn`
        )
        .classList.contains("active")
    ) {
      document
        .querySelector(
          `img[src="/src/assets/images/${buttonName}.svg"].onclick-btn`
        )
        .classList.add("active");

      setTimeout(() => {
        if (
          document.querySelector(
            `img[src="/src/assets/images/${buttonName}.svg"].onclick-btn`
          )
        )
          document
            .querySelector(
              `img[src="/src/assets/images/${buttonName}.svg"].onclick-btn`
            )
            .classList.remove("active");
      }, 500);
    }
  },
  setAllUsers: (users) => set((allUsers) => ({ allUsers: users })),
  likeUser: (id) => {
    //add the displayed users id to the likedPeople array
    let currentUserCopy = JSON.parse(JSON.stringify(get().currentUser));
    currentUserCopy.likedPeople.push(id);
    updateUser(currentUserCopy);
    set((state) => ({ currentUser: currentUserCopy }));
  },
  updateUserOnState: (updatedUser) =>
    set((state) => ({ currentUser: updatedUser })),

  dislikeUser: (id) => {
    //add the displayed users id to the likedPeople array
    let currentUserCopy = JSON.parse(JSON.stringify(get().currentUser));
    currentUserCopy.dislikedPeople.push(id);
    updateUser(currentUserCopy);
    set((state) => ({ currentUser: currentUserCopy }));
  },
}));
