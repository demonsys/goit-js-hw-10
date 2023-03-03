import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const refs = {
  searchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.searchBox.addEventListener(
  'input',
  debounce(onInputChange, DEBOUNCE_DELAY)
);
function onInputChange() {
  if (refs.searchBox.value.trim() === '') {
    return;
  }
  fetchCountries(refs.searchBox.value.trim())
    .then(data => {
      if (data.length === 1) {
        return markupOne(data[0]);
      } else if (data.length <= 10) {
        return markupSeveral(data);
      } else if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.',
          { position: 'center-top' }
        );
      }
    })
    .catch(e => {
      Notify.failure('Oops, there is no country with that name', {
        position: 'center-top',
      });
      console.log(e);
    })
    .finally(clearResultsInfo());
}
function markupSeveral(data) {
  data.map(country => {
    const { flags, name } = country;
    const countryItem = document.createElement('li');
    countryItem.classList.add('country');
    countryItem.innerHTML = `<img src='${flags.svg}' alt='flag of ${name.official}' width='30'>${name.official}`;
    refs.countryList.appendChild(countryItem);
  });
}
function markupOne(country) {
  const { flags, capital, name, population } = country;
  const languages = Object.values(country.languages).join(',');
  refs.countryInfo.innerHTML = `<img src='${flags.svg}' alt='flag of ${name.official}' width='30'><span class="country-title">${name.official}</span>
   <p><b>Capital:</b> ${capital}</p>
    <p><b>Population:</b> ${population}</p>
    <p><b>Languages:</b> ${languages}</p>`;
}
function clearResultsInfo() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}
