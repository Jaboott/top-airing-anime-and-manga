class Anime:
    def __init__(self, title, image, synopsis, broadcast, genre):
        self.title = title
        self.image = image
        self.synopsis = synopsis
        self.broadcast = broadcast
        self.genre = genre

    def __repr__(self):
        return (f'Anime: {self.title} \n'
                f'Synopsis: {self.synopsis} \n'
                f'Broadcast: {self.broadcast} \n'
                f'Genre: {self.genre}')

    def to_dict(self):
        return {
            'title': self.title,
            'image': self.image,
            'synopsis': self.synopsis,
            'broadcast': self.broadcast,
            'genre': self.genre
        }
