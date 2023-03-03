function fetchCountries(name) {
  const searchParams = new URLSearchParams({
    fields: 'name,capital,population,flags,languages',
  });
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?${searchParams}`
  ).then(r => {
    if (!r.ok) {
      throw new Error(r.status);
    }
    return r.json();
  });
}
export { fetchCountries };
