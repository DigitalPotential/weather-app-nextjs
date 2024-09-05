"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useLazyQuery } from "@apollo/client";
import { GET_WEATHER_QUERY } from "@/graphQL/queries";

export default function WeatherComponent() {
  const [city, setCity] = useState("");
  const [getWeather, { loading, error, data }] =
    useLazyQuery(GET_WEATHER_QUERY);

  const fetchWeather = () => {
    if (!city.trim()) return;
    getWeather({ variables: { name: city } });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchWeather();
    }
  };

  const weather = data?.getCityByName;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 p-4">
      <Card className="w-full max-w-md rounded-xl shadow-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 p-2 text-black rounded-full border-2 border-white focus:outline-none focus:border-yellow-300 transition-colors"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={fetchWeather}
              disabled={loading}
              className="rounded-full bg-white p-2 hover:bg-yellow-300 transition-colors"
            >
              {loading ? (
                <LoadingIcon className="w-6 h-6 text-blue-500 animate-spin" />
              ) : (
                <SearchIcon className="w-6 h-6 text-blue-500" />
              )}
            </Button>
          </div>
        </CardHeader>
        {error && (
          <CardContent className="text-center text-red-500 p-4 bg-red-100">
            {error.message}
          </CardContent>
        )}
        {weather && (
          <CardContent className="text-center p-6 bg-white">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <WeatherIcon
                weather={weather.weather.summary.description}
                className="w-16 h-16 text-yellow-500"
              />
              <div>
                <div className="text-5xl font-bold text-gray-800">
                  {Math.round(weather.weather.temperature.actual)}°C
                </div>
                <div className="text-xl text-gray-600">
                  {weather.name}, {weather.country}
                </div>
              </div>
            </div>
            <div className="text-lg text-gray-700 mb-4">
              {weather.weather.summary.description}
            </div>
            <div className="flex justify-around mt-6 text-gray-700">
              <div className="flex flex-col items-center">
                <DropletIcon className="w-8 h-8 mb-2 text-blue-500" />
                <div className="font-semibold">
                  {weather.weather.clouds.humidity}%
                </div>
                <div className="text-sm">Humidity</div>
              </div>
              <div className="flex flex-col items-center">
                <WindIcon className="w-8 h-8 mb-2 text-blue-500" />
                <div className="font-semibold">
                  {Math.round(weather.weather.wind.speed)} km/h
                </div>
                <div className="text-sm">Wind Speed</div>
              </div>
              <div className="flex flex-col items-center">
                <ThermometerIcon className="w-8 h-8 mb-2 text-red-500" />
                <div className="font-semibold">
                  {Math.round(weather.weather.temperature.feelsLike)}°C
                </div>
                <div className="text-sm">Feels Like</div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}

type IconProps = React.SVGProps<SVGSVGElement>;

function DropletIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
    </svg>
  );
}

function SearchIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function SunIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function WindIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
      <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
      <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
    </svg>
  );
}

function LoadingIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}

function ThermometerIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
    </svg>
  );
}

function WeatherIcon({ weather, ...props }: IconProps & { weather: string }) {
  // Simple logic to choose icon based on weather description
  if (weather.toLowerCase().includes("rain")) {
    return <DropletIcon {...props} />;
  } else if (weather.toLowerCase().includes("cloud")) {
    return <CloudIcon {...props} />;
  } else {
    return <SunIcon {...props} />;
  }
}

function CloudIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}
