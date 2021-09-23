/**
 * ------------------------------------------------------------------------
 *
 * This module is responsible of manipulating the web page,
 * based on the data his functions are provided.
 *
 * ------------------------------------------------------------------------
 */

import { errorContainerEleId, errorListEleId, formEleId } from './constants.js';
import User from './user.js';
const hiddenClass = 'hidden';

/**
 * The registration form
 */
export const formEle = document.getElementById(formEleId);
/**
 * The error list container
 */
const errorContainer = document.getElementById(errorContainerEleId);
/**
 * The error list
 */
const errorList = document.getElementById(errorListEleId);
/**
 * The success block that displays the registered user information
 */
const successCard = document.getElementById('success');

/**
 * Add the provided message to the error list in the page.
 *
 * @param {string} message The error message to add
 */
export function addError(message) {
  const error = document.createElement('li');
  error.innerHTML = message;
  errorList.appendChild(error);
}

/**
 * Resets the error block and list to their initial state.
 */
export function resetErrors() {
  errorList.innerHTML = '';
  errorContainer.classList.add(hiddenClass);
}

/**
 * Displays the provided error message in the page.
 *
 * @param {string[]} errors A list of errors to display.
 */
export function displayErrors(errors) {
  errors.forEach(addError);
  errorContainer.classList.remove(hiddenClass);
}

/**
 * Displays the provided user data in the page.
 * Will hide both the form and the error container.
 *
 * @param {User} userData The user data to display
 */
export function displayRegistrationSuccess(userData) {
  formEle.classList.add('hidden');
  successCard.classList.remove('hidden');
  successCard
    .getElementsByTagName('p')
    .item(1).innerHTML = `Your user number is <strong>${userData.id}</strong>`;
  createDataList(userData);
}

/**
 * Create a table-like structure to display the provided user data.
 *
 * @param {User} user The user data
 */
function createDataList(user) {
  const items = []
    .concat(createDataItem('email', user.email))
    .concat(createDataItem('name', `${user.lastname} ${user.firstname}`))
    .concat(user.phone ? createDataItem('phone', user.phone) : []);
  successCard
    .getElementsByTagName('dl')
    .item(0)
    .append(...items);
}

/**
 * Create a row-like HTML structure to display arbitrary data
 *
 * @param {string} label The label of the "row"
 * @param {string} value The value of the "row"
 */
function createDataItem(label, value) {
  const labelEle = document.createElement('dt');
  const valueEle = document.createElement('dd');
  labelEle.innerHTML = label;
  valueEle.innerHTML = value;
  return [labelEle, valueEle];
}
