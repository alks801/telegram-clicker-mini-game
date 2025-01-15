import winston from "winston"
import DailyRotateFile from "winston-daily-rotate-file"

// Log format
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`
})

// Create a logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(winston.format.timestamp(), logFormat),
  transports: [
    // Log to the console
    new winston.transports.Console(),
    // Log rotation (daily)
    new DailyRotateFile({
      filename: "logs/application-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true, // Archive old logs
      maxSize: "20m", // Maximum file size
      maxFiles: "14d", // Keep logs for 14 days
    }),
    // Error logs
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
  ],
})

export default logger
