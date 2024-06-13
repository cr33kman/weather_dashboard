from . import db


class Location(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    country = db.Column(db.String(80), nullable=False)
    lat = db.Column(db.Float, nullable=False)
    lon = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f"<Location {self.name}, {self.country}>"

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "country": self.country,
            "lat": self.lat,
            "lon": self.lon,
        }
