import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const getWeatherIcon = (condition, isDayTime) => {
  const dayOrNight = isDayTime ? "day" : "night";

  return fetch("/weatherIconMappings.json")
    .then((res) => res.json())
    .then((data) => {
      return data[condition][dayOrNight];
    })
    .catch((error) => {
      console.error("Error while fetching icons:", error);
      return "cloudy.svg";
    });
};

const TodayForecast = ({ data, time }) => {
  const [weatherIcon, setWeatherIcon] = useState("cloudy.svg");

  useEffect(() => {
    if (data && data.hour) {
      const condition = data["hour"][time]["condition"]["text"];
      getWeatherIcon(condition, true).then((iconPath) => {
        setWeatherIcon(iconPath);
      });
    }
  }, [data]);

  if (!data || !data.hour) {
    return (
      <div className="flex flex-col items-center justify-between">
        <span className="font-light">Loading...</span>
      </div>
    );
  }

  const temperature = data["hour"][time]["temp_c"];
  const timeDisplay = time < 12 ? (time % 12) + " AM" : (time % 12) + " PM";

  return (
    <div className="flex flex-col items-center justify-between">
      <span className="font-light">{timeDisplay}</span>
      <Image
        width={50}
        height={50}
        className="scale-75"
        src={`/images/weather-icons/static/${weatherIcon}`}
        alt=""
      />
      <span className="font-medium">{temperature}°</span>
    </div>
  );
};

const DailyForecast = ({ data }) => {
  const [weatherIcon, setWeatherIcon] = useState("cloudy.svg");

  useEffect(() => {
    if (data && data.day) {
      const condition = data.day.condition.text;
      getWeatherIcon(condition, true).then((iconPath) => {
        setWeatherIcon(iconPath);
      });
    }
  }, [data]);

  if (!data || !data.day) {
    return (
      <div className="flex flex-col items-center justify-between">
        <span className="font-light">Loading...</span>
      </div>
    );
  }

  const date = new Date(data.date);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekday = weekdays[date.getDay()];
  const temperature = data.day.avgtemp_c;

  return (
    <div className="flex flex-col items-center justify-between">
      <span className="font-light">{weekday}</span>
      <Image
        width={50}
        height={50}
        className="scale-75"
        src={`/images/weather-icons/static/${weatherIcon}`}
        alt=""
      />
      <span className="font-medium">{temperature}°</span>
    </div>
  );
};

const WeatherCard = ({ location }) => {
  const [data, setData] = useState(null);
  const [iconMapping, setIconMapping] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (location && location.lat && location.lon) {
      const arg = location.lat.toString() + "," + location.lon.toString();

      fetch(`http://localhost:5000/api/get_weather/${arg}`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            setData(data);
          } else {
            console.error("Error:", error);
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  }, [location]);

  useEffect(() => {
    fetch("/weatherIconMappings.json")
      .then((response) => response.json())
      .then((mapping) => setIconMapping(mapping))
      .catch((error) => console.error("Error loading icon mapping:", error));
  }, []);

  if (!data || !data.location || !data.current || !data.forecast) {
    return (
      <div className="w-full min-[500px]:w-[260px] flex flex-col gap-4 py-4 px-6 bg-white bg-opacity-15 rounded-2xl border border-[rgba(255,255,255,0.2)] shadow-md">
        <div className="w-full flex flex-col gap-3">
          <div>
            <h3 className="text-2xl font-medium">Loading...</h3>
            <span className="text-xl">Please wait</span>
          </div>
        </div>
      </div>
    );
  }

  const condition = data["current"]["condition"]["text"];
  const day = data["current"]["is_day"] == 1 ? "day" : "night";

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      onClick={toggleExpand}
      className="w-full h-fit cursor-pointer min-[500px]:w-[240px] flex flex-col gap-4 py-4 px-6 bg-white bg-opacity-15 rounded-2xl border border-[rgba(255,255,255,0.2)] shadow-md transition-all duration-250"
    >
      <div className="w-full flex flex-col gap-3">
        <div>
          <h3 className="text-2xl font-medium">{data["location"]["name"]}</h3>
          <span className="text-xl">{data["location"]["country"]}</span>
        </div>
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-4xl font-bold">
              {data["current"]["temp_c"]}°
            </span>
            <span className="text-lg font-medium">
              {data["current"]["condition"]["text"]}
            </span>
          </div>
          <div className="scale-150">
            <Image
              width={50}
              height={50}
              src={`/images/weather-icons/animated/${iconMapping[condition][day]}`}
              alt=""
            />
          </div>
        </div>
      </div>
      <div
        className={`${isExpanded ? "block" : "hidden"} pt-3 border-t border-[rgba(255,255,255,0.4)]`}
      >
        <h3 className="font-medium mb-2">Weather today</h3>
        <div className="w-full flex justify-between">
          <div className="flex flex-col items-center justify-between">
            <span className="font-light">Hum</span>
            <span className="font-medium">{data["current"]["humidity"]}%</span>
          </div>
          <div className="flex flex-col items-center justify-between">
            <span className="font-light">Wind</span>
            <span className="font-medium">
              {data["current"]["wind_kph"]} kph
            </span>
          </div>
          <div className="flex flex-col items-center justify-between">
            <span className="font-light">UV</span>
            <span className="font-medium">{data["current"]["uv"]}/11</span>
          </div>
        </div>
      </div>
      <div
        className={`${isExpanded ? "block" : "hidden"} pt-3 border-t border-[rgba(255,255,255,0.4)]`}
      >
        <h3 className="font-medium mb-2">Today&apos;s Forecast</h3>
        <div className="w-full flex justify-between">
          <TodayForecast data={data["forecast"]["forecastday"]["0"]} time={9} />
          <TodayForecast
            data={data["forecast"]["forecastday"]["0"]}
            time={14}
          />
          <TodayForecast
            data={data["forecast"]["forecastday"]["0"]}
            time={21}
          />
        </div>
      </div>
      <div className="pt-3 border-t border-[rgba(255,255,255,0.4)]">
        <h3 className={`${isExpanded ? "block" : "hidden"} font-medium mb-2`}>
          Daily Forecast
        </h3>
        <div className="w-full flex justify-between">
          <DailyForecast data={data["forecast"]["forecastday"]["1"]} />
          <DailyForecast data={data["forecast"]["forecastday"]["2"]} />
          <DailyForecast data={data["forecast"]["forecastday"]["3"]} />
        </div>
      </div>
      <div className="w-full hidden group-hover:flex justify-center"></div>
    </div>
  );
};

export default WeatherCard;
