import { createLogger, format as _format, transports as _transports } from 'winston'

const logger = createLogger({
  level: 'info',
  format: _format.json(),
  defaultMeta: { service: 'main' },
  transports: [
    new _transports.File({ filename: 'error.log', level: 'error' }),
    new _transports.File({ filename: 'combined.log' }),
  ],
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new _transports.Console({
      format: _format.simple(),
    })
  )
}

export default logger
