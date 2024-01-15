import json

f = open("sneaker_data.json")
data = json.load(f)
print(len(data))