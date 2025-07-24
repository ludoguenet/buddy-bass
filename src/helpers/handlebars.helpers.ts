import * as hbs from 'hbs';

export function registerHandlebarsHelpers() {
  // Helper to check if current URL matches the given path
  hbs.registerHelper('isActive', function (path: string, options: any) {
    const currentPath = options.data.root.currentPath || '';

    // For exact match on users page
    if (path === '/users' && currentPath === '/users') {
      return true;
    }

    // For users/register, only match exact path
    if (path === '/users/register' && currentPath === '/users/register') {
      return true;
    }

    // For videos, match any path starting with /videos
    if (path === '/videos' && currentPath.startsWith('/videos')) {
      return true;
    }

    return false;
  });

  // Debug helper to see what currentPath contains
  hbs.registerHelper('debug', function (value: any) {
    console.log('Debug:', value);
    return '';
  });
}
