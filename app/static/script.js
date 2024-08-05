document.addEventListener('DOMContentLoaded', function() {
    fetch('/anime')
        .then(response => response.json())
        .then(data => {
            const animeList = document.querySelector('.ranking');
            let i = 1;

            data.forEach(anime => {
                const animeItem = document.createElement('div');
                animeItem.classList.add('anime_container');

                const genres = anime.genre.join(', ');
                const episodes = anime.episodes ? anime.episodes : '???';

                animeItem.innerHTML = `
                    <div class="rank">
                        <h1>${i}</h1>
                    </div>
                    <div class="title">
                        <img src=${anime.image}>
                        <ul>
                            <li><h3>${anime.title}</h3></li>
                            <li><h4>Broadcast: ${anime.broadcast}</h4></li>
                            <li><h4>Genre: ${genres}</h4></li>
                            <li><h4>${episodes} Episodes</h4></li>
                        </ul>
                    </div>
                    <div class="score">
                        <h1>${anime.score}⭐</h1>
                    </div>
                `;
                animeList.appendChild(animeItem);
                i++;
            })
        })
});