import { loadResurce } from './loadResurce.js';

export function renderPage(constainer, moduleName, apiUrl, css) {
  Promise.all([moduleName, apiUrl, css].map((src) => loadResurce(src)))
    .then(([pageModule, data]) => {
      constainer.innerHTML = '';
      constainer.append(pageModule.render(data));
    });
}
