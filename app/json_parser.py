from app.models import Anime
from app.models import Manga


def parse_anime(anime):
    """
    Parses a json document representing an anime and returns an Anime object.

    :param anime: json representation of the anime information
    :return: Anime object
    """
    title = anime["title"]
    image = anime["images"]["jpg"]["image_url"]
    synopsis = anime["synopsis"]
    broadcast = anime["broadcast"]["string"]
    genre = parse_genre(anime["genres"])
    score = anime["score"]
    episodes = anime["episodes"]

    return Anime(title, image, synopsis, broadcast, genre, score, episodes)


def parse_manga(manga):
    """
    Parses a json document representing a manga and returns a Manga object.

    :param manga: json representation of the manga information
    :return: Manga object
    """
    title = manga["title"]
    image = manga["images"]["jpg"]["image_url"]
    synopsis = manga["synopsis"]
    timeline = manga["published"]["string"]
    genre = parse_genre(manga["genres"])
    score = manga["score"]
    chapters = manga["chapters"]

    return Manga(title, image, synopsis, timeline, genre, score, chapters)


def parse_genre(genres):
    """
    Parses a json document representing a genre and returns a list of genre

    :param genres: json representation of genres
    :return: A list of genre
    """
    genre_list = []

    for genre in genres:
        genre_list.append(genre['name'])

    return genre_list
