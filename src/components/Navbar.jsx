import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/slices/userSlice";
import Modal from "react-modal";
import axios from "axios";
import "./componentsStyle.css";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    padding: "40px 20px",
  },
};

function Navbar() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("user");
      dispatch(logoutUser());
      navigate("/login");
      const response = await axios.post("https://exploding-kitten-1-fs5m.onrender.com/users/logout");
      console.log(response.data);
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <div className="navbar">
      {user && <h3 className="email">{user.email}</h3>}
      <div>
        <a onClick={openModal} href="#">
          Rules
        </a>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="modal-content">
            <button onClick={closeModal}>Close</button>
            <h2>Rules</h2>
            <p>
              - If the card drawn from the deck is a cat card, then the card is
              removed from the deck.
            </p>
            <p>
              - If the card is an exploding kitten (bomb) then the player loses
              the game.
            </p>
            <p>
              - If the card is a defusing card, then the card is removed from
              the deck. This card can be used to defuse one bomb that may come
              in subsequent cards drawn from the deck.
            </p>
            <p>
              - If the card is a shuffle card, then the game is restarted and
              the deck is filled with 5 cards again.
            </p>
          </div>
        </Modal>
        <button className="show-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
