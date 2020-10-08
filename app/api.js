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
export async function isEmailExisting(email) {
  const response = await fetch(`${emailVerificationUrl}?email=${email}`, {
    method: HttpMethods.GET
  });
  const result = await response.json();
  return !result.available;
}

/**
 * Sends the registration data to the API to "create" the user profile.
 *
 * @param {RegistrationData} registration The user registration data
 * @returns {Promise<User>} A Promise whose value will be an object representing the created user
 */
export async function sendRegistration(registration) {
  const response = await fetch(userRegistrationUrl, {
    method: HttpMethods.POST,
    body: JSON.stringify(registration)
  });
  return new User(await response.json());
}
