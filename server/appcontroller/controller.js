const db = require('./dbconnection');
const bcrypt = require('bcrypt');


async function register(req, res) {
  try {
    const { organizationName, email, password, location } = req.body;

    const existingEmail = await db.fetchData(email);

    if (existingEmail.length !== 0) {
      return res.status(400).json({ success: false, error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.insertData({
      organizationName,
      email,
      password: hashedPassword,
      location,
    });

    if (user) {
      return res.status(200).json({ success: true, msg: "Successfully registered" });
    } else {
      return res.status(500).json({ success: false, error: "Failed to register user" });
    }
  } catch (error) {
    console.error("Error in registration:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
}

async function login(req, res) {
    try {
        const { email, password, organizationName } = req.body;

        const user = await db.fetchDataByEmailAndOrganization(email, organizationName);
        console.log("User fetched:", user);
        
        if (user.length === 0) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user[0].password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, error: "Invalid credentials" });
        }

        return res.status(200).json({
            success: true,
            msg: "Login successful",
            user: { email: user[0].email, organizationName: user[0].organizationName }
        });
    } catch (error) {
        console.error("Error during login:", error); 
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
}


async function addLocation(req, res) {
  try {
      const { location_name, latitude, longitude, email } = req.body;

      if (!location_name || !email || latitude === undefined || longitude === undefined) {
          return res.status(400).json({ success: false, error: "Location name, email, lat, and lng are required" });
      }

      const organization_id = await db.fetchOrganizationidByEmail(email);

      const result = await db.insertLocation({ organization_id, location_name, latitude: latitude, longitude: longitude });

      if (result.affectedRows > 0) {
          return res.status(200).json({ success: true, msg: "Location added successfully" });
      } else {
          return res.status(500).json({ success: false, error: "Failed to add location" });
      }
  } catch (error) {
      console.error("Error adding location:", error);
      return res.status(500).json({ success: false, error: error.message || "Internal server error" });
  }
}


async function getUserLocations(req, res) {
  try {
      const email = req.headers["user-email"];
      if (!email) {
          return res.status(400).json({ success: false, error: "Email is required" });
      }
      const organizationId = await db.fetchOrganizationidByEmail(email);
      if (!organizationId) {
          return res.status(404).json({ success: false, error: "Organization not found" });
      }
      const locations = await db.fetchLocationsByOrganizationId(organizationId);
      return res.status(200).json({ success: true, locations });
  } catch (error) {
      console.error("Error fetching locations:", error);
      return res.status(500).json({ success: false, error: "Internal server error" });
  }
}


async function deleteLocation(req, res) {
  try {
      const location_name = req.query.location_name; // Fetch from query parameters
      const email = req.headers["user-email"]; // Fetch from headers

      // Log the values for debugging
      console.log("Received email:", email);
      console.log("Received location name:", location_name);

      // Validate required fields
      if (!email || !location_name) {
          return res.status(400).json({ success: false, error: "Email and location name are required" });
      }

      

      // Fetch organization ID
      const organizationId = await db.fetchOrganizationidByEmail(email);
      if (!organizationId) {
          return res.status(404).json({ success: false, error: "Organization not found" });
      }

      // Delete location
      const result = await db.deleteLocationByName(location_name, organizationId);
      if (result.affectedRows > 0) {
          return res.status(200).json({ success: true, msg: "Location deleted successfully" });
      } else {
          return res.status(404).json({ success: false, error: "Location not found" });
      }
  } catch (error) {
      console.error("Error deleting location:", error);
      return res.status(500).json({ success: false, error: "Internal server error" });
  }
}

module.exports = {register, login, addLocation, getUserLocations, deleteLocation};

