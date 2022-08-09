
// @mui
import React, {useEffect} from 'react'
import { styled } from '@mui/material/styles';
import { Card, Container, Typography } from '@mui/material';
import mqtt from "precompiled-mqtt";
import Protect from './Protect';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
import Logo from '../components/Logo';
// sections



const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));


// ----------------------------------------------------------------------

export default function Login() {
  const [list, setlist] = React.useState(['1'])
  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  const client = mqtt.connect('wss://10.0.2.208:1883');
  client.subscribe("Eckerd");

  client.on("message", function (topic, payload) {
    setlist([...list,payload.toString()]);
  });

  const listItems = list.map((list1) =>
  <h1>{list1}</h1>
);

  return (
    <Protect sha512='EE26B0DD4AF7E749AA1A8EE3C10AE9923F618980772E473F8819A5D4940E0DB27AC185F8A0E1D5F84F88BC887FD67B143732C304CC5FA9AD8E6F57F50028A8FF'
      blur={false}
      >
    <Page title="Login">
      <RootStyle>
        <HeaderStyle>
          <Logo />
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
             Backend
            </Typography>
            <img src="/static/illustrations/illustration_login.png" alt="login" />
          </SectionStyle>
        )}

        <Container maxWidth="sm">
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Sign in to Minimal
            </Typography>

            <Typography sx={{ color: 'text.secondary', mb: 5 }}>Enter your details below.</Typography>
            <ul>{listItems}</ul>
          </ContentStyle>
        </Container>
        
      </RootStyle>
    </Page>
    </Protect>
  );
}
