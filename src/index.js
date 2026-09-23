const express = require('express');
const rateLimit = require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware');

const { ServerConfig, Logger } = require('./config');
const apiRoutes = require('./routes');

const app = express();

const limiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 2 minutes
    limit: 30, // Limit each IP to 3 requests per `window` (here, per 2 minutes).
});

app.use('/flightsService', createProxyMiddleware({
    target: ServerConfig.FLIGHT_SERVICE, // target host with the same base path
    changeOrigin: true, // needed for virtual hosted sites
}));

app.use('/bookingService', createProxyMiddleware({
    target: ServerConfig.BOOKING_SERVICE, // target host with the same base path
    changeOrigin: true, // needed for virtual hosted sites
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(limiter);

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log("Successfully started the server on " + ServerConfig.PORT);
});

/**
 *                            
 * user --> localhost:3001/flightservice/api/v1/flights (API Gateway) --> localhost:3000/api/v1/flights
 * user --> localhost:3001/bookingservice/api/v1/bookings (API Gateway) --> localhost:4000/api/v1/bookings
 */