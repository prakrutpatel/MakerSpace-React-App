
// @mui
import React, {useEffect} from 'react'
import { styled } from '@mui/material/styles';
import { Card, Container, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import * as makerjs from 'makerjs';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from "firebase/database";
import Protect from './Protect';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
import Logo from '../components/Logo';
import { render } from 'react-dom';
// sections

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBgo3-86QIG1g9TaozIytTER6Lu2hoVYt0",
    authDomain: "mqtt-integration-26722.firebaseapp.com",
    databaseURL: "https://mqtt-integration-26722-default-rtdb.firebaseio.com",
    projectId: "mqtt-integration-26722",
    storageBucket: "mqtt-integration-26722.appspot.com",
    messagingSenderId: "578776239858",
    appId: "1:578776239858:web:428312b2f7b95d72aa4a6b"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

var list = {
};

var combined_model = {

};

var count = 0;

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
  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');
  var render_list = [];
  const db = getDatabase();
  const starCountRef = ref(db, 'submitions/');
  onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  list = data;
  if(typeof(data) === "string"){data = JSON.parse(data)}
 Object.keys(data).forEach(k => render_list.push(k));
  });

  const changed = (_event) => {
    if (_event.target.checked === true){
      combined_model[_event.target.value] = makerjs.model.center(makerjs.importer.fromSVGPathData(list[_event.target.value]['path']));
    }
    else {
      delete combined_model[_event.target.value];
    }
    console.log(combined_model); 
  };

  const ListItems = () => render_list.map((name) => {
    return(
      <FormControlLabel
          value="end"
          control={<Checkbox onChange={changed} value={name}/>}
          label={name}
          labelPlacement="end"
        />
  );
  });
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
             Backend Page
            </Typography>
            <img src="/static/illustrations/illustration_login.png" alt="login" />
          </SectionStyle>
        )}

        <Container maxWidth="sm">
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Models submitted
            </Typography>

            <Typography sx={{ color: 'text.secondary', mb: 5 }}>Select models to export.</Typography>
            <FormControl component="fieldset">
            <FormGroup aria-label="position" column='true'>
            <ListItems/>
            </FormGroup>
            </FormControl>
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
    </Protect>
  );
}
