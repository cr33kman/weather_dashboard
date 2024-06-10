import os
from dotenv import load_dotenv
from app.weather import fetch_weather_data

# Load env variables from .env file
load_dotenv()

if __name__ == "__main__":
    data = None
    while not data:
        location = input("Enter the city name: ")
        data = fetch_weather_data(location)
        if not data:
            print("Please try again with a valid city name.")
        print()

    print(
        f"Current temperature in {location.title()}: {data['current']['temp_c']}\u00B0C"
    )
