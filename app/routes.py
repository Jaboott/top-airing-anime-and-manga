from app import app
from flask import jsonify, render_template, request
import requests

from app.json_parser import parse_anime, parse_manga


@app.route('/')
def index():
    return render_template("index.html")


@app.route('/anime')
def get_top_anime():
    args = request.args.get("airing")
    url = "https://api.jikan.moe/v4/top/anime?type=tv"

    # Add filter to url if airing field is non-empty
    if args is not None:
        url += "&filter=airing"

    response = requests.get(url).json()
    # A list of objects with information about an anime
    data = response['data']
    anime_list = []

    for anime in data:
        anime_obj = parse_anime(anime)
        anime_list.append(anime_obj.to_dict())

    return jsonify(anime_list), 200


@app.route('/manga')
def get_top_manga():
    args = request.args.get("airing")
    url = "https://api.jikan.moe/v4/top/manga?type=manga"

    # Add filter to url if airing field is non-empty
    if args is not None:
        url += "&filter=publishing"

    response = requests.get(url).json()
    # A list of objects with information about a manga
    data = response['data']
    manga_list = []

    for manga in data:
        manga_obj = parse_manga(manga)
        manga_list.append(manga_obj.to_dict())

    return jsonify(manga_list), 200
