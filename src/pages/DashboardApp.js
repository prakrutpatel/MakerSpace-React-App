// @mui
import * as React from 'react';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import * as makerjs from "makerjs";
import Blueprint from "react-blueprint-svg";
import { useTheme } from '@mui/material/styles';
import FileSaver from 'file-saver'
import { Joystick } from 'react-joystick-component';
import { styled } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Grid, Container, Typography, Card, Box, Button, Divider, ButtonGroup } from '@mui/material';
import { blue } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
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
var pathData = "M224 1.7L125.16 1.7 M125.16 1.7L125.16 124 M125.16 124L101.7 124 M101.7 124L101.7 241.33 M101.7 241.33L125.16 241.33 M125.16 241.33L125.16 358.67 M125.16 358.67L101.7 358.67 M101.7 358.67L101.7 476 M101.7 476L125.16 476 M125.16 476L125.16 598.3 M125.16 598.3L224 598.3 M224 598.3L224 574.84 M224 574.84L341.33 574.84 M341.33 574.84L341.33 598.3 M341.33 598.3L458.67 598.3 M458.67 598.3L458.67 574.84 M458.67 574.84L576 574.84 M576 574.84L576 598.3 M576 598.3L674.84 598.3 M674.84 598.3L674.84 476 M674.84 476L698.3 476 M698.3 476L698.3 358.67 M698.3 358.67L674.84 358.67 M674.84 358.67L674.84 241.33 M674.84 241.33L698.3 241.33 M698.3 241.33L698.3 124 M698.3 124L674.84 124 M674.84 124L674.84 1.7 M674.84 1.7L576 1.7 M576 1.7L576 25.16 M576 25.16L458.67 25.16 M458.67 25.16L458.67 1.7 M458.67 1.7L341.33 1.7 M341.33 1.7L341.33 25.16 M341.33 25.16L224 25.16 M224 25.16L224 1.7";
let model3 = {
  models: {
    "Path 1": makerjs.model.center(makerjs.model.scale(makerjs.importer.fromSVGPathData(pathData), 0.7))
  }
};

let model_config = {
};

var moved = 0;
var added = 0;




// ----------------------------------------------------------------------

export default function DashboardApp() {

  const [number, setnumber] = React.useState(0);
  const [Radius, setRadius] = React.useState(0);
  const [Rotate, setRotate] = React.useState(0);
  const [Width, setWidth] = React.useState(0);
  const [Height, setHeight] = React.useState(0);
  const [Round, setRound] = React.useState(0);
  const [InnerRadius, setInnerRadius] = React.useState(0);
  const [showPolygon, setshowPolygon] = React.useState(false);
  const [showRect, setshowRect] = React.useState(false);
  const [ManualTilt, setManualTilt] = React.useState([0,0]);
  const [showCircle, setshowCircle] = React.useState(false);
  const [showBolt, setshowBolt] = React.useState(false);
  const [showStar, setshowStar] = React.useState(false);
  const [curr, setcurr] = React.useState('');
  const [rect, setrect] = React.useState(1);
  const [circle, setcircle] = React.useState(1);
  const [polygon, setpolygon] = React.useState(1);
  const [bc, setbc] = React.useState(1);
  const [star, setstar] = React.useState(1);
  const [rr, setrr] = React.useState(1);

  

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
      model3.models[uni_name] = makerjs.model.center(makerjs.model.move(new makerjs.models.RoundRectangle(100, 50, 0), [0,0]));
      setcurr(uni_name);
      setrect(prevcount => prevcount+1);
      model_config[uni_name] = {}
      model_config[uni_name]['width'] = 100;
      model_config[uni_name]['height'] = 50;
      model_config[uni_name]['round'] = 0;
      model_config[uni_name]['rotate'] = 0;
      setWidth(100);
      setHeight(50);
      setRound(0);
      setRotate(0);
      setshowCircle(false);
      setshowPolygon(false);
      setshowRect(true);
      setshowBolt(false);
      setshowStar(false);
    } else if (newValue === 'Circle' ) {
      var uni_name = 'Circle ' + circle;
      model3.models[uni_name] = makerjs.model.move(new makerjs.models.Ellipse(50, 50), [0,0]);
      setcurr(uni_name);
      setcircle(prevcount => prevcount+1);
      model_config[uni_name] = {}
      model_config[uni_name]['radius'] = 50;
      setRadius(50);
      setshowCircle(true);
      setshowPolygon(false);
      setshowRect(false);
      setshowBolt(false);
      setshowStar(false);
    } else if (newValue === 'Polygon' ) {
      var uni_name = 'Polygon ' + polygon;
      model3.models[uni_name] = makerjs.model.move(new makerjs.models.Polygon(3, 20, 0), [0,0]);
      setcurr(uni_name);
      setpolygon(prevcount => prevcount+1);
      model_config[uni_name] = {}
      model_config[uni_name]['nos'] = 3;
      model_config[uni_name]['radius'] = 20;
      model_config[uni_name]['rotate'] = 0;
      setnumber(3);
      setRadius(20);
      setRotate(0);
      setshowPolygon(true);
      setshowCircle(false);
      setshowRect(false);
      setshowBolt(false);
      setshowStar(false);
    } else if (newValue === 'Bolt Circle') {
      var uni_name = 'Bolt Circle ' + bc;
      model3.models[uni_name] = makerjs.model.move(new makerjs.models.BoltCircle(100, 4, 10, 0), [0,0]);
      setcurr(uni_name);
      setbc(prevcount => prevcount+1);
      model_config[uni_name] = {}
      model_config[uni_name]['radius'] = 100;
      model_config[uni_name]['hole_radius'] = 20;
      model_config[uni_name]['nob'] = 10;
      model_config[uni_name]['rotate'] = 0;
      setRadius(100);
      setInnerRadius(20);
      setnumber(10);
      setRotate(0);
      setshowBolt(true);
      setshowCircle(false);
      setshowPolygon(false);
      setshowRect(false);
      setshowStar(false);
    } else if (newValue === 'Star'){
      var uni_name = 'Star ' + star;
      model3.models[uni_name] = makerjs.model.move(new makerjs.models.Star(3, 50, 10, 2), [0,0]);
      setcurr(uni_name);
      setstar(prevcount => prevcount+1);
      model_config[uni_name] = {}
      model_config[uni_name]['nos'] = 3;
      model_config[uni_name]['radius'] = 50;
      model_config[uni_name]['inner_radius'] = 10;
      model_config[uni_name]['skip'] = 2;
      model_config[uni_name]['rotate'] = 0;
      setnumber(3);
      setRadius(50);
      setInnerRadius(10);
      setRotate(0);
      setshowStar(true);
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
    } 
    if (name.includes('Circle')){
      setshowCircle(true);
      setshowPolygon(false);
      setshowRect(false);
      setshowBolt(false);
      setshowStar(false);
      setRadius(model_config[name]['radius']);
    } 
    if (name.includes('Polygon')){
      setshowPolygon(true);
      setshowCircle(false);
      setshowRect(false);
      setshowBolt(false);
      setshowStar(false);
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
      setnumber(model_config[name]['nos']);
      setRadius(model_config[name]['radius']);
      setInnerRadius(model_config[name]['inner_radius']);
      setRotate(model_config[name]['rotate']);
    }
    if (name === ''){
      setshowStar(false);
      setshowBolt(false);
      setshowCircle(false);
      setshowPolygon(false);
      setshowRect(false);
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
      <Blueprint model={model3} options={{showGrid: true, fitOnScreen: true,}}>
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
        <Box sx={{px: 4, pb:1, mx: "auto" }} key={name}>
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

  const filename = "output.svg"
  const file = makerjs.exporter.toSVG(model3);

  const theme = useTheme();

  const handleMove = (stick) => {
    moved = 1;
    model3["models"][curr].origin = [stick.x * 4, stick.y * 4];
    setManualTilt([stick.x * 4, stick.y * 4]);
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

  const saveSvg = (model) => {
    const options = {
      accuracy: 0.000001,
      units: makerjs.unitType.Millimeter,
      strokeWidth: '0.25mm',
    }
    const output = makerjs.exporter.toSVG(model, options)
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' })
    FileSaver.saveAs(blob, 'outline.svg')
  }

  const refreshPage = () => {
    window.location.reload(false);
  };



  return (
    <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
      <Box sx={{ width: 300 }}>
        <Scrollbar
          sx={{
            height: 1,
            '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
          }}
        >
          <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
            <Logo />
          </Box>

          <Box sx={{ mb: 5, mx: 2.5 }}>
            <AccountStyle>
              <Box sx={{ ml: 2, mx: "auto" }}>
                <Typography variant="subtitle4" sx={{ color: 'text.primary', justifyContent: 'center' }}>
                  Active Elements
                </Typography>
              </Box>
            </AccountStyle>
          </Box>

          <ListItems />

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ pb: 1, mt: 1, mx: "auto" }}>
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
            </Menu>
          </Box>
          <Box  sx={{ pb: 1, mx: "auto" }}>
          <div>
      <Button onClick={refreshPage}>Restart Session?</Button>
    </div>
          </Box>
        </Scrollbar>
      </Box>

      <Page title="Home Page">
        <Container maxWidth="xl">
          <Typography variant="h2" sx={{ mb: 5 }}>
            Hi, Welcome back
          </Typography>


          <Grid container spacing={3}>

            <Grid item xs={8} md={8} lg={8} sm={8} xl={8} sx={{ height: 500, width: 800 }}>
              <Card>
                <Box sx={{ px: 3, pb: 1 }} dir="ltr">
                  <BluePrint />
                  <Button className="ui primary button" sx={{ mt: 1 }} variant="outlined" onClick={(e) => saveSvg(model3)}>Download SVG</Button>
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
                        min={1}
                        max={150}
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
                        min={1}
                        max={500}
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
                        min={5}
                        max={200}
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
                        min={5}
                        max={200}
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
                        max={150}
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
                        max={50}
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
                        max={200}
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
                        min={1}
                        max={50}
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
              </Card>
            </Grid>
            {
              (curr === '' && added === 0) ?
            <Grid item xs={3} sm={3} md={3} lg={3} xl={3} sx={{ mb: 10}}>
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

            {
              (curr !== '' && moved === 1) ?
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <Card>
                <Box sx={{ p: 2 }} dir="ltr">
                  <h3>
                    Known Bugs (under progress)
                  </h3>
                  <h4>
                  1. Responsiveness problems when changing zoom of the screen
                  </h4>
                </Box>
              </Card>
            </Grid> : null}

          </Grid>
        </Container>
      </Page>
    </Stack>
  );
}
