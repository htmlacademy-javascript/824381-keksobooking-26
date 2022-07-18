/**
 * Modules entrypoint
 */
import { showError } from './util.js';
import { getData } from './server.js';
import { createRegularPins } from './map.js';
import { enableFilters } from './filters.js';
import { disableForms, enableForms, validateAdForm } from './form.js';

/**
 * Main functions for app
 */
disableForms();

getData((data) => {
  createRegularPins(data);
  enableFilters(data);
  validateAdForm();
  enableForms();
}, showError);
