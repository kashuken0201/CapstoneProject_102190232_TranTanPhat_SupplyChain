"use strict";

import * as winston from "winston";
import "winston-daily-rotate-file";

const myFormat = winston.format.printf((info) => {
    return `${info.timestamp} ${info.level} [${new Date(
        info.timestamp
    ).toLocaleString()}] : ${info.message}`;
});

export const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        myFormat
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.DailyRotateFile({
            frequency: "24h",
            dirname: "logs",
            filename: `logfile-%DATE%.log`,
            datePattern: "YYYY-MM-DD-HH-mm",
            maxFiles: "14d",
            maxSize: "20m",
        }),
    ],
});
