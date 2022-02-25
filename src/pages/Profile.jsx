import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeBtn from '../Components/HomeBtn';
import { useStore } from '../Store/store';
import '../assets/profile.css';
import { updateUser } from '../utils/api';

const Profile = () => {
   const currentUser = useStore((store) => store.currentUser);
   const updateUserOnState = useStore((store) => store.updateUserOnState);
   const updateAboutMe = useStore((store) => store.updateAboutMe);
   const navigate = useNavigate();
   useEffect(() => {
      !currentUser && navigate('/');
   }, []);

   if (!currentUser) return <h2>Loading...</h2>;
   return (
      <main className='home'>
         <input
            hidden
            // @ts-ignore
            onChange={(e) => {
               // @ts-ignore
               const file = document.querySelector('input[type=file]').files[0];
               const reader = new FileReader();

               reader.addEventListener(
                  'load',
                  function () {
                     // convert image file to base64 string
                     let userCopy = JSON.parse(JSON.stringify(currentUser));
                     userCopy.photo = reader.result;
                     console.log(userCopy);
                     updateUser(userCopy);
                     updateUserOnState(userCopy);
                  },
                  false
               );

               if (file) {
                  reader.readAsDataURL(file);
               }
            }}
            style={{ position: 'absolute' }}
            type='file'
            name='avatar'
            id='avatar'
         />
         <h1 className='home-h1'>hinder</h1>
         <section className='profile-info'>
            <section className='profile-photo'>
               <img
                  style={{ cursor: 'pointer' }}
                  // @ts-ignore
                  onClick={(e) => {
                     // @ts-ignore
                     document.querySelector('input#avatar').click();
                  }}
                  src={currentUser.photo}
                  alt=''
               />
               <h2>{currentUser.username}</h2>
            </section>
            <section className='users-description'>
               <h3>About me</h3>
               <p
                  className='desc-profile-paragraph'
                  onClick={(e) => {
                     // @ts-ignore
                     e.target.style.display = 'none';
                     // @ts-ignore
                     document.querySelector(
                        '#aboutMe-profile-desc'
                     ).style.display = 'block';
                     // @ts-ignore
                     document.querySelector('#aboutMe-profile-desc').focus();
                  }}
               >
                  {currentUser.aboutMe}
               </p>
               <input
                  onBlur={(e) => {
                     updateUser(currentUser);
                     document.querySelector(
                        '.desc-profile-paragraph'
                        // @ts-ignore
                     ).style.display = 'block';

                     // @ts-ignore
                     e.target.style.display = 'none';
                  }}
                  id='aboutMe-profile-desc'
                  onKeyPress={(e) => {
                     if (e.key === 'Enter') {
                        updateUser(currentUser);
                        document.querySelector(
                           '.desc-profile-paragraph'
                           // @ts-ignore
                        ).style.display = 'block';

                        // @ts-ignore
                        e.target.style.display = 'none';
                     }
                  }}
                  onChange={(e) => {
                     console.log(e);
                     let newUser = JSON.parse(JSON.stringify(currentUser));
                     newUser.aboutMe = e.target.value;
                     updateAboutMe(newUser);
                  }}
                  value={currentUser.aboutMe}
                  type='text'
                  name='aboutMe'
               />
               <h3>Likes</h3>
               <p
                  onClick={(e) => {
                     // @ts-ignore
                     e.target.style.display = 'none';
                     // @ts-ignore
                     document.querySelector(
                        '#likes-profile-desc'
                     ).style.display = 'block';
                     // @ts-ignore
                     document.querySelector('#likes-profile-desc').focus();
                  }}
                  className='likes-profile-paragraph'
               >
                  {currentUser.likes}
               </p>
               <input
                  onBlur={(e) => {
                     updateUser(currentUser);
                     document.querySelector(
                        '.likes-profile-paragraph'
                        // @ts-ignore
                     ).style.display = 'block';

                     // @ts-ignore
                     e.target.style.display = 'none';
                  }}
                  onKeyPress={(e) => {
                     if (e.key === 'Enter') {
                        updateUser(currentUser);
                        document.querySelector(
                           '.likes-profile-paragraph'
                           // @ts-ignore
                        ).style.display = 'block';

                        // @ts-ignore
                        e.target.style.display = 'none';
                     }
                  }}
                  onChange={(e) => {
                     let newUser = JSON.parse(JSON.stringify(currentUser));
                     newUser.likes = e.target.value;
                     updateAboutMe(newUser);
                  }}
                  id='likes-profile-desc'
                  value={currentUser.likes}
                  type='text'
               />
               <h3>Dislikes</h3>
               <p
                  onClick={(e) => {
                     // @ts-ignore
                     e.target.style.display = 'none';
                     // @ts-ignore
                     document.querySelector(
                        '#dislikes-profile-desc'
                     ).style.display = 'block';
                     // @ts-ignore
                     document.querySelector('#dislikes-profile-desc').focus();
                  }}
                  className='dislikes-profile-paragraph'
               >
                  {currentUser.dislikes}
               </p>
               <input
                  onBlur={(e) => {
                     updateUser(currentUser);
                     document.querySelector(
                        '.dislikes-profile-paragraph'
                        // @ts-ignore
                     ).style.display = 'block';

                     // @ts-ignore
                     e.target.style.display = 'none';
                  }}
                  onKeyPress={(e) => {
                     if (e.key === 'Enter') {
                        updateUser(currentUser);
                        document.querySelector(
                           '.dislikes-profile-paragraph'
                           // @ts-ignore
                        ).style.display = 'block';

                        // @ts-ignore
                        e.target.style.display = 'none';
                     }
                  }}
                  onChange={(e) => {
                     let newUser = JSON.parse(JSON.stringify(currentUser));
                     newUser.dislikes = e.target.value;
                     updateAboutMe(newUser);
                  }}
                  id='dislikes-profile-desc'
                  value={currentUser.dislikes}
                  type='text'
               />
            </section>
         </section>
         <section className='home-btns'>
            <HomeBtn onClick={() => navigate('/profile')}>
               <img
                  style={{ height: '28px' }}
                  src='src/assets/images/user.svg'
                  alt=''
               />
            </HomeBtn>

            <HomeBtn onClick={() => navigate('/home')}>
               <img src='src/assets/images/home.svg' alt='' />
            </HomeBtn>

            <HomeBtn onClick={() => navigate('/chat')}>
               <img src='src/assets/images/chat.svg' alt='' />
            </HomeBtn>
         </section>
      </main>
   );
};

export default Profile;
