const appContainer = document.getElementById('app');
const searchParams = new URLSearchParams(window.location.search);
const filmId = searchParams.get('film_id');

export { appContainer, searchParams, filmId };
