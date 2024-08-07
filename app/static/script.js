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

function loadList(url, isAnime) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const listContainer = document.querySelector('.ranking');
            // Build List item for each item of data
            data.forEach((item, index) => {
                const { title, image, genre, episodes, chapters, score, broadcast, timeline, youtube_link, synopsis} = item;
                const genres = genre.join(', ');
                // TODO make ongoing for unknown episodes ones
                const count = isAnime ? episodes || '???' : chapters || '???';
                const countLabel = isAnime ? 'Episodes' : 'Chapters';
                // Shows timeline if it's not an anime or anime is already completed
                const timeLabel = (isAnime && timeline.includes('?')) ? `Broadcast: ${broadcast}` : `Timeline: ${timeline}`;

                // Creating the html div that display the anime/manga
                const listItem = document.createElement('div');
                listItem.classList.add('container');
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
                // Add on click event to container if it's an anime
                if (isAnime) {
                    listItem.addEventListener("click", () => {
                        openModal(score, count, genres, timeline, youtube_link, synopsis);
                    });
                }
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
    const elements = document.querySelectorAll(".container");
    elements.forEach(element => element.remove());
}

document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('overlay');
    // Remove the modal if user clicks outside the modal
    overlay.addEventListener('click', () => {
        closeModal();
    });

    // Close modal if escape is pressed
    document.addEventListener('keydown', (e) => {
        if (overlay.style.display != 'none' && e.code == 'Escape') {
            closeModal();
        }
    });

    loadAnimeList(true);
});

function openModal(score, episodes, genre, timeline, youtube, synopsis) {
    const modal = document.getElementById('modal_anime');
    const overlay = document.getElementById('overlay');

    document.getElementById('modal_video').src = youtube;
    document.getElementById('modal_score').innerText = 'Score: ' + score + '⭐';
    document.getElementById('modal_ep').innerText = episodes + ' Episodes';
    document.getElementById('modal_genre').innerText = genre;
    document.getElementById('modal_timeline').innerText = timeline;
    document.getElementById('modal_synopsis').innerText = synopsis;

    overlay.style.display = 'flex';
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('modal_anime');
    const overlay = document.getElementById('overlay');

    document.getElementById('modal_video').src = null;
    document.getElementById('modal_score').innerText = null;
    document.getElementById('modal_ep').innerText = null;
    document.getElementById('modal_genre').innerText = null;
    document.getElementById('modal_timeline').innerText = null;
    document.getElementById('modal_synopsis').innerText = null;

    modal.style.display = 'none';
    overlay.style.display = 'none';
}

