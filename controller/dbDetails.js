const db = require("../db/db");

const {
  usersTable,
  messagesTable,
  contactsTable,
  websiteInfoTable,
  whyPickUsTable,
  callingTimesTable,
  adminTable,
  socialsTable,
  careerTopicsTable,
  careersTable
} = require("../drizzle/schema");

module.exports = {
  db,
  careersTable,
  careerTopicsTable,
  usersTable,
  callingTimesTable,
  messagesTable,
  contactsTable,
  websiteInfoTable,
  adminTable,
  whyPickUsTable,
  socialsTable
};
