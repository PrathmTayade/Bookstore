import pymongo

# MongoDB connection
client = pymongo.MongoClient(
    "mongodb+srv://admin:admin@cluster0.ejbui40.mongodb.net/?retryWrites=true&w=majority"
)
db = client["bookstore"]
collection = db["books"]
users_collection = db["users"]

# Check if the MongoDB connection is successful
try:
    client.server_info()  # This will raise an exception if the connection fails
    print("Connected to MongoDB successfully")
except pymongo.errors.ServerSelectionTimeoutError as err:
    print(f"Failed to connect to MongoDB: {err}")
