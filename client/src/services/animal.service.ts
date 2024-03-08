import http from './http-common';

const url = "rest/v1/animals"

const getAnimals = () => {
    return http.get(url)
        .then(response => {
            // Handle the response data in here
            console.log(response.data);
        })
        .catch(error => {
            // Handle the error here if the request fails
            console.error("Error fetching data: ", error);
        });
}

const getAnimalById = (id:string) => {
    return http.get(url + "?id.eq" + id)
        .then(response => {
            // Handle the response data in here
            console.log(response.data);
        })
        .catch(error => {
            // Handle the error here if the request fails
            console.error("Error fetching data: ", error);
        });
}

const AnimalService = {
    getAnimals,
    getAnimalById
  }
  
  export default AnimalService;