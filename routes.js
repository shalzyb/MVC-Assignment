const express = require ("express");
const router = express.Router();
const {
    createProvider,
    getProviders,
    getProviderById,
    updateProvider,
    verifyProvider,
    deleteProvider
} = require ("./controller");

module.exports = router;