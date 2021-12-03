import './css/styles.css';
import debounce from 'lodash.debounce';
import getRefs from './templates/get-refs';
import SearchCountryService from './templates/fetchCountries'
import countriesCardTpl from './templates/country-card.hbs'
import countriesItemTpl from './templates/countries-item.hbs'

const DEBOUNCE_DELAY = 300;
const refs = getRefs();
const searchCountryService = new SearchCountryService();

refs.searchInput.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY))

function onInputChange(element) {
    refs.countryCard.innerHTML = '';
    refs.countryList = '';
    searchCountryService.query = element.target.value.trim();

    searchCountryService.fetchCountries().then(countries => {
        const markup = renderCountryCard(countries);
        refs.countryCard.insertAdjacentHTML('afterbegin', markup)
        })
}

// function renderCountryCard(countries) {
//     return countries.map(country => {
//       const { name, capital, population, flags, languages } = country
//         if (countries.length === 1) {
//             return refs.countryCard.insertAdjacentHTML(
//                 'afterbegin',
//                 countriesCardTpl({ name, capital, population, flags, languages }))
//         }
//         refs.countryList.insertAdjacentHTML('afterbegin', countriesItemTpl({ name, capital, population, flags, languages })) 
//     })
// }

function renderCountryCard(countries) {
    return countries.map(({ name, capital, population, flags, languages }) => {
        const countryMarkup = `
            <div class="country-card">
                <div class="country-name">
                    <img src="${flags.svg}" alt="${name.official}" width="50px">
                    <strong> ${name.official}</strong>
                </div>
                <div>
                    <strong>Capital: </strong>
                    ${capital}
                </div>
                <div>
                    <strong>Population: </strong>
                    ${population}
                </div>
                <div>
                    <strong>Languages: </strong>
                        <span>${Object.values(languages).join()},</span>
                </div>
            </div>
        `

        if (countries.length === 1) {
            return countryMarkup  
        }

        return `
            <div class="country-item">
                <img src="${flags.svg}" alt="${name.official}" width="25px">
                <strong>${name.official}</strong>
            </div>
        `
    }).join()
}