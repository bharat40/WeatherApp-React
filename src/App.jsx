import React, { useState } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const API_KEY = import.meta.env.VITE_API_KEY;
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
      setLoading(false);
      setError("");
      console.log(res.data);
    } catch (err) {
      setLoading(false);
      setWeather(null);
      setError("City not found or API error.");
      console.error(err);
    }
    setCity("");
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-600 p-4">
      <h1 className="text-3xl text-gray-200 font-bold mb-6">Weather App</h1>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 rounded border text-gray-200 border-gray-300"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {loading && (
        <div>
          <span className="text-gray-300">Loading...</span>
        </div>
      )}
      {weather && (
        <div className=" p-6 rounded-lg bg-gray-400 shadow-md text-center w-80">
          <h2 className="text-xl font-semibold">{weather.name}</h2>
          <p className="text-lg">{weather.main.temp}°C</p>
          <p className="capitalize">{weather.weather[0].description}</p>
        </div>
      )}
    </section>
  );
}

export default App;
