from os import environ

# Run all tests against in-memory DB
environ["DB_URL"] = "sqlite://"
