The following information will provide where the functionality of the map is located through each Javascript within the main index.html code.

1.Leaflet.js
  - Provides the overall functionality of the map when any event handlers are activated by the user for dynamic use
    (i.e. switching basemap layers, zoom in, zoom out, etc...) 

2.jquery-3.1.1.min.js
  - Provides the functionality of displaying the telemeter device name, device coordinates, initial web-service call to 
    initial day charts for respective telemeter
  - The functionality is located in the PWA_Map.js

3.leaflet.zoomhome.min.js
  - Provides the functionality of the zoom in, out, and home buttons on the map
  - Functionality is called when the user clicks on the zoom controls located in this file, and PWA_Map.js

4.jscharts.js
  - Provides the functionaly of the charts displayed when a user clicks on a telemeter point, time selection, or radio 
    buttons for the measurement variables 
  - Charts appear on the navigation or side bar located within the main index.html
 
5.Leaflet_Esri.js
  - Leaflet Esri Javascript Library to switch basemaps on the map
  - Functionality is located in PWA_Map.js
  - Start of HTML tag is "<div id="basemaps-wrapper" class="leaflet-basemap-options">"
 
6.Telemeter.js
  - Telemeter JSON file located under the "js" folder used to display Telemeter Device points on map (FALSE LOCATIONS, ONLY FOR DISPLAY PURPOSES) 

7.PWA_Offices.js
  - PWA Office JSON file located under the "js" folder used to display office location points on map

8.Onclick_Button.js 
  - Functions to open and close the Device List once the user clicks on the "Device Menu" button on the Leaflet interactive map
  - Functions display and close the Nav Bar once the user clicks on the "x" and "Data Menu"
    button
  - Functions display and close the graph information once the user clicks on the "i" button
  - Functions display and close the graph once the user clicks on the "Expand" button 
  - Functions allow the user to switch between Metric and Imperial units   
 
9.PWA_Map.js
  - Provides the image icons for the PWA office locations, and telemeter devices
  - Provides popup functionality for PWA office locations, and displays inner html for telemeter devices in navigation or side bar
  - Establishes Global Functions for the Device Onclick function to use. The following functions used are as followed:

    -> Update Charting function
       --> Updates the chart information to be displayed in the side bar once the respective input variables are passed in

    -> Unit Conversion Graph
       --> Updates the chart information to be displayed in the side bar with the new converted Imperial units

    -> Obtain Radio Button Id function
       --> Obtains the Radio Button ids to get the values of the unput tags     

    -> Measurement and Time Request function
       --> Calls on a web service request to acquire data from the local server for the graph depending on what telemeter device 
           the user clicks on. Obtains a specified javascript file that contains the devices name, measurement type and time selection,
           i.e. pwaDemoUnit5_conductivity_day.js 

 

  - Establishes leaflet geojson layers for both the PWA locations & telemeter devices
  - Establishes base map layers for layer toggle swtich on map such as World Topo, Street, and World imagery
  - Establishes the map displayed on the main index.html page, with its respective attributes such as center, starting zoom level,
    maxzoom, minzoom, minzoom, maxzoom, zoomcontrols, and layers 
  - Provides the functionality of switching the charts of a telemeter by clicking on a radio button,
    located in the index.html web-page in the navigation or side bar
  - Provides the functionality of switching the charts of a telemeter by clicking on the time selection options, 
    located in the index.html web-page in the navigation or side bar
  - Establishes the Zoom Home Controls on the map
  - Provides Event Handler functionalities for the overall map such as:

    -> Device Zoom and PanTo
       --> Zooms to the desired telemeter device as well as panning to the center of the map to that device 

    -> Graph Display
       --> Displays the graphical information to the side bar regardless where the device is located on the map

    -> Update Device List
       --> Populates inner HTML to the device list for the user to click on a device to activate zoom/PanTo and graph data inner HTML in the side bar 
