const apiUrl = 'https://petite-loud-kettledrum.glitch.me/users';
const conversationsUrl =
   'https://petite-loud-kettledrum.glitch.me/conversations';
const messageUrl = 'https://petite-loud-kettledrum.glitch.me/messages';

export function createUser(
   user,
   setUserInState,
   setUserAlreadyExists,
   stage,
   nextStage
) {
   fetch(apiUrl + '?phone=' + user.phone)
      .then((res) => res.json())
      .then((serverUser) => {
         if (serverUser.length === 0 && stage === 2) {
            fetch(apiUrl, {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify(user),
            })
               .then((res) => res.json())
               .then((createdUser) => {
                  setUserInState(createdUser);
               });
         } else if (serverUser.length === 1) {
            setUserAlreadyExists(true);
            setTimeout((e) => setUserAlreadyExists(false), 3000);
         } else if (stage === 1) {
            nextStage();
         }
      });
}

export function signIn(user, setUserInState, setWrongInfo) {
   fetch(apiUrl + '?phone=' + user.phone)
      .then((res) => res.json())
      .then((serverUser) => {
         if (serverUser.length === 1) {
            if (serverUser[0].password === user.password) {
               setUserInState(serverUser[0]);
            }
         } else {
            setWrongInfo(true);
            setTimeout((e) => setWrongInfo(false), 3000);
         }
      });
}

export function fetchUsers(interestedIn) {
   //fetch only users of the gender you're interested in
   return fetch(
      apiUrl + `?gender=${interestedIn === 'men' ? 'male' : 'female'}`
   ).then((res) => res.json());
}

export function updateUser(updatedUser) {
   fetch(apiUrl + '/' + updatedUser.id, {
      method: 'PUT',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
   });
}

export function fetchConversations(id) {
   return fetch(conversationsUrl + `?userId=${id}`).then((resp) => resp.json());
}

export function fetchConversationMessages(id) {
   return fetch(messageUrl + '?conversationId=' + id).then((resp) =>
      resp.json()
   );
}

export function addMessageOnServer(message) {
   return fetch(messageUrl, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
   });
}

export function createConversationOnServer(conversation) {
   return fetch(conversationsUrl, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(conversation),
   }).then((resp) => resp.json());
}
