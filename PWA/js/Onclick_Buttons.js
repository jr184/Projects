//******************************************************************************************************
// This javascript contains the following: 
//
// -Device List Functions 
//  -> functions to open and close the Device List once the user clicks on the "Device Menu" button on 
//     the Leaflet interactive map.
// 
// -Side Bar Display Functions
//  -> These functions display and close the Nav Bar once the user clicks on the "x" and "Data Menu"
//     button
//
// -Graph Info Functions
//  -> These functions display and close the graph information once the user clicks on the "i" button
//
// -Graph Display Functions
//  -> These functions display and close the graph once the user clicks on the "Expand" button
//
// -Unit Switch Functions
//  -> These functions allow the user to switch between Metric and Imperial units    
//
// These functions are called in the index.html page once the user clicks on either of the respective
// buttons 
//
//******************************************************************************************************

/***************************************************/
/* Device List Functions
/***************************************************/

var MenuOpen=false;                                                                            // Global variable for the Device List to indicate when it is open and when it is closed

/*
* Opens the Device List Menu
*/
function OpenList() {
	var DeviceList = document.getElementById("DeviceList").style.left = "-190px";              // Opens the Device List to the left going to the positive negative direction 
}                                                                                              // ***Note***: Has to be half of the CloseList() left position style

/*
* Closes the Device List Menu
*/
function CloseList() {
	var DeviceList = document.getElementById("DeviceList").style.left = "-380px";              // Hides the Device List to the left 
}

/*
* Opens or closes the Device List Menu when the "Device Menu" button is clicked on.
*/
function ListButton_OnClick()          
{
	var DeviceList=document.getElementById("DeviceList");                                      // Calls on the div tag with id "DeviceList"
	var ListButton=document.getElementById("DeviceMenu");                                      // Calls on the div tag with id "DeviceMenu"

	if (MenuOpen)                                                                              // MenuOpen is false, proceed with closing device list options                   
	{
		MenuOpen=false;					                                                       // MenuOpen is mark as false
		ListButton.innerHTML = "&#x2630; Device Menu";                                         // Places inner HTML text in div tag id "DeviceMenu"
		CloseList();                                                                           // Calls on CloseList() function
	} 
	else                                                                                       // MenuOpen is true, proceed with opening device list options 
	{
		MenuOpen=true;					                                                       // MenuOpen is mark as true
		ListButton.innerHTML ="&#x2715; Close Menu";                                           // Places inner HTML text in div tag id "DeviceList"
		OpenList();                                                                            // Calls on OpenList() function
	}
};

/***************************************************/
/* Side Bar Display Functions
/***************************************************/
/*
* Closes the Nav Bar
*/
function CloseNav() {
	var NavList = document.getElementById("Results").style.right = "0px";                      // Opens the Device List to the left going to the positive negative direction 
}                                                                                              // ***Note***: Has to be half of the CloseList() left position style

/*
* Opens the Nav Bar
*/
function OpenNav() {
	var NavList = document.getElementById("Results").style.right = "-470px";                   // Hides the Device List to the left 
}

/*
* Opens or closes the Nav Bar Menu when the "X" button is clicked on.
*/
function NavBar_OnClick()          
{
	var NavBarList = document.getElementById("Results");                                       // Calls on the div tag with id "Results"
	var NavCloseButton = document.getElementById("NavClose");                                  // Calls on the div tag with id "NavClose"
	var DataMenu = document.getElementById("NavOpen");                                         // Calls on the div tag with id "NavOpen"
	
	if (MenuOpen)                                                                              // MenuOpen is false, proceed with closing device list options                   
	{
		MenuOpen=false;					                                                       // MenuOpen is mark as false
		NavCloseButton.innerHTML = "+";                                                        // Places inner HTML text in div tag id "NavOpen"
		DataMenu.style.visibility="hidden";                                                    // Hides the "Data Menu" button on the main web page 
		NavCloseButton.style.visibility="visible";		                                       // Displays Closing "x" button on the Nav Bar 
		CloseNav();                                                                            // Calls on CloseNav() function		
	} 
	else                                                                                       // MenuOpen is true, proceed with opening device list options 
	{
		MenuOpen=true;					                                                       // MenuOpen is mark as true
		DataMenu.style.visibility="visible";                                                   // Displays the "Data Menu" button on the main web page
		NavCloseButton.style.visibility="hidden";		                                       // Hides Closing "x" button on the Nav Bar 
		OpenNav();                                                                             // Calls on CloseList() function
	}
};
/***************************************************/
/* Graph Info Functions
/***************************************************/
/*
* Opens the Graph Info
*/
function OpenInfo() {
	var NavList = document.getElementById("GraphInfo").style.visibility = "visible";          // Function to display Graph Info 
}                                                                                        

/*
* Closes the Graph Info
*/
function CloseInfo() {
	var NavList = document.getElementById("GraphInfo").style.visibility = "hidden";          // Function to hide Graph Info 
}

/*
* Opens or closes the Nav Bar Menu when the "X" button is clicked on.
*/
function GraphInfo()          
{
	var Info = document.getElementById("GraphInfo");                                         // Calls on the div tag with id "GraphInfo"
	var InfoCloseButton = document.getElementById("InfoHelp");                               // Calls on the div tag with id "InfoHelp"
	
	if (MenuOpen)                                                                            // MenuOpen is false, proceed with closing device list options                   
	{
		MenuOpen=false;					                                                     // MenuOpen is mark as false
		InfoCloseButton.innerHTML = "x";                                                     // Places inner HTML text in div tag id "InfoHelp" and displays a closing "x" button on the Nav Bar
		Info.style.visibility="hidden";                                                      // Hides the Graph Information guide on the main web page 
		OpenInfo();                                                                          // Calls on OpenInfo() function		
	} 
	else                                                                                     // MenuOpen is true, proceed with opening device list options 
	{
		MenuOpen=true;					                                                     // MenuOpen is mark as true
		InfoCloseButton.innerHTML = "i";                                                     // Places inner HTML text in div tag id "InfoHelp" and displays an "i" button on the Nav Bar
		Info.style.visibility="visible";                                                     // Displays the Graph Information guide on the main web page
		CloseInfo();                                                                         // Calls on CloseList() function
	}
};

/***************************************************/
/* Graph Display Functions
/***************************************************/

/*
* Displays the graph to the front of the page
*/
function GraphDisplay() {
	document.getElementById("PopupGraphContainer").style.visibility = "visible";               // Displays the id div "PopupGraphContainer" from visibility of hidden to visible
	document.getElementById("PopupGraphContainer").style.transition = "0.2s";                  // Displays a transition of the graph appearing in front of the web page
	document.getElementById("PopupGraph").style.visibility = "visible";						   // Displays the id div "PopupGraph" from visibility of hidden to visible	
	document.getElementById("EnlargedGraph").style.visibility = "visible";			           // Displays the id div "EnlargedGraph" from visibility of hidden to visible
	MeasurementRequest("EnlargedGraph")                                                        // Passes in the MeasurementRequest() function located in PWA_Map.js with the input parameter of "EnlargedGraph"
}
/*
* Closes the graph of the front of the page
*/		
function GraphClose() {
	document.getElementById("PopupGraphContainer").style.visibility = "hidden";			       // Displays the id div "PopupGraphContainer" from visible to hidden
	document.getElementById("PopupGraph").style.visibility = "hidden";				           // Displays the id div "PopupGraph" from visible to hidden
	document.getElementById("EnlargedGraph").style.visibility = "hidden";		               // Displays the id div "EnlargedGraph" from visible to hidden
	document.getElementById("JSChart_EnlargedGraph").style.visibility = "hidden";			   // Displays the id div "JSChart_EnlargedGraph" from visible to hidden
}

/***************************************************/
/* Unit Switch Functions
/***************************************************/
var MetricSwitchFlag = true;
/*
* Function to Switch to Metric Units
*/
function MetricSwitch() {	
	MetricSwitchFlag = true;                                                                   // Flag to designate that the Metric Unit is on
	var TempIR = document.getElementById("TempIR");                                            // Grabs the div tag by id "TempIR"
	var FlowTotal = document.getElementById("FlowTotal");                                      // Grabs the div tag by id "FlowTotal"
	var FlowRate = document.getElementById("FlowRate");                                        // Grabs the div tag by id "FlowRate"
	var Conduct = document.getElementById("Conduct");                                          // Grabs the div tag by id "Conduct"
	var WaterTemp = document.getElementById("WaterTemp");	                                   // Grabs the div tag by id "WaterTemp"
	
	TempIR.innerHTML = "Temperature Infared (&#8451;)";                                        // Places inner HTML of Degrees Celsius 
	FlowTotal.innerHTML = "Flow Total (L)";                                                    // Places inner HTML of Liters
	FlowRate.innerHTML = "Flow Rate (L/min.)";                                                 // Places inner HTML of Liters per minute
	Conduct.innerHTML = "Conductivity (&#x3BC;S)";                                             // Places inner HTML of microsiemens
	WaterTemp.innerHTML = "Water Temperature (&#8451;)";                                       // Places inner HTML of Degrees Celsius 
	MeasurementRequest('graph');
}

/*
* Function to Switch to Imperial Units
*/
function ImperialSwitch() {	
	MetricSwitchFlag = false;                                                                  // Flag to designate that the Imperial Unit is on
	var TempIR = document.getElementById("TempIR");
	var FlowTotal = document.getElementById("FlowTotal");
	var FlowRate = document.getElementById("FlowRate");
	var Conduct = document.getElementById("Conduct");
	var WaterTemp = document.getElementById("WaterTemp");	
	
	TempIR.innerHTML = "Temperature Infared (&#8457;)";                                        // Places inner HTML of Degrees Fahrenheit
	FlowTotal.innerHTML = "Flow Total (ft<sup>3</sup>)";						               // Places inner HTML of cubic feet
	FlowRate.innerHTML = "Flow Rate (ft<sup>3</sup>/s)";						               // Places inner HTML of cubic feet per second
	Conduct.innerHTML = "Conductivity (&#x3BC;S)";							                   // Places inner HTML of microsiemens
	WaterTemp.innerHTML = "Water Temperature (&#8457;)";	                                   // Places inner HTML of Degrees Fahrenheit
	MeasurementRequest('graph');
}