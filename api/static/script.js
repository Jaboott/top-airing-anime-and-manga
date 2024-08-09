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
                const { title, image, genre, episodes, chapters, score, broadcast, timeline} = item;
                const genres = genre.join(', ');
                // Shows timeline if it's not an anime or anime is already completed
                const timeLabel = (isAnime && timeline.includes('?')) ? `Broadcast: ${broadcast}` : `Timeline: ${timeline}`;
                // TODO make ongoing for unknown episodes ones
                let count;
                let countLabel;
                // Both null meaning series is ongoing
                if (!episodes && !chapters) {
                    count = '🟢 Publication: ' + timeline.match(/\b\d{4}\b/);
                    countLabel = ', Ongoing';
                } else {
                    count = isAnime ? episodes || '???' : chapters || '???';
                    countLabel = isAnime ? 'Episodes' : 'Chapters';
                }

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
                        openModal(item, true);
                    });
                } else {
                    // listItem.addEventListener("click", () => {
                    //     openModal(item, false);
                    // });
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

function openModal(item, isAnime) {
    const modal = document.querySelector('.modal');
    const overlay = document.getElementById('overlay');
    const modal_content = document.createElement('div');
    modal_content.classList.add('modal_content');
    if (isAnime) {
        modal_content.id = 'anime_modal'
        setModalAnime(item, modal_content, modal);
    } else {
        // modal_content.id = 'manga_modal'
        // setModalManga(item, modal_content, modal);
    }

    overlay.style.display = 'flex';
    modal.style.display = 'flex';
}

function setModalAnime(item, modal_content, modal) {
    const {genre, episodes, score, broadcast, timeline, youtube_link, synopsis} = item;
    const genres = genre.join(', ');
    let count_label;
    // Episodes field is empty
    if (episodes) {
        count_label = episodes + " Episodes";
    } else {
        count_label = "🟢 Ongoing";
    }

    modal_content.innerHTML = `
        <iframe class="modal_video" src="${youtube_link}"></iframe>
        <div class="modal_info">
            <div>
                <h4 id="modal_score">Score: ${score}⭐</h4>
                <h4 id="modal_ep">${count_label}</h4>
            </div>
            <div>
                <h4 id="modal_genre">${genres}</h4>
                <h4 id="modal_timeline">${timeline}</h4>
            </div>
        </div>
        <p id="modal_synopsis"></p>
    `;

    modal.appendChild(modal_content);
    document.getElementById('modal_synopsis').innerText = synopsis;
}

// function setModalManga(item, modal_content, modal) {
//     const {title, image, genre, chapters, score, timeline, synopsis} = item;
//      modal_content.innerHTML = `
//         <div class="modal_header">
//             <img src="${image}">
//             <div class="modal_info">
//                 <h1 class="title">${title}</h1>
//                 <div class="info">
//                     <div class="top_info">
//                         <h2>${score}</h2>
//                         <br>
//                         <h2>${chapters}</h2>
//                     </div>
//                     <div class="bottom_info">
//                         <h2>${genre}</h2>
//                         <br>
//                         <h2>${timeline}</h2>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         <p id="modal_synopsis"></p>
//     `;
//
//     modal.appendChild(modal_content);
//     document.getElementById('modal_synopsis').innerText = synopsis;
// }

function closeModal() {
    const modal = document.querySelector('.modal');
    const overlay = document.getElementById('overlay');

    document.querySelector('.modal_content').remove();
    modal.scrollTo(top);

    modal.style.display = 'none';
    overlay.style.display = 'none';
}

