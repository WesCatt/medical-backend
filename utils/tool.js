const express = require("express");

function getRouter() {
    return express.Router();
}


module.exports = {
    getRouter,
}