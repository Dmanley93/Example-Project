const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;
const HOST = "localhost";
const API_SERVICE_URL = "https://public-api.tracker.gg/v2/apex/standard/profile";

app.use(cors());

app.use('', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
 }));

 app.listen(PORT);

