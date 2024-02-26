import logger from '@azure/logger';
import BaseLogger from '../BaseLogger';

logger.setLogLevel('info');

const testLogger = logger.createClientLogger("test");

class AzureLogger extends BaseLogger {

  constructor(env: string, options: any) {
    super(env, options);
    this.loggerClient = testLogger.createLogger(this.env, this.options);
  }

  log(message: string): void {
    this.loggerClient.log(message);
  }

  info(message: string): void {
    this.loggerClient.info(message);
  }

  warning(message: string): void {
    this.loggerClient.warning(message);
  }

  error(message: string): void {
    this.loggerClient.error(message);
  }
}

export default AzureLogger;