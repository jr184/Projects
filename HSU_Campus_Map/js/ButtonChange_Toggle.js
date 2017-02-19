//**********************************************************************************************************************************************************************************************************************// 
// Button Toggle Operations for the slide menus on the main HTML page
//**********************************************************************************************************************************************************************************************************************// 

/**
* Button Toggles
*/
//Grabs the elements by ids for both the left and bottom slide menus
var menuLeft = document.getElementById( 'cbp-spmenu-s1' ),               	  // Calls upon the left slide menu by id 
menuBottom = document.getElementById( 'cbp-spmenu-s4' ),                	  // Calls upon the bottom slide menu by id 
showLeft = document.getElementById( 'showLeft' ),                       	  // Calls upon the left slide menu button control by id 
showBottom = document.getElementById( 'showBottom' ),                   	  // Calls upon the bottom slide menu button control by id 
body = document.body;

//Left slide menu button function, specifically  "Menu"
showLeft.onclick = function() {
	classie.toggle( this, 'active' );                                    	  // Calls the toggle function inside the classie.js file under the js folder
	classie.toggle( menuLeft, 'cbp-spmenu-open' );                       	  // Calls the left slide menu by id to display the menu content once the user clicks the button
	//disableOther( 'showLeft' );                                        	  // Don't know where this is called from, or if it's needed. Leave it just in case.
};

//Bottom slide menu button function, specifically  "Info | Give Feedback"
showBottom.onclick = function() {
	classie.toggle( this, 'active' );                                    	  // Calls the toggle function inside the classie.js file under the js folder
	classie.toggle( menuBottom, 'cbp-spmenu-open' );                     	  // Calls the bottom slide menu by id to display the menu content once the user clicks the button
	//disableOther( 'showBottom' );                                           // Don't know where this is called from, or if it's needed. Leave it just in case.
};

//********************************************************************************************************************************************
// This is the event handler for the left & bottom button once clicked, the "Menu" button at the top-left and bottom-right corner of the site
//********************************************************************************************************************************************
 
/**
* Menu button
*/
var button = document.querySelectorAll("showLeft")[0];                        // Returns a list of the elements within the document (using depth-first pre-order traversal of the document's nodes)
                                                                              // that match the specified group of selectors. The object returned is a NodeList.
showLeft.addEventListener('click', function() {                               // Adds an event handler click function for the variable "showleft", located in "ButtonChange_Toggle.js"  
	// ***getAttribute() method returns the value of the attribute with the specified name of an element, i.e. showleft which as attribute "data-text-swap"
	if (showLeft.getAttribute("data-text-swap") == showLeft.innerHTML) {      // If the user clicks the button on proceed
		showLeft.innerHTML = showLeft.getAttribute("data-text-original");     // Left slide menu comes out, and displays the "X Close Menu" option
	} 
	else {
		showLeft.setAttribute("data-text-original", showLeft.innerHTML);      // If the users the button off proceed
		showLeft.innerHTML = showLeft.getAttribute("data-text-swap");         // Left slide menu slides back in, and displays the "Menu" option
	}
}, false);

/**
* INFO button
*/
var button = document.querySelectorAll("showBottom")[0];                      // Returns a list of the elements within the document (using depth-first pre-order traversal of the document's nodes)
                                                                              // that match the specified group of selectors. The object returned is a NodeList.
showBottom.addEventListener('click', function() {                             // Adds an event handler click function for the variable "showBottom", located in "ButtonChange_Toggle.js"  
	// ***getAttribute() method returns the value of the attribute with the specified name, of an element, i.e. showbottom which as attribute "data-text-swap"
	if (showBottom.getAttribute("data-text-swap") == showBottom.innerHTML) {  // If the user clicks the button on proceed
		showBottom.innerHTML = showBottom.getAttribute("data-text-original"); // Bottom slide menu comes out, and displays the "X Close" option
	} 
	else {
	showBottom.setAttribute("data-text-original", showBottom.innerHTML);      // If the users the button off proceed
	showBottom.innerHTML = showBottom.getAttribute("data-text-swap");         // Left slide menu slides back in, and displays the "Info | Give Feedback" option
	}
}, false);