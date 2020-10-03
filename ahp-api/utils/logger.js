// Configure a personalized logger

const { createLogger, format, transports } = require('winston');

module.exports = createLogger({

  transports: [
    new transports.File({
      format: format.combine(
        format.simple(),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}`)
      ),
      maxsize: 512E-4,
      maxFiles: 5,
      filename: `${__dirname}/../logs/log-api.log`
    }),
    new transports.Console({
      format: format.combine(
        format.simple(),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.colorize(),
        format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}`)
      ),
      level: 'debug',
    })
  ]
})