import os
import json

DATA_FILE = "data/locations.json"


def add_location(location):
    if not os.path.exists(DATA_FILE):
        os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
        with open(DATA_FILE, "w") as f:
            data = {"locations": []}
            json.dump(data, f, indent=4)

    with open("data/locations.json", "r+") as f:
        data = json.load(f)
        if location not in data["locations"]:
            data["locations"].append(location)

            f.seek(0)
            json.dump(data, f, indent=4)
            f.truncate()

            print(f"{location} was added.")
        else:
            print(f"{location} is already in the list.")


def remove_location(location):
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r+") as f:
            data = json.load(f)
            if location in data["locations"]:
                data["locations"].remove(location)

                f.seek(0)
                json.dump(data, f, indent=4)
                f.truncate()

                print(f"{location} was removed.")
    else:
        print("There are no locations.")


def get_locations():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r") as f:
            data = json.load(f)
            if data["locations"]:
                return data["locations"]
            else:
                print("There are no locations.")
    else:
        print("There are no locations.")

    return []
