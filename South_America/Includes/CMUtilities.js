//****************************************************************************************************
// Utilities for general use.
//****************************************************************************************************
function CMUtilities() 
{
	
}
CMUtilities.Test=0;
/*
* Check if the element is defined (could be null or "undefined").
*/
CMUtilities.IsDefined=function(TheElement)
{
	var Result=true;
	
	if ((TheElement==undefined)||(TheElement==null)) Result=false;
	
	return(Result);
}
/*
* Make an element be positioned abosolutely
*/
CMUtilities.AbsolutePosition=function(TheElement,Left,Top,Width,Height)
{
	TheElement.style.position="absolute";
	
	TheElement.style.left=Left+"px";
	TheElement.style.top=Top+"px";
	TheElement.style.width=Width+"px";
	TheElement.style.height=Height+"px";
}
//***************************************************************************************
// Class and Utilities functions for working with HTML 5
// Canvas DOM elements.
//***************************************************************************************
/*
* Rethrns the upper left corner of an element in the DOM.
*/
CMUtilities.GetElementCoordinate=function(ClientX,ClientY,Canvas)
{
	if ((Canvas==null)||(Canvas==undefined))
	{
		var j=12;
	}
	var rect=Canvas.getBoundingClientRect();
        
	var Coordinate=
	{
		x: Math.round(ClientX-rect.left),
		y: Math.round(ClientY-rect.top)
	}
	return(Coordinate);
}
//******************************************************************
// Color value untilities
//******************************************************************
CMUtilities.GetTwoDigitHex=function(Value)
{
	var Red=parseInt(Value);
	var Red=Red.toString(16);
	if (Red.length<2) Red="0"+Red;
	return(Red);
}
/**
* Returns an array that contains the individual rgb and opacity values 
* from a color
*/
CMUtilities.GetRGBAValuesFromRGBA=function(Value)
{
	var Result={
			Red:255,
			Green:255,
			Blue:255,
			Transparency:1
	};
	
	if ((typeof(Value)!="undefined")&&(Value.indexOf("rgb")>-1)) // convert from rgb or rgba to hex
	{
		var Index=Value.indexOf("(");
		Value=Value.substring(Index+1);
		
		Index=Value.indexOf(")");
		Value=Value.substring(0,Index);
		
		var Tokens=Value.split(",");
		
		Result.Red=parseFloat(Tokens[0]);
		Result.Green=parseFloat(Tokens[1]);
		Result.Blue=parseFloat(Tokens[2]);
		
		if (Tokens.length>3)
		{
			Result.Transparency=parseFloat(Tokens[3]);
		}
	}
	return(Result);
}
/**
* Returns a hex color from another color.
* Used to set the color in a color control.
* Must convert all colors types to hex.
*/
CMUtilities.GetHexColorFromColor=function(Value)
{
	if (Value!=undefined)
	{
		if (Value.indexOf("rgb")>-1)
		{
			Value=CMUtilities.GetHexFromRGB(Value);
		}
		else if (Value.indexOf("#")==-1) // must be a text color?
		{
			Value=CMUtilities.GetRGBColorFromNamedColor(Value);
			Value=CMUtilities.GetHexFromRGB(Value);
		}
	}
	return(Value);
}
/** Returns an RGB color from a hex color.
* This is only called by CMDialog.js to convert
* the colors from the control to RGB
*/
CMUtilities.GetRGBFromHex=function(Value)
{
	var Red=Value.substring(1,3);
	var Green=Value.substring(3,5);
	var Blue=Value.substring(5,7);
	
	var Result={
		Red:parseInt(Red,16),
		Green:parseInt(Green,16),
		Blue:parseInt(Blue,16)
	}
	return(Result);
}
CMUtilities.GetHexFromRGB=function(Value)
{
	var Result=CMUtilities.GetRGBAValuesFromRGBA(Value);

	var Red=CMUtilities.GetTwoDigitHex(Result.Red);
	var Green=CMUtilities.GetTwoDigitHex(Result.Green);
	var Blue=CMUtilities.GetTwoDigitHex(Result.Blue);
	
	Value="#"+Red+Green+Blue;
	
	return(Value);
}
/**
* Private function
* returns rgb() color from a named color (e.g. "yellow")
*/
CMUtilities.GetRGBColorFromNamedColor=function(NamedColor) 
{
    // Add a temporary div to the body
    var TempDiv=$('<div></div>').appendTo("body").css('background-color',NamedColor);
    
	// Get the style computed by the browser
	var TheComputedStyle=window.getComputedStyle(TempDiv[0]);

    // Get the rgb color
    var ComputedRGB = TheComputedStyle.backgroundColor;

	// remove the temp div
    TempDiv.remove();

    return(ComputedRGB);
};
//******************************************************************
// Polygon untilities
//******************************************************************
/**
 * Returns an array of coordinates for a regular polygon of the specified
 * number of points.
 * @param NumPoints - 3 for a triangle, 4 for a square, 5 for a pentagon, etc.
 * @param Size - Distance from the center to each point in the polygon
 * @param CenterX - Center for the polygon
 * @param CenterY
 * @param StartAngle - 0 to have the first point straight up (north), 90 for east, etc.
 * @return 
 */
CMUtilities.GetRegularPolygon=function(NumPoints,Size,CenterX,CenterY,StartAngle)
{
	var Result=null;

	if (NumPoints>0)
	{
		var	HalfSize=Size/2;
		var	DX,DY;
		var	Radius;
		var	Angle=0;
		var	X,Y;

		var Result=[];
		Result[0]=[];
		Result[1]=[];
		
		var SweepAngle=Math.PI*2/NumPoints; // angle between each point

		StartAngle-=180; // flip to having the point on the top (bottom of the screen)
		
		StartAngle=(StartAngle*Math.PI*2/360); // convert to radians

		Radius=HalfSize/Math.cos(SweepAngle/2); // distance from center to a point

		// setup the first point (polygons always have a flat side on the bottom)

		Angle=StartAngle; // 0 degrees is y=0, x=undefined (moving clockwise)

		for (var i=0;i<NumPoints;i++)
		{
			DX=Radius*Math.sin(Angle); // offset to first point (just to the right of bottom-center
			DY=Radius*Math.cos(Angle);

			Result[0][i]=CenterX+DX;
			Result[1][i]=CenterY+DY;

			Angle+=SweepAngle;
		}
	}
	
	return(Result);
}
/**
 * Returns the shape of a star
 * @param NumPoints
 * @param Size
 * @param CenterX
 * @param CenterY
 * @param StartAngle - angle to the first point in degrees (0 is up)
 * @return 
 */
CMUtilities.GetStar=function(NumPoints,Size,CenterX, CenterY, StartAngle)
{
	var Result=null;

	if (NumPoints>0)
	{
		var	HalfSize=Size/2;
		var	DX,DY;
		var	Radius;
		var	Angle=0;
		var	X,Y;

		Result=[];
		Result[0]=[];
		Result[1]=[];
		
		var SweepAngle=Math.PI*2/NumPoints/2; // angle between each point

		StartAngle-=180; // flip to having the point on the top (bottom of the screen)
		
		StartAngle=(StartAngle*Math.PI*2/360); // convert to radians

		Radius=HalfSize/Math.cos(SweepAngle/2); // distance from center to a point
		var InnerRadius=Radius/2.5;
		
		// setup the first point (polygons always have a flat side on the bottom)

		Angle=StartAngle; // 0 degrees is y=0, x=undefined (moving clockwise)

		for (var i=0;i<NumPoints;i++)
		{
			// move to the outer point
			
			DX=Radius*Math.sin(Angle); // offset to first point (just to the right of bottom-center
			DY=Radius*Math.cos(Angle);

			X=CenterX+DX;
			Y=CenterY+DY;

			Result[0][i*2]=CenterX+DX;
			Result[1][i*2]=CenterY+DY;

			Angle+=SweepAngle;
			
			// move to the inner point
			
			DX=InnerRadius*Math.sin(Angle); // offset to first point (just to the right of bottom-center
			DY=InnerRadius*Math.cos(Angle);

			X=CenterX+DX;
			Y=CenterY+DY;

			Result[0][i*2+1]=CenterX+DX;
			Result[1][i*2+1]=CenterY+DY;

			Angle+=SweepAngle;
		}
	}
	
	
	return(Result);
}

//******************************************************************
// GUI untilities
//******************************************************************
CMUtilities.PositionControl=function(SelectControl,Position,X,Y)
{
	if (Position!=undefined)
	{
		SelectControl.style.position=Position;
		SelectControl.style.left=X+"px";
		SelectControl.style.top=Y+"px";
	}
}
CMUtilities.CreateSelectControl=function(Values,Selected,Position,X,Y)
{
	var TheControl=document.createElement("SELECT");

	var SelectedIndex=-1;
	for (var i=0;i<Values.length;i++)
	{
		if (Selected==Values[i]) SelectedIndex=i;
	
		var option = document.createElement("option");
		option.text =Values[i];
		TheControl.add(option);
	}
	if (SelectedIndex!=-1) TheControl.selectedIndex=SelectedIndex;
	
	CMUtilities.PositionControl(TheControl,Position,X,Y);
	
	return(TheControl);
}
CMUtilities.CreateSliderControl=function(Min,Max,Value,Position,X,Y)
{
	var SliderControl=document.createElement("input");
	SliderControl.type="range";
	SliderControl.min=Min;
	SliderControl.max=Max;
	SliderControl.value=Value;
	
	CMUtilities.PositionControl(SliderControl,Position,X,Y);
	
	return(SliderControl);
}
CMUtilities.CreateLabelControl=function(Text,Position,X,Y)
{
	var TheLabel=document.createElement("div");
	TheLabel.innerHTML=Text;
	
	CMUtilities.PositionControl(TheLabel,Position,X,Y);
	
	return(TheLabel);
}
	

/*
* Dimensions are for the box, the triangle will be placed below it
*
* ID - The name of the balloon element to create (typically each map has a unique ID)
* Left - location to tie the tooltip to (typically the X coordinate of the mouse down) 
* Top - location to tie the tooltip to (typically the Y coordinate of the mouse down)
* Width - desired width of the tool tip (in future versions, the tooltip may be smaller
*		based on the width of the text)
* Height - ignored, the tooltip now sizes with it's contents
* Text - the HTML to place int he tooltip
*/
CMUtilities.CreateInfoWindow=function(ID,MouseX,MouseY,Width,Height,Text)
{
	var Padding=10; // between the balloon and it's contents
	var TriangleHeight=9; // 
	var TriangleWidth=10;
	var TriangleLeftOffset=10; // offset for triangle from edge of balloon

	// get the Balloon and create it if needed
	 
	var TheToolTip=document.getElementById(ID);
	
	if (TheToolTip!=null)
	{
		document.body.removeChild(TheToolTip);
		TheToolTip=null;
	}
	
	if (TheToolTip==null)
	{
		TheToolTip=document.createElement("DIV"); // create the DIV element
	
		TheToolTip.id=ID; // set the ID so we can get it back
	
		document.body.appendChild(TheToolTip); // add the dialog element to the document
	}
/*	else
	{
		while (TheToolTip.firstChild) 
		{
			TheToolTip.removeChild(TheToolTip.firstChild);
		}
	}
*/
	// find the position of the balloon (from the bottom)
	
	var ScreenHeight=window.innerHeight;
	var ScrollTop=$(window).scrollTop();
	var ScreenWidth=window.innerWidth;
	var ScrollLeft=$(window).scrollLeft();

	var Above=true;
	if (MouseY<(ScreenHeight/2)) Above=false;
	
	var ToTheRight=false;
	if (MouseX<(ScreenWidth/2)) ToTheRight=true;
	
/*	Text="MouseY="+MouseY+" MouseX="+MouseX+" ScreenHeight="+ScreenHeight+" ScrollTop="+ScrollTop+" asdf asdf asdf asdf asdf asdf asf asdf asdf asdf asdf asdf asdf asdf asdfasdf asdf asdf asdf asdf asdf asf asdf asdf asdf asdf asdf asdf asdf asdfasdf asdf asdf asdf asdf asdf asf asdf asdf asdf asdf asdf asdf asdf asdfasdf asdf asdf asdf asdf asdf asf asdf asdf asdf asdf asdf asdf asdf asdf";
*/	
	//***********************************************
	// Position the balloon
	
	TheToolTip.style.position="absolute";	
	TheToolTip.style.width=Width+"px";
	
	if (ToTheRight)
	{
		var TheToolTipLeft=MouseX-(TriangleWidth/2)-Padding-(TriangleLeftOffset/2)+ScrollLeft; // jjg - not sure why the TriangleLeftOffset has to be divided by 2
		TheToolTip.style.left=TheToolTipLeft+"px";
	}
	else
	{
		var TheToolTipLeft=MouseX+(TriangleWidth/2)+Padding+(TriangleLeftOffset/2)+ScrollLeft-Width; // jjg - not sure why the TriangleLeftOffset has to be divided by 2
		TheToolTip.style.left=TheToolTipLeft+"px";
	}
	
	if (Above)
	{
		var TheToolTipBottom=ScreenHeight-MouseY-ScrollTop-TriangleHeight;
		TheToolTip.style.bottom=TheToolTipBottom+"px";
	}
	else
	{
		var TheToolTipTop=MouseY+TriangleHeight+ScrollTop;
		TheToolTip.style.top=TheToolTipTop+"px";
	}
//	TheToolTip.style.border='2px solid #ff0000';
	
	//********************************************
	// create the box in the div tag
	
	var TheBox=document.createElement("div");
	TheBox.innerHTML=Text;
	TheBox.style.padding=Padding+'px';
	TheBox.style.background='#000000';
	TheBox.style.color='#FFFFFF';
	TheBox.style.border='1px solid #cccccc';
	TheBox.style.opacity='0.8';
	TheBox.style.zIndex='99';
	TheBox.style.borderRadius='5px 5px 5px 5px';

	TheToolTip.appendChild(TheBox); // add the dialog element to the document
	
	//***********************************************
	// add the triangle
	
	var TheTriangle=document.createElement("div");
	TheToolTip.appendChild(TheTriangle); // add the dialog element to the document
	TheTriangle.style.content='';
	TheTriangle.style.display='block';
	
	TheTriangle.style.width='0';
	TheTriangle.style.height='0';
	
	TheTriangle.style.borderLeft='10px solid transparent';
	TheTriangle.style.borderRight='10px solid transparent';
	
		
	TheTriangle.style.position='absolute'; //This controls the location of the triangle
	
	if (ToTheRight)
	{
		TheTriangle.style.left=TriangleLeftOffset+'px';
	}
	else
	{
		TheTriangle.style.left=(Width-TriangleLeftOffset-TriangleWidth-Padding)+'px';
	}
	if (Above==false)
	{
		TheTriangle.style.borderBottom='10px solid #cccccc';
		
		TheTriangle.style.top=-TriangleHeight+'px'; // Changed this from top to bottom
	}
	else
	{
		TheTriangle.style.bottom=-TriangleHeight+'px'; // Changed this from top to bottom
		
		TheTriangle.style.borderTop='10px solid #cccccc';
	}
	
	//***********************************************
	// setup visibility

	TheToolTip.style.visibility="visible";
	TheTriangle.style.opacity='0.9';
	TheBox.style.zIndex='999';
	
	return(TheToolTip);
}
//******************************************************************
// GeoJSON untilities
//******************************************************************

/*
* This function allows another function to be applied to all the coordinates in a
* geomtry object.  The function should have the following form:
* 
* TheFunction(TheFunctionsParameter,TheCoordinateArray)
*/
CMUtilities.ApplyToGeometryCoordinates=function(TheGeometry,TheFunction,TheFunctionsParameter)
{
	var Num=0;
	
	if (TheGeometry.type=="Point") // coordinates contains one position [x,y]
	{
		TheFunction(TheFunctionsParameter,TheGeometry.coordinates);
	}
	else if ((TheGeometry.type=="MultiPoint")||
		(TheGeometry.type=="LineString")) // coordinates contains an array of positions [[x1,y1],[x2,y2],...]
	{
		for (var j=0;j<TheGeometry.coordinates.length;j++)
		{
			TheFunction(TheFunctionsParameter,TheGeometry.coordinates[j]);
		}
	}
	else if (TheGeometry.type=="Polygon"||
		(TheGeometry.type=="MultiLineString")) // coordinates contains an array of arrays of positions [[[x1,y1],[x2,y2],...]]]
	{
		for (var i=0;i<TheGeometry.coordinates.length;i++)
		{
			for (var j=0;j<TheGeometry.coordinates[i].length;j++)
			{
				TheFunction(TheFunctionsParameter,TheGeometry.coordinates[i][j]);
			}
		}
	}
	else if (TheGeometry.type=="MultiPolygon")
	{
		for (var i=0;i<TheGeometry.coordinates.length;i++)
		{
			for (var j=0;j<TheGeometry.coordinates[i].length;j++)
			{
				for (var k=0;k<TheGeometry.coordinates[i][j].length;k++)
				{
					TheFunction(TheFunctionsParameter,TheGeometry.coordinates[i][j][k]);
				}
			}
		}
	}
	else if (TheGeometry.type=="GeometryCollection")
	{
		for (var j=0;j<TheGeometry.geometries.length;j++)
		{
			Num+=GetNumGeoJSONCoordiantes(TheGeometry.geometries[j]);
		}
	}
	return(Num);
}
//******************************************************************
// Functions to find the TheBounds from GeoJSON coordinate data.
//******************************************************************

CMUtilities.UpdateGeoJSONCoordinateBounds=function(TheBounds,TheCoordinates)
{
	var X,Y;
	
	if (TheCoordinates!=undefined)
	{
		// For each individual coordinate in this feature's coordinates…
//		for (var j=0; j < TheCoordinates.length; j++) 
		{
			X=TheCoordinates[0];
			Y=TheCoordinates[1];
	
			if (Object.keys(TheBounds).length==0)
			{
				TheBounds.XMin=X;
				TheBounds.XMax=X;
				TheBounds.YMin=Y;
				TheBounds.YMax=Y;
			}
			else
			{
				// Update the TheBounds recursively by comparing the current
				// xMin/xMax and yMin/yMax with the coordinate 
				// we're currently checking
				if (TheBounds.XMin > X) TheBounds.XMin =X;
				if (TheBounds.XMax < X) TheBounds.XMax=X;
				if (TheBounds.YMin > Y) TheBounds.YMin =Y;
				if (TheBounds.YMax < Y) TheBounds.YMax =Y;
			}
		}
	}
}

//
// Returns true if the specified points is in the polygon.
//
CMUtilities.InGeoJSONPolygon=function(RefX,RefY,TheCoordinates)
{
	var Result=false;
	
	var Xs=[];
	var Ys=[];
	
	if (TheCoordinates!=undefined)
	{
		for (var j=0; j < TheCoordinates.length; j++) 
		{
			var X=TheCoordinates[j][0];
			var Y=TheCoordinates[j][1];
			
			Xs[j]=X;
			Ys[j]=Y;
		}
		Result=CMUtilities.InsideAPolygon(RefX,RefY,Xs,Ys,TheCoordinates.length)
	}
	return(Result);
}
//
CMUtilities.InGeoJSONPolyline=function(RefX,RefY,TheCoordinates,Tolerance)
{
	var Result=false;
	
	var Xs=[];
	var Ys=[];
	
	if (TheCoordinates!=undefined)
	{
		var X1=TheCoordinates[0][0];
		var Y1=TheCoordinates[0][1];
		for (var j=1; (j < TheCoordinates.length)&&(Result==false); j++) 
		{
			var X2=TheCoordinates[j][0];
			var Y2=TheCoordinates[j][1];
			
			var Distance=CMUtilities.DistanceToSegment(X1,Y1,X2,Y2,RefX,RefY);
			
			if (Distance<=Tolerance) Result=j-1;
		}
	}
	return(Result);
}


//******************************************************************
// Coordinate Formatting Utiliies
//******************************************************************
/*
* returns the appropriate symbol (N or S) for a coordinate value
*/
CMUtilities.GetSymbol=function(Value,EastWestFlag)
{
	var Symbol="N";
	if (EastWestFlag) Symbol="E";
	if (Value<0)
	{
		Symbol="S";
		if (EastWestFlag) Symbol="W";
	}
	return(Symbol);
}

CMUtilities.GetDMSFromDD=function(Value,EastWestFlag)
{
	var Symbol=CMUtilities.GetSymbol(Value,EastWestFlag);
	
	if (Value<0) Value=-Value;
	
	var Degrees=Math.floor(Value);
	
	Value=(Value-Degrees)*60;
	
	var Minutes=Math.floor(Value);
	
	Value=(Value-Minutes)*60;
	
	var Seconds=Math.floor(Value);
	
	var Text=Degrees+"&deg; "+Minutes+"' "+Seconds+"\" "+Symbol;
	
	return(Text);
}

/*
* Return an text string with latitude and longitude formatted as "40 30' 40" N 124 12' 32" S" (with the degree symbols)
*/

CMUtilities.GetDMSFromLonLat=function(Longitude,Latitude)
{
	var LongitudeText=CMUtilities.GetDMSFromDD(Longitude,true);
	var LatitudeText=CMUtilities.GetDMSFromDD(Latitude,false);
	
	var Text=LatitudeText+ " " +LongitudeText;
	
	return(Text);
}

/*
* Return an javascript object with latitude and longitude formatted as "40 30' 40" N 124 12' 32" S" (with the degree symbols)
*/
CMUtilities.GetDMSFromLonLatJSObject=function(Longitude,Latitude)
{
	var LongitudeText=CMUtilities.GetDMSFromDD(Longitude,true);
	var LatitudeText=CMUtilities.GetDMSFromDD(Latitude,false);
	
	var Result={
		Latitude: LatitudeText,
		Longitude: LongitudeText
	}
	
	return(Result);
}

/*
* Return a string formatted from an Easting and a Northing
*/
CMUtilities.GetTextFromEastingNorthing=function(Easting,Northing)
{
	var EastingSymbol=CMUtilities.GetSymbol(Easting,true);
	var NorthingSymbol=CMUtilities.GetSymbol(Northing,false);
	
	if (Easting<0) Easting=-Easting;
	if (Northing<0) Northing=-Northing;
						
	var Text=Easting+" "+EastingSymbol+" "+Northing+" "+NorthingSymbol;

	return(Text);
}
//******************************************************************
// Bounding box functions
//******************************************************************
CMUtilities.BoundsOverlap=function(Bounds1,Bounds2)
{
	var Result=false;
	
	if ((Bounds1.XMin<=Bounds2.XMax)&&
		(Bounds1.XMax>=Bounds2.XMin)&&
		(Bounds1.YMin<=Bounds2.YMax)&&
		(Bounds1.YMax>=Bounds2.YMin)) // inside primary dimensions
	{
		Result=true;
	}
	return(Result);
}
CMUtilities.CloneBounds=function(TheBounds)
{
	var clonedObject=
	{
  		XMin: TheBounds.XMin,
 		XMax: TheBounds.XMax,
 		YMin: TheBounds.YMin,
 		YMax: TheBounds.YMax
 	}
	return(clonedObject);
}
CMUtilities.AddToBounds=function(TheBounds,NewBounds)
{
	if (TheBounds==null) 
	{
		TheBounds=NewBounds;
	}
	else if (NewBounds!=null)
	{
		if (NewBounds.XMin<TheBounds.XMin) TheBounds.XMin=NewBounds.XMin;
		if (NewBounds.XMax>TheBounds.XMax) TheBounds.XMax=NewBounds.XMax;
		if (NewBounds.YMin<TheBounds.YMin) TheBounds.YMin=NewBounds.YMin;
		if (NewBounds.YMax>TheBounds.YMax) TheBounds.YMax=NewBounds.YMax;
	}
	return(TheBounds);
}
//******************************************************************
// Geometry calculations
//******************************************************************
/**
 * Computes the distance from a line segment to a point.
 * @param SX1 - X value of first line segement coordinate
 * @param SY1 - Y value of first line segement coordinate
 * @param SX2 - X value of second line segement coordinate
 * @param SY2 - Y value of second line segement coordinate
 * @param PX1 - X value of point
 * @param PY1 - Y value of point
 * @return - the minimum distance from the point to the segment
 */
CMUtilities.DistanceToSegment=function( SX1, SY1, SX2, SY2, PX1, PY1)
{
	var		Result=0;
	var		DistanceTo1=0;
	var		DistanceTo2=0;

	// find the distance to each of the points

	DistanceTo1=Math.sqrt((PX1-SX1)*(PX1-SX1)+(PY1-SY1)*(PY1-SY1));

	DistanceTo2=Math.sqrt((PX1-SX2)*(PX1-SX2)+(PY1-SY2)*(PY1-SY2));

//		Vector c = Point - a;	// Vector from a to Point

	// find the vector from the first line segement point to the target point
	
	var CX=PX1-SX1;
	var CY=PY1-SY1;

//		float d = (b - a).Length();	
	
	// find the length of the line segment
	
	var LengthOfLineSegment=Math.sqrt((SX1-SX2)*(SX1-SX2)+(SY1-SY2)*(SY1-SY2));
	
//		Vector v = (b - a).Normalize();	// Unit Vector from a to b

	// find the unit vector to go from the first line segement point to the second line segment point
	
	var VX=(SX2-SX1)/LengthOfLineSegment;
	var VY=(SY2-SY1)/LengthOfLineSegment;

//		float t = v.DotProduct(c);	// Intersection point Distance from a

	// find the dot product between the line segment vector and the vector from the line segement to the target point
	
	var T=VX*CX+VY*CY;

	// Check to see if the point is on the line
	// if not then return the endpoint
	
	// if T is negative then the intersection is before the first line segment
	// if T is greater than the length of the line segment then the intersection is after the second line segment point
	// otherwise, the intersection is between the two line segment points (i.e. on the line segment)
	
	if (T < 0) Result=DistanceTo1; // intersection is before the line segement point 1
	else if (T > LengthOfLineSegment) Result=DistanceTo2; // insertsection is after the line segement point 2
	else // insertsection is in the line segement
	{
		// find the point of intersection
		
		var IX=SX1+VX*T;
		var IY=SY1+VY*T;

		// find the dsitance from the intersection point to the target point
		 
		Result=Math.sqrt((IX-PX1)*(IX-PX1)+(IY-PY1)*(IY-PY1));
	}

	return(Result);
}

//******************************************************************
// Functions to Determine if a coordinate is inside a feature and
// which feature it is in.
//******************************************************************
/**
 * Return an array with the coeficients for a line through two points
 * @param X1 horizontal value for the first point
 * @param Y1
 * @param X2
 * @param Y2
 * @return an array with [0]=m, [1]=b
 */
CMUtilities.GetLineFactors=function( X1, Y1, X2, Y2)
{
	var			b;
	var			m;
	var Result=[2];
	
	if (Y1==Y2) // the line is horizontal at Y1
	{
		b=Y1; // y intercept of the x origin line

		m=0; // slope relative to y (normally x)
	}
	else if (X1==X2) // the line is vertical at X1
	{
		m=Double.POSITIVE_INFINITY;
		b=Double.NaN;
	}
	else
	{
		m=(Y2-Y1)/(X2-X1); // slope relative to y (normally x)
		
//			double b1=(X1*Y2-X2*Y1)/(X1-X2); // x intercept of the y origin line

		b=Y1-(X1*m);
	}
	Result[0]=m;
	Result[1]=b;
	
	return(Result);
}
/**
 * Utility function for Inside()
 * @param StartX
 * @param StartY
 * @param EndX
 * @param EndY
 * @param RefX
 * @param RefY
 * @return 
 */
CMUtilities.FindNumLineCrossingsToTheRight=function( StartX, StartY, EndX, EndY, RefX, RefY)
{
	var NumCrossings=0;
	
	if (StartY!=EndY) // ignore flat lines
	{
		if ((StartX>RefX)||(EndX>RefX)) // the line could be to the right of the point
		{
			if (((StartY<RefY)&&(EndY>RefY))||
				(StartY>RefY)&&(EndY<RefY)) // point y coordinate values is bounded by Y coordinates values
			{
				if (StartX==EndX) // have to special case a vertical line (m=inifinity and b=NaN)
				{
					if (RefX<StartX) // vertical line is to the right of the point
					{
						NumCrossings++; 
					}
				}
				else
				{
					Factors=CMUtilities.GetLineFactors(StartX,StartY,EndX,EndY);

					var m=Factors[0];
					var b=Factors[1];
					var x=(RefY-b)/m;

					if (RefX<x) // horizontal line through the point crosses the line to the right of the point
					{
						NumCrossings++;
					}
				}
			}
		}
	}
	return(NumCrossings);
}
/**
 * Determines if the specified point is within the specified polygon.
 * This is done by counting the number of line segements from the polygon
 * that a horiziontal line through the point would intersect with.
 * If the number of lines is odd, then the point is inside the polygon.
 * If the number of lines is even, then the point is outside.
 * 
 * Most similar algorithms do not deal with flat lines very well.  The problem
 * is that there can be a flat line to the right of the point.  This approach:
 * - Does not check the start and end points in the FindNumLineCrossingsToTheRight()
 * function.  These are special cased.
 * - Flat areas are "ignored" 
 * - When the point of interest is at the same Y value as a point in the polygon:
 *	- When the direction of a flat area changes, there is not crossing (peak or valley with a flat top or bottom)
 *  - For non flat areas the approach is the same, if the direction changes, we're on a peak or vally and the number of crossings does not change.
 * 
 * @param RefX
 * @param RefY
 * @param Xs - array of x coordinate values, does not need to close
 * @param Ys
 * @param NumPoints
 * @return 
 */
CMUtilities.InsideAPolygon=function(RefX,RefY,Xs,Ys,NumPoints)
{
	var Result=false;
	var NumCrossings=0;
	var LastYDirection=0;
	var NewYDirection=0;
	
	// find the previous direction
	
	for (var i=0;i<NumPoints-1;i++)
	{
		if (Ys[i+1]>Ys[i]) LastYDirection=1;
		else if (Ys[i+1]<Ys[i]) LastYDirection=-1;
	}
	
	// if we are already on a flat area (from previous segment), do not count it as it will be counted when it comes around
	
	var OnFlat=false;
	if ((Ys[NumPoints-1]==Ys[0])&&(RefY==Ys[0])&&(RefX<Xs[0])&&(RefX<Xs[NumPoints-1])) 
	{
		OnFlat=true;
	}
	
	// check each point
	
	for (var i=0;i<NumPoints;i++)
	{
		// find the next to the next point (it's the first point for the last segement)
		
		var NextIndex=i+1;
		if (NextIndex==NumPoints) NextIndex=0;
		
		// determine if we are even with a flat segment
		
		if (Ys[i]==Ys[NextIndex]) // special case flat lines
		{
			if (RefY==Ys[i]) // we are on a flat line that is coincident with the point
			{
				if ((RefX<Xs[i])&&(RefX<Xs[NextIndex])) 
				{
					// record that we have a flat line to the right (counts as intercept if direction stays the sme)
					
					OnFlat=true;
				}
			}
		}
		else // we are on a sloped line
		{
			// determine the new direction we are moving in (up or down)

			if (Ys[NextIndex]>Ys[i]) NewYDirection=1;
			else if (Ys[NextIndex]<Ys[i]) NewYDirection=-1;

			// update the number of crossings
			
			if (OnFlat) // we were on a flat segement with the same Y value as RefY
			{
				if (NewYDirection==LastYDirection) // the direction has stayed the same
				{
					NumCrossings++; // add a crossing
				}
			}
			else // were not on a flat section
			{
				if (Ys[i]==RefY) // check the start point
				{
					if (RefX<Xs[i]) // were to the left of the start point
					{
						if (NewYDirection==LastYDirection) // direction has stayed the same (i.e. we are not next to a peak or valley)
						{
							NumCrossings++;
						}
					}
				}
				else
				{
					NumCrossings+=CMUtilities.FindNumLineCrossingsToTheRight(Xs[i],Ys[i],Xs[NextIndex],Ys[NextIndex],RefX,RefY);
				}
			}			
			
			// update variables
			
			OnFlat=false; // we're no longer on a flat section
			
			LastYDirection=NewYDirection; // save the current direction for next time
		}
	}
	
	// if the number of crossings is odd, we are inside the polygon
	
	if ((NumCrossings%2)==1) 
	{
		Result=true;
	}
	return(Result);
}
CMUtilities.GetPolygonBounds=function(Xs,Ys,NumPoints)
{
	var Result=null;
	
	if (NumPoints>0)
	{
		var XMin=Xs[0];
		var XMax=Xs[0];
		var YMin=Ys[0];
		var YMax=Ys[0];
			
		for (var i=1;i<NumPoints;i++)
		{
			if (Xs[i]<XMin) XMin=Xs[i];
			if (Xs[i]>XMax) XMax=Xs[i];
			if (Ys[i]<YMin) YMin=Ys[i];
			if (Ys[i]>YMax) YMax=Ys[i];
		}
		Result={
			XMin:XMin,
			XMax:XMax,
			YMin:YMin,
			YMax:YMax
		}
	}
	return(Result);
}

CMUtilities.GetSeconds=function()
{
	var d = new Date();
	var n = d.getTime();
	return(n/1000);
}
