const { formatInTimeZone } = require("date-fns-tz");

const inEATTime = (createdAt) => {
  if (!createdAt) return null;
  const eatTime = formatInTimeZone(
    createdAt,
    "Africa/Nairobi",
    "yyyy-MM-dd HH:mm:ss",
  );
  return eatTime;
};

const textToArray = (text) => {
  if (!text || text === "undefined" || text === "null") {
    return [];
  }

  if (Array.isArray(text)) {
    return text;
  }

  if (typeof text !== "string") {
    return [];
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("Error parsing skills:", text);
    return [];
  }
};

const safeUser = (user) => {
  const newSkills = textToArray(user.skills)

  return {
    id: user.id,
    name: user.name,
    bio: user.bio,
    role: user.role,
    title: user.title,
    skills: newSkills,
    image: user.image,
    created_at: inEATTime(user.created_at),
    updated_at: inEATTime(user.updated_at),
  };
};

module.exports = safeUser;
