import create from "zustand";

export const useStore = create((set,get) => ({
  currentUser: null,
  userAlreadyExists: false,
  wrongInfo: false,
  displayedUserIndex: 0,
  allUsers: [],
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
      }, 1000);
    }
  },
  setAllUsers: (users) => set((allUsers) => ({allUsers : users})),
  nextUser: () => {
    if (get().displayedUserIndex < 9) {
      set((state) => {
        get().displayedUserIndex + 1;
      });
    } else {
      set((state) => ({ displayedUserIndex: 0 }));
    }
  },
}));
