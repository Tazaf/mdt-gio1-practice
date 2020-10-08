/**
 * ------------------------------------------------------------------------
 *
 * This module is the entry point of the application.
 * It wires the business logic on the web page,
 * like some kind of "controller".
 *
 * ------------------------------------------------------------------------
 */

import { sendRegistration } from './app/api.js';
import {
  displayErrors,
  displayRegistrationSuccess,
  resetErrors,
  formEle
} from './app/page.js';
import RegistrationData from './app/registration.js';

/**
 * Process the submition of a registration form
 *
 * @param {SubmitEvent} submit
 */
formEle.onsubmit = (submit) => {
  submit.preventDefault();
  resetErrors();
  // Create a registration instance from the form
  const registration = new RegistrationData(formEle);
  registration
    .isValid()
    // Save the registration on the API
    .then(() => sendRegistration(registration))
    // Display a success message
    .then(displayRegistrationSuccess)
    // If an error occurs (validation or otherwise), display it/them
    .catch(displayErrors);
};
