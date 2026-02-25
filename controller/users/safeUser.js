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
  if (!text) return [];
    // use json.parse to convert the string back to an array    
    try {
        const array = JSON.parse(text);
        return array;
    } catch (error) {
        console.error("Error parsing skills:", error);
        return [];
    }
}

const safeUser = (user) => {
  return {
    id: user.id,
    name: user.name,
    bio: user.bio,
    role: user.role,
    title: user.title,
    skills: textToArray(user.skills),
    image: user.image,
    created_at: inEATTime(user.created_at),
    updated_at: inEATTime(user.updated_at),
  };
};

module.exports = safeUser;
