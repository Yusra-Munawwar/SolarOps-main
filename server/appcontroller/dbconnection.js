const mysql = require('mysql2/promise');

async function dbconnection() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'yusra123',
            database: 'solarops',
        });
        console.log('Connected to MySQL database');
        return connection;
    } catch (error) {
        console.error('Error connecting to MySQL database:', error);
        throw error;
    }
}

async function fetchData(email) {
    const connection = await dbconnection();
    const [rows] = await connection.query('SELECT * FROM organizations WHERE email = ?', [email]);
    connection.end(); // Close the connection
    return rows;
}

async function insertData({ organizationName, email, password, location }) {
    const connection = await dbconnection();
    const [result] = await connection.query(
        'INSERT INTO organizations (organization_name, email, password, location) VALUES (?, ?, ?, ?)',
        [organizationName, email, password, location]
    );
    connection.end(); // Close the connection
    return result;
}

async function fetchDataByEmailAndOrganization(email, organizationName) {
    const connection = await dbconnection();
    const [rows] = await connection.execute('SELECT * FROM organizations WHERE email = ? AND organization_name = ?', [email, organizationName]);
    await connection.end();
    return rows;
  }

  async function fetchOrganizationidByEmail(email) {
    const connection = await dbconnection();
    try{
    const [rows] = await connection.execute('SELECT id AS organization_id FROM organizations WHERE email = ?', [email]);
    if (rows.length > 0) {
        return rows[0].organization_id;
    } else {
        throw new Error('No organization found for the given email.');
    }
} catch (error) {
    console.error('Error fetching organization ID:', error);
    throw error; // Rethrow the error after logging it
} finally {
    await connection.end();
}
}

async function insertLocation({ organization_id, location_name, latitude, longitude }) {
    const connection = await dbconnection();
    try {
        const [result] = await connection.query(
            'INSERT INTO locations (organization_id, location_name, latitude, longitude) VALUES (?, ?, ?, ?)', 
            [organization_id, location_name, latitude, longitude]
        );

        return result;
    } catch (error) {
        console.error('Error inserting location:', error);
        throw error; // Rethrow the error after logging it
    } finally {
       await connection.end(); // Ensure connection is closed
    }
}


async function fetchLocationsByOrganizationId(organization_id) {
    const connection = await dbconnection();
    try {
        const [rows] = await connection.query(
            "SELECT id, location_name, latitude, longitude FROM locations WHERE organization_id = ?",
            [organization_id]
        );
        return rows; // Return rows containing both id and location_name
    } catch (error) {
        console.error("Error fetching locations by organization ID:", error);
        throw error;
    } finally {
        await connection.end(); // Close the connection
    }
}


async function deleteLocationByName(location_name, organization_id) {
    const connection = await dbconnection();
    try {
        const [result] = await connection.query(
            "DELETE FROM locations WHERE location_name = ? AND organization_id = ?",
            [location_name, organization_id]
        );
        return result; // Return the result of the delete operation
    } catch (error) {
        console.error('Error deleting location:', error);
        throw error;
    } finally {
        await connection.end(); // Close the connection
    }
}

module.exports = {
    fetchData,
    insertData,
    fetchDataByEmailAndOrganization, insertLocation, fetchOrganizationidByEmail, fetchLocationsByOrganizationId, deleteLocationByName
};

