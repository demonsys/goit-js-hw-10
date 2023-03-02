import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
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
      if (data === undefined) {
        return console.log('Oops, there is no country with that name');
      }
      if (data.length === 1) {
        console.log('1 country');
        // markupOne()
      } else if (data.length <= 10) {
        console.log('1-9 country');
        console.log(data);
        markupSeveral(data);
      } else if (data.length > 10) {
        console.log(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    })
    .catch(e => console.log(e));
}
function markupSeveral(data) {
  data.map(country => {
    const { flags, name } = country;
    const countryItem = document.createElement('li');
    countryItem.classList.add('.country');
    countryItem.innerHTML = `<img src='${flags.svg}' alt='flag of ${name.official}' width='60'>${name.official}`;
    refs.countryList.appendChild(countryItem);
  });
}
