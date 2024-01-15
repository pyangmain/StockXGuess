from pathlib import Path
import json

export_data = []
setId = set()
path_list = Path("sneakers").glob("*.json")
for path in path_list:
    with open("sneakers/" + path.name) as json_file:
        data = json.load(json_file)["data"]["browse"]["results"]["edges"]
        for sneaker in data:
            obj_id = sneaker['objectId']
            sneaker_data = sneaker['node']
            title = sneaker_data["title"]
            img_url = sneaker_data["media"]["thumbUrl"]
            img_url = img_url.replace("w=140&h=100&", "")
            sneaker_url = "https://stockx.com/" + sneaker_data["urlKey"]
            deadstock_price = sneaker_data["market"]["deadStock"]["averagePrice"]
            if obj_id in setId:
                continue
            else:
                setId.add(obj_id)   
            export_data.append({"_class": "com.example.demo.sneaker.Sneaker","objId": obj_id, "sneakerName": title, "imgUrl": img_url, "sneakerUrl": sneaker_url, "price": deadstock_price})

with open("sneaker_data.json", "w") as outfile:
    json.dump(export_data, outfile)