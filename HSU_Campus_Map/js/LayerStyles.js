//**********************************************************************************************************************************************************************************************************************// 
// Specifies where to find the marker icons, polylines, and polygons and sets their style properties
// The order of the styles for each layer section are as follows:
// - Residence Hall Buildings
// - Parking
// - Dining
// - Accessibility 
// - Buses
// - Computer Labs
// - Recreation
// - Student Services
// - Emergency Services
//
// All these styles are called in SchoolMap.js within the "js" folder directory
//**********************************************************************************************************************************************************************************************************************// 

//RESIDENCE HALL BUILDING STYLES
var BuildingStyles = {
	color: '#25551B',       // The color of the stroke of the polygon (or building)
	weight: 2,              // The weight of the stroke
	opacity: 0.6,           // The opacity of the stroke 
	fillOpacity: 0.65,      // The opacity of the fill color
	fillColor: '#E5F0D3'    // The fill color of the building
}; 

//PARKING STYLES
/*General*/
var G1Icon = L.icon({
	iconUrl: 'images/G1.png',// Image is within the "images" folder, as well as the rest of the images below 
	iconSize:     [28, 20],  // size of the icon
	iconAnchor:   [13, 13],  // point of the icon which will correspond to marker's location
	popupAnchor:  [0, -20],  // point from which the popup should open relative to the iconAnchor
});

var G11Icon = L.icon({
	iconUrl: 'images/G11.png',
	iconSize:     [32, 20], 
	iconAnchor:   [13, 13], 
	popupAnchor:  [0, -20], 
});

var G12Icon = L.icon({
	iconUrl: 'images/G12.png',
	iconSize:     [37, 20], 
	iconAnchor:   [13, 13], 
	popupAnchor:  [0, -20], 
});

var G13Icon = L.icon({
	iconUrl: 'images/G13.png',
	iconSize:     [37, 20], 
	iconAnchor:   [13, 13], 
	popupAnchor:  [0, -20], 
});

var G14Icon = L.icon({
	iconUrl: 'images/G14.png',
	iconSize:     [37, 20], 
	iconAnchor:   [13, 13], 
	popupAnchor:  [0, -20], 
});

var G15Icon = L.icon({
	iconUrl: 'images/G15.png',
	iconSize:     [37, 20], 
	iconAnchor:   [13, 13], 
	popupAnchor:  [0, -20], 
});

var G16Icon = L.icon({
	iconUrl: 'images/G16.png',
	iconSize:     [37, 20],
	iconAnchor:   [15, 23], 
	popupAnchor:  [0, -20], 
});

/* Resident */
var R2Icon = L.icon({
	iconUrl: 'images/R2.png',
	iconSize:     [31, 22], 
	iconAnchor:   [13, 13], 
	popupAnchor:  [0, -20], 
});

var R3Icon = L.icon({
	iconUrl: 'images/R3.png',
	iconSize:     [32, 22], 
	iconAnchor:   [13, 13], 
	popupAnchor:  [0, -20], 
});

var R4Icon = L.icon({
	iconUrl: 'images/R4.png',
	iconSize:     [34, 22], 
	iconAnchor:   [23, 23], 
	popupAnchor:  [0, -20], 
});

var R8Icon = L.icon({
	iconUrl: 'images/R8.png',
	iconSize:     [31, 22], 
	iconAnchor:   [13, 13], 
	popupAnchor:  [0, -20], 
});

/*Faculty*/
var FS5Icon = L.icon({
	iconUrl: 'images/FS5.png',
	iconSize:     [33, 22], 
	iconAnchor:   [13, 13], 
	popupAnchor:  [0, -20], 
});

var FS6Icon = L.icon({
	iconUrl: 'images/FS6.png',
	iconSize:     [33, 22], 
	iconAnchor:   [16, 13], 
	popupAnchor:  [0, -20], 
});

var FS7Icon = L.icon({
	iconUrl: 'images/FS7.png',
	iconSize:     [35, 22], 
	iconAnchor:   [13, 13], 
	popupAnchor:  [0, -20], 
});

var FS9Icon = L.icon({
	iconUrl: 'images/FS9.png',
	iconSize:     [36, 22], 
	iconAnchor:   [13, 13], 
	popupAnchor:  [0, -20], 
});

var FS10Icon = L.icon({
	iconUrl: 'images/FS10.png',
	iconSize:     [42, 21], 
	iconAnchor:   [13, 13], 
	popupAnchor:  [0, -20], 
});



/* TAKING OUT EMPLOYEE ICON STYLE DISABLES LAYER TOGGLE SWITCH, DON'T REMOVE!! */
var employeeIcon = L.icon({
	iconUrl: 'images/StaffParking.png',
	iconSize:     [20, 20], 
	iconAnchor:   [13, 13], 
	popupAnchor:  [0, -20], 
});

var accessparkingIcon = L.icon({
	iconUrl: 'images/AccessParking.png',
	iconSize:     [18, 18], 
	iconAnchor:   [13, 13], 
	popupAnchor:  [0, -20], 
});

var DispenserIcon = L.icon({
	iconUrl: 'images/ParkingDespenser.png',
	iconSize:     [18, 18], 
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});  

//DINING STYLES
var diningIcon = L.icon({
	iconUrl: 'images/Dining_Map.png',
	iconSize:     [18, 18], // size of the icon
	iconAnchor:   [13, 13], // point of the icon which will correspond to marker's location
	popupAnchor:  [0, -20], // point from which the popup should open relative to the iconAnchor
});

var CoffeeIcon = L.icon({
	iconUrl: 'images/Coffee_Map.png',
	//iconUrl: 'images/Interdisciplinary_Labs.png',
	iconSize:     [18, 18],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
}); 

//ACCESSIBILITY STYLES
var elevatorsIcon = L.icon({
	iconUrl: 'images/elevators-01.png',
	iconSize:     [17, 17], // size of the icon
	iconAnchor:   [13, 13], // point of the icon which will correspond to marker's location
	popupAnchor:  [0, -20], // point from which the popup should open relative to the iconAnchor
});

var doorsIcon = L.icon({
	iconUrl: 'images/AutomaticDoor.png',
	iconSize:     [20, 20],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});

//BUSES
var busIcon = L.icon({
	iconUrl: 'images/BusStop_Map.png',
	iconSize:     [20, 20], // size of the icon
	iconAnchor:   [13, 13], // point of the icon which will correspond to marker's location
	popupAnchor:  [0, -20], // point from which the popup should open relative to the iconAnchor 
});

var GoldRouteStyle = {  //gold
	color: '#FED059',      // The color of the stroke of the polygon (or building)
	weight: 2,             // The weight of the stroke
	opacity: 0.8,          // The opacity of the stroke 
	smoothFactor: 2        // Smoothes out the edges of the lines 
};

var RedRouteStyle = {  //red
	color: '#FF0000',
	weight: 2,
	opacity: 0.8,
	smoothFactor: 2
};

var OrangeRouteStyle = {  //orange
	color: '#FF6100',
	weight: 2,
	opacity: 0.8,
	smoothFactor: 2
};

//COMPUTER LAB STYLES
var GenLabIcon = L.icon({
	iconUrl: 'images/General_Comp_Map.png',
	iconSize:     [20, 20], // size of the icon 
	iconAnchor:   [13, 13], // point of the icon which will correspond to marker's location
	popupAnchor:  [0, -20], // point from which the popup should open relative to the iconAnchor
});

var InterLabIcon = L.icon({
	iconUrl: 'images/Inter_Comp_Map.png',
	iconSize:     [20, 20],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});  

var KioskIcon = L.icon({
	iconUrl: 'images/Printing_Kiosk_Map.png',
	iconSize:     [20, 20],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
}); 

//RECREATION STYLES
var BasketballIcon = L.icon({
	iconUrl: 'images/New_BasketBall.png',
	iconSize:     [20, 20], // size of the icon
	iconAnchor:   [13, 13], // point of the icon which will correspond to marker's location
	popupAnchor:  [0, -20], // point from which the popup should open relative to the iconAnchor
});
var DiscGolfIcon = L.icon({
	iconUrl: 'images/DiscGolf.png',
	iconSize:     [20, 20],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});

var FitnessIcon = L.icon({
	iconUrl: 'images/New_Fitnesscenter.png',
	iconSize:     [20, 20],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});

var FootballIcon = L.icon({
	iconUrl: 'images/New_Football.png',
	iconSize:     [20, 20],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});

var SoccerIcon = L.icon({
	iconUrl: 'images/soccer.png',
	iconSize:     [20, 20],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});

var SoftballIcon = L.icon({
	iconUrl: 'images/Softball.png',
	iconSize:     [20, 20],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});

var SwimmingIcon = L.icon({
	iconUrl: 'images/New_Swimming.png',
	iconSize:     [20, 20],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});

var VolleyBallIcon = L.icon({
	iconUrl: 'images/New_volleyball.png',
	iconSize:     [20, 20],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});

//STUDENT SERVICES

//EMERGENCY SERVICES
var PoliceIcon = L.icon({
	iconUrl: 'images/Official_Police.png',
	iconSize:     [20, 20], // size of the icon  
	iconAnchor:   [13, 13], // point of the icon which will correspond to marker's location  
	popupAnchor:  [0, -20], // point from which the popup should open relative to the iconAnchor  
});

var EmergencyCallIcon = L.icon({
	iconUrl: 'images/EmergencyLights.png',
	iconSize:     [20, 20],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});

//*************Beginning of EAP Points*************
var EAPBlackIcon = L.icon({                             
	iconUrl: 'images/AppropriateBuilding_Black.png',
	iconSize:     [7, 7],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});

var AppropriateBlack = {
	color: '#FFFFFF', 
	weight: 2,
	opacity: 0.6,
	fillOpacity: 0.65,
	fillColor: '#E5F0D3'
};

var EAPCreekGreenIcon = L.icon({
	iconUrl: 'images/AppropriateBuilding_Creek_Green.png',
	iconSize:     [7, 7],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});

var AppropriateGreen = {
	color: '#00FF00', 
	weight: 2,
	opacity: 0.6,
	fillOpacity: 0.65,
	fillColor: '#E5F0D3'
};

var EAPCyanIcon = L.icon({
	iconUrl: 'images/AppropriateBuilding_Cyan.png',
	iconSize:     [7, 7],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});

var EAPFWHIcon = L.icon({
	iconUrl: 'images/AppropriateBuilding_FWH.png',
	iconSize:     [7, 7],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});

var EAPGreenGymsIcon = L.icon({
	iconUrl: 'images/AppropriateBuilding_GreenGyms.png',
	iconSize:     [7, 7],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
}); 

var EAPGreyIcon = L.icon({
	iconUrl: 'images/AppropriateBuilding_Grey.png',
	iconSize:     [7, 7],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
}); 

var EAPLightBlueIcon = L.icon({
	iconUrl: 'images/AppropriateBuilding_LightBlue.png',
	iconSize:     [7, 7],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
}); 

var EAPLightBrownIcon = L.icon({
	iconUrl: 'images/AppropriateBuilding_LightBrownMCC.png',
	iconSize:     [7, 7],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
}); 

var EAPLightGreenIcon = L.icon({
	iconUrl: 'images/AppropriateBuilding_LightGreen.png',
	iconSize:     [7, 7],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});

var EAPOrangeIcon = L.icon({
	iconUrl: 'images/AppropriateBuilding_Orange.png',
	iconSize:     [7, 7],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});

var EAPPlantYellowIcon = L.icon({
	iconUrl: 'images/AppropriateBuilding_PlantOps_Yellow.png',
	iconSize:     [7, 7],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});  

var EAPPurpCermIcon = L.icon({
	iconUrl: 'images/AppropriateBuilding_Purple_Ceramics.png',
	iconSize:     [7, 7],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});

var EAPRedIcon = L.icon({
	iconUrl: 'images/AppropriateBuilding_Red.png',
	iconSize:     [7, 7],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});

var EAPSBSIcon = L.icon({
	iconUrl: 'images/AppropriateBuilding_SBS.png',
	iconSize:     [7, 7],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});

var EAPSciencePurpIcon = L.icon({
	iconUrl: 'images/AppropriateBuilding_Science_Purple.png',
	iconSize:     [7, 7],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});

var EAPToddPurpIcon = L.icon({
	iconUrl: 'images/AppropriateBuilding_Toddler_Purple.png',
	iconSize:     [7, 7],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});

var EAPVanMatreIcon = L.icon({
	iconUrl: 'images/AppropriateBuilding_VanMatre_LightPurple.png',
	iconSize:     [7, 7],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});

var EAPVioletIcon = L.icon({
	iconUrl: 'images/AppropriateBuilding_Violet.png',
	iconSize:     [7, 7],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});

var EAPBSSYellowIcon = L.icon({
	iconUrl: 'images/AppropriateBuilding_Yellow_BSS.png',
	iconSize:     [7, 7],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});

//*************Beginning of Rally Points*************
var RallyBlackIcon = L.icon({                          
	iconUrl: 'images/Rally8.png',
	iconSize:     [14, 14],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});

var RallyCreekGreekIcon = L.icon({
	iconUrl: 'images/Rally11.png',
	iconSize:     [14, 14],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});

var RallyCyanIcon = L.icon({
	iconUrl: 'images/Rally1.png',
	iconSize:     [14, 14],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});

var RallyFWHIcon = L.icon({
	iconUrl: 'images/Rally3.png',
	iconSize:     [14, 14],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});

var RallyGreenGymsIcon = L.icon({
	iconUrl: 'images/Rally16.png',
	iconSize:     [14, 14],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});

var RallyGreyIcon = L.icon({
	iconUrl: 'images/Rally15.png',
	iconSize:     [14, 14],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});

var RallyLightBlueIcon = L.icon({
	iconUrl: 'images/Rally10.png',
	iconSize:     [14, 14],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});

var RallyLightBrownIcon = L.icon({
	iconUrl: 'images/Rally9.png',
	iconSize:     [14, 14],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});

var RallyLightGreenIcon = L.icon({
	iconUrl: 'images/Rally6.png',
	iconSize:     [14, 14],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});

var RallyOrangeIcon = L.icon({
	iconUrl: 'images/Rally2.png',
	iconSize:     [14, 14],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});

var RallyPlantYellowIcon = L.icon({
	iconUrl: 'images/Rally18.png',
	iconSize:     [14, 14],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});

var RallyPurpleCermIcon = L.icon({
	iconUrl: 'images/Rally12.png',
	iconSize:     [14, 14],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});

var RallyRedIcon = L.icon({
	iconUrl: 'images/Rally4.png',
	iconSize:     [14, 14],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});

var RallySBSIcon = L.icon({
	iconUrl: 'images/Rally13.png',
	iconSize:     [14, 14],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});

var RallySciencePurpleIcon = L.icon({
	iconUrl: 'images/Rally14.png',
	iconSize:     [14, 14],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});

var RallyToddlerIcon = L.icon({
	iconUrl: 'images/Rally19.png',
	iconSize:     [14, 14],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});

var RallyVanMatreIcon = L.icon({
	iconUrl: 'images/Rally7.png',
	iconSize:     [14, 14],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});

var RallyVioletIcon = L.icon({
	iconUrl: 'images/Rally5.png',
	iconSize:     [14, 14],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});

var RallyYellowBSSIcon = L.icon({
	iconUrl: 'images/Rally17.PNG',
	iconSize:     [14, 14],  
	iconAnchor:   [13, 13],  
	popupAnchor:  [0, -20],  
});

//MICELLANEOUS  ***Note: Could be used for later***
var venueIcon = L.icon({
	iconUrl: 'images/venue-01.png',
	iconSize:     [26, 26], // size of the icon
	iconAnchor:   [13, 13], // point of the icon which will correspond to marker's location
	popupAnchor:  [0, -20], // point from which the popup should open relative to the iconAnchor
});

var healthIcon = L.icon({
	iconUrl: 'images/healthservices-01.png',
	iconSize:     [26, 26], 
	iconAnchor:   [13, 13], 
	popupAnchor:  [0, -20], 
});

var postIcon = L.icon({
	iconUrl: 'images/post-office-01.png',
	iconSize:     [26, 26], 
	iconAnchor:   [13, 13], 
	popupAnchor:  [0, -20], 
}); 