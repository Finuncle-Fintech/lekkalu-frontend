import log from 'loglevel'

log.setLevel('info')

// This is a simple logger that logs to the console and uses the loglevel library to set the log level
// to 'info'. This means that only log.info() messages will be displayed in the console. The log.debug(),
// log.warn(), and log.error() messages will not be displayed. You can change the log level to 'debug'
// to display all log messages in the console.
// example:
// log.setLevel('debug')
// log.debug('This is a debug message')
// log.info('This is an info message')
// log.warn('This is a warning message')
// log.error('This is an error message')
export default log
