import React, { useState } from "react";
import { Box, Heading, Input, Button, Link, Flex } from "@chakra-ui/react";
import { API_URL } from "../../consts";
import { useNavigate } from "react-router-dom";
import { User } from "./client";
import * as client from "./client"

function Login() {
  const [credentials, setCredentials] = useState<User>({ _id: "",
    username: "", password: "", firstName: "", lastName: "", role: "USER"
  });
  const navigate = useNavigate();
  const signin = async () => {
    await client.signin(credentials);
    navigate("/profile");
  };

  return (
    <Flex
      align="center"
      justify="center"
      height="100vh"
    >
      <Box
        width="400px"
        p="8"
        bg="white"
        borderRadius="md"
        boxShadow="lg"
        textAlign="center"
      >
        <Heading as="h2" size="lg" mb="6" color="#13294C"> 
          Login
        </Heading>
        <Input
          placeholder="Username"
          variant="filled"
          size="md"
          mb="4"
          value={credentials.username} onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })}
        />
        <Input
          type="password"
          placeholder="Password"
          variant="filled"
          size="md"
          mb="6"
          value={credentials.password} onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })}
        />
        <Button
          colorScheme="purple"
          size="md"
          onClick={signin}
          mb="4" 
        >
          Sign In
        </Button>
        <Flex justify="space-between">
          <Box>
            <Link color="purple.800" href="/register">
              Create an account
            </Link>
          </Box>
          <Box>
            <Link color="purple.800" href="/admin-login">
              Log in as Admin
            </Link>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}

export default Login;