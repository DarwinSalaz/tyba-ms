const axios = require('axios');
const Transaction = require('../models/transaction');

class Search {

    constructor() {
    }

    get paramsGeoApify() {
        return {
            'apiKey': process.env.GEOAPIFY_KEY,
            'categories':'catering.restaurant',
            'limit': 20
        }
    }

    async restaurants( lat, lng, userId ) {
        try {
            const instance = axios.create({
                baseURL: 'https://api.geoapify.com/v2/places',
                params: { ...this.paramsGeoApify, filter: `circle:${lng},${lat},8000` }
            });

            const resp = await instance.get();
            const restaurants = resp.data.features.map( rest => rest.properties.name);
            const transaction = new Transaction({ userId, lat, lng, restaurants });
            await transaction.save();

            return resp.data.features.map(restaurant => ({ 
                id: restaurant.properties.place_id,
                name: restaurant.properties.name,
                city: restaurant.properties.city,
                address: restaurant.properties.formatted,
            }))
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = Search;
