import { loadDataList } from './loadDataList.js';

export function render(data) {
  const container = document.createElement('div');
  const btnBack = document.createElement('a');
  const title = document.createElement('h1');
  const episodeNumber = document.createElement('p');
  const desc = document.createElement('p');

  container.classList.add('max-w-5xl', 'mx-auto');
  btnBack.classList.add('border', 'p-2', 'rounded-lg', 'mb-4', 'inline-block', 'hover:text-black', 'hover:bg-white');
  title.classList.add('text-3xl', 'font-bold');
  episodeNumber.classList.add('text-xl');
  desc.classList.add('text-base', 'mb-2');

  btnBack.href = 'index.html';
  btnBack.textContent = 'Back to episodes';
  title.textContent = data.title;
  episodeNumber.textContent = `Episode: ${data.episode_id}`;
  desc.textContent = data.opening_crawl;

  btnBack.addEventListener('click', (event) => {
    event.preventDefault();
    window.history.back();
  });

  function createList(dataPlanets, titleName) {
    const listTitle = document.createElement('h2');
    const list = document.createElement('ul');
    listTitle.classList.add('text-2xl', 'font-bold', 'mb-2');
    list.classList.add('list-disc', 'space-y-2', 'pl-6', 'text-sm', 'mb-3');
    listTitle.textContent = titleName;
    list.role = 'list';

    dataPlanets.forEach((planet) => {
      const li = document.createElement('li');
      li.textContent = planet.name;
      list.append(li);
    });

    container.append(listTitle);
    container.append(list);
  }

  Promise.all([
    loadDataList(data.planets),
    loadDataList(data.species),
    loadDataList(data.starships),
  ]).then(([dataPlanets, dataSpecies, dataStarships]) => {
    container.append(btnBack);
    container.append(title);
    container.append(episodeNumber);
    container.append(desc);

    createList(dataPlanets, 'Planets');
    createList(dataSpecies, 'Species');
    createList(dataStarships, 'Starships');
  });

  return container;
}
