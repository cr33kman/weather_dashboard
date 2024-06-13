import requests
import os


def fetch_weather_data(location, fetch_forecast):
    api_key = os.getenv("WEATHER_API_KEY")
    if not api_key:
        raise ValueError(
            "API key not found. Please set the 'WEATHER_API_KEY' environment variable."
        )

    base_url = "http://api.weatherapi.com/v1"
    full_url = f"{base_url}/current.json?key={api_key}&q={location}"
    if fetch_forecast:
        full_url = f"{base_url}/forecast.json?key={api_key}&q={location}&days={4}"

    try:
        response = requests.get(full_url)
        response.raise_for_status()
        return response.json()

    except requests.exceptions.HTTPError as err:
        if response.status_code in [400, 404]:
            print(f"Location '{location}' not found.")
        elif response.status_code == 401:
            print("Unauthorized access - check your API key.")
        else:
            print(f"HTTP error occured: {err}")
    except requests.exceptions.ConnectionError:
        print("Error connecting to the API.")
    except requests.exceptions.Timeout:
        print("The request timed out.")
    except Exception as err:
        print(f"Other error occured: {err}")

    return None
