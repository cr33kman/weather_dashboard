import unittest
import os
from dotenv import load_dotenv
from app.weather import fetch_weather_data

# Load env variables
load_dotenv()


class TestWeatherAPI(unittest.TestCase):

    def test_get_weather_data_valid_city(self):
        data = fetch_weather_data("New York")
        self.assertIsNotNone(data)
        self.assertIn("current", data)
        self.assertIn("temp_c", data["current"])

    def test_get_weather_data_invalid_city(self):
        data = fetch_weather_data("InvalidCity")
        self.assertIsNone(data)


if __name__ == "__main__":
    unittest.main()
