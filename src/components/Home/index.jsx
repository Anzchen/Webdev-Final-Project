import React, { useEffect, useState } from "react";
import { VStack, HStack, Text } from "@chakra-ui/react";
import Discover from "./Discover/";
import Message from "./Message/";
import Song from "../Song/";
import useTracks from "../../api/getTracks";
import useAccessToken from "../../api/getAccessToken";
import { useInstantTransition } from "framer-motion";
import axios from "axios";
import LogoutEmitter from "../../emit/LogoutEmitter";

function Home() {
  const [user, setUser] = useState({});
  const [topSongs, setTopSongs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  function logout() {
    setIsLoggedIn(false);
    LogoutEmitter.removeListener("loggedOut", logout);
  }
  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axios.post("http://localhost:4000/api/users/profile");
        const isUser = res.data;
        console.log("getprofile called");
        if (isUser) {
          setUser(isUser);
          setTopSongs(isUser.songs);
          setIsLoggedIn(true);
          LogoutEmitter.on("loggedOut", logout);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
        console.error("Error fetching user profile:", error);
      }
    };
    getProfile();
    LogoutEmitter.on("addedFavorite", getProfile);
  }, [setUser]);
  const accessToken = useAccessToken();

  const tracks = useTracks(accessToken, topSongs);
  console.log(tracks);

  return (
    <VStack spacing="20" align="stretch" p="20">
      <HStack ml="10">
        <Discover />
        {user && <Message user={user} isLoggedIn={isLoggedIn} />}
      </HStack>
      <HStack
        spacing="20"
        flexWrap="wrap"
        alignContent="center"
        align="stretch"
      >
        {isLoggedIn &&
          tracks && tracks.length > 0 ? (
            tracks.map((song) => <Song key={song.song_id} song={song} />)
          ) : (
            <Text ml="20" color="white">No songs available yet.</Text>
          )}
      </HStack>
    </VStack>
  );
}

export default Home;
