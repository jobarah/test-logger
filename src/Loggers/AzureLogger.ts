import { EventHubClient } from '@azure/event-hubs';
import logger from '@azure/logger';
import ILogger from '../ILogger';

logger.setLogLevel('info');

// operations will now emit info, warning, and error logs
const client = new EventHubClient(/* params */);

const testLogger = logger.createClientLogger("test");

client.getPartitionIds()
  .then(ids => { /* do work */ })
  .catch(e => { /* do work */ });

class AzureLogger extends ILogger {

  constructor(env: string, options: any) {
    // super(loggerClient(env, options))
    super(env, options);
    this.loggerClient = client.createLogger(this.env, this.options);
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