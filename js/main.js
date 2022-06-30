/**
 * Modules entrypoint
 */
import './ad-generator.js';
import { enableForms, validateAdForm } from './form.js';
import './server.js';
import './filters.js';

enableForms();
validateAdForm();
