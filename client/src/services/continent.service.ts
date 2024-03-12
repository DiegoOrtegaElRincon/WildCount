import http from './http-common';

const url = "rest/v1/continents";

const getContinents = () => {
    return http.get(url)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
            throw error; // Rethrow the error so the calling component can catch it
        });
};

const getContinentById = (id) => {
    return http.get(`${url}?id.eq=${id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
            throw error; // Rethrow the error so the calling component can catch it
        });
};

const ContinentService = {
    getContinents,
    getContinentById 
};

export default ContinentService;
