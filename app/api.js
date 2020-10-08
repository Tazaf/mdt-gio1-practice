/**
 * ------------------------------------------------------------------------
 *
 * This module is responsible of making HTTP call to the API endpoints.
 *
 * ------------------------------------------------------------------------
 */
import {
  emailVerificationUrl,
  HttpMethods,
  userRegistrationUrl
} from './constants.js';
import RegistrationData from './registration.js';
import User from './user.js';

/**
 * Calls the API to check wether the provided email already exists.
 *
 * @param {string} email The email to verifiy
 * @return {Promise<boolean>} A Promise whose value will be `true` if the email is already taken and `false` otherwise
 */
export function isEmailExisting(email) {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open(HttpMethods.GET, `${emailVerificationUrl}?email=${email}`);
    req.send();
    req.onload = () => {
      const result = JSON.parse(req.response);
      resolve(!result.available);
    };
  });
}

/**
 * Sends the registration data to the API to "create" the user profile.
 *
 * @param {RegistrationData} registration The user registration data
 * @returns {Promise<User>} A Promise whose value will be an object representing the created user
 */
export function sendRegistration(registration) {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open(HttpMethods.POST, userRegistrationUrl);
    req.onload = () => {
      resolve(new User(JSON.parse(req.response)));
    };
    req.send(JSON.stringify(registration));
  });
}
