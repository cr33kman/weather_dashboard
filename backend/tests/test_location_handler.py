import unittest
import os
import json
from utils.location_handler import add_location, remove_location, get_locations


class TestLocationHandler(unittest.TestCase):
    def setUp(self):
        self.test_file = "data/locations_test.json"
        self.original_file = "data/locations.json"
        if os.path.exists(self.original_file):
            os.rename(self.original_file, self.test_file)

    def tearDown(self):
        if os.path.exists(self.original_file):
            os.remove(self.original_file)
        if os.path.exists(self.test_file):
            os.rename(self.test_file, self.original_file)

    def test_add_location(self):
        add_location("New York")
        locations = get_locations()
        self.assertIn("New York", locations)

    def test_remove_location(self):
        add_location("New York")
        remove_location("New York")
        locations = get_locations()
        self.assertNotIn("New York", locations)

    def test_get_locations(self):
        add_location("New York")
        add_location("London")
        locations = get_locations()
        self.assertIn("New York", locations)
        self.assertIn("London", locations)


if __name__ == "__main__":
    unittest.main()
