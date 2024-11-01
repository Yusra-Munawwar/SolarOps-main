import React, { useState, useRef , useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast"; 
import "./Visualizations.css";
import { AddLocation, DeleteLocation, GetUserLocations } from "@/helper/helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Visualizations = () => {
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [savedLocations, setSavedLocations] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [locationToDelete, setLocationToDelete] = useState(null);
  const textareaRef = useRef(null);

   // Fetch saved locations on component mount
   useEffect(() => {
    const fetchSavedLocations = async () => {
        try {
            const response = await GetUserLocations(); // Fetch locations from database
            setSavedLocations(response); // Assuming response is an array of locations
        } catch (error) {
            console.error("Error fetching saved locations:", error);
        }
    };

    fetchSavedLocations();
}, []); // Empty dependency array means this runs once on moun

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; 
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; 
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [location]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locations = await GetUserLocations();
        setSavedLocations(locations);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchLocations();
  }, []);

  const handleDeleteClick = (location_name) => {
    setLocationToDelete(location_name); 
    setIsModalOpen(true); 
  };

  const confirmDeleteLocation = async () => {
    try {
      await DeleteLocation(locationToDelete);
      setSavedLocations((prevLocations) =>
        prevLocations.filter((loc) => loc.location_name !== locationToDelete)
      );
    } catch (error) {
      console.error("Error deleting location:", error);
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setLocation(value);
    adjustTextareaHeight();

    if (value.length > 2) {
      try {
        const response = await axios.get(
          "https://api.opencagedata.com/geocode/v1/json",
          {
            params: {
              key: "e36ee096b00e40ee8877456620bf3d66", 
              q: value,
              limit: 5,
            },
          }
        );
        setSuggestions(response.data.results);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleAddLocation = async () => {
    if (!location) return;

    // Fetch coordinates from your API based on the selected location
    const coordinates = await fetchCoordinates(location);
    console.log(coordinates);
    
    if (coordinates) {
        const { lat, lng } = coordinates;

        try {
            // Add the location with coordinates
            await AddLocation(location, lat, lng);

            // Add the new location to the `savedLocations` list directly with lat and lng
            setSavedLocations(prevLocations => [
                ...prevLocations,
                {
                    id: new Date().getTime(), // Temporary unique ID if not returned from AddLocation
                    location_name: location,
                    latitude: lat,
                    longitude: lng,
                }
            ]);

            setLocation(""); // Clear the input after adding
        } catch (error) {
            console.error("Error adding location:", error);
            toast.error("Failed to add location. Please try again.");
        }
    } else {
        toast.error("Failed to fetch coordinates. Please try again.");
    }
};


/*  const handleAddLocation = async () => {
    if (!location) return;

    // Fetch coordinates from your API based on the selected location
    const coordinates = await fetchCoordinates(location); // Ensure fetchCoordinates is defined to get lat & lng
console.log(coordinates);
    if (coordinates) {
        const { lat, lng } = coordinates; // Destructure the lat and lng

        try {
            // Add the location with coordinates
            await AddLocation(location, lat, lng); // Ensure AddLocation can store lat & lng

            // After adding, fetch the updated list of locations
            const updatedLocations = await GetUserLocations();

            // Update your savedLocations state
            setSavedLocations(updatedLocations.map(loc => ({
                id: loc.id,
                location_name: loc.location_name,
                lat: loc.latitude, // Use the latitude from the database
                lng: loc.longitude, // Use the longitude from the database
            })));

            setLocation(""); // Clear the input after adding
        } catch (error) {
            console.error("Error adding location:", error);
            toast.error("Failed to add location. Please try again.");
        }
    } else {
        toast.error("Failed to fetch coordinates. Please try again.");
    }
};*/

  const handleSuggestionClick = async (suggestion) => {
    setLocation(suggestion.formatted);
    setSuggestions([]);
    adjustTextareaHeight();

    await fetchCoordinates(suggestion.formatted);
  };

  // Updated fetchCoordinates to return coordinates
  const fetchCoordinates = async (location_name) => {
    try {
      const response = await axios.get(
        "https://api.opencagedata.com/geocode/v1/json",
        {
          params: {
            key: "e36ee096b00e40ee8877456620bf3d66", 
            q: location_name,
            limit: 1,
          },
        }
      );

      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry;
        console.log("Latitude:", lat, "Longitude:", lng);
        return { lat, lng }; // Return coordinates
      } else {
        console.error("No results found for the location.");
        return null; // Return null if no results
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null; // Return null on error
    }
  };


  return (
    <div className="power-prediction">
        <div>
      <h2 className="font-bold my-2 text-2xl text-custom-7">Enter Your Location: </h2>
      <textarea
        ref={textareaRef}
        placeholder="Type your location"
        value={location}
        onChange={handleInputChange}
        className="autocomplete-input"
        rows={1}
        style={{
          resize: "none",
          overflow: "hidden",
          width: "100%",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontSize: "16px",
          lineHeight: "1.5",
        }}
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion.formatted}
            </li>
          ))}
        </ul>
      )}
<button className="generate-button mx-auto text-center flex justify-center items-center bg-amber-600 hover:bg-amber-800 text-white font-bold py-2 px-4 rounded mb-3.5 text-base" onClick={handleAddLocation}>
          Add Location
        </button>
</div>
<div className="power-prediction">
  <h3 className="text-neutral-800 font-bold my-3 text-3xl pt-px">Saved Locations:</h3>
  <ul className="locations-list">
    {savedLocations.map((loc) => (
      <li key={loc.id} className="location-item flex justify-between items-center py-2 px-4 mb-3 border rounded-md  shadow-sm">
        <span className="location-name text-lg font-medium"><Link 
                to={`/location/${loc.id}?lat=${loc.latitude}&lng=${loc.longitude}`} // Ensure these values are set correctly
            
            className=" hover:text-yellow-50"
           onClick={() => fetchCoordinates(loc.location_name)} // Fetch coordinates on link click
          >
            {loc.location_name}
          </Link>
</span>
        <button 
          className="delete-button flex justify-center items-center bg-amber-600 hover:bg-amber-800 text-white font-bold py-2 px-2 rounded-full"
          onClick={() => handleDeleteClick(loc.location_name)}
        >
          <FontAwesomeIcon icon={faTrash} className="text-lg" />
        </button>
      </li>
    ))}
  </ul>
</div>

{/* Modal */}
{isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p><strong>Are you sure you want to delete {locationToDelete}?</strong></p>
            <div className="flex">
            <button onClick={confirmDeleteLocation} className="flex-initial confirm-button generate-button mt-2.5 text-center flex justify-center items-center bg-amber-600 hover:bg-amber-800 text-white font-bold py-2 px-4 rounded">
              Yes
            </button>
            <button onClick={() => setIsModalOpen(false)} className="flex-initial generate-button mt-2.5 text-center flex justify-center items-center bg-amber-600 hover:bg-amber-800 text-white font-bold py-2 px-4 rounded">No</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};


export default Visualizations;