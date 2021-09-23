/**
 * ------------------------------------------------------------------------
 *
 * This module defines a class that represents registration data.
 * It's not only responsible of defining the model, but also its validity.
 *
 * ------------------------------------------------------------------------
 */

import { isEmailExisting } from './api.js';

export default class RegistrationData {
  /**
   * Creates a new RegistrationData instance by extracting the field value
   * from the provided form element.
   *
   * @param {HTMLFormElement} form The form to extract the data from
   */
  constructor(form) {
    const formData = new FormData(form);
    this.email = formData.get('email');
    this.lastname = formData.get('lastname');
    this.firstname = formData.get('firstname');
    this.password = formData.get('password');
    this.confirmation = formData.get('confirmation');
    this.phone = formData.get('phone');
  }

  /**
   * Validates that this `RegistrationData` instance contains
   * actual data that meets all the requirements for a valid registration.
   *
   * @returns {Promise<string[] | void>} A Promise that will be rejected
   * with a list of error messages if the `RegistrationData` is invalid,
   * or simply be resolved otherwise
   */
  async isValid() {
    const errors = [];
    // Email must exist and be a string with at least an @ char.
    if (
      !this.email ||
      typeof this.email !== 'string' ||
      !this.email.includes('@')
    ) {
      errors.push('email is incorrect');
    }
    // Email must not already be registered
    if (await isEmailExisting(this.email)) {
      errors.push('email is not available');
    }
    // Last name must exist and be a string
    if (!this.lastname || typeof this.lastname !== 'string') {
      errors.push('lastname is incorrect');
    }
    // First name must exist and be a string
    if (!this.firstname || typeof this.firstname !== 'string') {
      errors.push('firstname is incorrect');
    }
    // Password must exist and be a string of at least 8 chars.
    if (
      !this.password ||
      typeof this.password !== 'string' ||
      this.password.length < 8
    ) {
      errors.push('password is incorrect');
    }
    // Password confirmation must exist and match the password
    if (!this.confirmation || this.confirmation !== this.password) {
      errors.push('confirmation does not match password');
    }
    // If the phone exists, it must be a number-able string with at least 10 chars.
    if (this.phone && (isNaN(this.phone) || this.phone.length < 10)) {
      errors.push('phone number is incorrect');
    }
    return errors.length ? Promise.reject(errors) : Promise.resolve();
  }
}
