from flask import current_app as app, request, jsonify
from .models import db, Location


@app.route("/", methods=["GET"])
def index():
    locations = Location.query.all()
    locations_json = list(map(lambda x: x.to_json(), locations))
    return jsonify(locations_json), 200
