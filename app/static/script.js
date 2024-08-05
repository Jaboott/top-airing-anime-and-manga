function switchPage(mode) {
    const pageTitle = document.querySelector('.title');
    resetList();

    switch (mode) {
        case "TA":
            pageTitle.innerHTML = "Top Anime";
            loadAnimeList(false);
            break;
        case "TM":
            pageTitle.innerHTML = "Top Manga";
            loadMangaList(false);
            break;
        case "TAA":
            pageTitle.innerHTML = "Top Airing Anime";
            loadAnimeList(true);
            break;
        case "TAM":
            pageTitle.innerHTML = "Top Airing Manga";
            loadMangaList(true);
            break;
    }
}

function loadList(url, isAnime = true) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const listContainer = document.querySelector('.ranking');
            data.forEach((item, index) => {
                const { title, image, genre, episodes, chapters, score, broadcast, timeline } = item;
                const genres = genre.join(', ');
                const count = isAnime ? episodes || '???' : chapters || '???';
                const countLabel = isAnime ? 'Episodes' : 'Chapters';
                const timeLabel = isAnime ? `Broadcast: ${broadcast}` : `Timeline: ${timeline}`;
                
                // Creating the html div that display the anime/manga
                const listItem = document.createElement('div');
                listItem.classList.add('anime_container');
                listItem.innerHTML = `
                    <div class="rank">
                        <h1>${index + 1}</h1>
                    </div>
                    <div class="title">
                        <img src="${image}" alt="${title}">
                        <ul>
                            <li><h3>${title}</h3></li>
                            <li><h4>${timeLabel}</h4></li>
                            <li><h4>Genre: ${genres}</h4></li>
                            <li><h4>${count} ${countLabel}</h4></li>
                        </ul>
                    </div>
                    <div class="score">
                        <h1>${score}⭐</h1>
                    </div>
                `;
                listContainer.appendChild(listItem);
            });
        });
}

function loadAnimeList(airing) {
    const url = airing ? '/anime?airing' : '/anime';
    loadList(url, true);
}

function loadMangaList(airing) {
    const url = airing ? '/manga?airing' : '/manga';
    loadList(url, false);
}

function resetList() {
    const elements = document.querySelectorAll(".anime_container");
    elements.forEach(element => element.remove());
}

document.addEventListener('DOMContentLoaded', function() {
    loadAnimeList(true);
});