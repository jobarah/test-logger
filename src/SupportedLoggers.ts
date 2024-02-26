import { AzureLogger } from '@azure/logger';
import testLog from './LoggerInterface';

const SupportedLoggers = {
  'web': AzureLogger,
};

export default SupportedLoggers;
