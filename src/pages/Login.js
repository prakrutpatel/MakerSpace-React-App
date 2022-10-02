
// @mui
import React, {useState} from 'react'
import { styled } from '@mui/material/styles';
import { Card, Container, Typography,  Button } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import logo from '../logo/Eckerd_logo.png';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import * as makerjs from 'makerjs';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, remove } from "firebase/database";
import FileSaver from 'file-saver';
import Protect from './Protect';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
import Logo from '../components/Logo';
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

var pathData = "M 14.676 0 L 2.8152 0 L 2.8152 14.676 L 0 14.676 L 0 28.7556 L 2.8152 28.7556 L 2.8152 42.8364 L 0 42.8364 L 0 56.916 L 2.8152 56.916 L 2.8152 71.592 L 14.676 71.592 L 14.676 68.7768 L 28.7556 68.7768 L 28.7556 71.592 L 42.8364 71.592 L 42.8364 68.7768 L 56.916 68.7768 L 56.916 71.592 L 68.7768 71.592 L 68.7768 56.916 L 71.592 56.916 L 71.592 42.8364 L 68.7768 42.8364 L 68.7768 28.7556 L 71.592 28.7556 L 71.592 14.676 L 68.7768 14.676 L 68.7768 0 L 56.916 0 L 56.916 2.8152 L 42.8364 2.8152 L 42.8364 0 L 28.7556 0 L 28.7556 2.8152 L 14.676 2.8152 L 14.676 0 Z"

let combined_model = {
  models: {
    "Path 1": makerjs.model.center(makerjs.importer.fromSVGPathData(pathData)),
  }
};

var last_list = {};
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

const saveSvg = (model) => {
  const options = {
    accuracy: 0.000001,
    units: makerjs.unitType.Millimeter,
    strokeWidth: '0.25mm',
  };
  console.log(makerjs.exporter.toSVG(combined_model, options));
  const output = makerjs.exporter.toSVG(combined_model, options);
  const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
  FileSaver.saveAs(blob, 'Model.svg');
}

// ----------------------------------------------------------------------

export default function Login() {
  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');
  var render_list = [];
  const [re, setre] = React.useState(0);
  const db = getDatabase();
  const starCountRef = ref(db, 'submitions/');
  onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  list = data;
  if(typeof(data) === "string"){
    data = JSON.parse(data);
  }
  if (data !== last_list){
    last_list = data;
    Object.keys(data).forEach(k => render_list.push(k));
  }
  
  
  });

  const changed = (_event) => {
    if (_event.target.checked === true){
      console.log(list[_event.target.value]);
      pathData = list[_event.target.value]['path'];
      combined_model["model"][_event.target.value] = makerjs.model.center(makerjs.importer.fromSVGPathData(pathData));
    }
    else {
      delete combined_model["model"][_event.target.value];
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

  const ShowImg = () => {
    return (
    <img src={logo} width="450" height="149" alt="" style={{position: "absolute", bottom: 0, right: 0}}/>
    );
  };

  return (
    <Protect sha512='EE26B0DD4AF7E749AA1A8EE3C10AE9923F618980772E473F8819A5D4940E0DB27AC185F8A0E1D5F84F88BC887FD67B143732C304CC5FA9AD8E6F57F50028A8FF'
      blur={false}
      >
        <ShowImg/>
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
            <Button variant="outlined" sx={{ width: 100, mx: "auto", mb: 2 }} onClick={() => { setre(re+1); }}>
            Refresh
          </Button>
          <Button variant="outlined" sx={{ width: 100, mx: "auto", mb: 2 }} onClick={() => { 
            const db = getDatabase();
    remove(ref(db, 'submitions/'));
    setre(0);
    }}>
            Reset
          </Button>
          <Button variant="outlined" sx={{ width: 100, mx: "auto"}} onClick={() => { saveSvg();
           }}>
            Download
          </Button>
          </SectionStyle>
          
        )}

        <Container maxWidth="sm">
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Models submitted
            </Typography>

            <Typography sx={{ color: 'text.secondary', mb: 5 }}>Select upto 6 models to export.</Typography>
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
