/**
 * Modules entrypoint
 */
import './ad-generator.js';
import './map.js';
import { validateAdForm } from './form.js';
import './server.js';
import './filters.js';

validateAdForm();
