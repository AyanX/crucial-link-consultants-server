const {
  mysqlTable,
  int,
  varchar,
  boolean,
  text,
  timestamp,
} = require("drizzle-orm/mysql-core");

// users schema
const usersTable = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  bio: text("bio"),
  role: varchar("role", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  skills: text("skills"),
  image: varchar("image", { length: 255 }),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
});
// messages schema
const messagesTable = mysqlTable("messages", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  isRead: boolean("isRead").default(false),
  organization: varchar("organization", { length: 255 }),
  message: text("message").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

// contacts schema
const contactsTable = mysqlTable("contacts", {
  id: int("id").primaryKey().autoincrement(),
  email: varchar("email", { length: 255 }).notNull(),
  phone_number: varchar("phone_number", { length: 255 }),
  location: varchar("location", { length: 255 }),
  city: varchar("city", { length: 255 }),
  calling_time: varchar("calling_time", { length: 255 }),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
});

// website info schema
const websiteInfoTable = mysqlTable("website_info", {
  id: int("id").primaryKey().autoincrement(),
  total_projects: varchar("total_projects", { length: 255 }),
  regions_served: varchar("regions_served", { length: 255 }),
  client_retention_rate: varchar("client_retention_rate", { length: 255 }),
  data_points_analyzed: varchar("data_points_analyzed", { length: 255 }),
  compliance_increase: varchar("compliance_increase", { length: 255 }),
  years_of_experience: varchar("years_of_experience", { length: 255 }),
  compliance_time: varchar("compliance_time", { length: 255 }).default(
    "1 month",
  ),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
});

// why pick us schema
const whyPickUsTable = mysqlTable("why_pick_us", {
  id: int("id").primaryKey().autoincrement(),
  content: text("content").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
});

//socials schema
const socialsTable = mysqlTable("socials", {
  id: int("id").primaryKey().autoincrement(),
  facebook: varchar("facebook", { length: 255 }),
  email: varchar("email", { length: 255 }),
  twitter: varchar("twitter", { length: 255 }),
  linkedin: varchar("linkedin", { length: 255 }),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
});

//admin schema
const adminTable = mysqlTable("admin", {
  id: int("id").primaryKey().autoincrement(),
  username: varchar("username", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
});

const callingTimesTable = mysqlTable("calling_times", {
  id: int("id").primaryKey().autoincrement(),
  end_time: varchar("end_time", { length: 255 }),
  from_day: varchar("from_day", { length: 255 }),
  start_time: varchar("start_time", { length: 255 }),
  to_day: varchar("to_day", { length: 255 }),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
});

// export the schema

module.exports = {
  usersTable,
  callingTimesTable,
  messagesTable,
  contactsTable,
  websiteInfoTable,
  whyPickUsTable,
  socialsTable,
  adminTable,
};
