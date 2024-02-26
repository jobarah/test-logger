import {
  AzureLogger,
  // other loggers
} from './Loggers/index';

const SupportedLoggers = {
  'web': AzureLogger,
};

export default SupportedLoggers;
