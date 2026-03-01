const { desc } = require("drizzle-orm");
const { db, websiteInfoTable } = require("../dbDetails");


function normalizeWebsiteInfo(input) {
  return {
    total_projects: input.total_projects || input.total_projects,
    regions_served: input.regions_served || input.regions_served,
    client_retention_rate: input.client_retention_rate || input.client_retention,
    data_points_analyzed: input.data_points_analyzed || input.data_points,
    compliance_increase: input.compliance_increase || input.compliance,
    years_of_experience: input.years_of_experience || input.experience,
    compliance_time: input.compliance_time || "1 month",
  };
}

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
      const normalizedData = normalizeWebsiteInfo(req.body.metrics);
      if(!normalizedData.total_projects || !normalizedData.regions_served || !normalizedData.client_retention_rate || !normalizedData.data_points_analyzed || !normalizedData.years_of_experience || !normalizedData.compliance_increase || !normalizedData.compliance_time){
        return res.status(400).json({ error: "All fields are required" });
      }

       await db.insert(websiteInfoTable).values({
        total_projects: normalizedData.total_projects,
        regions_served: normalizedData.regions_served.toString(), 
        compliance_time: normalizedData.compliance_time,
        client_retention_rate: normalizedData.client_retention_rate,
        data_points_analyzed: normalizedData.data_points_analyzed,
        years_of_experience: normalizedData.years_of_experience.toString(),
        compliance_increase: normalizedData.compliance_increase,
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
