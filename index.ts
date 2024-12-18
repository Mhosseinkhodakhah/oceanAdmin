import express, { Express, Request, Response, Application } from 'express'
import dotenv from 'dotenv'
import winston from 'winston'
import expressWinston from 'express-winston'
import cookieParser from 'cookie-parser'
import mongoSanitize from 'express-mongo-sanitize'
import helmet from 'helmet'
// import xss from "xss-clean"
import ratelimit from 'express-rate-limit'
import hpp from 'hpp'
import cors from 'cors'
import responseTime from 'response-time'
import { createLogger, format, transports } from 'winston'
import connection from './src/DB/connection'
import router from './src/router'
const { combine, timestamp, label, prettyPrint } = format;


import {
    createProxyMiddleware,
    debugProxyErrorsPlugin, // subscribe to proxy errors to prevent server from crashing
    loggerPlugin, // log proxy events to a logger (ie. console)
    errorResponsePlugin, // return 5xx response on proxy error
    proxyEventsPlugin, // implements the "on:" option
    fixRequestBody
} from 'http-proxy-middleware';



// required plugins for proxy middleware
const plugins = [debugProxyErrorsPlugin, loggerPlugin, errorResponsePlugin, proxyEventsPlugin]





dotenv.config({ path: './config/config.env' })

const app: Application = express();

// security 
app.use(mongoSanitize())
app.use(cors())
app.use(helmet())
app.use(hpp())
// app.use(xss())


//database connecting
connection()


//set logger
app.use(
    expressWinston.logger({
        transports: [new winston.transports.Console(), new (winston.transports.File)({ filename: 'myLogs.log' })],
        format: format.combine(
            label({ label: 'right meow!' }),
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            prettyPrint()
        ),
        statusLevels: true,
        meta: true,
        msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
        expressFormat: true,
        ignoreRoute() {
            return false;
        },
    })
);

// inside logger!!!!
winston.configure({
    format: format.combine(

        label({ label: 'right meow!' }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        prettyPrint()
    ),
    transports: [
        new (winston.transports.File)({ filename: 'inside.log' }),
        // new winston.transports.Console()
    ],
})

app.use(cookieParser())


process.on('unhandledRejection', (error) => {
    console.log('error occured . . .', error)
});

process.on('uncaughtException', (error) => {
    console.log('error occured', error)
})

process.on('unhandledException', (error) => {
    console.log('error occured . . .', error)
})




app.use(express.json({ limit: "25mb" }));


const port = process.env.PORT || 5006;

app.listen(port, () => {
    console.log('content server is running successfully . . .')
})

app.use('/app', router)

// app.use('/admin/users', createProxyMiddleware({
//     target: 'http://localhost:5000',
//     changeOrigin: true,
//     pathRewrite: {
//         [`^/`]: "",
//     },
//     plugins: plugins
// }))


// app.use('/admin/contents', createProxyMiddleware({
//     target: 'http://localhost:5001',
//     changeOrigin: true,
//     pathRewrite: {
//         [`^/`]: "",
//     },
//     plugins: plugins
// }))
