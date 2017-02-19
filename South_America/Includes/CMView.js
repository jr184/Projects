//******************************************************************
// CMView Class
//******************************************************************

// tool definitions

CMView.TOOL_HAND=1; // pan the map
CMView.TOOL_INFO=2; // click to get information on features
CMView.TOOL_EDIT=3; // user is editing existing spatial data 
CMView.TOOL_ADD=4; // user is adding data
//var TOOL_SELECT=5; // combined with INFO on the web

//******************************************************************
// Constructors
//******************************************************************
function CMView() 
{
	this.TheScene=null;
	
	this.RefX=0; // Left edge of the map
	this.RefY=0; // Top of the map
	
	this.ZoomLevel=0; // most zoomed in (typically 1 meter, may be a fraction of a degree)
	
	this.MinScale=1.0; // scale is computed from this (Scale=RefUnits per Pixel (Ref/Pixel))
	
	this.MinZoom=-100000; // a really big negative number
	this.MaxZoom=100000; // a really big positive number
	
	this.TheCanvas=null;
	
	// Get the drawing context from our <canvas> 
	
	this.TheContext=null;
	
	this.CurrentTool=CMView.TOOL_HAND;
	this.Dragging=false;
	this.DragRefX=0;
	this.DragRefY=0;
	
	this.MaxBounds=null;
}

//******************************************************************
// Private CMView Functions (should not need to be called from outside this class)
//******************************************************************

CMView.prototype.Private_CheckMaxBounds=function()
{
	var TheScale=this.GetScale();
	
	var RefWidth=this.TheCanvas.width*TheScale;
	var RefHeight=-this.TheCanvas.height*TheScale;
	
	if (this.MaxBounds!=null)
	{
		if ((this.MaxBounds.XMax-this.MaxBounds.XMin)<RefWidth) // area is smaller than allowed, center the data
		{
			// center on the center of the max bounds
			
			var NewCenterRefX=((this.MaxBounds.XMax+this.MaxBounds.XMin)/2);
			
			this.RefX=NewCenterRefX-(RefWidth/2);
		}
		else
		{
			if (this.RefX<this.MaxBounds.XMin) this.RefX=this.MaxBounds.XMin;
			if ((this.RefX+RefWidth)>this.MaxBounds.XMax) this.RefX=this.MaxBounds.XMax-RefWidth;
		}
		
		if ((this.MaxBounds.YMax-this.MaxBounds.YMin)<-RefHeight) // area is smaller than allowed, center the data
		{
			// center on the center of the max bounds
			
			var NewCenterRefY=((this.MaxBounds.YMax+this.MaxBounds.YMin)/2);
			
			this.RefY=NewCenterRefY-(RefHeight/2);
		}
		else
		{
			if (this.RefY>this.MaxBounds.YMax) this.RefY=this.MaxBounds.YMax;
		
			if ((this.RefY+RefHeight)<this.MaxBounds.YMin) this.RefY=this.MaxBounds.YMin-RefHeight;
		}
	}
}

//******************************************************************
// Public CMView Functions
//******************************************************************

CMView.prototype.SetMinScale=function(MinScale) { this.MinScale=MinScale; }

CMView.prototype.SetScene=function(NewScene)
{
	this.TheScene=NewScene;
}
CMView.prototype.Setup=function(TheCanvas)
{
//   	this.CanvasID=CanvasID;
	
	this.TheCanvas=TheCanvas;
//	this.TheCanvas=document.getElementById(this.CanvasID);
	
	// Get the drawing context from our <canvas> 
	
	this.TheContext=this.TheCanvas.getContext('2d');
}

//******************************************************************
// Public CMView Functions
//******************************************************************
CMView.prototype.GetContext=function()
{
	return(this.TheContext);
}
/*
* Returns the current scale in RefUnits per pixel
*/
CMView.prototype.GetScale=function()
{
	var CurrentScale=Math.pow(2,-this.ZoomLevel)*this.MinScale;
	
	return(CurrentScale);
}

CMView.prototype.GetExtent=function()
{
	var TheExtent={};
	
	var TheScale=this.GetScale();
	
	TheExtent.XMin=this.RefX;
	TheExtent.YMax=this.RefY;
	TheExtent.XMax=this.RefX+(this.TheCanvas.width*TheScale);
	TheExtent.YMin=this.RefY-(this.TheCanvas.height*TheScale);
	
	return(TheExtent);
}

//*******************************************************************
// Mouse events
//*******************************************************************
CMView.prototype.MouseDown=function(TheEvent)
{
	if (!TheEvent) { TheEvent=window.event; }
	
	CanvasMap.HidePopupWindow();
	
	var Coordinate=CMUtilities.GetElementCoordinate(TheEvent.clientX,TheEvent.clientY,this.TheCanvas);
	var PixelX=Coordinate.x;
	var PixelY=Coordinate.y;
	
	if (this.CurrentTool==CMView.TOOL_HAND) // dragging the scene around in the view
	{
		// get the current position of the mouse in ref coordinates and save it
		
		this.DragX=this.GetRefXFromPixelX(PixelX);
		this.DragY=this.GetRefYFromPixelY(PixelY);
		this.Dragging=true;
		Used=true;
	}
	else //if (this.CurrentTool==CMView.TOOL_INFO) // pass the mousedown to the scene
	{
		var RefX=this.GetRefXFromPixelX(PixelX);
		var RefY=this.GetRefYFromPixelY(PixelY);
		
		var Used=this.TheScene.MouseDown(this,RefX,RefY);
	}
	return(Used);
}

CMView.prototype.MouseMove=function(TheEvent)
{
	if (!TheEvent) { TheEvent=window.event; }

	var Coordinate=CMUtilities.GetElementCoordinate(TheEvent.clientX,TheEvent.clientY,this.TheCanvas);
	var PixelX=Coordinate.x;
	var PixelY=Coordinate.y;
	
	if (this.Dragging==true)
	{
		var RefWidth=this.GetRefWidthFromPixelWidth(PixelX);
		var RefHeight=this.GetRefHeightFromPixelHeight(PixelY);
		
		this.RefX=this.DragX-RefWidth;
		this.RefY=this.DragY-RefHeight;
		
		this.Private_CheckMaxBounds();
		
		this.TheScene.ViewMoved(this);
//		this.SendMessage(this,VIEW_MOVED);
		
		this.Paint();
	}
	else //if  (this.CurrentTool==CMView.TOOL_INFO)
	{
		var RefX=this.GetRefXFromPixelX(PixelX);
		var RefY=this.GetRefYFromPixelY(PixelY);
		
		var Used=this.TheScene.MouseMove(this,RefX,RefY);
	}
}
CMView.prototype.MouseUp=function(TheEvent)
{
	if (!TheEvent) { TheEvent=window.event; }
	
	var Coordinate=CMUtilities.GetElementCoordinate(TheEvent.clientX,TheEvent.clientY,this.TheCanvas);
	var PixelX=Coordinate.x;
	var PixelY=Coordinate.y;
	
	if (this.Dragging)
	{
		this.DragX=0;
		this.DragY=0;
		this.Dragging=false;
	}
	else //if (this.CurrentTool==CMView.TOOL_INFO)
	{
		var RefX=this.GetRefXFromPixelX(PixelX);
		var RefY=this.GetRefYFromPixelY(PixelY);
		
		var Used=this.TheScene.MouseUp(this,RefX,RefY);
	}

}
CMView.prototype.MouseWheel=function(TheEvent)
{
	CanvasMap.HidePopupWindow();
	
	if (!TheEvent) { TheEvent=window.event; }
	
	var Delta=TheEvent.detail? TheEvent.detail*(-120) : TheEvent.wheelDelta //delta returns +120 when wheel is scrolled up, -120 when scrolled down
//	var Delta=TheEvent.detail*-120;
	
	if (Delta!=0)	
	{
		// get the current position of the mouse
		
		var NewZoomLevel=this.ZoomLevel;
		
		if (Delta>0)
		{
			NewZoomLevel=NewZoomLevel+1;
		}
		else
		{
			NewZoomLevel=NewZoomLevel-1;
		}
		
		if (NewZoomLevel<this.MinZoom) NewZoomLevel=this.MinZoom;
		if (NewZoomLevel>this.MaxZoom) NewZoomLevel=this.MaxZoom;
	
		if (NewZoomLevel!=this.ZoomLevel)
		{
			// find the position to zoom to
			
			var Coordinate=CMUtilities.GetElementCoordinate(TheEvent.clientX,TheEvent.clientY,this.TheCanvas);
			var MousePixelX=Coordinate.x;
			var MousePixelY=Coordinate.y;
	
			
			var MouseRefX=this.GetRefXFromPixelX(MousePixelX);
			var MouseRefY=this.GetRefYFromPixelY(MousePixelY);
		
//			var MousePixelX=TheEvent.clientX;
//			var MousePixelY=TheEvent.clientY;
			
			// find the offset to the current mouse position in reference units
			
//			var CanvasWidth=this.TheCanvas.width;
//			var CanvasHeight=this.TheCanvas.height;
			
//			var DeltaPixelWidth=TheEvent.clientX-(CanvasWidth/2);
//			var DeltaPixelHeight=TheEvent.clientY-(CanvasHeight/2);
			
//			var DeltaRefWidth=this.GetRefWidthFromPixelWidth(DeltaPixelWidth);
//			var DeltaRefHeight=this.GetRefHeightFromPixelHeight(DeltaPixelHeight);
			
//			var CenterRefX=RefX-DeltaRefWidth;
//			var CenterRefY=RefY-DeltaRefHeight;
			
			this.ZoomLevel=NewZoomLevel;
			
			var NewMouseRefWidth=this.GetRefWidthFromPixelWidth(MousePixelX);
			var NewMouseRefHeight=this.GetRefHeightFromPixelHeight(MousePixelY);
			
			this.RefX=MouseRefX-NewMouseRefWidth; // subtract from the mouse back to the left (west)
			this.RefY=MouseRefY-NewMouseRefHeight; // add the height to move up to the north
			
//			this.Private_CheckMaxBounds();
			
			this.TheScene.ZoomLevelChanged(this);
/*	var TheScale=this.GetScale();
	
	var RefWidth=this.TheCanvas.width*TheScale; // pixels to width
	var RefHeight=this.TheCanvas.height*TheScale;
	
	this.RefX=RefX-(RefWidth/2);
	this.RefY=RefY+(RefHeight/2);
			this.SetRefCenter(CenterRefX,CenterRefY);
*/			this.Paint();
		}
	}
	// prevent the wheele from scrolling the page
	
	if (TheEvent.preventDefault)  TheEvent.preventDefault()
	
	return(false);
}
//*******************************************************************
// 
//*******************************************************************
CMView.prototype.SetMaxBounds=function(MaxBounds)
{
	this.MaxBounds=MaxBounds;
}

CMView.prototype.SetZoomRange=function(MinZoom,MaxZoom)
{
	this.MinZoom=MinZoom;
	this.MaxZoom=MaxZoom;
}


/**
* Sets the center of the map to the specified coordinate
*/
CMView.prototype.SetRefCenter=function(RefX,RefY)
{
	var TheScale=this.GetScale();
	
//	alert("Canvas Diemsniosn="+this.TheCanvas.width+", "+this.TheCanvas.height);
//	alert("Original RefX="+RefX+", "+RefY);
	var RefWidth=this.TheCanvas.width*TheScale;
	var RefHeight=this.TheCanvas.height*TheScale;
//	alert("RefWidth="+RefWidth+", "+RefHeight);
	this.RefX=RefX-(RefWidth/2);
	this.RefY=RefY+(RefHeight/2);
//	alert("refX="+this.RefX+", "+this.RefY);
	//this.Private_CheckMaxBounds();

	this.Paint();
}
/**
* Returns the coordinate that is in the center of the view
*/
CMView.prototype.GetRefCenter=function()
{
	var TheScale=this.GetScale();
	
	var RefWidth=this.TheCanvas.width*TheScale;
	var RefHeight=this.TheCanvas.height*TheScale;

	var Result={
		RefX:this.RefX+(RefWidth/2),
		RefY:this.RefY-(RefHeight/2)
	};
	
	return(Result);
}
/*
* Zooms the view to the specified bounds.  Selects a zoom level that will
* contain the entire map.
*/
CMView.prototype.ZoomToBounds=function(NewBounds)
{
	if (NewBounds==null) alert("Sorry, you cannot call CMView.ZoomToBounds(NewBounds) with NewBounds=null.");
	else
	{
		var width=this.TheCanvas.width;
		var height=this.TheCanvas.height;	
		
		// Determine how much to TheScale our coordinates by
		var TheScale=Math.abs(NewBounds.XMax - NewBounds.XMin)/width;
		var yScale=Math.abs(NewBounds.YMax - NewBounds.YMin)/height;
		
		if (TheScale < yScale)  TheScale=yScale; // if xScale < yScale, use xScale, else use yScale
		
		// zoom out until we find a zoom level that is appropriate
		
		this.ZoomLevel=20;
		if (this.ZoomLevel>this.MaxZoom) this.ZoomLevel=this.MaxZoom;
		
		while ((this.GetScale()<TheScale)&&(this.ZoomLevel>this.MinZoom))
		{
			this.ZoomLevel--;
		}
		var CenterRefX=(NewBounds.XMax+NewBounds.XMin)/2;
		var CenterRefY=(NewBounds.YMin+NewBounds.YMax)/2;
		
		this.SetRefCenter(CenterRefX,CenterRefY);
		
		this.TheScene.ZoomLevelChanged(this);
	}
}
CMView.prototype.ZoomIn=function()
{
	this.ZoomTo(this.ZoomLevel+1);
}
CMView.prototype.ZoomOut=function()
{
	this.ZoomTo(this.ZoomLevel-1);
}
CMView.prototype.ZoomTo=function(ZoomLevel)
{
	if (ZoomLevel<this.MinZoom) ZoomLevel=this.MinZoom;
	if (ZoomLevel>this.MaxZoom) ZoomLevel=this.MaxZoom;
	
	if (ZoomLevel!=this.ZoomLevel)
	{
		var RefX=this.GetRefXFromPixelX(this.TheCanvas.width/2);
		var RefY=this.GetRefYFromPixelY(this.TheCanvas.height/2);
	
		this.ZoomLevel=ZoomLevel;
	
		this.SetRefCenter(RefX,RefY);
		this.TheScene.ZoomLevelChanged(this);
		this.Paint();
	}
}
/**
* Zoom to the maxum bounds that have been set in the veiw
*/
CMView.prototype.ZoomToMaxBounds=function()
{
	this.ZoomToBounds(this.MaxBounds);
}
/**
* Returns the current zoom level.  1 is one pixel per one map unit, doubles with each
* zoom in so 2 is two pixels per map unit, 3 is 4 pixels per map unit, 4 is 16 pixels per map unit, etc.
*/
CMView.prototype.GetZoomLevel=function()
{
	return(this.ZoomLevel);
}

/**
* Change the current tool that will be used when the user clicks with 
* the mouse 
*/
CMView.prototype.SetTool=function(NewTool)
{
	 switch(NewTool)
	 {
	case CMView.TOOL_HAND:
		this.TheCanvas.style.cursor="move";
		break;
	case CMView.TOOL_INFO:
		this.TheCanvas.style.cursor="crosshair";
		break;
	case CMView.TOOL_EDIT:
		this.TheCanvas.style.cursor="crosshair";
		break;
	 }

	this.CurrentTool=NewTool;
}

CMView.prototype.GetTool=function() { return(this.CurrentTool); }

//******************************************************************
// Functions to convert from PixelXs to RefXs (geographic) and back.
//******************************************************************
CMView.prototype.GetPixelXFromRefX=function(RefX) 
{
 	var PixelX;
	
	var TheScale=this.GetScale();
	PixelX=(RefX - this.RefX) / TheScale;
	
	return(PixelX);
}
//function GetPixelYFromRefY(RefY)
CMView.prototype.GetPixelYFromRefY=function(RefY) 
{
 	var TheScale=this.GetScale();
	var PixelY=(this.RefY - RefY) / TheScale;
	
	return(PixelY);
};
CMView.prototype.GetPixelFromRef=function(RefX,RefY) 
{
	var PixelX=this.GetPixelXFromRefX(RefX);
	var PixelY=this.GetPixelYFromRefY(RefY);
	
	var Result=
	{
  		PixelX: PixelX,
 		PixelY: PixelY
 	}
	return(Result);
}
CMView.prototype.GetPixelWidthFromRefWidth=function(RefWidth) 
{
	var TheScale=this.GetScale();
 	var PixelWidth=RefWidth/TheScale;
	
	return(PixelWidth);
}
CMView.prototype.GetPixelHeightFromRefHeight=function(RefHeight) 
{
	var TheScale=this.GetScale();
	var PixelHeight=-RefHeight/TheScale;
	
	return(PixelHeight);
}
//*******************************************************************
// Functions to convert from reference coordinates to pixel coordinates
//*******************************************************************
CMView.prototype.GetRefWidthFromPixelWidth=function(PixelWidth) 
{
	var TheScale=this.GetScale();
 	var RefWidth=PixelWidth*TheScale;
	
	return(RefWidth);
}
CMView.prototype.GetRefHeightFromPixelHeight=function(PixelHeight) 
{
	var TheScale=this.GetScale();
 	var RefHeight=-PixelHeight*TheScale;
	
	return(RefHeight);
}
CMView.prototype.GetRefXFromPixelX=function(PixelX) 
{
	var TheScale=this.GetScale();
	var RefX=PixelX*TheScale+this.RefX;
	
	return(RefX);
};
CMView.prototype.GetRefYFromPixelY=function(PixelY) 
{
	var TheScale=this.GetScale();
	var RefY=-(PixelY*TheScale-this.RefY);
	
	return(RefY);
};
//*******************************************************************
// Functions to paint
//*******************************************************************
/**
* New style is an array of key value pairs (i.e.  objects)
*/

CMView.prototype.SetStyle=function(NewStyle,SaveCurrentStyle) 
{
	if (SaveCurrentStyle!==false) this.TheContext.save();
	
	if (NewStyle!=null)
	{
		for (var key in NewStyle)
		{
			var Value=NewStyle[key];
			
			this.TheContext[key]=Value;
		}
	}
}
CMView.prototype.SaveStyle=function() 
{
	this.TheContext.save();
}
CMView.prototype.RestoreStyle=function(NewStyle) 
{
	this.TheContext.restore();
}
CMView.prototype.Paint=function() 
{
//	var GeographicGrid=Grids[0];
	
	this.TheContext.clearRect(0,0,this.TheCanvas.width,this.TheCanvas.height);
	this.TheScene.Paint(this);
	
};

//*******************************************************************
// Functions to convert from reference coordinates to pixel coordinates
//*******************************************************************
CMView.prototype.InDocumentPixel=function(PixelX,PixelY) 
{
//	var canvas=document.getElementById(this.CanvasID);
    var rect=this.TheCanvas.getBoundingClientRect();
 	
	var PixelX=PixelX-rect.left;
	var PixelY=PixelY-rect.top;
  	
	var Result=this.InCanvasPixel(PixelX,PixelY);
	
	return(Result);
}
CMView.prototype.InCanvasPixel=function(PixelX,PixelY) 
{
	var RefX=this.GetRefXFromPixelX(PixelX);
	var RefY=this.GetRefYFromPixelY(PixelY);
	
	//print("X: "+RefX+" RefY: "+RefY);
	
	var Result=null;
	for (var i=0;(i<this.Layers.length)&&(Result==null);i++)
	{
		var FeatureIndex=this.Layers[i].In(TheView,RefX,RefY);
		
		if (FeatureIndex!=-1)
		{
			Result=
			{ 
				TheLayer: this.Layers[i],
				FeatureIndex: FeatureIndex
			};
		}
	}
	
//	print("FeatureIndex: "+FeatureIndex);
	
	return(Result);
};

//*******************************************************************
// Functions to paint simple graphic elements with pixel coordinates
//*******************************************************************
CMView.prototype.PaintImage=function(TheImage,PixelX,PixelY)
{
	this.TheContext.drawImage(TheImage,PixelX,PixelY);
};
CMView.prototype.PaintBackground=function(Color)
{
	if (Color!=null) 
	{
		this.TheContext.fillStyle=Color;
		this.TheContext.fillRect(0,0,this.TheCanvas.width,this.TheCanvas.height);
	}
};
CMView.prototype.PaintCircle=function(X,Y,RadiusInPixels)
{
	this.TheContext.beginPath();
	
	this.TheContext.arc(X,Y,RadiusInPixels,0,2*Math.PI);
	
	if (this.TheContext.strokeStyle!=null) this.TheContext.stroke();
	if (this.TheContext.fillStyle!=null) this.TheContext.fill();
};

CMView.prototype.PaintRect=function(PixelXMin,PixelXMax,PixelYMin,PixelYMax)
{
	var OldStyle=this.TheContext.strokeStyle;
	if (this.TheContext.strokeStyle!=null) this.TheContext.strokeRect(PixelXMin,PixelYMin,PixelXMax-PixelXMin,PixelYMax-PixelYMin);
	if (this.TheContext.fillStyle!=null) this.TheContext.fillRect(PixelXMin,PixelYMin,PixelXMax-PixelXMin,PixelYMax-PixelYMin);
}

//*******************************************************************
// Functions to paint simple graphic elements with reference coordinates
//*******************************************************************
CMView.prototype.PaintRefBounds=function(TheBounds)
{
	this.PaintRefRect(TheBounds.XMin,TheBounds.XMax,TheBounds.YMin,TheBounds.YMax);
}
CMView.prototype.PaintRefRect=function(XMin,XMax,YMin,YMax)
{
	var Result=this.GetPixelFromRef(XMin,YMax);
	var PixelXMin=Result.PixelX;
	var PixelYMin=Result.PixelY;
	
	var Result=this.GetPixelFromRef(XMax,YMin);
	var PixelXMax=Result.PixelX;
	var PixelYMax=Result.PixelY;
	
	this.PaintRect(PixelXMin,PixelXMax,PixelYMin,PixelYMax);
};
/*
* Function to draw a circle from a reference coordinate
*/
CMView.prototype.PaintRefCircle=function(X,Y,RadiusInPixels)
{
	var Result=this.GetPixelFromRef(X,Y);
	var XInPixels=Result.PixelX;
	var YInPixels=Result.PixelY;
	
	this.PaintCircle(XInPixels,YInPixels,RadiusInPixels);
};
/*
* Function to draw text using reference coordinates
*/
CMView.prototype.PaintRefText=function(X,Y,Text)
{
	var Result=this.GetPixelFromRef(X,Y);
	var XInPixels=Result.PixelX;
	var YInPixels=Result.PixelY;
	
	this.TheContext.fillText(Text,XInPixels,YInPixels);
}
/*
* Function to draw a line.
*/
CMView.prototype.PaintRefLine=function(X1,Y1,X2,Y2)
{
	var Result=this.GetPixelFromRef(X1,Y1);
	var XInPixels1=Result.PixelX;
	var YInPixels1=Result.PixelY;
	
	var Result=this.GetPixelFromRef(X2,Y2);
	var XInPixels2=Result.PixelX;
	var YInPixels2=Result.PixelY;
	
	this.TheContext.beginPath();
	this.TheContext.moveTo(XInPixels1,YInPixels1);
	this.TheContext.lineTo(XInPixels2,YInPixels2);
	this.TheContext.stroke();
}
CMView.prototype.PaintRefPoly2=function(Xs,Ys,Closed,Stroke)
{
	if (Xs!=undefined)
	{
		// draw each additional coordinate that is greater than one pixel from the current coordinate
		
		var PixelX;
		var PixelY;
		var FirstPixelX;
		var FirstPixelY;
		var LastPixelX;
		var LastPixelY;
		
		for (var j=0; j < Xs.length; j++) 
		{
			var RefX=Xs[j];
			var RefY=Ys[j];
	
			// Scale the points of the coordinate
			
			Result=this.GetPixelFromRef(RefX,RefY);
			var PixelX=Math.round(Result.PixelX);
			var PixelY=Math.round(Result.PixelY);
			
			if (j==0) // fist segment
			{
				this.TheContext.beginPath();
				this.TheContext.moveTo(PixelX, PixelY);
		
				FirstPixelX=PixelX;
				FirstPixelY=PixelY;
		
				LastPixelX=PixelX;
				LastPixelY=PixelY;
			}
			if ((PixelX!=LastPixelX)||(PixelY!=LastPixelY))
			{
				this.TheContext.lineTo(PixelX, PixelY); 
				
				LastPixelX=PixelX;
				LastPixelY=PixelY;
			}
		}
	
		// Fill the path we just finished drawing with color
		if (Closed) 
		{
			this.TheContext.lineTo(FirstPixelX, FirstPixelY); 
			this.TheContext.fill();
		}
		if (Stroke===true) this.TheContext.stroke();
	}
}
//**********************************************************
// Functions to paint raster data with reference coordinates
//**********************************************************
/*
* Function to draw a raster using a bounding box in reference coordinates
*/
/*
CMView.prototype.PaintRefRaster=function(TheImage,TheBounds) 
{
	var Result=this.GetPixelFromRef(TheBounds.XMin,TheBounds.YMax);
	var PixelXMin=Result.PixelX;
	var PixelYMin=Result.PixelY;
	
	var Result=this.GetPixelFromRef(TheBounds.XMax,TheBounds.YMin);
	var PixelXMax=Result.PixelX;
	var PixelYMax=Result.PixelY;
	
	this.TheContext.drawImage(TheImage,PixelXMin,PixelYMin,PixelXMax-PixelXMin,PixelYMax-PixelYMin);
}*/
/*
* Function to draw a raster using a bounding box in reference coordinates
*/
CMView.prototype.PaintRefImage=function(TheImage,RefX,RefY) 
{
	var Result=this.GetPixelFromRef(RefX,RefY);
	var XInPixels1=Result.PixelX;
	var YInPixels1=Result.PixelY;
	
//	var PixelWidth=this.GetPixelWidthFromRefWidth();
	
	this.TheContext.drawImage(TheImage,XInPixels1,YInPixels1);
}
/*
* Function to draw a raster using a bounding box in reference coordinates
* The second parameter may be a RefX or a Bounds object.
*/
CMView.prototype.PaintRefImageScaled=function(TheImage,RefX,RefY,RefWidth,RefHeight)
{
	var Type=typeof(RefX);
	
	if (Type=="object")
	{
		TheBounds=RefX;
		
		RefX=TheBounds.XMin;
		RefY=TheBounds.YMax;
		RefWidth=TheBounds.XMax-TheBounds.XMin;
		RefHeight=TheBounds.YMin-TheBounds.YMax;
	}
	
	var Result=this.GetPixelFromRef(RefX,RefY);
	var XInPixels1=Result.PixelX;
	var YInPixels1=Result.PixelY;
	
	var PixelWidth=this.GetPixelWidthFromRefWidth(RefWidth);
	var PixelHeight=this.GetPixelHeightFromRefHeight(RefHeight);
	
	this.TheContext.drawImage(TheImage,XInPixels1,YInPixels1,PixelWidth,PixelHeight);
}
//**********************************************************
// Functions to draw using coordinates in arrays with:
// TheCoordinates[n][0] - X
// TheCoordinates[n][1] - Y
// These are compatible with GeoJSON coordinates.
//**********************************************************
/*
* Draw a simple poly using the specified coordinates
*/
CMView.prototype.PaintRefPolygon=function(TheCoordinates)
{
	this.PaintRefPoly(TheCoordinates,true);
}
CMView.prototype.PaintRefLineString=function(TheCoordinates)
{
	this.PaintRefPoly(TheCoordinates,false);
}
CMView.prototype.PaintRefPoly=function(TheCoordinates,Closed)
{
	if (TheCoordinates!=undefined)
	{
		// get the starting coordinates
		
		var RefX=TheCoordinates[0][0];
		var RefY=TheCoordinates[0][1];

		var Result=this.GetPixelFromRef(RefX,RefY);
		var PixelX=Math.round(Result.PixelX);
		var PixelY=Math.round(Result.PixelY);
		
		this.TheContext.beginPath();
		this.TheContext.moveTo(PixelX, PixelY);
		
		var LastPixelX=PixelX;
		var LastPixelY=PixelY;
		
		// draw each additional coordinate that is greater than one pixel from the current coordinate
		
		for (var j=1; j < TheCoordinates.length; j++) 
		{
			RefX=TheCoordinates[j][0];
			RefY=TheCoordinates[j][1];
	
			// Scale the points of the coordinate
			
			Result=this.GetPixelFromRef(RefX,RefY);
			PixelX=Math.round(Result.PixelX);
			PixelY=Math.round(Result.PixelY);
			
			if ((PixelX!=LastPixelX)||(PixelY!=LastPixelY))
			{
				this.TheContext.lineTo(PixelX, PixelY); 
				
				LastPixelX=PixelX;
				LastPixelY=PixelY;
			}
		}
	
		// Fill the path we just finished drawing with color
		if (Closed) this.TheContext.fill();
		
		this.TheContext.stroke();
	}
}


//**********************************************************
// Functions to draw GeoJSON data
//**********************************************************

CMView.prototype.PaintRefGeometry=function(TheGeometry)
{
	if (TheGeometry.type=="LineString")
	{
		this.PaintRefLineString(TheGeometry.coordinates);
	}
	else if (TheGeometry.type=="MultiLineString")
	{
		for (var j=0;j<TheGeometry.coordinates.length;j++)
		{
			TheCoordinates=TheGeometry.coordinates[j];

			this.PaintRefLineString(TheCoordinates);
		}
	}
	else if (TheGeometry.type=="Polygon")
	{
		for (var j=0;j<TheGeometry.coordinates.length;j++)
		{
			TheCoordinates=TheGeometry.coordinates[j];

			this.PaintRefPolygon(TheCoordinates);
		}
	}
	else if (TheGeometry.type=="MultiPolygon")
	{
		for (var i=0;i<TheGeometry.coordinates.length;i++)
		{
			var TheCoordinateArrays=TheGeometry.coordinates[i];
			
			for (var j=0;j<TheCoordinateArrays.length;j++)
			{
				TheCoordinates=TheCoordinateArrays[j];

				this.PaintRefPolygon(TheCoordinates);
			}
		}
	}
	else if (TheGeometry.type=="GeometryCollection")
	{
		for (var j=0;j<TheGeometry.geometries.length;j++)
		{
			this.PaintRefGeometry(TheGeometry.geometries[j]);
		}
	}
}
//**********************************************************
// Functions to create windows from the viewing area
//**********************************************************
/**
* Creates an info popup window and displays the specific HTML.
* jjg - not sure this should be in CMView
*/
CMView.prototype.CreateInfoWindow=function(ID,RefX,RefY,WindowWidth,WindowHeight,TheHTML)
{
	var PixelX=this.GetPixelXFromRefX(RefX);
	var PixelY=this.GetPixelYFromRefY(RefY);
	
	var Offset=jQuery(this.TheCanvas).offset();
	
	var CanvasBounds=this.TheCanvas.getBoundingClientRect();
	PixelX+=CanvasBounds.left;
	PixelY+=CanvasBounds.top;
	
	var InfoWindow=CMUtilities.CreateInfoWindow(ID,PixelX,PixelY,WindowWidth,WindowHeight,TheHTML);

	return(InfoWindow);
}