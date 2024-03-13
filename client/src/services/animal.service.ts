import http from './http-common';

const url = "rest/v1/animals"

const getAnimals = () => {
    return http.get(url)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
            throw error; // Rethrow the error so the calling component can catch it
        });
}

const getAnimalById = (id) => {
    return http.get(`${url}?id.eq=${id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
            throw error; // Rethrow the error so the calling component can catch it
        });
}

const getMostEndangeredAnimals = () => {
    return http.get(`${url}?select=*&order=amount_left&limit=20`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
            throw error; // Rethrow the error so the calling component can catch it
        });
}


const AnimalService = {
    getAnimals,
    getAnimalById,
    getMostEndangeredAnimals
};

export default AnimalService;