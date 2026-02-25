const { desc } = require("drizzle-orm");
const { db, callingTimesTable } = require("../dbDetails");
class CallingTimeController {
    static async addCallingTime(req, res) {
        try {
            const { end_time,from_day,start_time,to_day} = req.body;
            await db.insert(callingTimesTable).values({
                end_time: end_time?.trim(),
                from_day: from_day?.trim(),
                start_time: start_time?.trim(),
                to_day: to_day?.trim()
            });
            res.status(201).json({ message: "Calling time added successfully" });
        } catch (error) {
            console.error("Error adding calling time:", error);
            res.status(500).json({ error: "Failed to add calling time" });
        }
    }

    static async getCallingTime(req, res) {
        try {
            const lastCallingTime = await db
                .select()
                .from(callingTimesTable)
                .orderBy(desc(callingTimesTable.id))
                .limit(1);

            const resData = {
                end_time: lastCallingTime[0]?.end_time || "",
                from_day: lastCallingTime[0]?.from_day || "",
                start_time: lastCallingTime[0]?.start_time || "",
                to_day: lastCallingTime[0]?.to_day || ""
            }

           res.status(200).json(resData);
        } catch (error) {
            console.error("Error fetching calling time:", error);
            res.status(500).json({ error: "Failed to fetch calling time" });
        }
    }
}

module.exports = CallingTimeController;