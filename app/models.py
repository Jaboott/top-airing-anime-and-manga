class Anime:

    def __init__(self, title, image, synopsis, broadcast, genre, score, episodes, timeline, youtube_link):
        self.title = title
        self.image = image
        self.synopsis = synopsis
        self.broadcast = broadcast
        self.genre = genre
        self.score = score
        self.episodes = episodes
        self.timeline = timeline
        self.youtube_link = youtube_link

    def __repr__(self):
        return (f'Anime: {self.title} \n'
                f'Synopsis: {self.synopsis} \n'
                f'Broadcast: {self.broadcast} \n'
                f'Genre: {self.genre} \n'
                f'Score: {self.score} \n'
                f'Episodes: {self.episodes} \n'
                f'Timeline: {self.timeline} \n'
                f'Youtube Link: {self.youtube_link}')

    def to_dict(self):
        return {
            'title': self.title,
            'image': self.image,
            'synopsis': self.synopsis,
            'broadcast': self.broadcast,
            'genre': self.genre,
            'score': self.score,
            'episodes': self.episodes,
            'timeline': self.timeline,
            'youtube_link': self.youtube_link
        }


class Manga:
    def __init__(self, title, image, synopsis, timeline, genre, score, chapters):
        self.title = title
        self.image = image
        self.synopsis = synopsis
        self.timeline = timeline
        self.genre = genre
        self.score = score
        self.chapters = chapters

    def __repr__(self):
        return (f'Manga: {self.title} \n'
                f'Synopsis: {self.synopsis} \n'
                f'Timeline: {self.timeline} \n'
                f'Genre: {self.genre}'
                f'Score: {self.score} \n'
                f'Chapters: {self.chapters}')

    def to_dict(self):
        return {
            'title': self.title,
            'image': self.image,
            'synopsis': self.synopsis,
            'timeline': self.timeline,
            'genre': self.genre,
            'score': self.score,
            'chapters': self.chapters
        }
