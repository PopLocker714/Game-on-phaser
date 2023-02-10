const cssPromises = {}

export function loadResurce(src) {
  if (src.endsWith('.js')) {
    return import(src);
  }

  if (src.endsWith('.css')) {
    if(!cssPromises[src]) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = src
      cssPromises[src] = new Promise(resolve => {
        link.addEventListener('load', () => resolve())
      })
      document.head.append(link)
    }
    return
  }

  return fetch(src).then(res => res.json());
}
