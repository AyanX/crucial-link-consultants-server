const db = require("../db/db");

const {
  usersTable,
  messagesTable,
  contactsTable,
  websiteInfoTable,
  whyPickUsTable,
  callingTimesTable,
  socialsTable
} = require("../drizzle/schema");

module.exports = {
  db,
  usersTable,
  callingTimesTable,
  messagesTable,
  contactsTable,
  websiteInfoTable,
  whyPickUsTable,
  socialsTable
};
