const express = require('express');
const request = require('request');
const router = express.Router();
const { Url } = require('../config');

const makeShopifyRequest = (method, endpoint, body, res) => {
    const options = {
        method,
        url: body ? `${Url}/${endpoint}.json` : `${Url}/${endpoint}`,
        headers: {
            'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : null
    };
    
    request(options, (error, response, body) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(response.statusCode).send(body);
        }
    });
};

// Fetch all products
router.get("/", (req, res) => {
    makeShopifyRequest('GET', 'products.json', null, res);
});

// Create product
router.get("/create", (req, res) => {
    const productData = {
        "product": {
            "title": "test new data 1",
            "body_html": "<p> We are testing new data part 1 <p>",
            "product_type": "test",
            "variants": [
                {
                    "price": "300.00",
                    "sku": null,
                    "position": 1,
                    "inventory_policy": "deny",
                    "grams": 0,
                    "weight": 0.0,
                    "weight_unit": "kg",
                    "inventory_quantity": 200,
                    "old_inventory_quantity": 1
                }
            ]
        }
    };
    makeShopifyRequest('POST', 'products', productData, res);
});

// Update product
router.get("/update", (req, res) => {
    const productId = '7324780560435'; // Use the correct product ID
    const productData = {
        "product": {
            "title": "test new data update",
            "body_html": "<p> We are testing new data and here we running update query <p>",
            "product_type": "test",
            "variants": [
                {
                    "price": "300.00",
                    "sku": null,
                    "position": 1,
                    "inventory_policy": "deny",
                    "grams": 0,
                    "weight": 0.0,
                    "weight_unit": "kg",
                    "inventory_quantity": 100,
                    "old_inventory_quantity": 1
                }
            ]
        }
    };
    makeShopifyRequest('PUT', `products/${productId}`, productData, res);
});

// Delete product
router.get("/delete", (req, res) => {
    const productId = '7324780560435'; // Use the correct product ID
    makeShopifyRequest('DELETE', `products/${productId}`, null, res);
});

module.exports = router;
