import requests
import os


def fetch_search_results(query):
    api_key = os.getenv("WEATHER_API_KEY")
    if not api_key:
        raise ValueError(
            "API key not found. Please set the 'WEATHER_API_KEY' environment variable."
        )

    base_url = "http://api.weatherapi.com/v1"
    full_url = f"{base_url}/search.json?key={api_key}&q={query}"

    try:
        response = requests.get(full_url)
        response.raise_for_status()
        return response.json()

    except requests.exceptions.HTTPError as err:
        if response.status_code == 401:
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
