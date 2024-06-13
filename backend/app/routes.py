from flask import current_app as app, request, jsonify
from .models import Location
from . import db
from .weather import fetch_weather_data
from .search import fetch_search_results
from dotenv import load_dotenv

load_dotenv()


@app.route("/api/locations", methods=["GET"])
def get_locations():
    locations = Location.query.all()
    location_list = list(map(lambda x: x.to_json(), locations))
    return jsonify({"locations": location_list})


@app.route("/api/get_weather/<location>", methods=["GET"])
def get_weather(location):
    result = fetch_weather_data(location, True)
    if result:
        return jsonify(result)
    else:
        return jsonify({"error": "Error fetching weather data for location"}), 500


@app.route("/api/search/<query>", methods=["GET"])
def search(query):
    results = fetch_search_results(query)
    if results:
        return jsonify(results)
    else:
        return jsonify({"error": "Error fetching search results."}), 500


@app.route("/api/add_location", methods=["POST"])
def add_location():
    data = request.get_json()
    name = data.get("name")
    country = data.get("country")
    lat = data.get("lat")
    lon = data.get("lon")

    if not name or not country or not lat or not lon:
        return jsonify({"error": "Missing required parameters."}), 400

    try:
        lat = float(lat)
        lon = float(lon)
    except ValueError:
        return jsonify({"error": "Latitude and longitude are not numbers."}), 400

    try:
        location_test = (
            db.session.query(Location)
            .filter_by(name=name, country=country, lat=lat, lon=lon)
            .first()
        )

        if location_test:
            return jsonify({"error": "Location already exists."}), 400
    except Exception as e:
        print("Nu blev det fel:", e)

    new_location = Location(name=name, country=country, lat=lat, lon=lon)
    db.session.add(new_location)
    db.session.commit()

    return jsonify({"message": "Location added successfully"}), 201
