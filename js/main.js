/**
 * Modules entrypoint
 */
import { getData } from './server.js';
import { showError } from './util.js';
import { createRegularPins } from './map.js';
import { enableFilters } from './filters.js';
import { validateAdForm } from './form.js';

/**
 * Main functions for app
 */
getData((data) => {
  createRegularPins(data);
  enableFilters(data);
}, showError);

validateAdForm();
