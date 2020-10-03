// Configure a personalized logger

const { createLogger, format, transports } = require('winston');

module.exports = createLogger({
  format: format.combine(
    format.simple(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.colorize(),
    format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}`)
  ),

  transports: [
    new transports.File({
      maxsize: 512E-4,
      maxFiles: 5,
      filename: `${__dirname}/../logs/log-api.log`
    }),
    new transports.Console({
      level: 'debug',
    })
  ]
})