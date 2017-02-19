//***************************************************************************************************************************************
//OFFICIAL SEARCH BAR FUNCTION
//***************************************************************************************************************************************

function classSearch()                                                                                //Draws information from the ClassData_s16.json file
{
	var Element=document.getElementById("SearchText");                                                //Id searchtext above
	var SearchPhrase=Element.value;                                                                   //Write whatever you want and that is the value i.e. 'MATH 115' OF 'Academic'
	
	//List of phrases within array
	 var PhraseList = [
	"Harry Griffith Hall",     // 0                                                  
	"Kate Buchanon Room",      // 1
	"University Center",       // 2
	"Natural Resources",       // 3
	"NR",                	   // 4
	"Food",                    // 5
	"Founders Hall"
	];
	
	var PhraseScore = [];                                                                             //An empty array for the phrase scores 
	for (i=0;i<PhraseList.length;i++)                                                                 //For Loop to initialize the phrase score elements in the array with the length of variable PhraseList
	{
	  PhraseScore[i] = 0;                                                                             //Initializes the phrase score element
	}

	for (i=0;i<PhraseList.length;i++)                                                                 //For Loop to go through the variable PhraseList to match phrases with the SearchPhrase variable
	{
		var Phrase = PhraseList[i];                                                                   //Declares an array as a variable
		var PhraseTokens=Phrase.split(" ");                                                           //Splits the elements of the variable 'Phrase'
		var SearchPhraseTokens=SearchPhrase.split(" ");
		
		for (j=0;j<PhraseTokens.length;j++)                                                           //Goes through the PhraseTokens length
		{	
			for (k=0;k<SearchPhraseTokens.length;k++)
			{
				if (PhraseTokens[j] == SearchPhraseTokens[k])
				{
					PhraseScore[i] += 1;                                                             //Provides a +1 score for each element in the respective new array 
				}

				var FinalScore = PhraseScore[i];                                                     //Assigns the total score of the PhraseScore in the respective PhraseList element  
				alert("Searched PhraseList. Hit on "+i+", and phrase score is "+FinalScore);         //Alerts user what list is use, what element in the PhraseList is hit, and what the total score of the respective PhraseList element is
					
			}
		}
				
		if (Phrase == SearchPhrase)                                    
		{
			PhraseScore[i] += 10;
			var FinalScore = PhraseScore[i];                             
			alert("Hit on "+i+", and phrase score is "+FinalScore);   
		}
				
		// else {
			// alert("No match found");
		// }
	}
}

//**********************************************************************************************************************************************************************************************************************// 
 // The following function is called when the "search" button is clicked
 // If a building name is entered that building will be highlighted on the map (ex: Founders Hall) / Each word must be Capitalized
 // If a course number is entered (eg. "GSP 570") the building this course is in will be highlighted / Only all caps accepted
 // User input is case sensitive at this time so case must match
 // Courses that take place in multiple buildings will result in multiple buildings being highlighted
 // Click off function is disabled until we can get it to work globally
 //***************************************************************************************************************************************
 //INITIAL SEARCH BAR FUNCTION
 //***************************************************************************************************************************************
// function classSearch()                                                //Draws information from the ClassData_s16.json file
// {
	// var Element=document.getElementById("SearchText");                //Id searchtext above
	// var Value=Element.value;                                          //Write whatever you want and that is the value i.e. MATH 115
	
	// var ClassTemp=classData;                                          // Loads the class data json file
	// var ClassFeatures=ClassTemp.features;                             // json array of class data from each column
	
	// var buildTemp1 = buildings;                                       //This calls the buildings json file up above
	// var tempFeatures=buildTemp1;
	// // Portion of the code that performs building search
	
	// for (var k=0; k < tempFeatures.length; k++)                       // Loops through building geojson file, this might be where the seach function could be broken, i.e. case sensitive 
	// {
		// var buildingFeature=tempFeatures[k]; 
		
		// var buildingProperty=buildingFeature.properties;             // Accesses properties of building geojson file
		
		// var buildingName=buildingProperty.name;                      // Accesses building name property of building geojson file
		
		// if (buildingName==Value)                                     // If user input value matches building name that building will be highlighted
		// {
		
		// var basicSelection=buildingFeature.geometry;
		// var myStyle = {
					// color: 'blue', 
					// weight: 3,
					// opacity: 0.3,
					// fillOpacity: 0.3,
					// fillColor: '#E5F0D3'
									// };
					// L.geoJson(basicSelection, {
  					// style: myStyle
  					// }).addTo(map);
		// }
	// }

	// // Loop through each "feature"
	// for (var i=0; i < ClassFeatures.length; i++) 
	// {
		// var ClassFeature=ClassFeatures[i];
		// var ClassProperties=ClassFeature.Course;                   // Accesses the properties of the ClassData file
		// var ClassBuilding=ClassFeature.Building;                   // Acessess the building property from the ClassData file
		
		// if (ClassProperties==Value)                                // If the user class input value matches  a course in the ClassData file
		// // The remaining code will be executed
		// {
			// var BuildTemp=buildings;                               // Defines BuildTemp as the buildings geojson data
			// var TheFeatures=BuildTemp;
			
			// // Building will highlight on map if the course has a building associated with it in the
			// // ClassData json file
			// for ( var j=0; j < TheFeatures.length; j++)
			// {
				// var TheFeature=TheFeatures[j];
		
				// var TheProperties=TheFeature.properties;           // Accesses the "properties" of the building geojson file
				                                         
				// var TheBuilding=TheProperties.name2;               // Accesses the name2 field of building geojson property
				                                                   // // Name2 is the abbreviation used in ClassData file
				// if (TheBuilding==ClassBuilding)
				// {
					// var selection=TheFeature.geometry;             // Selects the geometry from the matching building
					                                               // // Attribuite in the buildings.geojson file
					// var myStyle = {
						// color: 'blue', 
						// weight: 3,
						// opacity: 0.3,
						// fillOpacity: 0.3,
						// fillColor: '#E5F0D3'
									// };
					// L.geoJson(selection, {
  					// style: myStyle
  					// }).addTo(map);
				// }	
			// }
		// }
	// }	
// }

//***************************************************************************************************************************************
//JORDAN AND JOSH'S COMBINED VERSION
//***************************************************************************************************************************************
// function classSearch() {                                               //Draws information from the ClassData_s16.json file
		// var Element=document.getElementById("SearchText");                //Id searchtext above
		// var SearchPhrase=Element.value;                                          //Write whatever you want and that is the value i.e. 'MATH 115' OF 'Academic'
		
		// var ClassTemp=classData;                                          // Loads the class data json file
		// var ClassFeatures=ClassTemp.features;                             // json array of class data from each column
		
		// var buildTemp1 = buildings;                                       //This calls the buildings json file up above
		// var tempFeatures=buildTemp1;
		
		// var Keywords = ['Academic', 'Academic Center', 'FoodPantry', 'Food', 'Pantry', 'CampusFoodPantry', 'CDL', 'Child', 'HPL', 'Human'];  //"Child Development", Keywords that the user can enter in the Search bar
		// // var KeywordScores = [0,0,0,0,0,0];                                        //Score hit points for each word type correctly and used from the user
		
		// // Portion of the code that performs building search*****************************************************************************************************
		// for (var k=0; k < tempFeatures.length; k++)                       // Loops through building geojson file, this might be where the seach function could be broken, i.e. case sensitive 
		// {
			// var buildingFeature=tempFeatures[k]; 
			
			// var buildingProperty=buildingFeature.properties;             // Accesses properties of building geojson file
			
			// var buildingName=buildingProperty.name;                      // Accesses building name property of building geojson file
			
			// if (buildingName == SearchPhrase)                                     // If user input value ("SearchPhrase") matches building name that building will be highlighted
			// {
			
				// var basicSelection=buildingFeature.geometry;
				// var myStyle = 
				// {
					// color: 'blue', 
					// weight: 3,
					// opacity: 0.3,
					// fillOpacity: 0.3,
					// fillColor: '#E5F0D3'
				// };
				// var Thing = L.geoJson(basicSelection, {style: myStyle}); 
				// Thing.addTo(map);
			// }
			// // else if(buildingName != SearchPhrase)
			// // {
				// // alert("There is no value");
			// // }
			// // else {
				// // alert("Please enter a value");
			// // }
		// }

		// // Portion of the code that performs class search using the "features" of the variable building**************************************************************************************************************************
		// for (var i=0; i < ClassFeatures.length; i++) 
		// {
			// var ClassFeature=ClassFeatures[i];
			// var ClassProperties=ClassFeature.Course;                   // Accesses the properties of the ClassData file
			// var ClassBuilding=ClassFeature.Building;                   // Acessess the building property from the ClassData file
			
			// if (ClassProperties==SearchPhrase)                                // If the user class input value matches  a course in the ClassData file
			// // The remaining code will be executed
			// {
				// var BuildTemp=buildings;                               // Defines BuildTemp as the buildings geojson data
				// var TheFeatures=BuildTemp;
				
				// // Building will highlight on map if the course has a building associated with it in the
				// // ClassData json file
				// for ( var j=0; j < TheFeatures.length; j++)
				// {
					// var TheFeature=TheFeatures[j];
			
					// var TheProperties=TheFeature.properties;           // Accesses the "properties" of the building geojson file
															 
					// var TheBuilding=TheProperties.name2;               // Accesses the name2 field of building geojson property
																	   // // Name2 is the abbreviation used in ClassData file
					// if (TheBuilding==ClassBuilding)
					// {
						// var selection=TheFeature.geometry;             // Selects the geometry from the matching building
																	   // // Attribuite in the buildings.geojson file
						// var myStyle = {
							// color: 'blue', 
							// weight: 3,
							// opacity: 0.3,
							// fillOpacity: 0.3,
							// fillColor: '#E5F0D3'
										// };
						// L.geoJson(selection, {
						// style: myStyle
						// }).addTo(map);
					// }
				// }
			// }
		// }
		
		// for (var i=0; i < Keywords.length; i++)                                    //Initialize the variable count, length of array or list from 'Keywords' variable, iteration count step by 1 
		// {
			// var KeywordElement = Keywords[i];                                      //Elements within the variable 'KeywordElement'
			// var SplitKeywordElement = KeywordElement.split(' ');                   //Splits the Elements within the variable 'KeywordElement'
			
				// for (var j=0; j < SplitKeywordElement.length; j++)                 //Initializes the variable count, length of array or list from 'SplitKeywordElement' variable, iteration count step by 1 
				// {	
					// if(SplitKeywordElement[j] == SearchPhrase)                     //If the split Keyword element is equal to the value of the element (SearchPhrase), then proceed with the following condition 
					// {
						// SearchPhrase=(SplitKeywordElement[j]>=0 && SplitKeywordElement[j]<=1);
						// map.panTo(L.latLng(40.875457942197876, -124.07916337251663), {animate: true, duration: 0.25});
						// L.marker([40.875457942197876, -124.07916337251663]).addTo(map).bindPopup(AcademicContent, PopupDimension);
					// }
				// }
		// }
// }
//***************************************************************************************************************************************
//TEST MATERIALS FOR BUILDING STYLES AND ENTER BUTTON
//***************************************************************************************************************************************
// var ResultBuildingStyles = {
	// color: '#B65300', 
	// weight: 2,
	// opacity: 0.6,
	// fillOpacity: 0.65,
	// fillColor: '#E5F0D3'
// };

// document.getElementById('SearchText').onkeydown = function(event) {
	// if (event.keyCode == 13) {
		// function classSearch(){                                               //Draws information from the Phrases variable

			// var Element=document.getElementById("SearchText");                //Id searchtext above
			// var SearchPhrase=Element.value;                                          //Write whatever you want and that is the value i.e. MATH 115
			
			// var Keywords = ['Academic', 'AcademicCenter', 'FoodPantry', 'Food', 'Pantry', 'CampusFoodPantry', 'CDL', 'Child', 'HPL', 'Human'];  //"Child Development", 
			// // var KeywordScores = [0,0,0,0,0,0];
			
			// for (var i=0; i < Keywords.length; i++)
			// {
				// var KeywordElement = Keywords[i];
				// var SplitKeywordElement = KeywordElement.split(' ');
			
					// for (var j=0; j < SplitKeywordElement.length; j++)
					// {	
						// if(SplitKeywordElement[j] == SearchPhrase)
						// {
							// SearchPhrase=(SplitKeywordElement[j]>=0 && SplitKeywordElement[j]<=1);
							// L.marker([40.875457942197876, -124.07916337251663]).addTo(map).bindPopup(AcademicContent, PopupDimension);
						// }
					// }
			// }
		// }
	// }
// }

//***************************************************************************************************************************************
//MY APPROACH FOR A SEARCHBAR FUNCTION
//***************************************************************************************************************************************	
// function classSearch(){                                                            //Draws information from the 'SearchPhrase' variable
	// // // if (event.keyCode == 13) {
	// // //if (button.onclick) {
		// var Element=document.getElementById("SearchText");                         //Id searchtext from Seach Bar
		// var SearchPhrase=Element.value;                                            //The user writes texts within the input tag that is the value i.e. 'Academic'
		
		// var Keywords = ['Academic', 'Academic Center', 'FoodPantry', 'Food', 'Pantry', 'CampusFoodPantry', 'CDL', 'Child', 'HPL', 'Human'];  //"Child Development", Keywords that the user can enter in the Search bar
		// // var KeywordScores = [0,0,0,0,0,0];                                        //Score hit points for each word type correctly and used from the user
		
		// for (var i=0; i < Keywords.length; i++)                                    //Initialize the variable count, length of array or list from 'Keywords' variable, iteration count step by 1 
		// {
			// var KeywordElement = Keywords[i];                                      //Elements within the variable 'KeywordElement'
			// var SplitKeywordElement = KeywordElement.split(' ');                   //Splits the Elements within the variable 'KeywordElement'
			
				// for (var j=0; j < SplitKeywordElement.length; j++)                 //Initializes the variable count, length of array or list from 'SplitKeywordElement' variable, iteration count step by 1 
				// {	
					// if(SplitKeywordElement[j] == SearchPhrase)                     //If the split Keyword element is equal to the value of the element (SearchPhrase), then proceed with the following condition 
					// {
						// SearchPhrase=(SplitKeywordElement[j]>=0 && SplitKeywordElement[j]<=1);
						// map.panTo(L.latLng(40.875457942197876, -124.07916337251663), {animate: true, duration: 0.25});
						// L.marker([40.875457942197876, -124.07916337251663]).addTo(map).bindPopup(AcademicContent, PopupDimension);
					// }
					// else if(SplitKeywordElement[j] != SearchPhrase)
					// {
						// alert("There is no value");
					// }
//***************************************************************************************************************************************
					// Value1=(PhraseTokens[j]>=0 && PhraseTokens[j]<=1);
					// Value2=(PhraseTokens[j]>=2 && PhraseTokens[j]<=4);
					
					// if(SearchValues == Value1)
					// {
						// L.marker([40.875457942197876, -124.07916337251663]).addTo(map).bindPopup(AcademicContent, PopupDimension);
					// }
					// if(SearchValues == Value2)
					// {
						// L.marker([40.875577600522661, -124.07654821872711]).addTo(map).bindPopup(FoodContent,PopupDimension);
					// }
						// if(SearchValues == Value1)
						// { 
							// L.marker([40.875577600522661, -124.07654821872711]).addTo(map).bindPopup(FoodContent,PopupDimension);
					//}
					// L.marker([40.875457942197876, -124.07916337251663]).addTo(map).bindPopup(AcademicContent, PopupDimension);
					//}	
				// if(PhraseTokens[j]==SearchValues)
				// {
					// // if(SearchValues == "Academic" || SearchValues == "AcademicCenter")
					// // if(SearchValues == PhraseTokens[0])
					// // if(PhraseTokens[j]>=0 && PhraseTokens[j]<=1)
					// {
						// L.marker([40.875457942197876, -124.07916337251663]).addTo(map).bindPopup(AcademicContent, PopupDimension);
					// }
					// else if(SearchValues == "FoodPantry" || SearchValues == "Food" || SearchValues == "CampusFoodPantry")
					// // if(SearchValues == PhraseTokens[1])
					// {
						// L.marker([40.875577600522661, -124.07654821872711]).addTo(map).bindPopup(FoodContent,PopupDimension);
					// }
					// else if(SearchValues == "CDL" || SearchValues == "Child")
					// // if(SearchValues == PhraseTokens[2])
					// {
						// L.marker([40.873985518666217, -124.07943695783615]).addTo(map).bindPopup(CDLContent,PopupDimension);
					// }
					// else if(SearchValues == "HPL" || SearchValues == "Human")
					// // if(SearchValues == PhraseTokens[3])
					// {
						// L.marker([40.874409401524503, -124.07502740621565]).addTo(map).bindPopup(HPLContent,PopupDimension);
					// }
					// else 
					// {
						// "No Results Found."
					// }
				//}
				
					// if(PhraseTokens[j]==SearchValues || PhraseTokens[j]==1)
					// {
							// L.marker([40.873985518666217, -124.07943695783615]).addTo(map).bindPopup(CDLContent,PopupDimension);

					// }
				//}
		//}
	// }
	// else {
		// map.removeLayer();
	// }
//}