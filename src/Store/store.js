import create from 'zustand';
import { updateUser } from '../utils/api';

export const useStore = create((set, get) => ({
   currentUser: null,
   userAlreadyExists: false,
   wrongInfo: false,
   isMatch: false,
   allUsers: [],
   conversations: [],
   currentConversationMessages: [],
   userMessages: [],
   toggleIsMatch: (value) => set((state) => ({ isMatch: value })),
   toggleUserAlreadyExists: (value) =>
      set((state) => ({ userAlreadyExists: value })),
   enter: (user) => set((state) => ({ currentUser: user })),
   toggleWrongInfo: (value) => set((state) => ({ wrongInfo: value })),
   animateButtonOnClick: (buttonName) => {
      if (
         !document
            .querySelector(`img[src="/${buttonName}.svg"].onclick-btn`)
            .classList.contains('active')
      ) {
         document
            .querySelector(`img[src="/${buttonName}.svg"].onclick-btn`)
            .classList.add('active');

         setTimeout(() => {
            if (
               document.querySelector(
                  `img[src="/${buttonName}.svg"].onclick-btn`
               )
            )
               document
                  .querySelector(`img[src="/${buttonName}.svg"].onclick-btn`)
                  .classList.remove('active');
         }, 500);
      }
   },
   setAllUsers: (users) => set((allUsers) => ({ allUsers: users })),
   likeUser: (id) => {
      //add the displayed users id to the likedPeople array
      let currentUserCopy = JSON.parse(JSON.stringify(get().currentUser));
      currentUserCopy.likedPeople.unshift(id);
      updateUser(currentUserCopy);
      set((state) => ({ currentUser: currentUserCopy }));
   },
   updateUserOnState: (updatedUser) =>
      set((state) => ({ currentUser: updatedUser })),
   updateAboutMe: (newUser) => set((state) => ({ currentUser: newUser })),
   dislikeUser: (id) => {
      //add the displayed users id to the likedPeople array
      let currentUserCopy = JSON.parse(JSON.stringify(get().currentUser));
      currentUserCopy.dislikedPeople.push(id);
      updateUser(currentUserCopy);
      set((state) => ({ currentUser: currentUserCopy }));
   },
   setConversations: (newConversations) =>
      set((state) => ({ conversations: newConversations })),
   setCurrentConversationMessages: (messages) =>
      set((state) => ({ currentConversationMessages: messages })),
   setUserMessages: (messages) => set((state) => ({ userMessages: messages })),
}));
