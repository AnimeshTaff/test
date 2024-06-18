const express = require('express');
const request = require('request');
const router = express.Router();
const { Url } = require('../config'); // Assuming Url is correctly defined in config file

// Function to make Shopify API requests
const makeShopifyRequest = (method, endpoint, body, res) => {
    const options = {
        method,
        url: `${Url}/${endpoint}.json`, // Always append '.json' for Shopify API requests
        headers: {
            'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : null
    };

    console.log(`Making ${method} request to ${options.url}`);

    request(options, (error, response, responseBody) => {
        if (error) {
            console.error(`Error: ${error}`);
            res.status(500).send(error);
        } else {
            try {
                // Parse the response body into a JavaScript object
                let responseBodyObj = JSON.parse(responseBody);
                console.log(`Response received with status code ${response.statusCode}`);
                res.status(response.statusCode).json(responseBodyObj);
            } catch (parseError) {
                console.error(`Error parsing response body: ${parseError}`);
                res.status(500).send(parseError);
            }
        }
    });
};

// Route to fetch all products
router.get("/products", (req, res) => {
    console.log("Fetching all products...");
    makeShopifyRequest('GET', 'products', null, res);
});

// Route to create a product
router.post("/products/create", (req, res) => {
    console.log("Creating a new product...");
    const productData = req.body; // Assuming request body contains product data
    makeShopifyRequest('POST', 'products', productData, res);
});

// Route to update a product
router.put("/products/update/:productId", (req, res) => {
    const productId = req.params.productId;
    console.log(`Updating product with ID ${productId}...`);
    const productData = req.body; // Assuming request body contains updated product data
    makeShopifyRequest('PUT', `products/${productId}`, productData, res);
});

// Route to delete a product
router.delete("/products/delete/:productId", (req, res) => {
    const productId = req.params.productId;
    console.log(`Deleting product with ID ${productId}...`);
    makeShopifyRequest('DELETE', `products/${productId}`, null, res);
});

module.exports = router;
