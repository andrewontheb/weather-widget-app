import React, { useCallback, useState } from "react"
import Slider from "react-slick";
import logo from './logo.svg';
import './scss/App.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

let currTime =  new Date().getHours() + ':' + `0${new Date().getMinutes()}`.slice(-2);
let currDate: string  = `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`;
const snowFlakes: Array<number> = Array(30).fill(0);

interface WidgetCard {
    city: string;
    date: string;
    temp: number;
    time: string;
    weather: string;
}

const Cards: WidgetCard[] = [
    {
        city: 'Moscow',
        date: currDate,
        temp: 22,
        time: currTime,
        weather: 'sun'
    },
    {
        city: 'London',
        date: currDate,
        temp: 12,
        time: currTime,
        weather: 'rain'
    },
    {
        city: 'Novosibirsk',
        date: currDate,
        temp: -12,
        time: currTime,
        weather: 'snow'
    }
];

export const App: React.FC = () => {
    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        centerMode: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        swipeToSlide: true,
        centerPadding: '0px'
    };
    const [WidgetCards, setWidgetCards] = useState(Cards);
    const [scale, setScale] = useState(true);
    const handleSwitchScale = useCallback(() => {
        setScale(!scale);
    }, [scale]);
    return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Interactive Weather Ad
        </p>
      </header>
      <main className="App-main">
          <Slider {...settings}>
              {
                  WidgetCards.map((location, index) => {
                      return <div key={index} className={`location__weather ${location.weather}` } >
                          <label className="checkbox">
                              <input  onClick={() => {handleSwitchScale()}} type="checkbox" checked={!scale}/>
                              <div className="checkbox__text">&nbsp;</div>
                          </label>
                          <div className={location.weather}>
                              { location.weather === 'snow' ? (snowFlakes.map((value, index) => {
                                  return <span key={index}> </span>
                              })) : ''
                              }
                          </div>
                          <div className="info">
                              <div className="location__city">{location.city}</div>
                              <p className="location__date">{location.date}</p>
                              <p className="location__temp"><span>{scale ? (location.temp > 0 ? '+' + location.temp + '°C' : location.temp + '°C') : (((location.temp * 9 / 5) + 32).toFixed(2) + '°F')}</span></p>
                              <p className="location__time">{location.time}</p>
                          </div>

                      </div>
                  })
              }
          </Slider>
      </main>
      <footer className="App-footer">
        <button className="btn btn--lime">Download</button>
      </footer>
    </div>
  );
};

export default App;
