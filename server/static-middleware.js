const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../composite-apps-dt/dist/composite-apps-dt');
console.log(publicPath);
const staticMiddleware = express.static(publicPath);

module.exports = staticMiddleware;
