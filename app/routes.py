from app import app
from flask import jsonify
import requests

from app.json_parser import parse_anime


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


@app.route('/anime')
def get_top_anime():
    response = requests.get("https://api.jikan.moe/v4/top/anime?filter=airing&type=tv").json()
    # A list of objects with information about an anime
    data = response['data']
    anime_list = []

    for anime in data:
        anime_obj = parse_anime(anime)
        anime_list.append(anime_obj.to_dict())

    return jsonify(anime_list), 200


