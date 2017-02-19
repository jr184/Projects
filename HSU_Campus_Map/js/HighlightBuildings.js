//**********************************************************************************************************************************************************************************************************************// 
//This script provides a hover event to highlight the buildings when the user's mouse is over the buildings layer
//**********************************************************************************************************************************************************************************************************************// 

//Declares a dummy variable of Buildings
var Buildings;                   

//Highlight Style color for the hover event                 
function highlightFeature(e){
	var layer = e.target;                    //Targets the layer of interest 

	layer.setStyle(                          //This is where you set the highlight color when a user hovers over a building
		{
			color: '#B65300',                // Color of the stroke of the building
			weight: 2,                       // This is the weight of the stroke of the polygon (or building)
			opacity: 0.6,                    // Opacity of the stroke color 
			fillOpacity: 0.65,               // Opacity of the fill color 
			fillColor: '#E5F0D3',            // Fill color of the building 
			clickable: 'true'                // Allows the user to click on the building if needed 
		}
	);
}

// Resets the highlight style
function resetHighlight(e){
	Buildings.resetStyle(e.target);          // Resets the building styles when the user's mouse is not on it to its original style (buildingStyle)
}

// Provides the mouse on and mouse over styles, along with the popups for each building
function BuildingsOnEachFeature(feature, layer){
	layer.on({
		mouseover: highlightFeature,                   // Mouseover calls on the function highlightFeature up above
		mouseout: resetHighlight,                      // Mouseout calls on the function resetHighlight up above
	});
	
	// Provides POPUP Content from the buildings variable in json format, specifically extracting the name and HTML content from the property feature popupContent within 
	// the "buildings" json file in Buildings.js located in JSON file
	// Styles made are within the RemainingLeafletStyles.css file
	var PopUpInfo = "<div><h1 class='PopUpTitle'>"+feature.properties.name+"</h1></div><div><p style='font-size: 12px;'>"+feature.properties.popupContent+"</p></div>";
	
	//Binds POPUP content to the clicked building such as 
	layer.bindPopup(PopUpInfo);            
}

//The default style of each building with ZERO opacity
function buildingStyle(feature){
	return{
		color: '#FFF',                     // Color of the stroke of the building
		weight: 1,                         // Weight of the stroke of the building
		opacity: 0,                        // Opacity of the stroke of the building 
		fillOpacity: 0,                    // Fill opacity of the building
		fillColor: '#FFF'                  // Fill color of the building
	}
}

//Places the default style of the building and sets the highlight feature
Buildings = L.geoJson(                            // Leaflet geojson format call and structure
	buildings, {                                  // Calls on the variable "buildings" as its json file   
		style: buildingStyle,                     // Declares a style of the json building variable
		onEachFeature: BuildingsOnEachFeature     // Calls on the BuildingsOnEachFeature for the hover effect 
	}
).addTo(map);                                     // Leaflet's method of adding a layer the map, in this case the variable "map", located in Schoolmap.js 