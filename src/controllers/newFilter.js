let filterQuery = localStorage.getItem('filterQuery')
  ? JSON.parse(localStorage.getItem('filterQuery'))
  : {
      category: [],
      brand: [],
    };

localStorage.setItem('filterQuery', JSON.stringify(filterQuery));

function buildQuery() {
  let query = [];
  for (let key in filterQuery) {
    query.push(
      encodeURIComponent(key) + '=' + encodeURIComponent(filterQuery[key])
    );
  }
  let newUrl =
    'https://dummyjson.com/products' +
    (query.length ? '?' + query.join('&') : '');
  return newUrl;
}


const getFilterReq = id => {
  const arrInputs = [
    ...document.getElementById(id).getElementsByTagName('input'),
  ];
  const fieldSetCheck = arrInputs
    .map((el, i) => (el.checked ? el.value : ''))
    .join('');
  const result = `${id}=${fieldSetCheck}`;
  //   console.log('Result', result);
  return result;
};

export const filter = e => {
  const form = [...e.composedPath()]
    .filter(({ tagName }) => tagName === 'FORM')
    .map(({ id }) => id); /* get id current target */
  const secondId = form.join('') === 'category' ? 'brand' : 'category';
  const query = `${getFilterReq(form)}&${getFilterReq(secondId)}`;
  console.log('Query', query);
  //   params.append(secondId, query);
  //   window.location.search = params;
  return query;
};