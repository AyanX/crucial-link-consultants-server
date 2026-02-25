const users = require("./users.json");
const process = require("process");
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function seedUsers() {
  for (const user of users) {
    try {
      const res = await fetch("http://localhost:9000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });

      const data = await res.json();

      console.log("✅ Created:", user.name);
      console.log("Response:", data);
    } catch (error) {
      console.error("❌ Failed:", user.name);
      console.error(error.message);
      process.exit(1);
    }
    await delay(1000);
  }

  console.log("Seeding complete");
}

seedUsers();