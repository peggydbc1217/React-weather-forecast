import styled from "styled-components";
import { Button } from "../styles/Button";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../configs/firebase";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { useState } from "react";
import { StyledLink } from "../UI/Header";
import useLazyBackgroundImage from "../hooks/useLazyBackgroundImg";
import { device } from "../styles/Breakpoints";

interface WrapperProps {
  $loaded: string;
}

const Wrapper = styled.div<WrapperProps>`
  background: ${(p) =>
    p.$loaded ? `url("/img/hero.jpeg")` : `url("/img/hero_low.jpg")`};
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100%;
  filter: ${(p) => (p.$loaded ? "blur(0)" : "blur(10px)")};
`;

const Container = styled.div`
  padding-top: 30px;
  width: 50%;
  margin-left: auto;
`;

const H1 = styled.h1`
  text-align: center;
  color: ${(p) => p.theme.colors.primaryTextColor};
  font-size: 48px;
  background-color: rgba(255, 255, 128, 0.3);
  box-shadow: 0 0 80px 0 rgba(255, 255, 128, 0.7);
  border-radius: 20%;
  @media ${device.sm} {
    font-size: 36px;
  }
  @media ${device.xs} {
    font-size: 24px;
  }
`;

const List = styled.ul`
  list-style-type: none;
  margin-top: 32px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  gap: 28px;
`;

const Item = styled.li`
  text-align: center;
  color: ${(p) => p.theme.colors.primaryTextColor};
  font-size: 24px;
`;

const GoogleIcon = styled(FcGoogle)`
  font-size: 36px;
  text-align: center;
`;

const ButtonSpan = styled.span`
  font-size: 24px;
  margin-left: 16px;
`;

export default function Auth() {
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const loaded = useLazyBackgroundImage("/img/hero.jpeg");

  const handleSignIn = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      if (!res.user) return;
      const authInfo = {
        userId: res.user.uid,
        userName: res.user.displayName,
        profilePhoto: res.user.photoURL,
        isAuth: true,
      };
      localStorage.setItem("authInfo", JSON.stringify(authInfo));
      toast.success("Sign in successful!");
      navigate("/forecast");
    } catch (err) {
      toast.error("Sign in failed!");
    }
  };

  useEffect(() => {
    const authInfo = localStorage.getItem("authInfo");
    if (authInfo) {
      setIsSignedIn(true);
    }
  }, [isSignedIn]);

  return (
    <Wrapper $loaded={loaded}>
      <Container>
        <H1>
          Weather Wonders:
          <br />
          Discover Nature's Forecast
        </H1>
        <List>
          {isSignedIn ? (
            <StyledLink to="/forecast" $button>
              Go Check Weather !
            </StyledLink>
          ) : (
            <>
              <Item>5 Million+ Customers, Infinite Satisfaction.</Item>
              <Item>
                Sign In Now to get <span>$500</span> voucher
              </Item>
              <Button onClick={handleSignIn} $large $secondary $outlined>
                <GoogleIcon />
                <ButtonSpan>Sign in</ButtonSpan>
              </Button>
            </>
          )}
        </List>
      </Container>
    </Wrapper>
  );
}
