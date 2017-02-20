//*****************************************************************************************************
// Leaflet Map functions for the map located in "index.html" (PWA_Telemeter_Map.html) The order of this Javascript structure is
// as followed:
// 
// -Global Variables
// -Icon Styles
// -OnEachFeature Function for all layers
// -Global Functions
// -Leaflet JSON Styles
// -BaseMap Layers
// -Map Attributes
// -Base Map & Layers
// -Zoom Home Controls
// -Device Zoom Functions
// 
//*****************************************************************************************************

/*******************************************************/	
/********************Global Variables*******************/	
/*******************************************************/
// X, Y, & Title labels for JSCharts
var TimeUnit = ["Hours Ago", "Days Ago", "Days Ago", "Months Ago", "Months Ago"];                                                                  // This is an array of x-axis labels for the JS Chart graph
var MeasurementList = ["Temperature Infared", "Flow Total", "Flow Rate", "Conductivity", "Water Temperature"];                                     // This is an array of graph titles that will be passed in depending on what the user clicks on for the radio buttons
var Measurements=["_tempir","_flowtotal","_flowrate","_conductivity","_tempwater"];                                                                // Array used in function 
var MetricUnitList = ['\u00B0C', 'L', 'L/min', '\u03BCS', '\u00B0C'];                                                                              // This is an array of Metric units for each measurement type
var ImperialUnitList = ['\u00B0F', 'ft\u00B3','ft\u00B3/s','\u03BCS','\u00B0F'];                                                                   // This is an array of Imperial units for each measurement type

// Label intervals for the x-axis of JSCharts
var DayInterval = ["","","3","","","6","","","9","","","12","","","15","","","18","","","21","","","24"];                                          /*1-24*/
var WeekInterval = ["","","","","","","7","","","","","","","14","","","","","","","21","","","","","","","28"];                                   /*1-7*/ 
var MonthInterval = ["","","","","5","","","","","10","","","","","15","","","","","20","","","","","25","","","","","30"];                        /*1-30*/                     
var SixMonthInterval = ["","","","","1","","","","","2","","","","","3","","","","","4","","","","","5","","","","","6"];                          /*1-6*/                                                                                                        
var YearInterval = ["","","1","","","2","","","3","","","4","","","5","","","6","","","7","","","8","","","9","","","10","","","11","","","12"];   /*1-12*/

// Unit Switch Variables
var MetricUnits = document.getElementById("MetricButton");
var ImperialUnits = document.getElementById("ImperialButton");

//***NOTE*** Search for unicodes for the measurement types,specifically C/C++/Java source code*

/*******************************************************/	
/**********************Icon Styles**********************/	
/*******************************************************/
var TelemeterIcon = L.icon({
	iconUrl: 'images/Telemeter_Device.png',          // Directory path of Telemeter icon image
	//shadowUrl: 'images/radient_circles.png',	
	iconSize: [25, 40],                              // Size of icon image in width(x), and height(y), [x,y] 
    //shadowSize: [40, 40],                            // Size of the shadow	
	iconAnchor: [16, 37],                            // Positions the icon from its origin point                          
	//shadowAnchor: [23, 16]
});

var PWAIcon = L.icon({
	iconUrl: 'images/PWA_New_Logo.png',              // Directory path of PWA Logo icon image
	iconSize: [37, 37],
	iconAnchor: [16, 37],
	popupAnchor: [4, -35]                            // Positions the popup of the PWA Office addresses in the x and y direction, [x,y] (NEW ICON PENDING!!!) 
});	

/*********************************************************************************/	
/**********************OnEachFeature Function for all layers**********************/	
/*********************************************************************************/	
var TelemeterHighlight = {
	color: '#1a53ff',
	fillColor: '#3366ff',
	fillOpacity: 0.5,
	radius: 300
}
/*
* PWA Location Popup
*/
// Displays the address of each PWA location by clicking on each point from the PWAOffices JSON file
// by accessing the name attribute 

function PWAonEachFeature(feature, layer) {
	var popupContent = "<h3>"+feature.properties.OfficeName+"</h3>"+feature.properties.PopupImage+"<p style='margin-bottom: 0px;'>"+feature.properties.Name+"</p><p style='margin: 0px;'>"+feature.properties.Phone+"</p>";       
	layer.bindPopup(popupContent);                                                                                // Binds a popup to the respective layer, i.e. PWAHomeLayer JSON layer 
}

/*
* Telemeter Inner HTML Content
*/
// Displays the name of the telemeter device, coordinates, and graph of the telemeter once the user click 
// on a specificed point

function TelemeteronEachFeature(feature, layer) {
	//var circle;
	layer.on('click', function (e) {                                                                               // Called in the Leaflet javascript, "e" is not very descriptive (we know!)
		var TeleName = document.getElementById("DeviceName").innerHTML = feature.properties.name;                  // Calls the name of device from the "Telemeters" JSON and displays on top of side bar
		var TeleCoor = feature.geometry.coordinates;                                                               // Calls the coordinates of device from the "Telemeters" JSON displays in the coordinate section of side bar
		var Longitude = TeleCoor[0];                                                                               // Obtains the Longitude Coordinate form the Telemeter JSON format
		var Latitude = TeleCoor[1];	                                                                               // Obtains the Latitude Coordinate form the Telemeter JSON format
		var Coordinates = document.getElementById("Coordinates").innerHTML = ""+Latitude+", "+Longitude+"";	       // Displays the Coordinates of the device in the side bar				
		var DisplayGraph = document.getElementById("graph").style.display = "block";                               // Calls the graph of device from the "Telemeters" JSON and displays in side bar	
		jQuery("#Results").fadeIn("fast");                                                                         // Displays the result in side bar quickly

		NameSelected = feature.properties.name;                                                                    // Calls the name of device from the "Telemeters" JSON, and places in "URL" string
		MeasurementRequest('graph')                                                                                // Calls the "MeasurementRequest" function 
		
	});
	// layer.off('click', functuion (e) {
	
	// }
}
var NameSelected = 0;                                                                                              // Global variable of the Device Name that is passed in the MeasurementRequest() function


/*********************************************************************************/	
/**********************************Global Functions*******************************/	
/*********************************************************************************/
/*
*Update Charting function
*/
// Updates the chart information to be displayed in the side bar once the respective input variables are passed in
// JS Charts Styles Source: http://www.jscharts.com/how-to-use-reference

function UpdateChart(TheArray, GraphTitle, MeasurementUnit, TimeLabel, id) {   // Input variables that are passed in is the array of data, the title of the measurement graph title, measurement unit, the time label, and the graph id 
	
	//Local variables for UpdateChart()
	var NewTimeSelected = document.getElementById("DropMenu").value;           // Gets the value of the Time Selection option
	var TimeInterval;                                                          // Declares the Time Interval variable
	
	if (id == "graph") {
		var myData = TheArray;                                  // Reassigns "TheArray" input variable as new variable
		var myChart = new JSChart(id, 'line');                  // Requires the 'id' of a div element, and what type of graph will be displayed
		myChart.setDataArray(myData);                           // Accesses the data from the array above					
		myChart.setTitle(GraphTitle);                           // Sets the title of the graph                    	
		myChart.setTitleColor('#FFFFFF');                       // Sets the title color
		myChart.setTitleFontSize(13);                           // Sets the font size for the title					
		myChart.setAxisNameX(TimeLabel);                        // Labels the title for the x axis
		myChart.setAxisNameY(MeasurementUnit,true);             // Names the Y-axis, set 'true' to have the label parallel to axis         		
		myChart.setAxisColor('#949494');                        // Sets the color for both the x and y axis
		myChart.setAxisValuesColor('#FFFFFF');                  // Sets the color of the values on the axis
		myChart.setLabelColorX('#FFFFFF');                      // Sets the color of X-axis label
		myChart.setAxisNameColor('#FFFFFF');                    // Sets the color for the axis name
		myChart.setLabelFontSizeX(5);                           // Sets the font size of the X-axis labels
		myChart.setAxisValuesFontSizeY(6);                      // Sets the font size of the Y-Axis value labels
		myChart.setAxisPaddingLeft(65);                         // Sets the padding of the chart from the left
		myChart.setAxisPaddingRight(50);                        // Sets the padding of the chart from the right
		myChart.setAxisPaddingTop(60);                          // Sets the padding of the title of the chart from the top
		myChart.setAxisPaddingBottom(40);                       // Sets the padding of x-axis title of the chart from the bottom
		myChart.setAxisValuesDecimals(1);                       // Sets the number of decimals for both the x and y axis
		myChart.setAxisValuesNumberX(5);                        // Sets the how many numbers will be displayed on the x-axis
		myChart.setShowXValues(false);                          // Sets the values of where the grid lines fall on the x-axis, usually want "false" to display setLabelX labels
		myChart.setGridColor('#404040');                        // Sets the grid color of the graph 
		myChart.setLineColor('#333333');                        // Sets the line color of the individual graph displayed
		myChart.setLineSpeed(99);	                            // Sets the line drawing speed, a value of 100 will cancel the animation
		myChart.setLineWidth(1);                                // Sets the line width of the graph
		myChart.setFlagColor('#f6f3af');                        // Sets the color of the flags (or circles)
		myChart.setFlagRadius(4);                               // Sets the radius of the flags (or circles)
		
		// *****************************************************************************************
		// This for loop is responsible for displaying stream data as the user hovers over the flags
		// *****************************************************************************************
		for (i = 0; i < TheArray.length; i++) {                 // For loop to iterate through the input array
			var SubArray = TheArray[i];                         // Grabs individual elements of the input array
			var SubArrayString = SubArray.toString();           // Converts the numeric values into strings 
			var SubArrayTokens = SubArrayString.split(",");     // Splits the subarray string into individual elements by a comma 
			var StreamValue = SubArrayTokens[1];                // Grabs the desired array element, specifically the stream measurement value
			myChart.setTooltip([i+1, StreamValue]);             // Places the stream measurement value once the user hovers over a flag
		}

		// *****************************************************************************************
		// This for loop is responsible for displaying the time interval on the x-axis 
		// *****************************************************************************************					
		for (i = 0; i < TheArray.length; i++) {                 // For loop to iterate through the input array
		
			if (NewTimeSelected == "_day") {
				TimeInterval = DayInterval[i];				    
			}																		 
			if (NewTimeSelected == "_week") {
				TimeInterval = WeekInterval[i];
			}
			if (NewTimeSelected == "_month") {
				TimeInterval = MonthInterval[i];
			}
			if (NewTimeSelected == "_sixmonth") {
				TimeInterval = SixMonthInterval[i];
			}
			if (NewTimeSelected == "_year") {
				TimeInterval = YearInterval[i];
			}			
			myChart.setLabelX([i+1, TimeInterval]);             // Labels the time interval for the x-axis with the number of entries in aa		
			
		}
		
		myChart.setSize(400, 229);	                            // Displays the width, and height, respectively for the graph in the side bar. Need to figure out how to make graph dynamic for mobile devices
		myChart.draw();	                                        // Draws the graph once all the above functions are passed through
	}
	if (id == "EnlargedGraph") {
		var myData = TheArray;                                  // Reassigns "TheArray" input variable as new variable
		var myChart = new JSChart(id, 'line');                  // Requires the 'id' of a div element, and what type of graph will be displayed
		myChart.setDataArray(myData);                           // Accesses the data from the array above					
		myChart.setTitle(GraphTitle);                           // Sets the title of the graph                    	
		myChart.setTitleColor('#000000');                       // Sets the title color
		myChart.setTitleFontSize(13);                           // Sets the font size for the title					
		myChart.setAxisNameX(TimeLabel);                        // Labels the title for the x axis
		myChart.setAxisNameY(MeasurementUnit,true);             // Names the Y-axis, set 'true' to have the label parallel to axis         		
		myChart.setAxisColor('#4d4d4d');                        // Sets the color for both the x and y axis
		myChart.setAxisValuesColor('#333333');                  // Sets the color of the values on the axis
		myChart.setLabelColorX('#333333');                      // Sets the color of X-axis label
		myChart.setAxisNameColor('#1a1a1a');                    // Sets the color for the axis name
		myChart.setAxisPaddingLeft(65);                         // Sets the padding of the chart from the left
		myChart.setAxisPaddingRight(50);                        // Sets the padding of the chart from the right
		myChart.setAxisPaddingTop(60);                          // Sets the padding of the title of the chart from the top
		myChart.setAxisPaddingBottom(50);                       // Sets the padding of x-axis title of the chart from the bottom
		myChart.setAxisValuesDecimals(1);                       // Sets the number of decimals for both the x and y axis
		myChart.setAxisValuesNumberX(5);                        // Sets the how many numbers will be displayed on the x-axis
		myChart.setShowXValues(false);                          // Sets the values of where the grid lines fall on the x-axis, usually want "false" to display setLabelX labels
		myChart.setGridColor('#595959');                        // Sets the grid color of the graph 
		myChart.setLineColor('#80b3ff');                        // Sets the line color of the individual graph displayed
		myChart.setLineSpeed(97);                               // Sets the line drawing speed, a value of 100 will cancel the animation
		myChart.setLineWidth(3);                                // Sets the line width of the graph
		
		// *****************************************************************************************
		// This for loop is responsible for displaying the time interval on the x-axis 
		// *****************************************************************************************		
		for (i = 0; i < TheArray.length; i++) {                 
		
			if (NewTimeSelected == "_day") {
				TimeInterval = DayInterval[i];				    
			}																		 
			if (NewTimeSelected == "_week") {
				TimeInterval = WeekInterval[i];
			}
			if (NewTimeSelected == "_month") {
				TimeInterval = MonthInterval[i];
			}
			if (NewTimeSelected == "_sixmonth") {
				TimeInterval = SixMonthInterval[i];
			}
			if (NewTimeSelected == "_year") {
				TimeInterval = YearInterval[i];
			}
			myChart.setLabelX([i+1, TimeInterval]);              // Iterate through the setLabelX
		}
		
		myChart.setSize(900, 515);	                             // Displays the width, and height, respectively for the graph in the side bar. Current size is (550, 315). Need to figure out how to make graph dynamic for mobile devices
		myChart.setBackgroundColor('#FFFFFF');                   // Produces a background color for the graph (original color: #f1f4df)
		myChart.draw();	                                         // Draws the graph once all the above functions are passed through	
	}
}

/*
*Unit Conversion Graph 
*/ 
// Updates the chart information to be displayed in the side bar with the new converted Imperial units 
function ConvertedChart(TheArray, RadioSelected, GraphTitle, MeasurementUnit, TimeLabel, id)
{
	var ConvertedArray = [];                                                                                           // Empty set array for converted values 
	for (i=0; i<TheArray.length; i++)                                                                                  // For loop to iterate through the web service array
	{
		var NewSubArray = [];                                                                                          // Empty set Sub-Array for each element in "ConvertedArray"
		var TheSubArray = TheArray[i];                                                                                 // Element of TheArray 
		for (j=0; j<TheSubArray.length; j++)                                                                           // Iterates through TheSubArray 
		{
			var MeasurementIndex = TheSubArray[0];                                                                     // First element of TheSubArray as the index of the sub-array
			var MeasurementValue = TheSubArray[1];                                                                     // Second element of TheSubArray as the measurement value of the sub-array
			var ConvertedValue;                                                                                        // Declares the "ConvertedValue" variable for each new Imperial conversion value
			if (RadioSelected == "_tempir")                                                                            // If conditions that determine if the radio button values are the same as the provided value
			{
				ConvertedValue = (MeasurementValue-32)*(5/9);                                                          // Converts to Celsius to Fahrenheit 
			}
			if (RadioSelected == "_flowtotal")
			{
				ConvertedValue = MeasurementValue*0.0353147;			                                               // Converts Liters to cubic feet 
			}
			if (RadioSelected == "_flowrate")
			{
				ConvertedValue = MeasurementValue*0.000588578;				                                           // Converts Liters per minute to cubic feet per second
			}
			if (RadioSelected == "_conductivity")
			{
				ConvertedValue = MeasurementValue*1;			                                                       // Converts to microsiemens 
			}
			if (RadioSelected == "_tempwater")
			{
				ConvertedValue = (MeasurementValue-32)*(5/9);	                                                       // Converts to Celsius to Fahrenheit 		
			}	
			
			NewSubArray = [MeasurementIndex,ConvertedValue];			                                               // Produces new sub-array of converted units
		}
		ConvertedArray.push(NewSubArray);                                                                              // Places new sub-array into "ConvertedArray" for UpdateChart function
	}
	UpdateChart(ConvertedArray, GraphTitle, MeasurementUnit, TimeLabel, id);                                           // Places "ConvertedArray" input for chart to be updated on graph with converted units. 
}

/*
*Obtain Radio Button Id function
*/ 
// Obtains the Radio Button ids to get the values of the unput tags 
function GetSelectedMeasurement()
{
	var SelectedIndex=-1;                                                                                             // Declares the index of selected radio button
	for (var i=0;i<Measurements.length;i++)                                                                           // Iterates through the number of elements of "Measurement" aary in Global variables
	{
		var GetRadioOptions = document.getElementById("Measurement"+Measurements[i]);                                 // Gets the id of the radio buttons
		if (GetRadioOptions.checked)                                                                                  // If the radio button is checked proceed
		{
			SelectedIndex=i;                                                                                          // Provides the index of the selected radio button
		}
	}
	return(SelectedIndex);                                                                                            // Returns the value of the SelectedIndex value
}

/*
*Measurement and Time Request function
*/ 
// Calls on a web service request to acquire data from the local server for the graph depending on what telemeter device the user clicks on.
// Obtains a specified javascript file that contains the devices name, measurement type and time selection  i.e. pwaDemoUnit5_conductivity_day.js  
function MeasurementRequest(id) {  
	
	var SelectedMeasurement=GetSelectedMeasurement();                                                                   // Calls the value of the radio button in index.html, and places in "URL" string                                                          
	var RadioSelected = Measurements[SelectedMeasurement];                                                              // Calls the value of the radio button in index.html, and places in "URL" string	
	var GetTimeDropMenu = document.getElementById("DropMenu");                                                          // Gets the element by id specifically "DropMenu" 
	var TimeSelected = GetTimeDropMenu.value;                                                                           // Calls the value of the time selection options in index.html, and places in "URL" string                                                          
	var URL = "https://github.com/jr184/Projects/tree/master/PWA/Measurement_Data/"+NameSelected+RadioSelected+TimeSelected+".js";  // URL that is used to call the request in local server
	//var URL = "http://users.humboldt.edu/jprodriguez/PWA/PWA_Web_Python/FileRepository/Arrays/"+NameSelected+RadioSelected+TimeSelected+".js";
	
	var GraphTitle;                                                                                                     // Declares the title of the graph
	var MeasurementUnit;                                                                                                // Declares the measurement unit on graph
	
	// For Loop to determine what Graph title and measurement unit is to be displayed on the graphs
	for (i = 0; i < MeasurementList.length; i++) {                                                                 
		if (MetricSwitchFlag == true)                                                                                   // If condition to set Metric Units on JS Chart Line Graph
		{
			if (RadioSelected == "_tempir")                                                                             // If conditions that determine if the radio button values are the same as the provided value
			{
				GraphTitle = MeasurementList[0];                                                                        // GraphTitle is reassigned a new string value if that "if" condition is met
				MeasurementUnit = MetricUnitList[0];                                                                    // MeasurementUnit is reassigned a new string value if that "if" condition is met
			}
			if (RadioSelected == "_flowtotal")
			{
				GraphTitle = MeasurementList[1];
				MeasurementUnit = MetricUnitList[1];			
			}
			if (RadioSelected == "_flowrate")
			{
				GraphTitle = MeasurementList[2];
				MeasurementUnit = MetricUnitList[2];			
			}
			if (RadioSelected == "_conductivity")
			{
				GraphTitle = MeasurementList[3];
				MeasurementUnit = MetricUnitList[3];			
			}
			if (RadioSelected == "_tempwater")
			{
				GraphTitle = MeasurementList[4];
				MeasurementUnit = MetricUnitList[4];			
			}	
		}
		
		 if (MetricSwitchFlag == false)                                                                                 // If condition to set Imperial Units on JS Chart Line Graph
		 {
			 if (RadioSelected == "_tempir")                                                                            // If conditions that determine if the radio button values are the same as the provided value
			 {
				 GraphTitle = MeasurementList[0];                                                                       // GraphTitle is reassigned a new string value if that "if" condition is met
				 MeasurementUnit = ImperialUnitList[0];                                                                 // MeasurementUnit is reassigned a new string value if that "if" condition is met
			 }
			 if (RadioSelected == "_flowtotal")
			 {
				 GraphTitle = MeasurementList[1];
				 MeasurementUnit = ImperialUnitList[1];			
			 }
			 if (RadioSelected == "_flowrate")
			 {
				 GraphTitle = MeasurementList[2];
				 MeasurementUnit = ImperialUnitList[2];			
			 }
			 if (RadioSelected == "_conductivity")
			 {
				 GraphTitle = MeasurementList[3];
				 MeasurementUnit = ImperialUnitList[3];			
			 }
			 if (RadioSelected == "_tempwater")
			 {
				 GraphTitle = MeasurementList[4];
				 MeasurementUnit = ImperialUnitList[4];			
			 }	
		 }
		
	} //Temporary solution until elegant one is found, we have to talk to Jim. If more variables are added, this breaks. We need to be able to populate the arrays dynamically 
		 
	// For loop to determine which time label is appropriate to be label on the x-axis 
	for (i = 0; i < TimeUnit.length; i++) {
		var NewTimeSelected = document.getElementById("DropMenu").value;
		if (NewTimeSelected == "_day")
		{
			var TimeLabel = TimeUnit[0];
		}
		if (NewTimeSelected == "_week")
		{
			var TimeLabel = TimeUnit[1];
		}
		if (NewTimeSelected == "_month")
		{
			var TimeLabel = TimeUnit[2];
		}
		if (NewTimeSelected == "_sixmonth")
		{
			var TimeLabel = TimeUnit[3];
		}
		if (NewTimeSelected == "_year")
		{
			var TimeLabel = TimeUnit[4];
		}
	} //Temporary solution until elegant one is found,
	
	GraphTitle;                                                                      // GraphTitle is an input variable that is passed into the UpdateChart function
	MeasurementUnit;                                                                 // MeasurementUnit is an input variable that is passed into the UpdateChart function
	TimeLabel;                                                                       // TimeLabel is an input variable that is passed into the UpdateChart function	
	
	var TheRequest=new XMLHttpRequest();                                             // Declares http request for desired data 
	TheRequest.open("GET",URL,true);                                                 // The URL is what we ordered
	TheRequest.onreadystatechange=function()                                         // An EventHandler that is called whenever the readyState attribute changes. The callback is called from the user interface thread.
	{
		if( this.readyState == 4)  				                                     // Continues on when the request is complete
		{
			if( this.status == 200)                                                  // Status indicates if server response is ok, or correct
			{
				var TheText=TheRequest.responseText;                                 // Property returns a DOMString that contains the response to the request as text, or null if the request was unsuccessful or has not yet been sent
				var TheObject=JSON.parse(TheText);                                   // Parses a JSON string, constructing the JavaScript value or object described by the string.		
				var TheArray=TheObject.array;                                        // Parameter will be a JSON Array							
				if (MetricSwitchFlag == true)                                        // If flag is true, proceed with Metric Graphs
				{				
					UpdateChart(TheArray, GraphTitle, MeasurementUnit, TimeLabel, id);   // Calls the Global UpdateChart function with its respective input parameters				
				}	
				if (MetricSwitchFlag == false)                                       // If flag is false, proceed with Imperial Graphs
				{
					ConvertedChart(TheArray, RadioSelected, GraphTitle, MeasurementUnit, TimeLabel, id); // Calls the Global ConvertedChart function with its respective input parameters
				}				
				// DOM Styles: http://www.w3schools.com/jsref/dom_obj_style.asp
				document.getElementById("graph").style.padding = "0px 0px 10px 0px"; // Provides the padding of the graph when displayed in the Side Bar
				document.getElementById("graph").style.borderStyle = "solid";        // Provides border style
				document.getElementById("graph").style.borderColor = "#FFFFFF";      // Provides border color
				document.getElementById("graph").style.borderWidth = "1px";          // Provides the width

			}
			else alert("HTTP error "+this.status+" "+this.TheText+" ("+this.URL+")");// Alerts the user that the server request was denied, or failed
		}
	}
	TheRequest.send();                                                               // Request is sent, desired data can be used	
}

/***************************************************************/
/**********************Leaflet JSON Styles**********************/
/***************************************************************/
/*
* PWA GEOJSON Layer
*/
var PWAHomeLayer = L.geoJSON(PWAOffices, {                  // Creates a geojson layer in Leaflet, which calls on the PWAOffices JSON variable

	pointToLayer: function (feature, latlng) {
		return L.marker(latlng, {icon: PWAIcon});           // User can only click on the feature, and has icon image
	}, 

	onEachFeature: PWAonEachFeature                         // Calls on PWAonEachFeature function up above to provide popup information, when the user clicks on a PWA Office icon
}); 	  

/*
* Telemeter GEOJSON Layer
*/
var TelemeterLayer = L.geoJSON(Telemeters, {                // Creates a geojson layer in Leaflet, which calls on the Telemeters JSON variable

	pointToLayer: function (feature, latlng) {
		return L.marker(latlng, {icon: TelemeterIcon});     // User can only click on the feature, and has icon image
	},

	onEachFeature: TelemeteronEachFeature                   // Calls on TelemeteronEachFeature function up above to display telemeter name, coordinates of said telemeter, and its respective charts
}); 

/**********************************************************/
/**********************Map Attributes**********************/
/**********************************************************/
var mymap = L.map('map', {                                          
	center: new L.LatLng(40.940457244000072, -124.09959548399996),  // Centers the view of the map 
	zoom: 13,                                                       // Sets default zoom level on map
	maxZoom: 19,                                                    // Sets the zoom level going in the map
	minZoom: 4,                                                     // Sets the zoom level going out of the map
	maxBounds: [[-90, -180],[90, 180]],                             // Sets the max bounds of the area of view, which is the south-west corner and north-east corner of the map
	zoomControl: false,                                             // Default zoom controls are not shown
	doubleClickZoom: false,                                         // Turns off the double click zoom feature
	layers: [TelemeterLayer,PWAHomeLayer],                          // Provides the telemeter and PWA office layers 
	//attributionControl: false,
});	

var layer = L.esri.basemapLayer('Topographic').addTo(mymap);        // Provides the default basemap

/*************************************************************/
/**********************Base Map & Layers**********************/
/*************************************************************/

//Base Map Switcher Source: https://esri.github.io/esri-leaflet/examples/switching-basemaps.html

var layerLabels;                                                    // Global Variable for Layers

/*
* Base Map Selection Switcher
*/
function setBasemap(basemap) {                                      // onChange Function to switch basemaps called in <select> with id="basemaps" 
	if (layer) {                                                 
		mymap.removeLayer(layer);                                   // if layer remove layer 
	}

	layer = L.esri.basemapLayer(basemap);                           // Declares the basemap variable in Esri basemapLayer inner function

	mymap.addLayer(layer);                                          // Adds the basemap to the leaflet platform

	if (layerLabels) { 
		mymap.removeLayer(layerLabels);                             // if layerLabels remove layer 
	}

	if (basemap === 'ShadedRelief'                                  // If any of the the <option> tag values are selected, add the basemap with the specified layer from the Esri inner function
	 || basemap === 'Imagery'
	 || basemap === 'Terrain'
	) {
		layerLabels = L.esri.basemapLayer(basemap + 'Labels');
		mymap.addLayer(layerLabels);
	}
}
 
function changeBasemap(basemaps){                                   // onChange Function to switch basemaps called in <select> tag with id="basemaps" 
	var basemap = basemaps.value;                                   // Finds the value of the <option> tags in main web page under the <select> tag with id="basemaps"
	setBasemap(basemap);                                            // Calls on the setBasemap() function up above for the basemap to be set
}
/**************************************************************/
/**********************Zoom Home Controls**********************/
/**************************************************************/
/*
* Zoom Control Buttons
*/
var zoomHome = L.Control.zoomHome();                                // Calls on Zoom controls on map
zoomHome.addTo(mymap);                                              // Adds zoom controls on map

/**************************************************************/
/*******************Event Handler Functions********************/
/**************************************************************/
/*
* Device Zoom and PanTo
*/	
function DeviceZoom(i) {	
	for (j=0; j < Telemeters.features.length; j++) {
		if (i == j) {
			var DeviceFeatures = Telemeters.features[j];                                                   // Obtains the Telemeter JSON features for each device
			var DeviceCoordinates = DeviceFeatures.geometry.coordinates;                                   // Obtains the Telemeter coordinates from the JSON format
			var Longitude = DeviceCoordinates[0];                                                          // Obtains the Longitude of the Telemeter
			var Latitude = DeviceCoordinates[1];	                                                       // Obtains the Latitude of the Telemeter
			var DevicePanTo = mymap.panTo(L.latLng(Latitude, Longitude), {animate: true, duration: 0.25}); // Pans to the respective device once the user clicks on the device name in the Device List	
			var ZoomCoordinates = [Latitude, Longitude];                                                   // Establishes coordinates for the ZoomTo (Leaflet setView function)
			var ZoomLevel = 15;                                                                            // Establishes the zoom level for the ZoomTo
			var ZoomTo = mymap.setView(ZoomCoordinates, ZoomLevel, {animation: true});                     // Zooms to the respective device with the given input parameters
			return false;	                                                                               // Returns false to make the function not automatically activate prior to clicking the device name
		}		
	}
}

/*
* Graph Display 
*/
function GraphIconClick (NewNameSelected,NewCoordinates){                            // Passes in input variables to be utilized for inner HTML and the MeasurementRequest() function
	NameSelected = NewNameSelected;                                                  // Passes the telemeter name input variable from the UpdateDeviceList() function for loop 
	document.getElementById("DeviceName").innerHTML = NameSelected;                  // Calls the name of device from the "Telemeters" JSON and displays on top of side bar
	document.getElementById("Coordinates").innerHTML = NewCoordinates;               // Calls the coordinates of device from the "Telemeters" JSON displays in the coordinate section of side bar	
	MeasurementRequest('graph');                                                     // Calls on the MeasurementRequest() function up above to display graph data on the side bar
}

/*
* Update Device List 
*/
function UpdateDeviceList() {
	var ListHTML = "<p class='SliderDescription'><i>Click on a device name to zoom to your desired telemeter device. Click on the graph icon to display"+ 
	"the device's respective information.</i></p><ul>";                              // Provides inner HTML for the description of the Device List 
	var DeviceList = document.getElementById("DeviceList");                          // Calls the div id "DeviceList" in the main web page

	for (i=0; i < Telemeters.features.length; i++) {                                 // Iterates through the Telemeters JSON 
		var TelemeterFeatures = Telemeters.features[i];                              // Obtains the Telemeter JSON features for each device
		var TelemeterNames = TelemeterFeatures.properties.name;                      // Obtains the Telemeter name from the JSON format
		var TeleCoordinates = TelemeterFeatures.geometry.coordinates;                // Obtains the Telemeter coordinates from the JSON format
		var Longitude = TeleCoordinates[0];                                          // Obtains the Longitude of the Telemeter
		var Latitude = TeleCoordinates[1];	                                         // Obtains the Latitude of the Telemeter
		var Coordinates = "\""+Latitude+", "+Longitude+"\"";                         // Creates a string of the long/lat coordinates to be displayed
		
		// Inner HTML structure to be displayed when function is onloaded in the HTML body tag
		ListHTML+="<li><div style='width: 150px; height: 20px;'><p id='"+TelemeterNames+"' onclick='DeviceZoom("+i+")'>"+
			TelemeterNames+"</p><img class='DeviceIcon' src='images/graph_icon.png' alt='Graph' onclick='GraphIconClick(\""+TelemeterNames+"\","+Coordinates+")'/></div></li>";
	}
	ListHTML+="</ul>"                                                                // Ends the HTML structure with an end unordered list tag
	DeviceList.innerHTML = ListHTML;                                                 // Displays the inner HTML inside the div id "DeviceList" in the main web page
}

/**********************************************************************************************************************************/
/******************************************************** Testing Material ********************************************************/
/**********************************************************************************************************************************/

// How to place your personal credits: https://github.com/gregallensworth/L.Control.Credits/blob/master/dist/leaflet-control-credits.css	
// How to Ping in Leaflet: https://github.com/Asymmetrik/leaflet-d3
	
