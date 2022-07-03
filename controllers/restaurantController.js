const { response, request } = require('express');
const Search = require('../models/searchs');

const restaurantGet = async(req, res = response) => {

    const { lat, lng } = req.body;
    const search = new Search();
    const user = req.user;

    const restaurants = await search.restaurants( lat, lng, user._id );

    res.json({
        restaurants
    });
    
}

module.exports = {
    restaurantGet,
}