import os
from dotenv import load_dotenv
from app.weather import fetch_weather_data
from utils.location_handler import add_location, remove_location, get_locations

# Load env variables from .env file
load_dotenv()

MENU_CHOICES = {
    "1": "View locations",
    "2": "Add location",
    "3": "Remove location",
    "4": "Quit",
}


def preview_menu():
    print("AVAILABLE COMMANDS")
    print("==================")
    for ch_index, ch_value in MENU_CHOICES.items():
        print(f"{ch_index}. {ch_value}")
    print()


def show_locations(locations):
    if locations:
        print("LOCATIONS")
        print("=========")
        for location in locations:
            data = fetch_weather_data(location)
            if data:
                print(f"{location}: {data['current']['temp_c']}\u00B0C")
            else:
                print(f"Failed to fetch weather data for {location}.\n")

        print()
    else:
        print("There are no locations.\n")


def is_valid_input(input):
    if input not in MENU_CHOICES.keys():
        print(f"{input} is not in {MENU_CHOICES.keys()}")
        return False

    return True


def handle_input():
    menu_choice = input("> ")

    while not is_valid_input(menu_choice):
        print("Invalid input.\n")
        menu_choice = input("> ")

    try:
        return int(menu_choice)
    except ValueError:
        print("Error: choice is not a number")


def main():
    preview_menu()
    while True:
        menu_choice = handle_input()

        match (menu_choice):
            case 1:
                show_locations(get_locations())
            case 2:
                location = input("Enter location to add: ")
                add_location(location)
                print()
            case 3:
                location = input("Enter location to remove: ")
                remove_location(location)
                print()
            case 4:
                break


if __name__ == "__main__":
    main()
