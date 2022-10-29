// @mui
import * as React from 'react';
import Slider from '@mui/material/Slider';
import * as makerjs from "makerjs";
import Heart from './Heart';
import logo from '../logo/Eckerd_logo.png';
import Blueprint from "react-blueprint-svg";
import { Joystick } from 'react-joystick-component';
import { styled } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Grid, Container, Typography, Card, Box, Button, Divider, ButtonGroup } from '@mui/material';
import { blue } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from "firebase/database";
import {Link, useNavigate} from 'react-router-dom';
import FileSaver from 'file-saver';
// components
import Logo from '../components/Logo';
import Scrollbar from '../components/Scrollbar';
import Page from '../components/Page';
// sections

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
}));
var pathData = "M 14.676 0 L 2.8152 0 L 2.8152 14.676 L 0 14.676 L 0 28.7556 L 2.8152 28.7556 L 2.8152 42.8364 L 0 42.8364 L 0 56.916 L 2.8152 56.916 L 2.8152 71.592 L 14.676 71.592 L 14.676 68.7768 L 28.7556 68.7768 L 28.7556 71.592 L 42.8364 71.592 L 42.8364 68.7768 L 56.916 68.7768 L 56.916 71.592 L 68.7768 71.592 L 68.7768 56.916 L 71.592 56.916 L 71.592 42.8364 L 68.7768 42.8364 L 68.7768 28.7556 L 71.592 28.7556 L 71.592 14.676 L 68.7768 14.676 L 68.7768 0 L 56.916 0 L 56.916 2.8152 L 42.8364 2.8152 L 42.8364 0 L 28.7556 0 L 28.7556 2.8152 L 14.676 2.8152 L 14.676 0 Z"

let model3 = {
  models: {
    "Path 1": makerjs.model.center(makerjs.importer.fromSVGPathData(pathData)),
  }
};

let model_config = {
};

var moved = 0;
var added = 0;

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

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const [name, setname] = React.useState('');
  const [number, setnumber] = React.useState(0);
  const [Radius, setRadius] = React.useState(0);
  const [Rotate, setRotate] = React.useState(0);
  const [Width, setWidth] = React.useState(0);
  const [Height, setHeight] = React.useState(0);
  const [Round, setRound] = React.useState(0);
  const [InnerRadius, setInnerRadius] = React.useState(0);
  const [Angle, setAngle] = React.useState(0);
  const [showPolygon, setshowPolygon] = React.useState(false);
  const [showRect, setshowRect] = React.useState(false);
  const [ManualTilt, setManualTilt] = React.useState([0,0]);
  const [showCircle, setshowCircle] = React.useState(false);
  const [showBolt, setshowBolt] = React.useState(false);
  const [showStar, setshowStar] = React.useState(false);
  const [showHeart, setshowHeart] = React.useState(false);
  const [curr, setcurr] = React.useState('');
  const [rect, setrect] = React.useState(1);
  const [circle, setcircle] = React.useState(1);
  const [polygon, setpolygon] = React.useState(1);
  const [heart, setheart] = React.useState(1);
  const [bc, setbc] = React.useState(1);
  const [star, setstar] = React.useState(1);


  const navigate = useNavigate();

  const navigateToLogin = () => {
    // 👇️ navigate to /contacts
    navigate('/login');
  };

  const ShowImg = () => {
    return (
    <img src={logo} width="450" height="149" alt="" style={{position: "absolute", bottom: 0, right: 0}}/>
    );
  };
  

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const newEl = (newValue) => {
    setAnchorEl(null);
    added = 1;
    if (newValue === 'Rectangle'){
      var uni_name = 'Rectangle ' + rect;
      model3.models[uni_name] = makerjs.model.center(makerjs.model.move(new makerjs.models.RoundRectangle(40, 20, 0), [0,0]));
      setcurr(uni_name);
      setrect(prevcount => prevcount+1);
      model_config[uni_name] = {}
      model_config[uni_name]['width'] = 40;
      model_config[uni_name]['height'] = 20;
      model_config[uni_name]['round'] = 0;
      model_config[uni_name]['rotate'] = 0;
      setWidth(40);
      setHeight(20);
      setRound(0);
      setRotate(0);
      setshowCircle(false);
      setshowPolygon(false);
      setshowRect(true);
      setshowBolt(false);
      setshowStar(false);
      setshowHeart(false);
    } else if (newValue === 'Circle' ) {
      var uni_name = 'Circle ' + circle;
      model3.models[uni_name] = makerjs.model.move(new makerjs.models.Ellipse(10, 10), [0,0]);
      setcurr(uni_name);
      setcircle(prevcount => prevcount+1);
      model_config[uni_name] = {}
      model_config[uni_name]['radius'] = 10;
      setRadius(10);
      setshowCircle(true);
      setshowPolygon(false);
      setshowRect(false);
      setshowBolt(false);
      setshowStar(false);
      setshowHeart(false);
    } else if (newValue === 'Polygon' ) {
      var uni_name = 'Polygon ' + polygon;
      model3.models[uni_name] = makerjs.model.move(new makerjs.models.Polygon(3, 10, 0), [0,0]);
      setcurr(uni_name);
      setpolygon(prevcount => prevcount+1);
      model_config[uni_name] = {}
      model_config[uni_name]['nos'] = 3;
      model_config[uni_name]['radius'] = 10;
      model_config[uni_name]['rotate'] = 0;
      setnumber(3);
      setRadius(10);
      setRotate(0);
      setshowPolygon(true);
      setshowCircle(false);
      setshowRect(false);
      setshowBolt(false);
      setshowStar(false);
      setshowHeart(false);
    } else if (newValue === 'Bolt Circle') {
      var uni_name = 'Bolt Circle ' + bc;
      model3.models[uni_name] = makerjs.model.move(new makerjs.models.BoltCircle(10, 3, 10, 0), [0,0]);
      setcurr(uni_name);
      setbc(prevcount => prevcount+1);
      model_config[uni_name] = {}
      model_config[uni_name]['radius'] = 10;
      model_config[uni_name]['hole_radius'] = 3;
      model_config[uni_name]['nob'] = 10;
      model_config[uni_name]['rotate'] = 0;
      setRadius(10);
      setInnerRadius(3);
      setnumber(10);
      setRotate(0);
      setshowBolt(true);
      setshowCircle(false);
      setshowPolygon(false);
      setshowRect(false);
      setshowStar(false);
      setshowHeart(false);
    } else if (newValue === 'Star'){
      var uni_name = 'Star ' + star;
      model3.models[uni_name] = makerjs.model.move(new makerjs.models.Star(3, 20, 4, 2), [0,0]);
      setcurr(uni_name);
      setstar(prevcount => prevcount+1);
      model_config[uni_name] = {}
      model_config[uni_name]['nos'] = 3;
      model_config[uni_name]['radius'] = 20;
      model_config[uni_name]['inner_radius'] = 4;
      model_config[uni_name]['skip'] = 2;
      model_config[uni_name]['rotate'] = 0;
      setnumber(3);
      setRadius(20);
      setInnerRadius(4);
      setRotate(0);
      setshowStar(true);
      setshowBolt(false);
      setshowCircle(false);
      setshowPolygon(false);
      setshowRect(false);
      setshowHeart(false);
    } else if (newValue === 'Heart'){
      var uni_name = 'Heart ' + heart;
      model3.models[uni_name] = makerjs.model.move(new Heart(10, 90), [0,0]);
      setcurr(uni_name);
      setheart(prevcount => prevcount+1);
      model_config[uni_name] = {}
      model_config[uni_name]['radius'] = 10;
      model_config[uni_name]['angle'] = 90;
      model_config[uni_name]['rotate'] = 0;
      setRadius(10);
      setAngle(90);
      setRotate(0);
      setshowHeart(true);
      setshowStar(false);
      setshowBolt(false);
      setshowCircle(false);
      setshowPolygon(false);
      setshowRect(false);
    }
  };

  const newcurrvalue = (name) => {
    setcurr(name);
    if (name.includes('Rectangle')){
      setWidth(model_config[name]['width']);
      setHeight(model_config[name]['height']);
      setRound(model_config[name]['round']);
      setRotate(model_config[name]['rotate']);
      setshowCircle(false);
      setshowPolygon(false);
      setshowRect(true);
      setshowBolt(false);
      setshowStar(false);
      setshowHeart(false);
    } 
    if (name.includes('Circle')){
      setshowCircle(true);
      setshowPolygon(false);
      setshowRect(false);
      setshowBolt(false);
      setshowStar(false);
      setshowHeart(false);
      setRadius(model_config[name]['radius']);
    } 
    if (name.includes('Polygon')){
      setshowPolygon(true);
      setshowCircle(false);
      setshowRect(false);
      setshowBolt(false);
      setshowStar(false);
      setshowHeart(false);
      setnumber(model_config[name]['nos']);
      setRadius(model_config[name]['radius']);
      setRotate(model_config[name]['rotate']);
    } 
    if (name.includes('Bolt Circle')){
      setshowBolt(true);
      setshowCircle(false);
      setshowPolygon(false);
      setshowRect(false);
      setshowStar(false);
      setshowHeart(false);
      setRadius(model_config[name]['radius']);
      setInnerRadius(model_config[name]['hole_radius']);
      setnumber(model_config[name]['nob']);
      setRotate(model_config[name]['rotate']);
    }
    if (name.includes('Star')){
      setshowStar(true);
      setshowBolt(false);
      setshowCircle(false);
      setshowPolygon(false);
      setshowRect(false);
      setshowHeart(false);
      setnumber(model_config[name]['nos']);
      setRadius(model_config[name]['radius']);
      setInnerRadius(model_config[name]['inner_radius']);
      setRotate(model_config[name]['rotate']);
    }
    if (name.includes('Heart')){
      setshowStar(false);
      setshowBolt(false);
      setshowCircle(false);
      setshowPolygon(false);
      setshowRect(false);
      setshowHeart(true);
      setRadius(model_config[name]['radius']);
      setAngle(model_config[name]['angle']);
      setRotate(model_config[name]['rotate']);
    }
    if (name === ''){
      setshowStar(false);
      setshowBolt(false);
      setshowCircle(false);
      setshowPolygon(false);
      setshowRect(false);
      setshowHeart(false);
    }
  };
  const delitem = (name) => {
    var prev_index = Object.keys(model3.models).slice(1).indexOf(name) - 1;
    delete model3["models"][name];
    delete model_config[name];
    if (prev_index === -1) {
      if (Object.keys(model3.models).slice(1).length > 0) {
        newcurrvalue(Object.keys(model3.models).slice(1)[Object.keys(model3.models).slice(1).length-1]);
      }
      else {
        newcurrvalue('');
      }
    } else {
      newcurrvalue(Object.keys(model3.models).slice(1)[prev_index]);
    }
  };

  const BluePrint = () => {
    return (
      <Blueprint model={model3} options={{showGrid: true, fitOnScreen: true, unitString: 'mm'}}>
        <h4>
          Design
        </h4>
      </Blueprint>
    );
  }
  const ListItems = () => {
    return (
      <div>
      {
      Object.keys(model3.models).slice(1).map((name) => (
        <Box sx={{ pb:1, mx: "auto" }} key={name}>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button variant="outlined" onClick={() => { newcurrvalue(name); }}>
            {name}
          </Button>
          {
            (curr === name) ? <Button aria-label="delete" onClick={ () => { delitem(name);}}><DeleteIcon fontSize="small"/></Button> : null
          }
          
          </ButtonGroup>
          
        </Box>
      ))
    }
    </div>
    )
};

  const handleMove = (stick) => {
    moved = 1;
    model3["models"][curr].origin = [stick.x, stick.y];
    setManualTilt([stick.x, stick.y]);
  };

  const name_change = (_event) => {
    setname(_event.target.value);
  };

  const polygon0 = (_event, newValue) => {
    setnumber(newValue);
    model_config[curr]['nos'] = newValue;
    model3['models'][curr] = makerjs.model.move(new makerjs.models.Polygon(newValue, model_config[curr]['radius'], model_config[curr]['rotate']),[model3['models'][curr].origin[0], model3['models'][curr].origin[1]] );
  };
  
  const polygon1 = (_event, newValue) => {
    setRadius(newValue);
    model_config[curr]['radius'] = newValue;
    model3['models'][curr] = makerjs.model.move(new makerjs.models.Polygon(model_config[curr]['nos'], newValue, model_config[curr]['rotate']),[model3['models'][curr].origin[0], model3['models'][curr].origin[1]] );
  };


  const polygon2 = (_event, newValue) => {
    setRotate(newValue);
    model_config[curr]['rotate'] = newValue;
    model3['models'][curr] = makerjs.model.move(new makerjs.models.Polygon(model_config[curr]['nos'], model_config[curr]['radius'], newValue),[model3['models'][curr].origin[0], model3['models'][curr].origin[1]]);
  };

  const circle0 = (_event, newValue) => {
    setRadius(newValue);
    model_config[curr]['radius'] = newValue;
    model3['models'][curr] = makerjs.model.move(new makerjs.models.Ellipse(newValue, newValue), [model3['models'][curr].origin[0], model3['models'][curr].origin[1]] );
  };

  const rect0 = (_event, newValue) => {
    setWidth(newValue);
    model_config[curr]['width'] = newValue;
    model3['models'][curr] = makerjs.model.move(makerjs.model.rotate(new makerjs.models.RoundRectangle(newValue, model_config[curr]['height'],model_config[curr]['round']), model_config[curr]['rotate'],[newValue/2, model_config[curr]['height']/2]),[model3['models'][curr].origin[0], model3['models'][curr].origin[1]]);
  };
  
  const rect1 = (_event, newValue) => {
    setHeight(newValue);
    model_config[curr]['height'] = newValue;
    model3['models'][curr] =  makerjs.model.move(makerjs.model.rotate(new makerjs.models.RoundRectangle(model_config[curr]['width'], newValue, model_config[curr]['round']), model_config[curr]['rotate'],[model_config[curr]['width']/2, newValue/2]),[model3['models'][curr].origin[0], model3['models'][curr].origin[1]]);
  };

  const rect2 = (_event, newValue) => {
    setRound(newValue);
    model_config[curr]['round'] = newValue;
    model3['models'][curr] = makerjs.model.move(makerjs.model.rotate(new makerjs.models.RoundRectangle(model_config[curr]['width'], model_config[curr]['height'], newValue), model_config[curr]['rotate'], [model_config[curr]['width']/2, model_config[curr]['height']/2]),[model3['models'][curr].origin[0], model3['models'][curr].origin[1]]);
  };

  const rect3 = (_event, newValue) => {
    setRotate(newValue);
    model_config[curr]['rotate'] = newValue;
    model3['models'][curr] = makerjs.model.move(makerjs.model.rotate(new makerjs.models.RoundRectangle(model_config[curr]['width'], model_config[curr]['height'], model_config[curr]['round']), newValue, [model_config[curr]['width']/2, model_config[curr]['height']/2]),[model3['models'][curr].origin[0], model3['models'][curr].origin[1]]);
  };

  const bolt0 = (_event, newValue) => {
    setRadius(newValue);
    model_config[curr]['radius'] = newValue;
    model3['models'][curr] = makerjs.model.move(new makerjs.models.BoltCircle(newValue, model_config[curr]['hole_radius'], model_config[curr]['nob'], model_config[curr]['rotate']),[model3['models'][curr].origin[0], model3['models'][curr].origin[1]] );
  };
  
  const bolt1 = (_event, newValue) => {
    setInnerRadius(newValue);
    model_config[curr]['hole_radius'] = newValue;
    model3['models'][curr] = makerjs.model.move(new makerjs.models.BoltCircle(model_config[curr]['radius'], newValue, model_config[curr]['nob'], model_config[curr]['rotate']),[model3['models'][curr].origin[0], model3['models'][curr].origin[1]] );
  };


  const bolt2 = (_event, newValue) => {
    setnumber(newValue);
    model_config[curr]['nob'] = newValue;
    model3['models'][curr] = makerjs.model.move(new makerjs.models.BoltCircle(model_config[curr]['radius'], model_config[curr]['hole_radius'], newValue, model_config[curr]['rotate']),[model3['models'][curr].origin[0], model3['models'][curr].origin[1]] );
  };

  const bolt3 = (_event, newValue) => {
    setRotate(newValue);
    model_config[curr]['rotate'] = newValue;
    model3['models'][curr] = makerjs.model.move(new makerjs.models.BoltCircle(model_config[curr]['radius'], model_config[curr]['hole_radius'], model_config[curr]['nob'], newValue),[model3['models'][curr].origin[0], model3['models'][curr].origin[1]] );
  };
  
  const star0 = (_event, newValue) => {
    setnumber(newValue);
    model_config[curr]['nos'] = newValue;
    model3['models'][curr] = makerjs.model.move(makerjs.model.rotate(new makerjs.models.Star(newValue, model_config[curr]['radius'], model_config[curr]['inner_radius'], model_config[curr]['skip']), model_config[curr]['rotate']),[model3['models'][curr].origin[0], model3['models'][curr].origin[1]] );
  };
  
  const star1 = (_event, newValue) => {
    setRadius(newValue);
    model_config[curr]['radius'] = newValue;
    model3['models'][curr] = makerjs.model.move(makerjs.model.rotate(new makerjs.models.Star(model_config[curr]['nos'], newValue, model_config[curr]['inner_radius'], model_config[curr]['skip']), model_config[curr]['rotate']),[model3['models'][curr].origin[0], model3['models'][curr].origin[1]] );
  };


  const star2 = (_event, newValue) => {
    setInnerRadius(newValue);
    model_config[curr]['inner_radius'] = newValue;
    model3['models'][curr] = makerjs.model.move(makerjs.model.rotate(new makerjs.models.Star(model_config[curr]['nos'], model_config[curr]['radius'], newValue, model_config[curr]['skip']), model_config[curr]['rotate']),[model3['models'][curr].origin[0], model3['models'][curr].origin[1]] );
  };

  const star4 = (_event, newValue) => {
    setRotate(newValue);
    model_config[curr]['rotate'] = newValue;
    model3['models'][curr] = makerjs.model.move(makerjs.model.rotate(new makerjs.models.Star(model_config[curr]['nos'], model_config[curr]['radius'], model_config[curr]['inner_radius'],model_config[curr]['skip'] ), newValue),[model3['models'][curr].origin[0], model3['models'][curr].origin[1]] );
  };

  const heart0 = (_event, newValue) => {
    setRadius(newValue);
    model_config[curr]['radius'] = newValue;
    model3['models'][curr] = makerjs.model.move(makerjs.model.rotate(new Heart(newValue, model_config[curr]['angle']), model_config[curr]['rotate']),[model3['models'][curr].origin[0], model3['models'][curr].origin[1]] );
  };

  const heart1 = (_event, newValue) => {
    setAngle(newValue);
    model_config[curr]['angle'] = newValue;
    model3['models'][curr] = makerjs.model.move(makerjs.model.rotate(new Heart(model_config[curr]['radius'], newValue), model_config[curr]['rotate']),[model3['models'][curr].origin[0], model3['models'][curr].origin[1]] );
  };

  const heart2 = (_event, newValue) => {
    setRotate(newValue);
    model_config[curr]['rotate'] = newValue;
    model3['models'][curr] = makerjs.model.move(makerjs.model.rotate(new Heart(model_config[curr]['radius'], model_config[curr]['angle']), newValue),[model3['models'][curr].origin[0], model3['models'][curr].origin[1]] );
  };

  const submitSVG = (model) => {
    const options = {
      accuracy: 0.000001,
      units: makerjs.unitType.Millimeter,
      strokeWidth: '0.25mm',
    };
    delete model3["models"]["Path 1"];
    var model1 = makerjs.exporter.toSVGPathData(model3, options);
    const db = getDatabase();
    set(ref(db, 'submitions/'+name), {
    'path': model1.toString(),
    }).then(() => {
      setTimeout(function(){
      }, 3000); 
      refreshPage();
    })
    .catch((error) => {
      console.log(error)
    });;
    //delete model3["models"]["Path 1"];
    //const output = makerjs.exporter.toSVG(model3, options);
    //const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    //FileSaver.saveAs(blob, name+'.svg');
  }
  const downloadSVG = (model) => {
    const options = {
      accuracy: 0.000001,
      units: makerjs.unitType.Millimeter,
      strokeWidth: '0.25mm',
    };
    delete model3["models"]["Path 1"];
    const output = makerjs.exporter.toSVG(model3, options);
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(blob, name+'.svg');
    refreshPage();
  }

  const refreshPage = () => {
    window.location.reload(false);
  };



  return (
    <>
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: 'repeat(19, 1fr)',
      gap: 0,
      gridTemplateRows: 'auto',
      gridTemplateAreas: `
    "sidebar divider main main main main main main main main main main main main main main main main main"
    `,
    }}>
      <Box sx={{ width: window.innerWidth/6, height: window.innerHeight, gridArea: 'sidebar'}}>
        <Scrollbar
          sx={{
            width: 1,
            height: 1,
            '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column'},
          }}
        >
          <Box sx={{ px: 2.5, py: 3}} onClick={navigateToLogin}>
            <Logo />
          </Box>

          <Box sx={{ mb: 5, mr: 2}}>
            <AccountStyle>
              <Box sx={{mx: "auto" }}>
                <Typography variant="subtitle4" sx={{ color: 'text.primary', justifyContent: 'center' }}>
                  Active Elements
                </Typography>
              </Box>
            </AccountStyle>
          </Box>

          <ListItems />

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ pb: 1, mt: 1, mx: "auto"}}>
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              variant="contained"
            >
              Add Element
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={() => { newEl('Rectangle'); }} sx={{ fontSize: 15, height: 40}}>
                <h4 style={{ color: blue[700] }}>
                    Rectangle
                </h4>
              </MenuItem>
              <MenuItem onClick={() => { newEl('Circle'); }} sx={{ fontSize: 15, height: 40 }}>
                <h4 style={{ color: blue[700] }}>
                  Circle
                </h4>
              </MenuItem>
              <MenuItem onClick={() => { newEl('Polygon'); }} sx={{ fontSize: 15, height: 40 }}>
                <h4 style={{ color: blue[700] }}>
                  Polygon
                </h4>
              </MenuItem>
              <MenuItem onClick={() => { newEl('Bolt Circle'); }} sx={{ fontSize: 15, height: 40 }}>
                <h4 style={{ color: blue[700] }}>
                  Bolt Circle
                </h4>
              </MenuItem>
              <MenuItem onClick={() => { newEl('Star'); }} sx={{ fontSize: 15, height: 40 }}>
                <h4 style={{ color: blue[700] }}>
                  Star
                </h4>
              </MenuItem>
              <MenuItem onClick={() => { newEl('Heart'); }} sx={{ fontSize: 15, height: 40 }}>
                <h4 style={{ color: blue[700] }}>
                  Heart
                </h4>
              </MenuItem>
            </Menu>
          </Box>
          <Box  sx={{ pb: 1, mx: "auto" }}>
          <div>
      <Button onClick={refreshPage}>Restart Session?</Button>
    </div>
          </Box>
        </Scrollbar>
      </Box>
      <Divider variant="middle" orientation="vertical" flexItem sx={{width: 'fit-content', gridArea: 'divider'}}/>
      
      <Page title="Home Page" sx={{width: window.innerWidth-window.innerWidth/4, height: window.innerHeight, gridArea: 'main'}}>
        <Container maxWidth="xl">
          <Typography variant="h2" sx={{ mb: 5 }}>
            Hi, Welcome back
          </Typography>


          <Grid container spacing={3}>

            <Grid item xs={8} md={8} lg={8} sm={8} xl={8} sx={{ height: 500, width: 800 }}>
              <Card>
                <Box sx={{ px: 3, pb: 1 }} dir="ltr">
                <BluePrint />
                <TextField id="outlined-basic" label="Name" variant="outlined" size="small" value={name} onChange={name_change} sx={{mt: 1, mr: 1}}/>
                  <Button className="ui primary button" sx={{ mt: 1.25 }} variant="outlined" onClick={(e) => submitSVG(model3)}>Submit</Button>
                  <Button className="ui primary button" sx={{ mt: 1.25, ml: 1.25 }} variant="outlined" onClick={(e) => downloadSVG(model3)}>Download</Button>
                </Box>
              </Card>
            </Grid>



            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
              <Card sx={{ width: 330 }}>
              {
                    (showPolygon || showCircle || showRect || showBolt || showStar )? <Box className='nos' sx={{p: 2, width: 290 }}>
                      <h2>{curr}</h2>
                    </Box> : null
                  }
                  {
                    showPolygon ? <Box className='nos' sx={{p: 2, width: 290 }}>
                      <h3>Number of Sides</h3>
                      <Slider
                        onChange={polygon0}
                        value={number}
                        size="small"
                        valueLabelDisplay="auto"
                        min={3}
                        max={15}
                      />
                    </Box> : null
                  }
                  {
                    (showPolygon) ? <Box className='radius' sx={{p: 2, width: 290 }}>
                      <h3>Radius</h3>
                      <Slider
                        onChange={polygon1}
                        value={Radius}
                        size="small"
                        valueLabelDisplay="auto"
                        min={3}
                        max={32}
                      />
                    </Box> : null
                  }
                  {
                    showPolygon ? <Box className='transform' sx={{p: 2, width: 290 }}>
                      <h3>Rotate</h3>
                      <Slider
                        onChange={polygon2}
                        size="small"
                        value={Rotate}
                        valueLabelDisplay="auto"
                        min={0}
                        max={360}
                      />
                    </Box> : null
                  }
                  {
                    (showCircle) ? <Box className='radius' sx={{p: 2, width: 290 }}>
                      <h3>Radius</h3>
                      <Slider
                        onChange={circle0}
                        value={Radius}
                        size="small"
                        valueLabelDisplay="auto"
                        min={3}
                        max={30}
                      />
                    </Box> : null
                  }
                  {
                    showRect ? <Box className='width' sx={{p: 2, width: 290 }}>
                      <h3>Width</h3>
                      <Slider
                        onChange={rect0}
                        value={Width}
                        size="small"
                        valueLabelDisplay="auto"
                        min={3}
                        max={65}
                      />
                    </Box> : null
                  }
                  {
                    showRect ? <Box className='height' sx={{ p: 2,width: 290 }}>
                      <h3>Height</h3>
                      <Slider
                        onChange={rect1}
                        value={Height}
                        size="small"
                        valueLabelDisplay="auto"
                        min={3}
                        max={65}
                      />
                    </Box> : null
                  }
                  {
                    showRect ? <Box className='round' sx={{ p: 2,width: 290 }}>
                      <h3>Smooth Edge</h3>
                      <Slider
                        onChange={rect2}
                        value={Round}
                        size="small"
                        valueLabelDisplay="auto"
                        min={0}
                        max={50}
                      />
                    </Box> : null
                  }
                  {
                    showRect ? <Box className='rotate' sx={{ p: 2,width: 290 }}>
                      <h3>Rotate</h3>
                      <Slider
                        onChange={rect3}
                        value={Rotate}
                        size="small"
                        valueLabelDisplay="auto"
                        min={0}
                        max={360}
                      />
                    </Box> : null
                  }
                  {
                    showBolt ? <Box className='radius' sx={{p: 2, width: 290 }}>
                      <h3>Radius</h3>
                      <Slider
                        onChange={bolt0}
                        value={Radius}
                        size="small"
                        valueLabelDisplay="auto"
                        min={1}
                        max={30}
                      />
                    </Box> : null
                  }
                  {
                    showBolt ? <Box className='radius' sx={{p: 2, width: 290 }}>
                      <h3>Inside Radius</h3>
                      <Slider
                        onChange={bolt1}
                        value={InnerRadius}
                        size="small"
                        valueLabelDisplay="auto"
                        min={1}
                        max={15}
                      />
                    </Box> : null
                  }
                  {
                    showBolt ? <Box className='nos' sx={{p: 2, width: 290 }}>
                      <h3>Number of Bolts</h3>
                      <Slider
                        onChange={bolt2}
                        value={number}
                        size="small"
                        valueLabelDisplay="auto"
                        min={2}
                        max={15}
                      />
                    </Box> : null
                  }
                  {
                    showBolt ? <Box className='rotate' sx={{ p: 2,width: 290 }}>
                      <h3>Rotate</h3>
                      <Slider
                        onChange={bolt3}
                        value={Rotate}
                        size="small"
                        valueLabelDisplay="auto"
                        min={0}
                        max={360}
                      />
                    </Box> : null
                  }
                  {
                    showStar ? <Box className='nos' sx={{p: 2, width: 290 }}>
                      <h3>Number of Points</h3>
                      <Slider
                        onChange={star0}
                        value={number}
                        size="small"
                        valueLabelDisplay="auto"
                        min={3}
                        max={20}
                      />
                    </Box> : null
                  }
                  {
                    showStar ? <Box className='radius' sx={{ p: 2,width: 290 }}>
                      <h3>Outer Radius</h3>
                      <Slider
                        onChange={star1}
                        value={Radius}
                        size="small"
                        valueLabelDisplay="auto"
                        min={5}
                        max={40}
                      />
                    </Box> : null
                  }
                  {
                    showStar ? <Box className='inner_radius' sx={{ p: 2,width: 290 }}>
                      <h3>Inner Radius</h3>
                      <Slider
                        onChange={star2}
                        value={InnerRadius}
                        size="small"
                        valueLabelDisplay="auto"
                        min={2}
                        max={30}
                      />
                    </Box> : null
                  }
                  {
                    showStar ? <Box className='rotate' sx={{ p: 2,width: 290 }}>
                      <h3>Rotate</h3>
                      <Slider
                        onChange={star4}
                        value={Rotate}
                        size="small"
                        valueLabelDisplay="auto"
                        min={0}
                        max={360}
                      />
                    </Box> : null
                  }
                  {
                    showHeart ? <Box className='radius' sx={{ p: 2,width: 290 }}>
                      <h3>Radius</h3>
                      <Slider
                        onChange={heart0}
                        value={Radius}
                        size="small"
                        valueLabelDisplay="auto"
                        min={5}
                        max={20}
                      />
                    </Box> : null
                  }
                  {
                    showHeart ? <Box className='angle' sx={{ p: 2,width: 290 }}>
                      <h3>Angle</h3>
                      <Slider
                        onChange={heart1}
                        value={Angle}
                        size="small"
                        valueLabelDisplay="auto"
                        min={40}
                        max={120}
                      />
                    </Box> : null
                  }
                  {
                    showHeart ? <Box className='rotate' sx={{ p: 2,width: 290 }}>
                      <h3>Rotate</h3>
                      <Slider
                        onChange={heart2}
                        value={Rotate}
                        size="small"
                        valueLabelDisplay="auto"
                        min={0}
                        max={360}
                      />
                    </Box> : null
                  }
              </Card>
            </Grid>
            {
              (curr === '' && added === 0) ?
            <Grid item xs={4} sm={4} md={4} lg={4} xl={4} sx={{ mb: 10}}>
              <Card>
                <Box sx={{ p: 2 }} dir="ltr">
                  <h3>Hint: Try adding an element</h3>
                </Box>
              </Card>
            </Grid> : null}
            {
              (curr !== '') ?
            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
              <Card>
                <Box sx={{py:1, mx: 5}} dir="ltr">
                <Joystick size={100} sticky={true} throttle={70} baseColor="grey" stickColor="black" move={handleMove}></Joystick>
                </Box>
              </Card>
            </Grid> : null}
            {
              (curr !== '' && moved === 0) ?
            <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
              <Card>
                <Box sx={{ p: 2 }} dir="ltr">
                  <h3>Hint: Try moving the joystick</h3>
                </Box>
              </Card>
            </Grid> : null}
          </Grid>  
        </Container>
      </Page>
    </Box>
    </>
  );
}
