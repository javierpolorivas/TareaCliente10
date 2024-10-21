// Variables con las claves
const pubkey = '43dd208f0d4f946abc12c722875c4c9f';
const pvtkey = 'fe19a993c0935336c706e5415fea4324ff0eb8cf';

// Generar timestamp y hash
let ts = Date.now();
let hash = CryptoJS.MD5(ts + pvtkey + pubkey).toString();

// Función para hacer fetch a los personajes
async function fetchCharacters() {
    const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${pubkey}&hash=${hash}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayCharacters(data.data.results);
    } catch (error) {
        console.error('Error fetching characters:', error);
    }
}

// Función para hacer fetch a los comics
async function fetchComics() {
    const url = `https://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${pubkey}&hash=${hash}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayComics(data.data.results);
    } catch (error) {
        console.error('Error fetching comics:', error);
    }
}

// Función para mostrar personajes en tarjetas
function displayCharacters(characters) {
    const container = document.getElementById('charactersContainer');
    characters.forEach(character => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
            <h3>${character.name}</h3>
            <p>${character.description || 'Sin descripción disponible'}</p>
        `;
        container.appendChild(card);
    });
}

// Función para mostrar comics en tarjetas
function displayComics(comics) {
    const container = document.getElementById('comicsContainer');
    comics.forEach(comic => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.title}">
            <h3>${comic.title}</h3>
            <p>Fecha de publicación: ${comic.dates[0].date.split('T')[0]}</p>
        `;
        container.appendChild(card);
    });
}

// Llamar a las funciones para obtener los datos
fetchCharacters();
fetchComics();
