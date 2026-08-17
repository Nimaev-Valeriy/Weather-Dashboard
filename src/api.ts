// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key} // Полученние координта города
// https://api.openweathermap.org/data/4.0/onecall/current?lat={lat}&lon={lon}&appid={API key} // Получение текущей погоды

const apiKey = import.meta.env.VITE_API_KEY_WEATHER;
console.log("APIKEY: ", apiKey);

const city = "Ulan-Ude";

// Функция для получения текущей погоды
async function getCurrentWeather(): Promise<void> {
  try {
    // 1. Получаем координаты города
    const geoRes = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`,
    );
    if (!geoRes.ok) {
      throw new Error(`Геокодинг вернул ошибку: ${geoRes.status}`);
    }
    const geoData = await geoRes.json();
    if (!geoData || geoData.length === 0) {
      throw new Error(`Город "${city}" не найден`);
    }
    const { lat, lon } = geoData[0];
    console.log(`Координаты ${city}:`, lat, lon);

    // 2. Запрашиваем текущую погоду по координатам
    // Добавляем параметр units=metric для Цельсия
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ru`,
    );
    console.log("wRes: ", weatherRes);
    if (!weatherRes.ok) {
      throw new Error(`Погода вернула ошибку: ${weatherRes.status}`);
    }
    const weatherData = await weatherRes.json();

    // 3. Извлекаем нужные поля из ответа
    console.log("weather: ", weatherData);
    console.log("🌡️ Текущая температура:", weatherData.main.temp, "°C");
    console.log("☀️ Ощущается как:", weatherData.main.feels_like, "°C");
    console.log("🌧️ Погода:", weatherData.weather[0].description);
    console.log("💧 Влажность:", weatherData.main.humidity, "%");
    console.log("💨 Ветер:", weatherData.wind.speed, "м/с");
    console.log(
      "🌅 Восход:",
      new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(),
    );
    console.log(
      "🌇 Закат:",
      new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(),
    );

    // Здесь вы можете обновить свой UI, вернуть данные или сохранить в стейт
    // return weatherData; // если хотите вернуть данные наружу
  } catch (error) {
    console.error("❌ Ошибка получения погоды:", error.message);
  }
}

// Запускаем
async function getWeather() {
  await getCurrentWeather();
}

export default getWeather;
