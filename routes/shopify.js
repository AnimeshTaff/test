const express = require('express');
const request = require('request');
const router = express.Router();
const { baseUrl } = require('../config');

const makeShopifyRequest = (method, endpoint, body, res) => {
    const options = {
        method,
        url: `${baseUrl}/${endpoint}.json`,
        headers: {
            'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : null
    };
    
    request(options, (error, response) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(response.statusCode).send(response.body);
        }
    });
};

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
    makeShopifyRequest('POST', productData, res);
});

// Update product
router.get("/update", (req, res) => {
    const productid = '7324780560435'; // Use the correct product ID
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
    makeShopifyRequest('PUT', productid, productData, res);
});

// Delete product
router.get("/delete", (req, res) => {
    const productid = '7324780560435'; // Use the correct product ID
    makeShopifyRequest('DELETE', productid, null, res);
});

module.exports = router;
