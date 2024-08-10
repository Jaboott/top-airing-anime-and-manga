from multiprocessing import process

import redis
from flask import jsonify, render_template, request, Blueprint, json
import requests

from .json_parser import parse_anime, parse_manga

bp = Blueprint('main', __name__)
r = redis.Redis(
    host=process.env.DB_HOST,
    port=process.env.DB_PORT,
    db=0,
    password=process.env.DB_PASSWORD
)


@bp.route('/')
def index():
    return render_template("index.html")


@bp.route('/anime', methods=['GET'])
def get_top_anime():
    args = request.args.get("airing")
    anime_list = query_api(True, args is not None)
    return jsonify(anime_list), 200


@bp.route('/manga', methods=['GET'])
def get_top_manga():
    args = request.args.get("airing")
    manga_list = query_api(False, args is not None)
    return jsonify(manga_list), 200


def query_api(is_anime, is_airing):
    # Setting up url
    base_url = "https://api.jikan.moe/v4/top/"
    category = "anime?type=tv" if is_anime else "manga?type=manga"
    filter_type = "&filter=airing" if is_airing and is_anime else "&filter=publishing" if is_airing else ""

    url = base_url + category + filter_type

    # Checking if the data is in cache
    cached_data = r.get(url)

    # Store the query data in cache if it's not already there
    if cached_data is None:
        obj_list = []
        response = requests.get(url).json()
        # A list of objects with information about an anime/manga
        data = response['data']

        for element in data:
            if is_anime:
                obj = parse_anime(element)
            else:
                obj = parse_manga(element)

            obj_list.append(obj.to_dict())

        # Set the TTL of the cache to 1 hr
        r.set(url, json.dumps(obj_list), ex=3600)
        return obj_list

    return json.loads(cached_data)


def init_routes(app):
    app.register_blueprint(bp)
