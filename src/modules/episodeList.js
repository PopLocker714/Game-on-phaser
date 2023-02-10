import { renderPage } from './renderResurce.js';
import { searchParams, appContainer } from './vars.js';

export function render(data) {
  const container = document.createElement('ul');

  data.results.forEach((el, index) => {
    const item = document.createElement('li');
    const link = document.createElement('a');
    const divImg = document.createElement('div');
    const img = document.createElement('img');
    const divText = document.createElement('div');
    const title = document.createElement('h2');
    const text = document.createElement('p');
    const svg = document.createElement('div');

    link.classList.add(
      'mb-6', 'transition-bg', 'duration-100', 'p-5', 'max-w-xl', 'mx-auto', 'bg-slate-800',
      'flex', 'items-center', 'space-x-6', 'rounded-xl', 'relative', 'group', 'hover:bg-slate-800/70',
    );
    divImg.classList.add('shrink-0');
    img.classList.add('transition-scale', 'duration-300', 'group-hover:scale-105', 'rounded-lg');
    title.classList.add('text-2xl', 'font-medium');
    text.classList.add('text-slate-400');
    svg.classList.add('absolute', 'right-10');

    link.href = `?film_id=${index + 1}`;
    img.src = 'https://via.placeholder.com/100x130/';
    img.alt = 'preview movies';
    title.textContent = el.title;
    text.textContent = `Episode: ${el.episode_id}`;
    svg.innerHTML = `
      <svg class="transition-opacity duration-300 w-12 h-12 p-2  bg-gray-600/40 rounded-full opacity-0 group-hover:opacity-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd"
          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
          clip-rule="evenodd" />
      </svg>
    `;

    link.addEventListener('click', (event) => {
      event.preventDefault();
      window.history.pushState({ page: index + 1 }, '', link.href);
      searchParams.set('film_id', +window.location.search.replace('?film_id=', ''));
      if (searchParams.get('film_id')) {
        renderPage(
          appContainer,
          '/src/modules/episodeDetails.js',
          `https://swapi.dev/api/films/${searchParams.get('film_id')}`,
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
    });

    divImg.append(img);
    link.append(divImg);
    divText.append(title);
    divText.append(text);
    link.append(divText);
    link.append(svg);
    item.append(link);

    container.append(item);
  });

  return container;
}
