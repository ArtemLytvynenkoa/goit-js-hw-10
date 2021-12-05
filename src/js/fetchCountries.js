import Notiflix from 'notiflix';

const mainUrl = 'https://restcountries.com/v3.1';
const fetchProperties = 'name,capital,population,flags,languages';

export default class SearchCountryService {
    constructor() {
        this.searchQuery = '';
    }

    fetchCountries() {
        const url = `${mainUrl}/name/${this.searchQuery}?fields=${fetchProperties}`
            
        return fetch(url)
            .then(response => response.json())
            .then(countriesArray => {
                if (countriesArray.length > 10) {
                    return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
                }
                if (countriesArray.status === 404) {
                    return Notiflix.Notify.failure('Oops, there is no country with that name');
                }
                return countriesArray
            })
    };

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}