import PickCity from "../PickCity/PickCity";
import WeatherSummary from "../WeatherSummary/WeatherSummary";
import Loader from "../Loader/Loader";
import { useCallback, useState } from "react";
import ErrorBox from "../ErrorBox/ErrorBox";

const WeatherBox = (props) => {
  const apiKey = "7d452670b8af8080afe10d4b425a2af9";
  const [weather, setWeather] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const handleCityChange = useCallback((e, city) => {
    e.preventDefault();
    setError(false);
    setPending(true);
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    ).then((res) => {
      if (res.status === 200) {
        return res.json().then((data) => {
          const weatherData = {
            city: data.name,
            temp: data.main.temp,
            icon: data.weather[0].icon,
            description: data.weather[0].main,
          };
          setWeather(weatherData);
          setPending(false);
        });
      } else {
        setPending(false);
        setError(true);
      }
    });
  }, []);

  return (
    <section>
      <PickCity handleCityChange={handleCityChange} />
      {weather && pending === false && error === false && (
        <WeatherSummary weather={weather} />
      )}
      {pending === true && <Loader />}
      {error === true && <ErrorBox />}
    </section>
  );
};

export default WeatherBox;
