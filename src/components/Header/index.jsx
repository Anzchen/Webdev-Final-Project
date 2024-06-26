import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "../../consts";
import { useNavigate, Link as ReachLink, Outlet } from "react-router-dom";
import {
  HStack,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
  StepStatus,
} from "@chakra-ui/react";
import axios from "axios";
import LogoutEmitter from "../../emit/LogoutEmitter";

function Header() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({});
  const { isOpen: searchOpen, onToggle: toggleSearch } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    console.log(event);
    setSearchQuery(event.target.value);
  };

  const handleSearchKeyDown = (event) => {
    console.log(event);
    if (event.key === 'Enter') {
      navigate(`/results?query=${searchQuery}`);
      setSearchQuery('');
    }
  };

  const logout = async () => {
    try {
      const res = await axios.post("http://localhost:4000/api/users/signout");
      if (res.statusText === "OK") {
        setAuth(false);
      }
      LogoutEmitter.emit("loggedOut");
    } catch (error) {
      console.error(error);
    }
  };

  const login = () => {
    navigate("/login");
  };

  const signup = () => {
    navigate("/register");
  };

  const profile = () => {
    navigate(`/profile/${user.username}`);
  };

  const goHome = () => {
    navigate("/");
  };

  const details = () => {
    navigate("/details");
  };

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axios.post("http://localhost:4000/api/users/profile");
        const isUser = res.data;
        if (isUser) {
          setAuth(true);
          setUser(isUser);
        } else {
          setAuth(false);
        }
      } catch (error) {
        console.error(error);
        setAuth(false);
      }
    };
    getProfile();
  }, [navigate]);

  const loginButton = auth ? (
    <Button bg="transparent" color="lightgray" onClick={logout}>
      Logout
    </Button>
  ) : (
    <Button bg="transparent" color="lightgray" onClick={login}>
      Login
    </Button>
  );

  const home = (
    <Button bg="transparent" color="lightgray" onClick={goHome}>
      Home
    </Button>
  );

  const registerButton = auth ? (
    <Button bg="transparent" color="lightgray" onClick={profile}>
      Profile
    </Button>
  ) : (
    <Button bg="transparent" color="lightgray" onClick={signup}>
      SignUp
    </Button>
  );

  const detailsButton = (
    <Button onClick={details} bg="lightgray">
      Details
    </Button>
  );

  const searchButton = (
    <Button onClick={toggleSearch} bg="transparent">
      <FontAwesomeIcon icon={faMagnifyingGlass} color="lightgray" />
    </Button>
  );

  return (
    <>
      <HStack
        position="fixed"
        right="0"
        bg={"#1a1a2e"}
        width={"100%"}
        justifyContent={"right"}
        mt="2"
      >
        {searchOpen && (
          <InputGroup position="fixed" width="calc(100vw - 30em)" left="0" ml="10em" flexWrap="flex">
            <InputLeftElement
              pointerEvents="none"
              children={
                <FontAwesomeIcon icon={faMagnifyingGlass} color="gray" />
              }
            />
            <Input
              placeholder="Search for a song..."
              bg="white"
              borderRadius="2em"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
            />
          </InputGroup>
        )}
        {searchButton}
        {home}
        {/* {detailsButton} */}
        {loginButton}
        {registerButton}
      </HStack>
      <Outlet />
    </>
  );
}

export default Header;
