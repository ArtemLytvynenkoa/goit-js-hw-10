import './css/styles.css';
import debounce from 'lodash.debounce';
import getRefs from './js/get-refs';
import Notiflix from 'notiflix';
import SearchCountryService from './js/fetchCountries'
import countriesCardTpl from './templates/country-card.hbs'
import countriesItemTpl from './templates/countries-item.hbs'

const DEBOUNCE_DELAY = 300;
const refs = getRefs()
const searchCountryService = new SearchCountryService();

refs.searchInput.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY))

function onInputChange(element) {
    removeRender();

    searchCountryService.query = element.target.value.trim();

    if (searchCountryService.query === '') {
        return Notiflix.Notify.failure('Oops, there is no country with that name');
    }
    
    searchCountryService.fetchCountries()
        .then(countries => {
            if (!countries) {
                return
            }
            renderCountry(countries)
        })
        .catch(error => {
            console.log(error)
        })
}

function renderCountry(countries) {
    if (countries.length === 1) {
        return refs.countryCard.insertAdjacentHTML('afterbegin', countriesCardTpl(countries))
    }
    
     refs.countryList.insertAdjacentHTML('afterbegin', countriesItemTpl(countries))
}

function removeRender() {
    refs.countryCard.innerHTML = '';
    refs.countryList.innerHTML = '';
}