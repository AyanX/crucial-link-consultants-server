const db = require("../db/db");

const {
  usersTable,
  messagesTable,
  contactsTable,
  websiteInfoTable,
  whyPickUsTable,
  callingTimesTable,
  adminTable,
  socialsTable
} = require("../drizzle/schema");

module.exports = {
  db,
  usersTable,
  callingTimesTable,
  messagesTable,
  contactsTable,
  websiteInfoTable,
  adminTable,
  whyPickUsTable,
  socialsTable
};
