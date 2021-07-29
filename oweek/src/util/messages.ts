import { showMessage } from 'react-native-flash-message';
import { ApolloError } from '@apollo/client';

interface CustomError {
  message: string;
}

/**
 * function for displaying an error message. Used for mutations
 */
export function processError(
  error: ApolloError | CustomError,
  message: string,
): void {
  showMessage({
    message,
    description: error.message,
    autoHide: false,
    type: 'danger',
    icon: 'danger',
  });
}

/**
 * function for processing graphQl query errors.
 */
export function processWarning(
  error: ApolloError | CustomError,
  message: string,
): void {
  showMessage({
    message,
    description: error.message,
    autoHide: false,
    type: 'warning',
    icon: 'warning',
  });
}

export function linkError(title: string, error?: Error): void {
  showMessage({
    message: `${title} Unavailable`,
    description: error
      ? error.toString()
      : 'We apologize for the inconvenience',
    autoHide: true,
    type: 'danger',
    icon: 'danger',
  });
}
