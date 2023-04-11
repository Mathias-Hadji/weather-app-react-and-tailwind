import { useEffect, useState } from "react";
import { BiSearch, BiLoaderAlt } from "react-icons/bi";
import { AiOutlineEye, AiOutlineHeart } from "react-icons/ai";
import { CgDrop } from "react-icons/cg";
import { CiTempHigh } from "react-icons/ci";
import { WiStrongWind } from "react-icons/wi";
import {
    BsSunFill,
    BsCloudsFill,
    BsFillCloudRainHeavyFill,
    BsCloudFog2,
    BsSnow,
} from "react-icons/bs";
import { VscError } from "react-icons/vsc";

const { REACT_APP_OPENWEATHERMAP_API_KEY } = process.env;

function App() {
    const [location, setLocation] = useState("Paris");
    const [weatherData, setWeatherData] = useState(null);
    const [iconWeather, setIconWeather] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [errorAnimation, setErrorAnimation] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    useEffect(() => {
        setLoading(true);

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${REACT_APP_OPENWEATHERMAP_API_KEY}&lang=fr&units=metric`;

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                if (data.message === "city not found") {
                    throw new Error("city not found");
                }

                setTimeout(() => {
                    setLoading(false);
                    setWeatherData({
                        city: data.name,
                        country: data.sys.country,
                        date: new Date(data.dt * 1000).toLocaleDateString(
                            "fr-FR"
                        ),
                        temp: Math.round(data.main.temp),
                        weatherDescription:
                            data.weather[0].description[0].toUpperCase() +
                            data.weather[0].description.slice(1),
                        visibility: Math.round(data.visibility / 1000),
                        humidity: data.main.humidity,
                        feelsLikeTemp: Math.round(data.main.feels_like),
                        wind: Math.round(data.wind.speed),
                    });

                    switch (data.weather[0].main) {
                        case "Clouds":
                            setIconWeather(
                                <BsCloudsFill />
                            );
                            break;

                        case "Clear":
                            setIconWeather(
                                <BsSunFill className="text-amber-500" />
                            );
                            break;

                        case "Rain":
                            setIconWeather(
                                <BsFillCloudRainHeavyFill className="text-cyan-300" />
                            );
                            break;

                        case "Snow":
                            setIconWeather(
                                <BsSnow className="text-cyan-300" />
                            );
                            break;

                        case "Fog":
                            setIconWeather(<BsCloudFog2 />);
                            break;

                        case "Drizzle":
                            setIconWeather(<BsCloudFog2 />);
                            break;

                        case "Mist":
                            setIconWeather(<BsCloudFog2 />);
                            break;

                        default:
                            setIconWeather(<VscError />);
                    }
                }, 1000);
                setInputValue("");
            })
            .catch(() => {
                setShowErrorMessage(true);
                setLocation('Paris')

                setTimeout(() => {
                    setShowErrorMessage(false);
                }, 3500);
            });
    }, [location]);

    const handleSubmitForm = () => {
        if (inputValue !== "") {
            setErrorAnimation(false);
            setLocation(inputValue);
        }

        if (inputValue === "") {
            setErrorAnimation(true);

            setTimeout(() => {
                setErrorAnimation(false);
            }, 500);
        }
    };

    if (!weatherData) {
        return (
            <div className="bg-gradientBg bg-no-repeat min-h-screen w-full bg-cover bg-center flex items-center justify-center">
                <BiLoaderAlt className="text-5xl text-white animate-spin" />
            </div>
        );
    }

    return (
        <div className="bg-gradientBg bg-no-repeat min-h-screen w-full bg-cover bg-center flex flex-col items-center justify-center">
            {showErrorMessage && (
                <div className="fixed top-8 bg-red-800 bg-opacity-80 text-white py-3 px-4 w-72 mb-10 rounded-md animate-fadeDown">
                    <p>Ville ou Pays non trouvé.</p>
                </div>
            )}

            <div className="w-80">
                <div
                    className={`${
                        errorAnimation ? "animate-shake" : "animate-none"
                    } bg-black bg-opacity-50 text-white rounded-full flex justify-between py-2 mb-6`}
                >
                    <input
                        onChange={(e) => setInputValue(e.target.value)}
                        className="w-full text-sm bg-transparent placeholder-white px-5 focus:border-transparent focus:outline-none focus:ring-0"
                        type="text"
                        placeholder="Rechercher par ville ou pays"
                        value={inputValue}
                    />
                    <button
                        onClick={handleSubmitForm}
                        className="flex items-center justify-center bg-blue-400 h-10 w-16 rounded-full mr-2"
                    >
                        <BiSearch className="text-white" />
                    </button>
                </div>

                <div className="bg-black min-h-[400px] bg-opacity-50 px-5 rounded-2xl py-8">
                    {loading ? (
                        <div className="w-full h-80 flex justify-center items-center">
                            <BiLoaderAlt className="text-white text-6xl animate-spin" />
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center">
                                <div className="text-white text-6xl mr-5">
                                    {iconWeather}
                                </div>
                                <div>
                                    <p className="text-white font-bold text-lg">
                                        {weatherData.city}, {weatherData.country}
                                    </p>
                                    <p className="text-white">
                                        {weatherData.date}
                                    </p>
                                </div>
                            </div>

                            <div className="text-white flex flex-col items-center justify-center py-10">
                                <p className="text-8xl mb-2">
                                    {weatherData.temp}
                                    <span className="text-2xl">°C</span>
                                </p>
                                <p className="text-sm">
                                    {weatherData.weatherDescription}
                                </p>
                            </div>

                            <div className="flex justify-between">
                                <div className="flex flex-col">
                                    <div className="flex items-center text-white text-sm mb-3">
                                        <AiOutlineEye className="mr-2" />
                                        <p>
                                            Visibilité {weatherData.visibility}
                                            km
                                        </p>
                                    </div>
                                    <div className="flex items-center text-white text-sm">
                                        <CgDrop className="mr-2" />
                                        <p>Humidité {weatherData.humidity}%</p>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <div className="flex items-center text-white text-sm mb-3">
                                        <CiTempHigh className="mr-2" />
                                        <p>
                                            Temp. ressentie {weatherData.feelsLikeTemp}C°
                                        </p>
                                    </div>
                                    <div className="flex items-center text-white text-sm">
                                        <WiStrongWind className="mr-2" />
                                        <p>Vent {weatherData.wind} km/h</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <footer className="flex items-center mt-32">
                <p className="text-white mr-1">Made with </p>
                <AiOutlineHeart className="mr-1 text-red-400" />
                <p className="text-white mr-1">by <a className="underline" href="https://github.com/Mathias-Hadji" target="_blank" rel="noopener noreferrer">Mathias Hadji</a></p>
            </footer>
        </div>
    );
}

export default App;
