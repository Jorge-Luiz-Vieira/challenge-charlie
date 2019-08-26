import React, { useState, useMemo } from "react";
import style from "./style.less";
import { getWindDirection } from '../../utils/utils';

const Body = (city, ...props) => {
    const [todayWeather, setTodayWeather] = useState();
    const [tomorrowWeather, setTomorrowWeather] = useState();
    const [afterTomorrowWeather, setAfterTomorrowWeather] = useState();
    useMemo(() =>{ 
    city.city !== undefined && fetch('http://api.openweathermap.org/data/2.5/forecast?q='+ city.city +'&units=metric&lang=pt&APPID=7ba73e0eb8efe773ed08bfd0627f07b8').then(res => res.json())
        .then((data) => {
            setTodayWeather(data.list[0]);
            const todayDate = new Date().getDate();
            data.list.map(function(item) {
                const itemDate = new Date(item.dt_txt).getDate();
                if( itemDate === parseInt(todayDate) + 1){
                    setTomorrowWeather(item);
                }
                if( itemDate === parseInt(todayDate) + 2){
                    setAfterTomorrowWeather(item);
                }
            });
        });
    },[city.city]);

    console.log(todayWeather);
    return (
        <div className={style.layout}>
            <div className={style.container}>
                <div className={style.firstHalf}>
                    <p data-icon="B" />
                </div>
                <div className={style.secondHalf}>
                    <h3 className={style.heading}>Hoje</h3>
                    <p className={style.text}> {todayWeather ? `${todayWeather.main.temp} ºC` : `Buscando`}</p>
                    <h3 className={style.heading}>{todayWeather ? `${todayWeather.weather[0].description}` : `Buscando`}</h3>
                    <p className={style.text}>Vento: {todayWeather ? `${getWindDirection(todayWeather.wind.deg)} 6.4km` : `Buscando`}</p>
                    <p className={style.text}>Humidade: {todayWeather ? `${todayWeather.main.humidity}%` : `Buscando`}</p>
                    <p className={style.text}>Pressão: {todayWeather ? `${todayWeather.main.pressure} hPA` : `Buscando`}</p>
                </div>
            </div>
            <div className={style.secondContainer}>
                <div className={style.firstHalf} />
                <div className={style.secondHalf}>
                    <h3 className={style.heading}>Amanhã</h3>
                    <p className={style.text}> {tomorrowWeather ? `${tomorrowWeather.main.temp} ºC` : `Buscando`}</p>
                </div>
            </div>
            <div className={style.thirdContainer}>
                <div className={style.firstHalf} />
                <div className={style.secondHalf}>
                    <h3 className={style.heading}>Depois de amanhã</h3>
                    <p className={style.text}> {afterTomorrowWeather ? `${afterTomorrowWeather.main.temp} ºC` : `Buscando`}</p>
                </div>
            </div>
        </div>
    );
};

export default Body;
