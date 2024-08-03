from app.models import Anime


def parse_anime(anime):
    """
    Parses a json document representing an anime and returns an Anime object.

    :param anime: json representation of the anime information
    :return: Anime object
    """
    title = anime['title']
    image = anime["images"]["jpg"]["image_url"]
    synopsis = anime["synopsis"]
    broadcast = anime["broadcast"]
    genre = parse_genre(anime["genres"])
    score = anime["score"]
    episodes = anime["episodes"]

    return Anime(title, image, synopsis, broadcast, genre, score, episodes)


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




