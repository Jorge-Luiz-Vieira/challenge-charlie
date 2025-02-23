import React, {useEffect, useState} from 'react';
import './App.css';
import Header from './components/header/header';
import Body from './components/body/body';
import { getBackground} from './api/background';

function App() {
  const [loc,setLoc] = useState('');
  const [city,setCity] = useState();

  useEffect(() =>{ 
    const getLocation = (pos) => {
      fetch('https://api.opencagedata.com/geocode/v1/json?q='+pos.coords.latitude+','+pos.coords.longitude+'&key=c63386b4f77e46de817bdf94f552cddf&language=en').then(res => res.json())
      .then((data) => {
      setCity(data.results[0].components.city);
      setLoc(data.results[0].components.city+ ', ' + data.results[0].components.state);
      },
    )}
    getBackground();
    navigator.geolocation.getCurrentPosition(getLocation);
  },[]);

  return (
    <div className="App">
      <Header location={loc}/>
      <Body city={city}/>
    </div>
  );
}

export default App;
