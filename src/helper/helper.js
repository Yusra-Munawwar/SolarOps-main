import Axios from "axios";
Axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_SERVER_DOMAIN;

export async function SignUp(credentials) {
  try {
    const { data: { msg } } = await Axios.post('http://localhost:3500/api/register', credentials);
    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject({ error });
  }
}

export async function loginUser(credentials) {
  try {
    const { data } = await Axios.post('http://localhost:3500/api/login', credentials);
    
    // Store user info in sessionStorage
    sessionStorage.setItem('user', JSON.stringify(data.user));
    
    return Promise.resolve({ msg: data.msg });
  } catch (error) {
    return Promise.reject({ error: error.response.data.error });
  }
}

// Function to fetch prediction data
export async function fetchPrediction(data) {
  try {
    const response = await Axios.post('https://fa31-39-51-55-239.ngrok-free.app/predict/gb', data);
    console.log(response.data);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject({ error: error.response.data.error });
  }
}

export async function AddLocation(location_name, latitude, longitude) {
  try {
    // Get email from sessionStorage
    const user = JSON.parse(sessionStorage.getItem("user"));
console.log(user);
    if (!user || !user.email) {
      throw new Error("User email is not found in session storage.");
    }
    console.log('no user');

    // Make the API call with email, location_name, lat, and lng
    const { data: { msg } } = await Axios.post("http://localhost:3500/api/visualizations", {
      email: user.email,
      location_name: location_name,
       latitude: latitude,
      longitude: longitude,// Send longitude
    });
    console.log("Adding location with:", {
      email: user.email,
      location_name,
      latitude,
      longitude,
  });
      return Promise.resolve(msg);
  } catch (error) {
    console.error("Error in AddLocation helper:", error);
    return Promise.reject({ error: error.message || "An error occurred" });
  }
}



export async function GetUserLocations() {
  try {
    const user = JSON.parse(sessionStorage.getItem("user")); // Retrieve user object from session storage
    if (!user || !user.email) {
      throw new Error("User data or email is missing in session storage.");
    }

    // Send GET request to the server with the user's email in the headers
    const { data } = await Axios.get("http://localhost:3500/api/visualizations", {
      headers: { "User-Email": user.email }, // Send email in headers for authorization
    });

    // Log the fetched locations for debugging (optional)
    console.log("Fetched locations:", data.locations);

    // Ensure that the response contains the expected structure
    if (!data.locations || !Array.isArray(data.locations)) {
      throw new Error("Invalid data format received from the server.");
    }

    return data.locations; // Return the array of location objects, each containing { id, location_name }
  } catch (error) {
    console.error("Error fetching user locations:", error.message || error);
    throw error; // Propagate the error for further handling
  }
}



export async function DeleteLocation(location_name) {
  try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (!user || !user.email) {
          console.log("User data or email is missing in session storage.");
          throw new Error("User data or email is missing in session storage.");
      }

      // Make sure to include the email in the headers and location_name in the URL
      const { data: { msg } } = await Axios.delete(`http://localhost:3500/api/visualizations?location_name=${encodeURIComponent(location_name)}`, {
          headers: {
              "user-email": user.email,
          }
      });

      return Promise.resolve(msg); // Return the success message
  } catch (error) {
      console.error("Error in deleteLocation helper:", error.message || error);
      return Promise.reject({ error: error.message || "An error occurred" });
  }
}




