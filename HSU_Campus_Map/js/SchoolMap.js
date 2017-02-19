//**********************************************************************************************************************************************************************************************************************// 
// This script provides the basemap layer such as the buildings, labels, roads, and vegetation.
// This is also where the each layer is called from 
//**********************************************************************************************************************************************************************************************************************// 

//**********************************************************************************************************************************************************************************************************************// 
// Mapbox access token that allows the map to look for and fetch correct map layers from the Mapbox server (Access through MapBox account)
	L.mapbox.accessToken = 'pk.eyJ1IjoiaHN1bWFwcyIsImEiOiJjaWg2a2NjOHMwMHNndWNrbDI0cTh3dWVoIn0.M_bq5YLaG7i4JwR9hmC7dA';

// Sets the coordinate bounds for the map / keeps the map user from panning away from the AOI
// Specifies the bounds for the map / map cannot exceed these bounds
	var southWest = L.latLng(40.8691, -124.0915),         // This coordinate sets the lower-left corner of the map
	northEast = L.latLng(40.8821, -124.0614),             // This coordinate sets the upper-right corner of the map
	bounds = L.latLngBounds(southWest, northEast);        // Sets the bounds using the lower-left corner (southWest) & upper-right corner (northEast)

// Adds and compiles base layer from mapbox server / base layers include 'background zoom 17, background zoom 18
var map = L.mapbox.map('map', 'hsumaps.0s5mlb1b,hsumaps.6ocbf1fn', {
	inertia: false,          // Disables rapid panning / allows for smoother panning
	zoomAnimation: true,     // Allows for smooth zoom animation
	fadeAnimation: false,    // Disables layer fade animation
	zoomControl: false,      // Removes the default zoom control
	maxBounds: bounds,       // Initiates max bounds
	maxZoom: 18,             // Sets maximum zoom levels       ***NOTE:*** These zoom levels are tailored for the set zoom extents of the basemap 
	minZoom: 17,             // Sets minimum zoom levels
});

// Zooms the map to that bounding box
	map.fitBounds(bounds);       

// Adds the new zoom control to map, and positions the control on the map, specifically top right
	new L.Control.Zoom({ position: 'topright',}).addTo(map);

// Specifies what needs to be enacted and adds the above layers to the map	
function addLayer(layer, name, zIndex) {
	layer
		.setZIndex(zIndex)                // Sets the zIndex of the base map layers i.e. the buildings, roads, labels, etc. 
		.addTo(map);                      // Adds the layers to the "map" variable
} 	
	
// Sets and adds Mapbox tile layers to the map using Leaflet/Mapbox API from the "addLayer" function above
// The number at the end of each line specifies the position of each layer in the layer stack
// Each specified code after .tileLayer is located in the Mapbox account
	addLayer(L.mapbox.tileLayer('hsumaps.40yf1rla'), 'zoom 17 labels', 4); // Adds the Zoom 17 level labels on map
	addLayer(L.mapbox.tileLayer('hsumaps.06g7laq2'), 'zoom 18 labels', 4); // Adds the Zoom 18 level labels on map
	addLayer(L.mapbox.tileLayer('hsumaps.bvrykt8n'), 'road labels', 4);    // Adds the road labels on map
	addLayer(L.mapbox.tileLayer('hsumaps.2ovqnn5d'), 'road shields', 4);   // Adds the road shields on map
	addLayer(L.mapbox.tileLayer('hsumaps.8h37cd47'), 'buildings', 3);      // Adds the illustrator buildings on map

//OnEachFeature for the variable "bus" towards the bottom of script
function BusStopFeature(feature, layer) {
		var popupContent = "<p>" + feature.properties.Location + "</p>";    // Calls on the location property of the Bus geojson format

		if (feature.properties && feature.properties.popupContent) {
			popupContent += feature.properties.popupContent;
		}

		layer.bindPopup(popupContent);                                      // Produces the Popup content of the bus layer
}
  
//OnEachFeature for the variable "bus" towards the bottom of script
function KioskFeature(feature, layer) {
		var popupContent = feature.properties.HTML;                         // Calls on the HTML property of the Bus geojson format

		if (feature.properties && feature.properties.popupContent) {
			popupContent += feature.properties.popupContent;
		}
 
		layer.bindPopup(popupContent);                                     // Produces the Popup content of the printing kiosk layer
}
  
//**********************************************************************************************************************************************************************************************************************//  
//PopUp Content and Dimension for L.markers 
//**********************************************************************************************************************************************************************************************************************//  

//Student Services HTML Content
var AcademicContent = "<div><h1 class='PopUpTitle'>Academic & Career Advising Center</h1></div><img src='HSU_SlideShow_Images/Founders_Hall/geog100212_149.jpg' class='PopupPicture' alt='AcademicCareer'/><br><div><p style='font-size: 12px;'>Welcome to the Academic and Career Advising Center. Our advisors help students connect their campus experience to future careers all while guiding them through timely degree completion. We actively engage campus partners in assisting students to achieve their academic and career goals. For more information, click<a class='ResourceLink' href='http://www2.humboldt.edu/acac/'> here.</a></p></div>"; 
var FoodContent = "<div><h1 class='PopUpTitle'>Campus Food Pantry</h1></div><img src='HSU_SlideShow_Images/Founders_Hall/geog100212_149.jpg' class='PopupPicture' alt='FoodPantry'/><div><p style='font-size: 12px;'>Oh SNAP! Campus Food Programs is a student-driven initiative. Our mission is to increase access to nutritious and culturally appropriate food for all Humboldt State University (HSU) students by engaging in campus and community partnerships and by raising awareness of food insecurity among our peers. For more information, click <a class='ResourceLink' href='http://hsuohsnap.org/'> here.</a></p></div>" 
var CDLContent = "<div><h1 class='PopUpTitle'>Child Development Laboratory</h1></div><img src='HSU_SlideShow_Images/Founders_Hall/geog100212_149.jpg' class='PopupPicture' alt='ChildDevelop'/><div><p style='font-size: 12px;'>The Child Development Laboratory (CDL) is a special environment designed to provide a model preschool for children, create a learning center for university students, support and educate parents of young children and serve as a research and instructional center for the University. We provide a rich variety of experiences and supports for children, inviting them to engage independently, with adults and with classmates. For more information, click <a class='ResourceLink' href='http://www2.humboldt.edu/cdblog/child-development-lab/'> here.</a></p></div>"
var FinancialContent = "<div><h1 class='PopUpTitle'>Financial Aid</h1></div><img src='HSU_SlideShow_Images/Founders_Hall/geog100212_149.jpg' class='PopupPicture' alt='FinancialAid'/><div><p style='font-size: 12px;'>The HSU Financial Aid Office is committed to assisting students seeking resources to finance their education by administering federal, state and institutional aid programs, and providing a fair, sensitive and confidential environment in which students can receive a variety of counseling and other resources to assist in making informed financial decisions. For more information, click <a class='ResourceLink' href='http://www2.humboldt.edu/finaid/'> here.</a></p></div>"
var HPLContent = "<div><h1 class='PopUpTitle'>Human Performance Lab</h1></div><img src='HSU_SlideShow_Images/Founders_Hall/geog100212_149.jpg' class='PopupPicture' alt='HumanPerformance'/><div><p style='font-size: 12px;'>The Humboldt State University Behavioral Performance Lab trains teacher education and coaching students to analyze the appropriate approach in physical education. Using special computer software to analyze skill, technique and physical activity, the lab assists in developing best practices for the teaching of physical and athletic fundamentals. The North Coast Concussion Program, which examines concussions resulting from athletic competition, will also be housed in the Behavioral Performance Lab. For more information, click <a class='ResourceLink' href='https://www2.humboldt.edu/kra/teaching-research-labs/human-performance-lab'> here.</a></p></div>"
var LanguageContent = "<div><h1 class='PopUpTitle'>Language Lab</h1></div><img src='HSU_SlideShow_Images/Founders_Hall/geog100212_149.jpg' class='PopupPicture' alt='Language Lab'/><div><p style='font-size: 12px;'>The Lab provides many resources to enhance the individual study of modern foreign languages, including digital audio listening capabilities, dedicated foreign language word processing and language software, Internet access and a networked laser printer. The facilities are open to all HSU students. For more information, click <a class='ResourceLink' href='http://www2.humboldt.edu/wlc/language-lab/'> here.</a></p></div>"
var LearningContent = "<div><h1 class='PopUpTitle'>Learning Center</h1></div><img src='HSU_SlideShow_Images/Founders_Hall/geog100212_149.jpg' class='PopupPicture' alt='Learning Center'/><div><p style='font-size: 12px;'>Welcome to Humboldt State University's Learning Center. The Learning Center offers a comprehensive program of services to support the academic needs of Humboldt students. These services are for every type of student: from first year to graduate student, from students struggling to stay in school to students trying for straight A's, and from local Humboldt County students to international students. For more information, click <a class='ResourceLink' href='http://www2.humboldt.edu/learning/home'> here.</a></p></div>"
var RecCenterContent = "<div><h1 class='PopUpTitle'>Recreation and Wellness Center</h1></div><img src='HSU_SlideShow_Images/Founders_Hall/geog100212_149.jpg' class='PopupPicture' alt='Recreation Wellness'/><div><p style='font-size: 12px;'>Stop by and let us help you to make recreation and wellness your destination! The Recreation and Wellness Center (RWC) encourages campus interaction and enhances the Humboldt experience through dynamic, inclusive recreation, fitness and wellness programs which promote healthy lifestyles, social development and leadership skills necessary for student success. Let the RWC become your one-stop-shop for all of your recreation and wellness needs! For more information, click <a class='ResourceLink' href='http://www2.humboldt.edu/centeractivities/department/recreation-wellness-center'> here.</a></p></div>"
var StudentDisContent = "<div><h1 class='PopUpTitle'>Student Disability Resource Center</h1></div><img src='HSU_SlideShow_Images/Founders_Hall/geog100212_149.jpg' class='PopupPicture' alt='Student Disability'/><div><p style='font-size: 12px;'>Welcome to the Student Disability Resource Center (SDRC) at Humboldt State University!  We welcome the opportunity to provide you with additional and more specific information in support of your academic success.  In the following pages, you will find information regarding services, policies, and other important information. For more information, click <a class='ResourceLink' href='http://www2.humboldt.edu/disability/welcome'> here.</a></p></div>"
var WritingContent = "<div><h1 class='PopUpTitle'>Writing Center</h1></div><img src='HSU_SlideShow_Images/Founders_Hall/geog100212_149.jpg' class='PopupPicture' alt='Writing Center'/><div><p style='font-size: 12px;'>For more information, click <a class='ResourceLink' href='http://www2.humboldt.edu/learning/writing-studio'> here.</a></p></div>"

//Parking HTML Content
var FacultyParkContent5 = "<div class='ParkingContent'><div class='ParkingInfo'><table border='0' style='margin: 0 auto; width: 296px;'><tr><td><img src='images/StaffParking.png'><p class='LotsNoSpace'>LOTS</p><p class='LotsNoSpace'>5</p></td><td><p class='ParkingType'>Faculty/Staff</p><p class='HeaderNoSpace'>Parking Permit Required</p><p class='HeaderNoSpace'>7AM-5PM, Monday-Friday</p></td></tr></table><div><hr class='ParkingHeadLine'/></div><p class='ParkTextCenter'>General Parking - Permit Required</p><p class='ParkTextCenter'>5PM-10PM, Monday-Thursday</p></div></div>"
var FacultyParkContent6 = "<div class='ParkingContent'><div class='ParkingInfo'><table border='0' style='margin: 0 auto; width: 296px;'><tr><td><img src='images/StaffParking.png'><p class='LotsNoSpace'>LOTS</p><p class='LotsNoSpace'>6</p></td><td><p class='ParkingType'>Faculty/Staff</p><p class='HeaderNoSpace'>Parking Permit Required</p><p class='HeaderNoSpace'>7AM-5PM, Monday-Friday</p></td></tr></table><div><hr class='ParkingHeadLine'/></div><p class='ParkTextCenter'>General Parking - Permit Required</p><p class='ParkTextCenter'>5PM-10PM, Monday-Thursday</p></div></div>"
var FacultyParkContent7 = "<div class='ParkingContent'><div class='ParkingInfo'><table border='0' style='margin: 0 auto; width: 296px;'><tr><td><img src='images/StaffParking.png'><p class='LotsNoSpace'>LOTS</p><p class='LotsNoSpace'>7</p></td><td><p class='ParkingType'>Faculty/Staff</p><p class='HeaderNoSpace'>Parking Permit Required</p><p class='HeaderNoSpace'>7AM-5PM, Monday-Friday</p></td></tr></table><div><hr class='ParkingHeadLine'/></div><p class='ParkTextCenter'>General Parking - Permit Required</p><p class='ParkTextCenter'>5PM-10PM, Monday-Thursday</p></div></div>"
var FacultyParkContent9 = "<div class='ParkingContent'><div class='ParkingInfo'><table border='0' style='margin: 0 auto; width: 296px;'><tr><td><img src='images/StaffParking.png'><p class='LotsNoSpace'>LOTS</p><p class='LotsNoSpace'>9</p></td><td><p class='ParkingType'>Faculty/Staff</p><p class='HeaderNoSpace'>Parking Permit Required</p><p class='HeaderNoSpace'>7AM-5PM, Monday-Friday</p></td></tr></table><div><hr class='ParkingHeadLine'/></div><p class='ParkTextCenter'>General Parking - Permit Required</p><p class='ParkTextCenter'>5PM-10PM, Monday-Thursday</p></div></div>"
var FacultyParkContent10 = "<div class='ParkingContent'><div class='ParkingInfo'><table border='0' style='margin: 0 auto; width: 296px;'><tr><td><img src='images/StaffParking.png'><p class='LotsNoSpace'>LOTS</p><p class='LotsNoSpace'>10</p></td><td><p class='ParkingType'>Faculty/Staff</p><p class='HeaderNoSpace'>Parking Permit Required</p><p class='HeaderNoSpace'>7AM-5PM, Monday-Friday</p></td></tr></table><div><hr class='ParkingHeadLine'/></div><p class='ParkTextCenter'>General Parking - Permit Required</p><p class='ParkTextCenter'>5PM-10PM, Monday-Thursday</p></div></div>"
var GeneralParkContent1 = "<div class='ParkingContent'><div class='ParkingInfo'><table border='0' style='margin: 0 auto; width: 296px;'><tr><td><img src='images/GeneralParking.png'><p class='LotsNoSpace'>LOTS</p><p class='LotsNoSpace'>1</p></td><td><p class='ParkingType'>General</p><p class='HeaderNoSpace'>Parking Permit Required</p><p class='HeaderNoSpace'>7AM-5PM, Monday-Friday</p></td></tr></table><div><hr class='ParkingHeadLine'/></div><p class='ParkTextCenter'>General Parking - Permit Required</p><p class='ParkTextCenter'>5PM-10PM, Monday-Thursday</p></div></div>"
var GeneralParkContent11 = "<div class='ParkingContent'><div class='ParkingInfo'><table border='0' style='margin: 0 auto; width: 296px;'><tr><td><img src='images/GeneralParking.png'><p class='LotsNoSpace'>LOTS</p><p class='LotsNoSpace'>11</p></td><td><p class='ParkingType'>General</p><p class='HeaderNoSpace'>Parking Permit Required</p><p class='HeaderNoSpace'>7AM-5PM, Monday-Friday</p></td></tr></table><div><hr class='ParkingHeadLine'/></div><p class='ParkTextCenter'>General Parking - Permit Required</p><p class='ParkTextCenter'>5PM-10PM, Monday-Thursday</p></div></div>"
var GeneralParkContent12 = "<div class='ParkingContent'><div class='ParkingInfo'><table border='0' style='margin: 0 auto; width: 296px;'><tr><td><img src='images/GeneralParking.png'><p class='LotsNoSpace'>LOTS</p><p class='LotsNoSpace'>12</p></td><td><p class='ParkingType'>General</p><p class='HeaderNoSpace'>Parking Permit Required</p><p class='HeaderNoSpace'>7AM-5PM, Monday-Friday</p></td></tr></table><div><hr class='ParkingHeadLine'/></div><p class='ParkTextCenter'>General Parking - Permit Required</p><p class='ParkTextCenter'>5PM-10PM, Monday-Thursday</p></div></div>"
var GeneralParkContent13 = "<div class='ParkingContent'><div class='ParkingInfo'><table border='0' style='margin: 0 auto; width: 296px;'><tr><td><img src='images/GeneralParking.png'><p class='LotsNoSpace'>LOTS</p><p class='LotsNoSpace'>13</p></td><td><p class='ParkingType'>General</p><p class='HeaderNoSpace'>Parking Permit Required</p><p class='HeaderNoSpace'>7AM-5PM, Monday-Friday</p></td></tr></table><div><hr class='ParkingHeadLine'/></div><p class='ParkTextCenter'>General Parking - Permit Required</p><p class='ParkTextCenter'>5PM-10PM, Monday-Thursday</p></div></div>"
var GeneralParkContent14 = "<div class='ParkingContent'><div class='ParkingInfo'><table border='0' style='margin: 0 auto; width: 296px;'><tr><td><img src='images/GeneralParking.png'><p class='LotsNoSpace'>LOTS</p><p class='LotsNoSpace'>14</p></td><td><p class='ParkingType'>General</p><p class='HeaderNoSpace'>Parking Permit Required</p><p class='HeaderNoSpace'>7AM-5PM, Monday-Friday</p></td></tr></table><div><hr class='ParkingHeadLine'/></div><p class='ParkTextCenter'>General Parking - Permit Required</p><p class='ParkTextCenter'>5PM-10PM, Monday-Thursday</p></div></div>"
var GeneralParkContent15 = "<div class='ParkingContent'><div class='ParkingInfo'><table border='0' style='margin: 0 auto; width: 296px;'><tr><td><img src='images/GeneralParking.png'><p class='LotsNoSpace'>LOTS</p><p class='LotsNoSpace'>15</p></td><td><p class='ParkingType'>General</p><p class='HeaderNoSpace'>Parking Permit Required</p><p class='HeaderNoSpace'>7AM-5PM, Monday-Friday</p></td></tr></table><div><hr class='ParkingHeadLine'/></div><p class='ParkTextCenter'>General Parking - Permit Required</p><p class='ParkTextCenter'>5PM-10PM, Monday-Thursday</p></div></div>"
var GeneralParkContent16 = "<div class='ParkingContent'><div class='ParkingInfo'><table border='0' style='margin: 0 auto; width: 296px;'><tr><td><img src='images/GeneralParking.png'><p class='LotsNoSpace'>LOTS</p><p class='LotsNoSpace'>16</p></td><td><p class='ParkingType'>General</p><p class='HeaderNoSpace'>Parking Permit Required</p><p class='HeaderNoSpace'>7AM-5PM, Monday-Friday</p></td></tr></table><div><hr class='ParkingHeadLine'/></div><p class='ParkTextCenter'>General Parking - Permit Required</p><p class='ParkTextCenter'>5PM-10PM, Monday-Thursday</p></div></div>"
var ResidentParkContent2 = "<div class='ParkingContent'><div class='ParkingInfo'><table border='0' style='margin: 0 auto; width: 296px;'><tr><td><img src='images/ResidentParking.png'><p class='LotsNoSpace'>LOTS</p><p class='LotsNoSpace'>2</p></td><td><p class='ParkingType'>Resident</p><p class='HeaderNoSpace'>Parking Permit Required</p><p class='HeaderNoSpace'>7AM-5PM, Monday-Friday</p></td></tr></table><div><hr class='ParkingHeadLine'/></div><p class='ParkTextCenter'>General Parking - Permit Required</p><p class='ParkTextCenter'>5PM-10PM, Monday-Thursday</p></div></div>"
var ResidentParkContent3 = "<div class='ParkingContent'><div class='ParkingInfo'><table border='0' style='margin: 0 auto; width: 296px;'><tr><td><img src='images/ResidentParking.png'><p class='LotsNoSpace'>LOTS</p><p class='LotsNoSpace'>3</p></td><td><p class='ParkingType'>Resident</p><p class='HeaderNoSpace'>Parking Permit Required</p><p class='HeaderNoSpace'>7AM-5PM, Monday-Friday</p></td></tr></table><div><hr class='ParkingHeadLine'/></div><p class='ParkTextCenter'>General Parking - Permit Required</p><p class='ParkTextCenter'>5PM-10PM, Monday-Thursday</p></div></div>"
var ResidentParkContent4 = "<div class='ParkingContent'><div class='ParkingInfo'><table border='0' style='margin: 0 auto; width: 296px;'><tr><td><img src='images/ResidentParking.png'><p class='LotsNoSpace'>LOTS</p><p class='LotsNoSpace'>4</p></td><td><p class='ParkingType'>Resident</p><p class='HeaderNoSpace'>Parking Permit Required</p><p class='HeaderNoSpace'>7AM-5PM, Monday-Friday</p></td></tr></table><div><hr class='ParkingHeadLine'/></div><p class='ParkTextCenter'>General Parking - Permit Required</p><p class='ParkTextCenter'>5PM-10PM, Monday-Thursday</p></div></div>"
var ResidentParkContent8 = "<div class='ParkingContent'><div class='ParkingInfo'><table border='0' style='margin: 0 auto; width: 296px;'><tr><td><img src='images/ResidentParking.png'><p class='LotsNoSpace'>LOTS</p><p class='LotsNoSpace'>8</p></td><td><p class='ParkingType'>Resident</p><p class='HeaderNoSpace'>Parking Permit Required</p><p class='HeaderNoSpace'>7AM-5PM, Monday-Friday</p></td></tr></table><div><hr class='ParkingHeadLine'/></div><p class='ParkTextCenter'>General Parking - Permit Required</p><p class='ParkTextCenter'>5PM-10PM, Monday-Thursday</p></div></div>"
  
//**********************************************************************************************************************************************************************************************************************//  
// Defines coordinates for icons, binds text, and defines variable names for each layer
	var
	// Residence Halls layer
	// Bus Stops geojson layer
	// Printing Kiosk geojson layer
	
	// Health services
	health1 = L.marker([40.877367,-124.079931], {icon: healthIcon}).bindPopup('Health Services'),
	
	// Dining and markets
	dining1 = L.marker([40.877564,-124.078490], {icon: diningIcon}).bindPopup('The Depot'),
	dining2 = L.marker([40.878908,-124.078905], {icon: diningIcon}).bindPopup('The J / J Grill'),
	dining3 = L.marker([40.876823,-124.080195], {icon: diningIcon}).bindPopup('Library Cafe'),
	dining4 = L.marker([40.873958,-124.079992], {icon: diningIcon}).bindPopup('College Creek Marketplace'),
	dining5 = L.marker([40.872844,-124.077121], {icon: diningIcon}).bindPopup('BSS Market');

	// Coffee 
	coffee1 = L.marker([40.876740866472538,-124.08027910773021], {icon: CoffeeIcon}).bindPopup('Library Cafe'),
	coffee2 = L.marker([40.877578436746589,-124.07854686011795], {icon: CoffeeIcon}).bindPopup('Muddy Waters'),
	coffee3 = L.marker([40.873835544584402,-124.08008399192772], {icon: CoffeeIcon}).bindPopup('College Creek Marketplace'),
	coffee4 = L.marker([40.872738613060726,-124.07718580842261], {icon: CoffeeIcon}).bindPopup('BSS Market'),
	
	// Post office
	post1 = L.marker([40.877564,-124.078303], {icon: postIcon}).bindPopup('Postal Services');
	
	// General parking
	general1 = L.marker([40.879457,-124.080464], {icon: G1Icon}).bindPopup(GeneralParkContent1),
	general2 = L.marker([40.874521,-124.080278], {icon: G11Icon}).bindPopup(GeneralParkContent11),
	general3 = L.marker([40.873160,-124.079219], {icon: G12Icon}).bindPopup(GeneralParkContent12),
	general4 = L.marker([40.871548,-124.079639], {icon: G16Icon}).bindPopup(GeneralParkContent16),
	general5 = L.marker([40.871707,-124.077512], {icon: G15Icon}).bindPopup(GeneralParkContent15);
	general6 = L.marker([40.872273,-124.078544], {icon: G14Icon}).bindPopup(GeneralParkContent14);
	general7 = L.marker([40.873313,-124.076513], {icon: G13Icon}).bindPopup(GeneralParkContent13);
	
	// Employee parking
	employee1 = L.marker([40.876582,-124.080922], {icon: FS6Icon}).bindPopup(FacultyParkContent6),
	employee2 = L.marker([40.877197,-124.076935], {icon: FS5Icon}).bindPopup(FacultyParkContent5),
	employee3 = L.marker([40.876148,-124.077136], {icon: FS7Icon}).bindPopup(FacultyParkContent7),
	employee4 = L.marker([40.873702,-124.079321], {icon: FS10Icon}).bindPopup(FacultyParkContent10),
	employee5 = L.marker([40.874970,-124.079168], {icon: FS9Icon}).bindPopup(FacultyParkContent9);
	
	// Resident parking
	resident1 = L.marker([40.879130,-124.079360], {icon: R2Icon}).bindPopup(ResidentParkContent2),
	resident2 = L.marker([40.878464,-124.080271], {icon: R4Icon}).bindPopup(ResidentParkContent4),
	resident3 = L.marker([40.875117,-124.080447], {icon: R8Icon}).bindPopup(ResidentParkContent8),
	resident4 = L.marker([40.878231,-124.075349], {icon: R3Icon}).bindPopup(ResidentParkContent3);
	
	//Parking Dispenser
	dispenser1 = L.marker([40.879379894765634, -124.08030507132419], {icon: DispenserIcon}),
	dispenser2 = L.marker([40.876655887806081, -124.08061059411726], {icon: DispenserIcon}),
	dispenser3 = L.marker([40.87505974536333, -124.079689742707941], {icon: DispenserIcon}),
	dispenser4 = L.marker([40.874285706698117, -124.080740869607268], {icon: DispenserIcon}),
	dispenser5 = L.marker([40.871799883785222, -124.077789743094655], {icon: DispenserIcon}),
	dispenser6 = L.marker([40.873498818943467, -124.076252611284829], {icon: DispenserIcon});
	
	// Automatic doors
	doors1 = L.marker([40.877405,-124.078536], {icon: doorsIcon}),
	doors2 = L.marker([40.877404,-124.078766], {icon: doorsIcon}),
	doors3 = L.marker([40.873959,-124.080215], {icon: doorsIcon}),
	doors4 = L.marker([40.873901,-124.080889], {icon: doorsIcon}),
	doors5 = L.marker([40.873962,-124.079801], {icon: doorsIcon}),
	doors6 = L.marker([40.873568,-124.079027], {icon: doorsIcon}),
	doors7 = L.marker([40.874007,-124.078797], {icon: doorsIcon}),
	doors8 = L.marker([40.87408,-124.079126], {icon: doorsIcon}),
	doors9 = L.marker([40.874347,-124.079469], {icon: doorsIcon}),
	doors10 = L.marker([40.874546,-124.078841], {icon: doorsIcon}),
	doors11 = L.marker([40.872844,-124.077316], {icon: doorsIcon}),
	doors12 = L.marker([40.872664,-124.076932], {icon: doorsIcon}),
	doors13 = L.marker([40.872875,-124.076779], {icon: doorsIcon}),
	doors14 = L.marker([40.873708,-124.077507], {icon: doorsIcon}),
	doors15 = L.marker([40.874827,-124.077497], {icon: doorsIcon}),
	doors16 = L.marker([40.874484,-124.076841], {icon: doorsIcon}),
	doors17 = L.marker([40.874915,-124.075384], {icon: doorsIcon}),
	doors18 = L.marker([40.874338,-124.074881], {icon: doorsIcon}),
	doors19 = L.marker([40.875581,-124.077297], {icon: doorsIcon}),
	doors20 = L.marker([40.875264,-124.076239], {icon: doorsIcon}),
	doors21 = L.marker([40.875433,-124.07529], {icon: doorsIcon}),
	doors22 = L.marker([40.876726,-124.076903], {icon: doorsIcon}),
	doors23 = L.marker([40.876704,-124.077272], {icon: doorsIcon}),
	doors24 = L.marker([40.875882,-124.078301], {icon: doorsIcon}),
	doors25 = L.marker([40.875903,-124.079265], {icon: doorsIcon}),
	doors26 = L.marker([40.876525,-124.078483], {icon: doorsIcon}),
	doors27 = L.marker([40.876947,-124.07895], {icon: doorsIcon}),
	doors28 = L.marker([40.877078,-124.078807], {icon: doorsIcon}),
	doors29 = L.marker([40.8771,-124.079533], {icon: doorsIcon}),
	doors30 = L.marker([40.876151,-124.080153], {icon: doorsIcon}),
	doors31 = L.marker([40.876583,-124.079993], {icon: doorsIcon}),
	doors32 = L.marker([40.877521,-124.079681], {icon: doorsIcon}),
	doors33 = L.marker([40.877915,-124.078535], {icon: doorsIcon}),
	doors34 = L.marker([40.878765,-124.078975], {icon: doorsIcon}),
	doors35 = L.marker([40.879059,-124.078755], {icon: doorsIcon}),
	doors36 = L.marker([40.878827,-124.078393], {icon: doorsIcon});
	
	// Accessible parking
	accessparking1 = L.marker([40.874543,-124.079667], {icon: accessparkingIcon}),
	accessparking2 = L.marker([40.873847,-124.079237], {icon: accessparkingIcon}),
	accessparking3 = L.marker([40.87332,-124.079099], {icon: accessparkingIcon}),
	accessparking4 = L.marker([40.871534,-124.079838], {icon: accessparkingIcon}),
	accessparking5 = L.marker([40.871088,-124.07993], {icon: accessparkingIcon}),
	accessparking6 = L.marker([40.872262,-124.079089], {icon: accessparkingIcon}),
	accessparking7 = L.marker([40.872033,-124.078246], {icon: accessparkingIcon}),
	accessparking8 = L.marker([40.873054,-124.077971], {icon: accessparkingIcon}),
	accessparking9 = L.marker([40.873516,-124.0777], {icon: accessparkingIcon}),
	accessparking10 = L.marker([40.87339,-124.077446], {icon: accessparkingIcon}),
	accessparking11 = L.marker([40.875513,-124.077876], {icon: accessparkingIcon}),
	accessparking12 = L.marker([40.875303,-124.077744], {icon: accessparkingIcon}),
	accessparking13 = L.marker([40.875022,-124.077963], {icon: accessparkingIcon}),
	accessparking14 = L.marker([40.875686,-124.077732], {icon: accessparkingIcon}),
	accessparking15 = L.marker([40.874943,-124.076224], {icon: accessparkingIcon}),
	accessparking16 = L.marker([40.874874,-124.075807], {icon: accessparkingIcon}),
	accessparking17 = L.marker([40.874299,-124.076908], {icon: accessparkingIcon}),
	accessparking18 = L.marker([40.873361,-124.074618], {icon: accessparkingIcon}),
	accessparking19 = L.marker([40.874007,-124.07468], {icon: accessparkingIcon}),
	accessparking20 = L.marker([40.876672,-124.076944], {icon: accessparkingIcon}),
	accessparking21 = L.marker([40.876283,-124.077229], {icon: accessparkingIcon}),
	accessparking22 = L.marker([40.875833,-124.07817], {icon: accessparkingIcon}),
	accessparking23 = L.marker([40.874887,-124.07989], {icon: accessparkingIcon}),
	accessparking24 = L.marker([40.875686,-124.079425], {icon: accessparkingIcon}),
	accessparking25 = L.marker([40.875987,-124.080091], {icon: accessparkingIcon}),
	accessparking26 = L.marker([40.875124,-124.081135], {icon: accessparkingIcon}),
	accessparking27 = L.marker([40.87694,-124.080711], {icon: accessparkingIcon}),
	accessparking28 = L.marker([40.877699,-124.080213], {icon: accessparkingIcon}),
	accessparking29 = L.marker([40.877322,-124.080313], {icon: accessparkingIcon}),
	accessparking30 = L.marker([40.877828,-124.079105], {icon: accessparkingIcon}),
	accessparking31 = L.marker([40.877884,-124.080105], {icon: accessparkingIcon}),
	accessparking32 = L.marker([40.878689,-124.080252], {icon: accessparkingIcon}),
	accessparking33 = L.marker([40.87907,-124.078898], {icon: accessparkingIcon}),
	accessparking34 = L.marker([40.878883,-124.079107], {icon: accessparkingIcon}),
	accessparking35 = L.marker([40.87837,-124.077353], {icon: accessparkingIcon}),
	accessparking36 = L.marker([40.87797,-124.074491], {icon: accessparkingIcon}),
	accessparking37 = L.marker([40.877932,-124.07491], {icon: accessparkingIcon}),
	accessparking38 = L.marker([40.878228,-124.075544], {icon: accessparkingIcon});
	
	// Elevators
	elevators1 = L.marker([40.877698,-124.079931], {icon: elevatorsIcon}),
	elevators2 = L.marker([40.876017,-124.078455], {icon: elevatorsIcon}),
	elevators3 = L.marker([40.873041,-124.07684], {icon: elevatorsIcon}),
	elevators4 = L.marker([40.87299,-124.078196], {icon: elevatorsIcon}),
	elevators5 = L.marker([40.875058,-124.077348], {icon: elevatorsIcon}),
	elevators6 = L.marker([40.874667,-124.077794], {icon: elevatorsIcon}),
	elevators7 = L.marker([40.873488,-124.077513], {icon: elevatorsIcon}),
	elevators8 = L.marker([40.873444,-124.077904], {icon: elevatorsIcon}),
	elevators9 = L.marker([40.873584,-124.078876], {icon: elevatorsIcon}),
	elevators10 = L.marker([40.873738,-124.081024], {icon: elevatorsIcon}),
	elevators11 = L.marker([40.873738,-124.080566], {icon: elevatorsIcon}),
	elevators12 = L.marker([40.873738,-124.08034], {icon: elevatorsIcon}),
	elevators13 = L.marker([40.873596,-124.080172], {icon: elevatorsIcon}),
	elevators14 = L.marker([40.873596,-124.079949], {icon: elevatorsIcon}),
	elevators15 = L.marker([40.874727,-124.079128], {icon: elevatorsIcon}),
	elevators16 = L.marker([40.875382,-124.079445], {icon: elevatorsIcon}),
	elevators17 = L.marker([40.875935,-124.079135], {icon: elevatorsIcon}),
	elevators18 = L.marker([40.87655,-124.0781], {icon: elevatorsIcon}),
	elevators19 = L.marker([40.875343,-124.077233], {icon: elevatorsIcon}),
	elevators20 = L.marker([40.875015,-124.075021], {icon: elevatorsIcon}),
	elevators21 = L.marker([40.875477,-124.076239], {icon: elevatorsIcon}),
	elevators22 = L.marker([40.876842,-124.07715], {icon: elevatorsIcon}),
	elevators23 = L.marker([40.876497,-124.080236], {icon: elevatorsIcon}),
	elevators24 = L.marker([40.876948,-124.079445], {icon: elevatorsIcon}),
	elevators25 = L.marker([40.8775,-124.078545], {icon: elevatorsIcon}),
	elevators26 = L.marker([40.87785,-124.079446], {icon: elevatorsIcon}),
	elevators27 = L.marker([40.878655,-124.079065], {icon: elevatorsIcon}),
	elevators28 = L.marker([40.879019,-124.078609], {icon: elevatorsIcon});

	// Basketball
	basketball1 = L.marker([40.878256,-124.077320], {icon: BasketballIcon}),
	basketball2 = L.marker([40.875151,-124.075821], {icon: BasketballIcon}),
	basketball3 = L.marker([40.874806,-124.074774], {icon: BasketballIcon}),
	basketball4 = L.marker([40.878645,-124.080052], {icon: BasketballIcon});
	
	// Discgolf
	discgolf1 = L.marker([40.873319796411351,-124.07310384306729], {icon: DiscGolfIcon}),
	discgolf2 = L.marker([40.875276903088661,-124.07419839512998], {icon: DiscGolfIcon});
	
	// Fitness
	fitness1 = L.marker([40.875649994944702,-124.07497634927046], {icon: FitnessIcon}),
	fitness2 = L.marker([40.875652850297918,-124.07630551618828], {icon: FitnessIcon});
	
	// Volleyball
	volley1 = L.marker([40.878257884207109,-124.07912850872569], {icon: VolleyBallIcon}),
	volley2 = L.marker([40.87484097820272,-124.07461943011954], {icon: VolleyBallIcon});
	
	// Emergency Action Plan
	EAPBlack = L.marker([40.87552142860747,-124.081310479378601], {icon: EAPBlackIcon});
	
		cyan1 = L.marker([40.879269555583932,-124.077963291581668], {icon: EAPCyanIcon}),
		cyan2 = L.marker([40.878893600745016,-124.078429665938813], {icon: EAPCyanIcon}),
		cyan3 = L.marker([40.8782749408835,-124.078524844379061], {icon: EAPCyanIcon}),
		cyan4 = L.marker([40.87803699478291,-124.079386209263149], {icon: EAPCyanIcon}),
		cyan5 = L.marker([40.878522404828097,-124.079448075249303], {icon: EAPCyanIcon})
	EAPCyan = L.layerGroup([cyan1,cyan2,cyan3,cyan4,cyan5]);
	
	EAPFWH = L.marker([40.877639148902695, -124.08086314070944], {icon: EAPFWHIcon});
	
		green1 = L.marker([40.875673714111919, -124.076246986358129], {icon: EAPGreenGymsIcon}),
		green2 = L.marker([40.87540245555725, -124.075290443033765], {icon: EAPGreenGymsIcon}),
		green3 = L.marker([40.87516450945666 , -124.075818683377065], {icon: EAPGreenGymsIcon}),
		green4 = L.marker([40.875040777484351, -124.075309478721806], {icon: EAPGreenGymsIcon}),
	EAPGreen = L.layerGroup([green1,green2,green3,green4]);
	
		CreekGreen1 = L.marker([40.873874841591423,-124.081162952796248], {icon: EAPCreekGreenIcon}),
		CreekGreen2 = L.marker([40.873874841591423,-124.080549051856735], {icon: EAPCreekGreenIcon}),
		CreekGreen3 = L.marker([40.873912912967512,-124.079763829724797], {icon: EAPCreekGreenIcon}),
		CreekGreen4 = L.marker([40.873484609986455,-124.079916115229167], {icon: EAPCreekGreenIcon}),
		CreekGreen5 = L.marker([40.873037271317351,-124.079906597385147], {icon: EAPCreekGreenIcon}),
	EAPCreekGreen = L.layerGroup([CreekGreen1,CreekGreen2,CreekGreen3,CreekGreen4,CreekGreen5]),
	
		grey1 = L.marker([40.87362737764682,-124.078935777294745], {icon: EAPGreyIcon}),
		grey2 = L.marker([40.873884359435451,-124.079397392729888], {icon: EAPGreyIcon});
	EAPGrey = L.layerGroup([grey1,grey2]),
	
		lightblue1 = L.marker([40.875588053515699,-124.078707349038169], {icon: EAPLightBlueIcon}),
		lightblue2 = L.marker([40.875597571359719,-124.078436090483493], {icon: EAPLightBlueIcon}),
		lightblue3 = L.marker([40.875273964662924,-124.07843133156149], {icon: EAPLightBlueIcon});
	EAPLightBlue = L.layerGroup([lightblue1,lightblue2,lightblue3]),
	
		lightbrown1 = L.marker([40.875864070992378,-124.079763829724797], {icon: EAPLightBrownIcon}),
		lightbrown2 = L.marker([40.875897383446457,-124.08023496300396], {icon: EAPLightBrownIcon}),
		lightbrown3 = L.marker([40.875897383446457,-124.08052049832466], {icon: EAPLightBrownIcon}),
		lightbrown4 = L.marker([40.875716544410011,-124.079768588646814], {icon: EAPLightBrownIcon}),
		lightbrown5 = L.marker([40.875711785488001,-124.08000177582538], {icon: EAPLightBrownIcon}),
		lightbrown6 = L.marker([40.875730821176049,-124.08032538252219], {icon: EAPLightBrownIcon});
	EAPLightBrown = L.layerGroup([lightbrown1,lightbrown2,lightbrown3,lightbrown4,lightbrown5,lightbrown6]),
	
		lightgreen1 = L.marker([40.875978285120652,-124.078992884358911], {icon: EAPLightGreenIcon}),
		lightgreen2 = L.marker([40.876235266909283,-124.078916741606719], {icon: EAPLightGreenIcon}),
		lightgreen3 = L.marker([40.876539837918038,-124.078745420414293], {icon: EAPLightGreenIcon}),
		lightgreen4 = L.marker([40.87665405204632,-124.078516992157731], {icon: EAPLightGreenIcon}),
		lightgreen5 = L.marker([40.876306650739465,-124.078374224497381], {icon: EAPLightGreenIcon}),
		lightgreen6 = L.marker([40.876002079730711,-124.078436090483535], {icon: EAPLightGreenIcon});
	EAPLightGreen = L.layerGroup([lightgreen1,lightgreen2,lightgreen3,lightgreen4,lightgreen5,lightgreen6]);
	
		orange1 = L.marker([40.878113137535131,-124.075369679085341], {icon: EAPOrangeIcon}),
		orange2 = L.marker([40.878346324713704,-124.075560035965822], {icon: EAPOrangeIcon}),
		orange3 = L.marker([40.878317771181635,-124.075255464957067], {icon: EAPOrangeIcon}),
		orange4 = L.marker([40.877794289760345,-124.074798608443942], {icon: EAPOrangeIcon}),
		orange5 = L.marker([40.877898986044606,-124.07437506438491], {icon: EAPOrangeIcon}),
	EAPOrange = L.layerGroup([orange1,orange2,orange3,orange4,orange5]);
	
		plantyellow1 = L.marker([40.872570896960205,-124.079045232501016], {icon: EAPPlantYellowIcon}),                            
		plantyellow2 = L.marker([40.872332950859622,-124.079264142913559], {icon: EAPPlantYellowIcon}),
	EAPPlantYellow = L.layerGroup([plantyellow1,plantyellow2]);
	
		purple1 = L.marker([40.875502392919479,-124.080553810778724], {icon: EAPPurpCermIcon}),
		purple2 = L.marker([40.875197821910724,-124.080944042383692], {icon: EAPPurpCermIcon}),
		purple3 = L.marker([40.875193062988714,-124.0813533096767], {icon: EAPPurpCermIcon});
	EAPPurple = L.layerGroup([purple1,purple2,purple3]);
	
		red1 = L.marker([40.87726485968652,-124.077272058159465], {icon: EAPRedIcon}),
		red2 = L.marker([40.877169681246286,-124.078033485681331], {icon: EAPRedIcon}),
		red3 = L.marker([40.877514703092132,-124.07839635348472], {icon: EAPRedIcon}),
		red4 = L.marker([40.877401678694355,-124.078759221288109], {icon: EAPRedIcon}),
		red5 = L.marker([40.877633676142423,-124.079395727107169], {icon: EAPRedIcon}),
		red6 = L.marker([40.877348140821717,-124.079758594910558], {icon: EAPRedIcon}),
		red7 = L.marker([40.877359324288449,-124.080253998691987], {icon: EAPRedIcon}),
		red8 = L.marker([40.877511609792826,-124.08030539504972], {icon: EAPRedIcon}),
		red9 = L.marker([40.877694352398073,-124.080301587912103], {icon: EAPRedIcon}),
		red10 = L.marker([40.876959574839475,-124.078881525583824], {icon: EAPRedIcon}),
	EAPRed = L.layerGroup([red1,red2,red3,red4,red5,red6,red7,red8,red9,red10]);
	
	EAPSBS = L.marker([40.874526813906996,-124.078931018372685], {icon: EAPSBSIcon});
	
		Science1 = L.marker([40.875369143103157,-124.077270154590622], {icon: EAPSciencePurpIcon}),
		Science2 = L.marker([40.874974152576179,-124.077641350507534], {icon: EAPSciencePurpIcon}),
		Science3 = L.marker([40.874993188264227,-124.077146422618313], {icon: EAPSciencePurpIcon}),
		Science4 = L.marker([40.874626751269325,-124.077746046791802], {icon: EAPSciencePurpIcon}),
		Science5 = L.marker([40.87446018899891,-124.076870405141634], {icon: EAPSciencePurpIcon}),
		Science6 = L.marker([40.874598197737249,-124.077213047526485], {icon: EAPSciencePurpIcon}),
		Science7 = L.marker([40.874155617990155,-124.076513485990745], {icon: EAPSciencePurpIcon}),
		Science8 = L.marker([40.873641654412879,-124.077194011838429], {icon: EAPSciencePurpIcon}),
		Science9 = L.marker([40.873636895490868,-124.077817430621977], {icon: EAPSciencePurpIcon}),
	EAPScience = L.layerGroup([Science1,Science2,Science3,Science4,Science5,Science6,Science7,Science8,Science9]);
	
		ToddPurp1 = L.marker([40.872537584506134,-124.077622314819507], {icon: EAPToddPurpIcon}),
		ToddPurp2 = L.marker([40.872375781157736,-124.07795068043832], {icon: EAPToddPurpIcon}),
		ToddPurp3 = L.marker([40.871980790630758,-124.078012546424475], {icon: EAPToddPurpIcon}),
		ToddPurp4 = L.marker([40.872047415538923,-124.078302840667192], {icon: EAPToddPurpIcon}),
		ToddPurp5 = L.marker([40.871657183933962,-124.078145796240804], {icon: EAPToddPurpIcon}),
		ToddPurp6 = L.marker([40.87180946943834,-124.078402778029428], {icon: EAPToddPurpIcon}),
		ToddPurp7 = L.marker([40.871933201410641,-124.078640724130025], {icon: EAPToddPurpIcon}),
	EAPToddPurple = L.layerGroup([ToddPurp1,ToddPurp2,ToddPurp3,ToddPurp4,ToddPurp5,ToddPurp6,ToddPurp7]);
	
	EAPVanMatre = L.marker([40.8763161685835,-124.077017931724029], {icon: EAPVanMatreIcon});
	
	EAPViolet = L.marker([40.876592186060172,-124.079825695710952], {icon: EAPVioletIcon});
	
		BSSYellow1 = L.marker([40.872937333955122,-124.077412922250986], {icon:  EAPBSSYellowIcon}),
		BSSYellow2 = L.marker([40.872927816111101,-124.077898332296186], {icon:  EAPBSSYellowIcon}),
		BSSYellow3 = L.marker([40.872794566294772,-124.076746673169339], {icon:  EAPBSSYellowIcon}),
	EAPBSSYellow = L.layerGroup([BSSYellow1,BSSYellow2,BSSYellow3]);
		
	// Rally Points
	RallyBlack = L.marker([40.875816481772198,-124.081415175662855], {icon: RallyBlackIcon}),
	RallyCyan = L.marker([40.878536681594134,-124.077949014815601], {icon: RallyCyanIcon}),
	RallyFWH = L.marker([40.877391684958077,-124.081201024172273], {icon: RallyFWHIcon}),
	RallyGreen = L.marker([40.875573776749668,-124.075675915716715], {icon: RallyGreenGymsIcon}),
	RallyCreekGreens = L.marker([40.873513163518524,-124.08034917713222], {icon: RallyCreekGreekIcon}),
	RallyGrey = L.marker([40.873836770215334,-124.079107098487171], {icon: RallyGreyIcon }),
	RallyLightBlue = L.marker([40.875854553148358,-124.078597893831898], {icon: RallyLightBlueIcon}),
	RallyLightBrown = L.marker([40.875906901290485,-124.080035088279473], {icon: RallyLightBrownIcon}),
	RallyLightGreen = L.marker([40.87627333828538,-124.078583617065902], {icon:  RallyLightGreenIcon}),
	RallyOrange = L.marker([40.878017959094898,-124.074836679820038], {icon: RallyOrangeIcon}),
	RallyPlantYellow = L.marker([40.872551861272164,-124.079506847936159], {icon:  RallyPlantYellowIcon}),	
	RallyPurple = L.marker([40.875283482506937,-124.080544292934704], {icon: RallyPurpleCermIcon}),
	RallyRed = L.marker([40.877275567261044,-124.078510329666898], {icon: RallyRedIcon}),
	RallySBS = L.marker([40.874526813906996,-124.078697831194106], {icon: RallySBSIcon}),
	RallyScience = L.marker([40.87431742133856,-124.077384368718896], {icon: RallySciencePurpleIcon}),
	RallyToddlerPurple = L.marker([40.8721997010433,-124.077779359245895], {icon: RallyToddlerIcon}),
	RallyVanMatre = L.marker([40.876102017092975,-124.077165458306396], {icon:  RallyVanMatreIcon}),
	RallyViolet = L.marker([40.876601703904193,-124.079544919312269], {icon: RallyVioletIcon}),
	RallyBSSYellow = L.marker([40.87281836090483,-124.077712734337737], {icon: RallyYellowBSSIcon});
	
//**********************************************************************************************************************************************************************************************************************// 
	// Campus access paths
	// Uses Leaflet tile layer add API / sets Z-index
	var access1 = L.tileLayer('https://api.mapbox.com/v4/hsumaps.7kni6vw8/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken, {
		zIndex: 2,
	});
		
	// Groups markers so that when they are selected all markers in each category appear (The "id" of an input type=checkbox, must be the same as the variables listed below
	// Residence Halls
	var All = L.geoJson(AllGeo, {style: BuildingStyles});
	var Apartments = L.geoJson(ApartmentsGeo, {style: BuildingStyles});
	var Alder = L.geoJson(AlderGeo, {style: BuildingStyles});
	var Cedar = L.geoJson(CedarGeo, {style: BuildingStyles});
	var Chinquapin = L.geoJson(ChinquapinGeo, {style: BuildingStyles});
	var Hem = L.geoJson(HemGeo, {style: BuildingStyles});
	var Madrone = L.geoJson(MadroneGeo, {style: BuildingStyles});
	var Maple = L.geoJson(MapleGeo, {style: BuildingStyles});
	var Pepper = L.geoJson(PepperGeo, {style: BuildingStyles});
	var Tan = L.geoJson(TanGeo, {style: BuildingStyles});
	var DN = L.geoJson(DNGeo, {style: BuildingStyles}); 
	var Mend = L.geoJson(MendGeo, {style: BuildingStyles});
	var Shasta = L.geoJson(ShastaGeo, {style: BuildingStyles});
	var Trinity = L.geoJson(TrinityGeo, {style: BuildingStyles});
	var Lounge = L.geoJson(LoungeGeo, {style: BuildingStyles});
	var Fern = L.geoJson(FernGeo, {style: BuildingStyles});
	var Juniper = L.geoJson(JuniperGeo, {style: BuildingStyles});
	var Laurel = L.geoJson(LaurelGeo, {style: BuildingStyles});
	var Willow = L.geoJson(WillowGeo, {style: BuildingStyles});
	var Cypress = L.geoJson(CypressGeo, {style: BuildingStyles});
	var Redwood = L.geoJson(RedwoodGeo, {style: BuildingStyles});
	var Sunset = L.geoJson(SunsetGeo, {style: BuildingStyles});
	//var AppBuildings = L.layerGroup([]);
	// var GroupTest = L.layerGroup([Redwood, Sunset]); YOU CAN GROUP POLYGONS!
	
	// Dining
	var dining = L.layerGroup([dining1,dining2,dining3,dining4,dining5]);
	var coffee = L.layerGroup([coffee1,coffee2,coffee3,coffee4]);
	
	// Parking
	var General = L.layerGroup([general1,general2,general3,general4,general5,general6,general7]);
	var Faculty = L.layerGroup([employee1,employee2,employee3,employee4,employee5]);
	var Resident = L.layerGroup([resident1,resident2,resident3,resident4]);
	var accessparking = L.layerGroup([accessparking1,accessparking2,accessparking3,accessparking4,accessparking5,accessparking6,accessparking7,accessparking8,accessparking9,accessparking10,accessparking11,accessparking12,accessparking13,accessparking14,accessparking15,accessparking16,accessparking17,accessparking18,accessparking19,accessparking20,accessparking21,accessparking22,accessparking23,accessparking24,accessparking25,accessparking26,accessparking27,accessparking28,accessparking29,accessparking30,accessparking31,accessparking32,accessparking33,accessparking34,accessparking35,accessparking36,accessparking37,accessparking38]);
	var PermitDispenser = L.layerGroup([dispenser1, dispenser2, dispenser3, dispenser4, dispenser5, dispenser6]);
	
	// Accessibility
	var elevators = L.layerGroup([elevators1,elevators2,elevators3,elevators4,elevators5,elevators6,elevators7,elevators8,elevators9,elevators10,elevators11,elevators12,elevators13,elevators14,elevators15,elevators16,elevators17,elevators18,elevators19,elevators20,elevators21,elevators22,elevators23,elevators24,elevators25,elevators26,elevators27,elevators28]);
	var doors = L.layerGroup([doors1,doors2,doors3,doors4,doors5,doors6,doors7,doors8,doors9,doors10,doors11,doors12,doors13,doors14,doors15,doors16,doors17,doors18,doors19,doors20,doors21,doors22,doors23,doors24,doors25,doors26,doors27,doors28,doors29,doors30,doors31,doors32,doors33,doors34,doors35,doors36]); 
	var access = L.layerGroup([access1]);
	
	// Buses & Bus Routes
	var bus = L.geoJson(BusStops, {

			pointToLayer: function (feature, latlng) {
				return L.marker(latlng, {icon: busIcon});
			},
			onEachFeature: BusStopFeature
		});

	var GoldRoute = L.geoJson(Gold, {style: GoldRouteStyle});
	var RedRoute = L.geoJson(Red, {style: RedRouteStyle});
	var OrangeRoute = L.geoJson(Orange, {style: OrangeRouteStyle});
	
	// Computer Labs & Printing 
	var PrintingKiosk = L.geoJson(Printing, {
		
			pointToLayer: function (feature, latlng) {
				return L.marker(latlng, {icon: KioskIcon});
			},
			
			onEachFeature: KioskFeature
		});  
	
	// Recreation
	var BasketBall = L.layerGroup([basketball1,basketball2,basketball3,basketball4]);
	var DiscGolf = L.layerGroup([discgolf1,discgolf2]);
	var Fitness = L.layerGroup([fitness1,fitness2]);
	var Football = L.marker([40.876502, -124.076104], {icon: FootballIcon});
	var Soccer = L.marker([40.873100, -124.080774], {icon: SoccerIcon});
	var Softball = L.marker([40.876556569587983,-124.07480455218577], {icon: SoftballIcon}); 
	var Swimming = L.marker([40.874676795393214,-124.07518098291689], {icon: SwimmingIcon});
	var VolleyBall = L.layerGroup([volley1,volley2]);
	
	// Emergency Services
	var Police = L.marker([40.874635511744827,-124.07896884689231], {icon: PoliceIcon});
	var EAP = L.layerGroup([EAPBlack,EAPCyan,EAPFWH,EAPGreen,EAPCreekGreen,EAPGrey,EAPLightBlue,EAPLightBrown,EAPLightGreen,EAPOrange,EAPPlantYellow,EAPPurple,EAPRed,EAPSBS,EAPScience,EAPToddPurple,EAPVanMatre,EAPViolet,EAPBSSYellow]);
	var Rally = L.layerGroup([RallyBlack,RallyCyan,RallyFWH,RallyGreen,RallyCreekGreens,RallyGrey,RallyLightBlue,RallyLightBrown,RallyLightGreen,RallyOrange,RallyPlantYellow,RallyPurple,RallyRed,RallySBS,RallyScience,RallyToddlerPurple,RallyVanMatre,RallyViolet,RallyBSSYellow]);
	
	// Student Services
	var Academic = L.marker([40.875457942197876, -124.07916337251663]).bindPopup(AcademicContent);
	var Admissions = L.marker([40.87454350267997, -124.07929342101008]).bindPopup(AcademicContent);
	var FoodPantry = L.marker([40.875577600522661, -124.07654821872711]).bindPopup(FoodContent);
	var Cashier = L.marker([40.874450703700738, -124.07918063455841]).bindPopup(AcademicContent);	
	var Financial = L.marker([40.874626412272377, -124.07907485961914]).bindPopup(FinancialContent);
	var HPL = L.marker([40.874409401524503, -124.07502740621565]).bindPopup(HPLContent);
	var Language = L.marker([40.872884221808377, -124.07690227031708]).bindPopup(LanguageContent);
	var Learning = L.marker([40.876151551853383, -124.08023357391359]).bindPopup(LearningContent);	
	var Registrar = L.marker([40.874632018629384, -124.07918063455841]).bindPopup(LearningContent);	
	var RecCenter = L.marker([40.875403183231363, -124.07627463340758]).bindPopup(RecCenterContent);
	var StudentDis = L.marker([40.876618010400122, -124.08014774322508]).bindPopup(StudentDisContent);
	var Writing = L.marker([40.876271208924443, -124.08023357391359]).bindPopup(WritingContent);
	
	// Extras, could be used for later
	var Health = L.layerGroup([health1]);	
	var PostOffices = L.layerGroup([post1]);
	
//**********************************************************************************************************************************************************************************************************************// 
//****IMPORTANT****   These are the CHECKBOX Toggle function for each input that matches the "id"s   ****IMPORTANT****
//**********************************************************************************************************************************************************************************************************************// 
//                                ORIGINAL SOURCES FOR CHECKBOX TOGGLE                                //
//Explanation of why it works: http://rowanwinsemius.id.au/blog/add-and-remove-layers-with-leaflet-js/
//Map of an example of checked map: http://rowanwinsemius.id.au/demo/layerToggle.html
//Here is the code for the above map: https://gist.github.com/rowanwins/97188a36a10ea3143b13

$( "input" ).click(function( event ) {           // JQuery library looks for <input> tags, and check set up our function to watch for click events on anything html input element
	layerClicked = window[event.target.id];      // Will then check what checkbox was clicked, we do this by returning the value of the target was clicked by id

		if (map.hasLayer(layerClicked)) {        // Check if the layer exists on the map, if the layer does exist we’ll remove the layer
			map.removeLayer(layerClicked);
		}
		else{
			map.addLayer(layerClicked);          // If it doesn’t (the else part of the statement) will then add the layer
		} ;
});

//*******************************************************************************************************
//           Testing Material for panning to each resource in a loop, figure it out later
//*******************************************************************************************************
//Pan to Marker example?
//https://github.com/Leaflet/Leaflet/issues/4577
// var AcademicPanPoint = L.latLng(-124.07916337251663,40.875457942197876);
// var CampusFoodPanPoint = L.latLng(40.875577600522661, -124.07654821872711);
// var CDLPanPoint = L.latLng(40.873985518666217, -124.07943695783615);

// var ResourceCoordinates = [AcademicPanPoint, CampusFoodPanPoint, CDLPanPoint];

// function ResourcePanTo(checkbox) {
	// if (checkbox.checked) {
		// for (var i = 0; i < ResourceCoordinates.length; i++) {
			// setTimeout(function() {
				// var PanToResource = map.panTo(ResourceCoordinates[i], {animate: true, duration: 0.25} ); 
			// });
		// }
	// }
	// else {
		// map.removeLayer(PanToResource);
     // }
// }	  
//*******************************************************************************************************


//********************************************************************************
//                       PanTo Functions for individual points
//********************************************************************************

/*****************************************************************/
/************************RECREATION PAN TO************************/
/*****************************************************************/
function FootballPanTo(checkbox) {
	if (checkbox.checked) {
		var FootballPanPoint = map.panTo(L.latLng(40.876502, -124.076104), {animate: true, duration: 0.25});
	}
    else {
		map.removeLayer(FootballPanPoint);
     }
}

function SoccerPanTo(checkbox) {
	if (checkbox.checked) {
		var SoccerPanPoint = map.panTo(L.latLng(40.873100, -124.080774), {animate: true, duration: 0.25});
	}
    else {
		map.removeLayer(SoccerPanPoint);
     }
}

function SoftballPanTo(checkbox) {
	if (checkbox.checked) {
		var SoftballPanPoint = map.panTo(L.latLng(40.876556569587983, -124.07480455218577), {animate: true, duration: 0.25});
	}
    else {
		map.removeLayer(SoftballPanPoint);
     }
}

function SwimmingPanTo(checkbox) {
	if (checkbox.checked) {
		var SwimmingPanPoint = map.panTo(L.latLng(40.874676795393214, -124.07518098291689), {animate: true, duration: 0.25});
	}
    else {
		map.removeLayer(SwimmingPanPoint);
     }
}

/*****************************************************************/
/*********************STUDENT SERVICES PAN TO*********************/
/*****************************************************************/
function AcademicPanTo(checkbox) {
	if (checkbox.checked) {
		var AcademicPanPoint = map.panTo(L.latLng(40.875457942197876, -124.07916337251663), {animate: true, duration: 0.25});
	}
    else {
		map.removeLayer(AcademicPanPoint);
     }
}

function AdmissionPanTo(checkbox) {
	if (checkbox.checked) {
		var AdmissionPanPoint = map.panTo(L.latLng(40.87454350267997, -124.07929342101008), {animate: true, duration: 0.25});             
	}
    else {
		map.removeLayer(AdmissionPanPoint);
     }
}

function CampusFoodPanTo(checkbox) {
	if (checkbox.checked) {
		var CampusFoodPanPoint = map.panTo(L.latLng(40.875577600522661, -124.07654821872711), {animate: true, duration: 0.25});
	}
    else {
		map.removeLayer(CampusFoodPanPoint);
     }
}

function CashierPanTo(checkbox) {
	if (checkbox.checked) {
		var CashierPanPoint = map.panTo(L.latLng(40.874450703700738, -124.07918063455841), {animate: true, duration: 0.25});           
	}
    else {
		map.removeLayer(CashierPanPoint);
     }
}

function FinancialPanTo(checkbox) {
	if (checkbox.checked) {
		var FinancialPanPoint = map.panTo(L.latLng(40.874626412272377, -124.07907485961914), {animate: true, duration: 0.25});
	}
    else {
		map.removeLayer(FinancialPanPoint);
     }
}
	
function HPLPanTo(checkbox) {
	if (checkbox.checked) {
		var HPLPanPoint = map.panTo(L.latLng(40.874409401524503, -124.07502740621565), {animate: true, duration: 0.25});
	}
    else {
		map.removeLayer(HPLPanPoint);
     }
}

function LanguagePanTo(checkbox) {
	if (checkbox.checked) {
		var LanguagePanPoint = map.panTo(L.latLng(40.872884221808377, -124.07690227031708), {animate: true, duration: 0.25});
	}
    else {
		map.removeLayer(LanguagePanPoint);
     }
}

function LearningPanTo(checkbox) {
	if (checkbox.checked) {
		var LearningPanPoint = map.panTo(L.latLng(40.876151551853383, -124.08023357391359), {animate: true, duration: 0.25});
	}
    else {
		map.removeLayer(LearningPanPoint);
     }
}

function PostOfficePanTo(checkbox) {
	if (checkbox.checked) {
		var PostOfficePanPoint = map.panTo(L.latLng(40.877564,-124.078303), {animate: true, duration: 0.25});           
	}
    else {
		map.removeLayer(PostOfficePanPoint);
     }
}

function RegistrarPanTo(checkbox) {
	if (checkbox.checked) {
		var RegistrarPanPoint = map.panTo(L.latLng(40.874632018629384, -124.07918063455841), {animate: true, duration: 0.25});           
	}
    else {
		map.removeLayer(RegistrarPanPoint);
     }
}

function RecCenterPanTo(checkbox) {
	if (checkbox.checked) {
		var RecCenterPanPoint = map.panTo(L.latLng(40.875403183231363, -124.07627463340758), {animate: true, duration: 0.25});
	}
    else {
		map.removeLayer(RecCenterPanPoint);
     }
}

function HealthPanTo(checkbox) {
	if (checkbox.checked) {
		var HealthPanPoint = map.panTo(L.latLng(40.877367, -124.079931), {animate: true, duration: 0.25});
	}
    else {
		map.removeLayer(RecCenterPanPoint);
     }
}

function StudentDisPanTo(checkbox) {
	if (checkbox.checked) {
		var StudentDisPanPoint = map.panTo(L.latLng(40.876618010400122, -124.08014774322508), {animate: true, duration: 0.25});
	}
    else {
		map.removeLayer(StudentDisPanPoint);
     }
}

function WritingPanTo(checkbox) {
	if (checkbox.checked) {
		var WritingPanPoint = map.panTo(L.latLng(40.876271208924443, -124.08023357391359), {animate: true, duration: 0.25});
	}
    else {
		map.removeLayer(WritingPanPoint);
     }
}

/*****************************************************************/
/********************EMERGENCY SERVICES PAN TO********************/
/*****************************************************************/
function PolicePanTo(checkbox) {
	if (checkbox.checked) {
		var PolicePanPoint = map.panTo(L.latLng(40.874635511744827,-124.07896884689231), {animate: true, duration: 0.25});
	}
    else {
		map.removeLayer(PolicePanPoint);
     }
}