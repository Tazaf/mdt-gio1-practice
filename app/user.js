/**
 * ------------------------------------------------------------------------
 *
 * This module defines a class that represents a registered user.
 * Not absolutely useful, except for having "real" User objects
 * instead of anonymous ones.
 *
 * ------------------------------------------------------------------------
 */

export default class User {
  constructor(json) {
    this.id = json.id;
    this.email = json.email;
    this.firstname = json.firstname;
    this.lastname = json.lastname;
    this.phone = json.phone;
  }
}
