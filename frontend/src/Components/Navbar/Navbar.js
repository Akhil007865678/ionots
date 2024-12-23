import React, { useState } from 'react';
import Login from '../Login/Login';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import './navbar.css';

const Navbar = ({ setSideNavbarFun, sideNavbar }) => {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [userPic, setUserPic] = useState("https://www.istockphoto.com/photos/unknown-user");
  const [navbarModal, setNavbarModal] = useState(false);
  const [login, setLogin] = useState(false);

  const handleClickModal = () => {
    setNavbarModal((prev) => !prev);
  };

  const sideNavbarFun = () => {
    setSideNavbarFun(!sideNavbar);
  };

  const onClickofPopUpOption = (button) => {
    setNavbarModal(false);
    if (button === "login") {
      setLogin(true);
    } else if (button === "register") {
      navigate('/register');
    }
  };

  const onSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search/${query}`);
    }
  };

  const setLoginModal = () => {
    setLogin(false);
  };

  const navigateToProfile = () => {
    if (userId) {
      navigate(`/user/${userId}`);
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="navbarHamberger" onClick={sideNavbarFun}></div>
        <div className="navbar_youtubeImg" onClick={() => navigate('/')}>
          <div className="navbar_utubeTitle">IONOTS</div>
        </div>
      </div>
      <div className="navbar-middle">
        <div className="navbar-searchBox">
          <form onSubmit={onSearch} className="navbar_searchBox-form">
            <input
              type="text"
              placeholder="Search"
              className="navbar_searchBoxInput"
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
        </div>
      </div>
      <div className="navbar-right">
        <div className="assignment" onClick={() => navigate('/upload')}>
          Upload assignment
        </div>
        <MoreVertIcon onClick={handleClickModal} className='icon'/>
        
        {navbarModal && (
          <div className="navbar-modal">
            <div className="navbar-modal-option" onClick={navigateToProfile}>
              Profile
            </div>
            <div
              className="navbar-modal-option"
              onClick={() => onClickofPopUpOption("register")}
            >
              Register
            </div>
            <div
              className="navbar-modal-option"
              onClick={() => onClickofPopUpOption("login")}
            >
              Login
            </div>
            <div
              className="navbar-modal-option"
              onClick={() => onClickofPopUpOption("logout")}
            >
              Logout
            </div>
          </div>
        )}
      </div>
      {login && <Login setLoginModal={setLoginModal} />}
    </div>
  );
};

export default Navbar;