// src/services/region.service.js

import http from './http-common';

const url = "rest/v1/regions";

const getRegions = () => {
    return http.get(url)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
            throw error;
        });
};

const getRegionById = (id) => {
    return http.get(`${url}?id.eq=${id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
            throw error;
        });
};

const getRegionsByContinentId = (continentId) => {
    return http.get(`${url}?continent_id=eq.${continentId}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error("Error fetching regions by continent ID:", error);
            throw error;
        });
};

const RegionService = {
    getRegions,
    getRegionById,
    getRegionsByContinentId
};


export default RegionService;
