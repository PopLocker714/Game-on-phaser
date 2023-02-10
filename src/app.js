import { appContainer, filmId } from './modules/vars.js';
import { renderPage } from './modules/renderResurce.js';

if (filmId) {
  renderPage(
    appContainer,
    '/src/modules/episodeDetails.js',
    `https://swapi.dev/api/films/${filmId}`,
    'output.css',
  );
} else {
  renderPage(
    appContainer,
    '/src/modules/episodeList.js',
    'https://swapi.dev/api/films/?format=json',
    'output.css',
  );
}

window.onpopstate = (event) => {
  if (+JSON.stringify(event.state)) {
    renderPage(
      appContainer,
      '/src/modules/episodeDetails.js',
      `https://swapi.dev/api/films/${filmId}`,
      'output.css',
    );
  } else {
    renderPage(
      appContainer,
      '/src/modules/episodeList.js',
      'https://swapi.dev/api/films/?format=json',
      'output.css',
    );
  }
};
