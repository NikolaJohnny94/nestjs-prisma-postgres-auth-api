export function getCustomErrorMessage(
  url: string,
  method: string,
  id?: string,
): string {
  const segments = url.split('/').filter(Boolean);
  const mainEndpoint = segments[0];
  const subEndpoint = segments[1];

  let message = 'An unexpected error occurred. Please try again later.';

  if (mainEndpoint === 'auth') {
    switch (subEndpoint) {
      case 'signin':
        message =
          'Error occurred while user tried to sign in. Please try again later.';
        break;
      case 'signup':
        message =
          'Error occurred while user tried to sign up. Please try again later.';
        break;
      case 'signout':
        message =
          'Error occurred while user tried to sign out. Please try again later.';
        break;
      case 'refresh':
        message =
          'Error occurred while user tried to refresh token. Please try again later.';
        break;
      default:
        message =
          'An unexpected error occurred while perforing actions on auth route. Please try again later.';
        break;
    }
  } else if (mainEndpoint === 'posts') {
    switch (method) {
      case 'GET':
        if (subEndpoint === undefined) {
          message =
            'Error occurred while trying to retrieve posts from the DB.';
        } else if (subEndpoint === 'filtered') {
          message = `Error occurred while retrieving filtered posts from the DB.`;
        } else {
          message = `Error occurred while trying to retrieve post with id: ${id} from the DB.`;
        }
        break;
      case 'POST':
        message =
          'Error occurred while trying to create new post in the DB. Please try again.';
        break;
      case 'PUT':
        message = `Error occurred while updating post in the DB.`;
        break;
      case 'DELETE':
        message = `Error occurred while deleting post from the DB.`;
        break;
      default:
        message = 'An unexpected error occurred. Please try again later.';
        break;
    }
  } else {
    message =
      'An unexpected error occurred while performing actions on post route. Please try again later.';
  }

  return message;
}
