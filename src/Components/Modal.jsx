import "../assets/modal.css";
import { useStore } from "../Store/store";
import Button from "./Button";

export default function Modal() {
    const store = useStore();
  //   function signUp(user) {
  //     fetch(`http://localhost:4000/users/?phoneNumber=${user.phoneNumber}`)
  //       .then((resp) => {
  //         return resp.json();
  //       })
  //       .then((serverUser) => {
  //         if (serverUser.length === 0) {
  //           createNewUserOnServer(user)
  //             .then((resp) => resp.json())
  //             .then((user) =>
  //               setUsers((prevUser) => {
  //                 const newUser = [...prevUser];
  //                 newUser.push(user);
  //                 return newUser;
  //               })
  //             );
  //           setIsModalShown((prevModal) => (prevModal = false));
  //         }
  //       });
  //   }
  //   // @ts-ignore
  //   function createNewUserOnServer(user) {
  //     return fetch("http://localhost:4000/users/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(user),
  //     });
  //   }

  return (
    <section
      onClick={(e) => {
        // @ts-ignore
        if (e.target.classList.contains("modal-wrapper")) {
          store.setModal('');
        }
      }}
      className="modal-wrapper"
    >
      <div
        // onClick={e=>e.stopPropagation()}
        className="modal"
      >
        <h2>Enter your details</h2>
        <form style={{ display: "grid" }}>
          <label htmlFor="firstName">First Name</label>
          <input required type="text" name="firstname" id="firstname" />
          <label htmlFor="lastName">Last Name</label>
          <input required type="text" name="lastname" id="lastname" />
          <label htmlFor="phoneNr">Phone number</label>
          <input required type="text" name="phoneNr" id="phoneNr" />
          <button
            style={{ backgroundColor: "#009688", textAlign: "center" }}
            className="ok-button"
          >
            CREATE USER
          </button>
        </form>
        <Button
          // @ts-ignore
          onClick={(e) => {
            store.setModal('')
          }}
          className="close-modal-btn"
        >
          X
        </Button>
      </div>
    </section>
  );
}
