
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

let combined_model = {
  models: {

  }
};

var last_list = {};
const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

var num = 0;
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

const saveSvg = () => {
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
      var pathData = list[_event.target.value]['path'];
      var x = num%2 === 0 ? (num/2*73) : ((num-1)/2*73);
      var y = num%2 === 0 ? 0 : -73
      combined_model.models[_event.target.value] = makerjs.model.move(makerjs.model.center(makerjs.importer.fromSVGPathData(pathData)), [x, y]);
      num= Object.keys(combined_model.models).length;
    }
    else {
      delete combined_model["model"][_event.target.value];
      num= Object.keys(combined_model.models).length;
    }
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
    <Protect sha512='9B22A5A3B3F9A590FB4601455F0E0A74D41FE0F2187B554396392599C1DF46A5604408291B9F83AD2E6AE588C60260B16F89B6E5A4FC3475ED2358B1755D44D5'
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
