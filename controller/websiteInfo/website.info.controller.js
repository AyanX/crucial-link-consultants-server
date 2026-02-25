const { desc } = require("drizzle-orm");
const { db, websiteInfoTable } = require("../dbDetails");
class webInfoController {
  static async getWebInfo(req, res) {
    try {
      const webInfo = await db
        .select()
        .from(websiteInfoTable)
        .orderBy(desc(websiteInfoTable.id))
        .limit(1);

      if (!webInfo[0]) {
        return res.status(404).json({});
      }
        const info = webInfo[0]

      const resData = {
        total_projects:info.total_projects,
        regions_served:info.regions_served,
        client_retention: info.client_retention_rate,
        data_points:info.data_points_analyzed,
        compliance:info.compliance_increase,
        experience:info.years_of_experience,
        ...info
      };

      res.status(200).json(resData);
    } catch (error) {
      console.error("Error fetching website info:", error);
      res.status(500).json({ error: "Failed to fetch website info" });
    }
  }

  static async addWebInfo(req, res) {
    try {
      const {
        total_projects,
        regions_served,
        client_retention,
        data_points,
        experience,
        compliance_increase,
        compliance_time,
      } = req.body.metrics;

       await db.insert(websiteInfoTable).values({
        total_projects,
        regions_served,
        compliance_time,
        client_retention_rate: client_retention,
        data_points_analyzed: data_points,
        years_of_experience: experience,
        compliance_increase: compliance_increase,
      });
      res.status(201).json({
        message: "Website info added successfully"
      });
    } catch (error) {
      console.error("Error adding website info:", error);
      res.status(500).json({ error: "Failed to add website info" });
    }
  }
}

module.exports = webInfoController;
