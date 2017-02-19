//*****************************************************************************************************************
//  CMLayer
// This class is the base class for all other layers.  This class contains functions and properties for feature and raster based
// classes.  This is because the CMLayerPyramid supports both raster and vector data.  This also may be a trend with data formats like KML.
//
//*****************************************************************************************************************

//*****************************************************************************************************************
// Definitions
//*****************************************************************************************************************

CMLayer.MARK_CIRCLE=0;
CMLayer.MARK_TRIANGLE=1;
CMLayer.MARK_SQUARE=2;
CMLayer.MARK_STAR=3;

/**
* Global defintions for the optional properties (general and feature)
*/

CMLayer.INFO_ATTRIBUTE=0; // Information when clicking on any feature or a specific feature
CMLayer.FEATURE_STYLE=1; // style for all features or each feature
CMLayer.MOUSE_OVER_STYLE=2; // mouse over style for all features or each feature
CMLayer.SELECTED_STYLE=3; 
CMLayer.ICON_IMAGE=4; // image object for points of the form: { TheImage:Image Object,OffsetX:OffsetX,OffsetY:OffsetY}
CMLayer.MARK_TYPE=5; // mark type used for points
CMLayer.MARK_SIZE=6; // mark size for points
CMLayer.ZOOM_RANGE=7; // zoom range of the form [MinZoomLevel,MaxZoomLevel]

//*****************************************************************************************************************
// Constructors
//*****************************************************************************************************************

function CMLayer() 
{
	// general properties
	
	this.TheScene=null; // this allows the layer to let the scene know when it has changed
	
	this.TheBounds=null; // the overall bounds (only as good as the information from the layers)
	
	this.Visible=true; // false to hide the layer in the view
	
	this.Name=''; // name of the layer, appears in the LAYER_LIST
	
	// optional properties 
	
	this.Properties=null;  // general properties for all features, must be set outside constructor to be unique to each layer 
	this.FeatureProperties=null;  // properties specific to individual features, must be set outside constructor to be unique to each layer 
	
	// style information
	
	this.TheStyle=null;
	this.TheLabelStyle=null; // only used for debugging
	this.ClickTolerance=8;

	this.InfoWindowWidth=300;
	
	this.TheProjector=null; // optional projector to have data projected when it loads
	
	// internally set properties
	
	this.SelectedFeatureIndex=-1; // array of flags for rows? (move to CMLayer)
	this.MouseOverFeatureIndex=-1; // array of flags for rows? (move to CMLayer)
	
	this.FeatureBounds=null; // bounds of each feature, cached for speed
}
//******************************************************************
// Functions used by subclasses and not overriden
//******************************************************************
/*
* Set the human-readable name for the layer.  This name will appear
* in the layer list.
*/
CMLayer.prototype.SetName=function(Name) 
{
	this.Name=Name;
	if (this.TheScene!=null) this.TheScene.LayerSettingsChanged(this);
}
CMLayer.prototype.GetName=function()  { return(this.Name); }

/*
* Make the layer visible or invisible (hidden)
* the scene should be repainted right after this call.
*/
//CMLayer.prototype.SetVisibleDirect=function(Visible) { this.Visible=Visible }

CMLayer.prototype.SetVisible=function(Visible) 
{
	if (Visible!=this.Visible)
	{
		this.Visible=Visible;
		if (this.TheScene!=null) this.TheScene.Repaint();
	}
};
CMLayer.prototype.GetVisible=function() 
{
	return(this.Visible);
};
/**
* Checks if the layer is visible.  This is different form GetVisible() because it
* also checks for an optional zoom range
*/
CMLayer.prototype.IsVisible=function()
{
	var Result=this.Visible;
	
	if (this.Visible) // may have to check zoom range
	{
		var ZoomRange=this.GetProperty(CMLayer.ZOOM_RANGE); // typically this will not be set so this will be fast
		
		if ((ZoomRange!=null)&&(this.TheScene!=null)&&(this.TheScene.GetView(0)!=null))
		{
			var TheView=this.TheScene.GetView(0);
			var TheZoom=TheView.GetZoomLevel();
			
			if ((TheZoom<ZoomRange[0])||(TheZoom>ZoomRange[1])) // current zoom is less than min or greater than max
			{
				Result=false;
			}
		}
	}
	return(Result);
};
/**
* This should only be called by subclasses
*/
CMLayer.prototype.SetBounds=function(NewBounds) 
{
	this.TheBounds=NewBounds;
}
CMLayer.prototype.GetBounds=function() 
{
	return(this.TheBounds);
}
/**
* Set the attribute that will be used for a popup-information window
*/
CMLayer.prototype.SetHTMLAttribute=function(HTMLAttribute) 
{ 
	this.SetProperty(CMLayer.INFO_ATTRIBUTE,HTMLAttribute); 
}
CMLayer.prototype.GetHTMLAttribute=function() 
{ 
	var Result=this.GetProperty(CMLayer.INFO_ATTRIBUTE); 

	return(Result); 
}

CMLayer.prototype.GetProjector=function() 
{ 
	return(this.TheProjector); 
}
CMLayer.prototype.SetProjector=function(NewProjector)
{
	this.TheProjector=NewProjector;
}

/**
* Set the scene that the layer is in.  This is used by CanvasMap to link the layer to it's scen
*/
CMLayer.prototype.SetScene=function(NewScene) 
{ 
	this.TheScene=NewScene; 
}
CMLayer.prototype.GetScene=function() { return(this.TheScene); }

CMLayer.prototype.GetCanvasMap=function() { return(this.TheScene.TheCanvasMap); }

/**
* Set the style to use for painting the layer
*/
CMLayer.prototype.SetStyle=function(NewStyle) 
{
	this.TheStyle=NewStyle;
	if (this.TheScene!=null) this.TheScene.LayerSettingsChanged(this);
}
CMLayer.prototype.GetStyle=function() 
{
	return(this.TheStyle);
}
// not used
CMLayer.prototype.SetLabelStyle=function(NewLabelStyle) 
{
	this.TheLabelStyle=NewLabelStyle;
}
CMLayer.prototype.GetLabelStyle=function() 
{
	return(this.TheLabelStyle);
}

CMLayer.prototype.SetInfoWindowWidth=function(New) 
{
	this.InfoWindowWidth=New;
}
CMLayer.prototype.GetInfoWindowWidth=function() 
{
	return(this.InfoWindowWidth);
}
//******************************************************************
// Functions used by subclasses and not overriden
//******************************************************************
CMLayer.prototype.SetSelectedFeature=function(New) 
{
	if (New!=this.SelectedFeatureIndex) 
	{
		this.SelectedFeatureIndex=New;
		this.GetScene().Repaint();
	}
}
CMLayer.prototype.UnselectAll=function(New) 
{
	if (this.SelectedFeatureIndex!=-1) // something is selected
	{ 
		this.SelectedFeatureIndex=-1;
		this.GetScene().Repaint();
	}
}
CMLayer.prototype.SetMouseOverFeature=function(New) 
{
	if (New!=this.MouseOverFeatureIndex) 
	{
		this.MouseOverFeatureIndex=New;
		this.GetScene().Repaint();
	}
}
CMLayer.prototype.ResetMouseOverFeature=function() 
{
	if (this.MouseOverFeatureIndex!=-1) // something is selected
	{ 
		this.MouseOverFeatureIndex=-1;
		this.GetScene().Repaint();
	}
}
//******************************************************************
// Property Gets and Sets
//******************************************************************

CMLayer.prototype.SetProperty=function(Key,Value)
{
	if (this.Properties==null)
	{
		this.Properties=new Array();
		
		// default properties
		this.Properties[CMLayer.SELECTED_STYLE]={strokeStyle:"#8888ff",fillStyle:"rgba(0,0,0,0)"};
	}
	this.Properties[Key]=Value;
}

CMLayer.prototype.GetProperty=function(Key,Default)
{
	var Result=null;
	if (Default!=undefined) Result=Default;
	
	if (this.Properties!==null)
	{
		if (Key in this.Properties) { Result=this.Properties[Key]; }
	}
	return(Result);
}
/**
* Set the feature properties as an array indexed by FeatureIndexes
* Inputs
* - FeatureProperties - array of properties indexed by the feature indexes
*/
CMLayer.prototype.SetFeatureProperties=function(Key,FeatureProperties)
{
	if (this.FeatureProperties==null)
	{
		this.FeatureProperties=new Array();
	}
	this.FeatureProperties[Key]=FeatureProperties;
}
/**
* Set an individual feature property based on it's FeatureIndex
*/
CMLayer.prototype.SetFeatureProperty=function(Key,FeatureIndex,Value)
{
	if (this.FeatureProperties==null)
	{
		this.FeatureProperties=new Array();
	}
	if ((Key in this.FeatureProperties)==false)
	{
		this.FeatureProperties[Key]=new Array();
	}
	this.FeatureProperties[Key][FeatureIndex]=Value;
}
/**
* Returns a property for a specific feature.  Returns null if the property
* is not specified for the feature.
*/
CMLayer.prototype.GetFeatureProperty=function(Key,FeatureIndex,Default)
{
	var Result=this.GetProperty(Key,Default);
	
	if (this.FeatureProperties!==null)
	{
		if (Key in this.FeatureProperties)
		{
			var TheArray=this.FeatureProperties[Key];
			
			Result=TheArray[FeatureIndex];
		}
	}
	return(Result);
}

//******************************************************************
// Painting Style functions
//******************************************************************
/* 
* Change the fill style for a specific feature
*/
CMLayer.prototype.SetFeatureFillStyle=function(FeatureIndex,NewFillStyle) 
{
	if (this.LayerFillStyles==null) this.LayerFillStyles=[];
	
	this.LayerFillStyles[FeatureIndex]=NewFillStyle;
};

CMLayer.prototype.SetColorAttribute=function(ColorAttribute) { this.ColorAttribute=ColorAttribute; }

/**
* Icon for point features
*/
CMLayer.prototype.SetIconImage=function(TheURL,OffsetX,OffsetY) 
{
	var TheImage=new Image(); 
	TheImage.Loaded=false;
	TheImage.TheLayer=this;
	TheImage.OffsetX=OffsetX;
	TheImage.OffsetY=OffsetY;
	
	TheImage.onload=function() 
	{ 
		this.TheLayer.SetProperty(CMLayer.ICON_IMAGE,{TheImage:this,OffsetX:this.OffsetX,OffsetY:this.OffsetY});
		this.TheLayer.Repaint(); 
	};
	
	TheImage.src=TheURL;
};
CMLayer.prototype.GetIconImage=function() { return(this.TheImage); }

CMLayer.prototype.SetImageOffset=function(X,Y) 
{ 
	this.ImageOffsetX=X;
	this.ImageOffsetY=Y;
};

//******************************************************************
// Functions for subclasses to call (protected)
//******************************************************************

CMLayer.prototype.Repaint=function()
{
	if (this.TheScene!=null) this.TheScene.Repaint();
}
CMLayer.prototype.PaintPoint=function(TheView,FeatureIndex,RefX,RefY,TheIconImage)
{
	var TheFeatureImage=this.GetFeatureProperty(CMLayer.ICON_IMAGE,FeatureIndex);
	
	if (TheFeatureImage==null) TheFeatureImage=TheIconImage; // use the general one
	
	var Result=TheView.GetPixelFromRef(RefX,RefY);
	var PixelX=Result.PixelX;
	var PixelY=Result.PixelY;

	if (TheFeatureImage!==null)
	{
		TheView.PaintImage(TheFeatureImage.TheImage,PixelX+TheFeatureImage.OffsetX,PixelY+TheFeatureImage.OffsetY);
	}
	else
	{
		var TheSize=this.GetProperty(CMLayer.MARK_SIZE,5);
		var TheType=this.GetProperty(CMLayer.MARK_TYPE,CMLayer.MARK_CIRCLE);
		
		var HalfSize=TheSize/2;
		
		switch (TheType)
		{
		case CMLayer.MARK_CIRCLE:
			TheView.PaintCircle(PixelX,PixelY,HalfSize);
			break;
		case CMLayer.MARK_SQUARE:
			TheView.PaintRect(PixelX-HalfSize,PixelX+HalfSize,PixelY-HalfSize,PixelY+HalfSize);
			break;
		case CMLayer.MARK_TRIANGLE:
			{
				var TheRefSize=TheView.GetRefWidthFromPixelWidth(TheSize);
				
				var Triangle=CMUtilities.GetRegularPolygon(3,TheRefSize,RefX,RefY, 180);
				TheView.PaintRefPoly2(Triangle[0],Triangle[1],true,true);
			}
			break;
		case CMLayer.MARK_STAR:
			{
				var TheRefSize=TheView.GetRefWidthFromPixelWidth(TheSize);
				
				var Star=CMUtilities.GetStar(5,TheRefSize,RefX,RefY, 0);
				TheView.PaintRefPoly2(Star[0],Star[1],true,true);
			}
			break;
		}
	}
};

//******************************************************************
// Functions to be overriden by sub classes
//******************************************************************

CMLayer.prototype.GetIconImage=function() { return(null); }

/*
* Subclasses should override this function and return true
* if they support a settings dialog
*/
CMLayer.prototype.HasSettingsDialog=function() 
{
	return(false);
}
/*
* This provides a default settings window with the based vector drawing settings
*/
CMLayer.prototype.ShowSettingsDialog=function() 
{
	var YPosition=10;
	
	// get the dialog, create it if needed
	
	var TheDialog=new CMDialog("LayerVector_Settings_Dialog",600,400); // dialog width and height
	
	//
	
	var TheTitle=TheDialog.AddLabel("Settings for Vector CMLayer",0,YPosition);
	TheTitle.style.fontSize="20px";
	
	YPosition+=40;
	
	//*************************************************************************
	
	var XPosition=0;
	
	var TheLineHeading=TheDialog.AddLabel("Line Settings:",XPosition,YPosition);
	TheLineHeading.style.fontSize="18px";
	
	YPosition+=40;
	
	//  add the pen color 
	
	var strokeStyle=null;
	if (this.TheStyle!=null) strokeStyle=this.TheStyle.strokeStyle;
	
	var PenColorControl=TheDialog.AddColorControl("Color:",XPosition,YPosition,strokeStyle);
	PenColorControl.TheLayer=this; // set the current layer so the functions can access it
	$(PenColorControl).change(function() 
	{
		if (this.TheLayer.TheStyle==null) this.TheLayer.TheStyle={};
		this.TheLayer.TheStyle.strokeStyle=this.value;
		this.TheLayer.GetScene().Repaint();
	});

	YPosition+=40;

	//  add the line cap control
	
	var Values=['butt','round','square'];
	
	var lineCap=null;
	if (this.TheStyle!=null) lineCap=this.TheStyle.lineCap;
	
	var LineCapControl=TheDialog.AddSelectControl("Cap:",XPosition,YPosition,Values,lineCap);
	LineCapControl.TheLayer=this; // set the current layer so the functions can access it
	$(LineCapControl).change(function() 
	{
		if (this.TheLayer.TheStyle==null) this.TheLayer.TheStyle={};
		this.TheLayer.TheStyle.lineCap=this.value;
		this.TheLayer.GetScene().Repaint();
	});

	YPosition+=40;

	//  add the line join control
	
	var Values=['bevel','round','miter'];
	
	var lineJoin=null;
	if (this.TheStyle!=null) lineJoin=this.TheStyle.lineJoin;
	
	var LineJoinControl=TheDialog.AddSelectControl("Join:",XPosition,YPosition,Values,lineJoin);
	LineJoinControl.TheLayer=this; // set the current layer so the functions can access it
	$(LineJoinControl).change(function() 
	{
		if (this.TheLayer.TheStyle==null) this.TheLayer.TheStyle={};
		this.TheLayer.TheStyle.lineJoin=this.value;
		this.TheLayer.GetScene().Repaint();
	});

	YPosition+=40;

	//  add the line width control
	
	var miterLimit=null;
	if (this.TheStyle!=null) miterLimit=this.TheStyle.miterLimit;
	
	var MiterLimitControl=TheDialog.AddTextControl("Miter Limit:",XPosition,YPosition,miterLimit);
	MiterLimitControl.TheLayer=this; // set the current layer so the functions can access it
	$(MiterLimitControl).change(function() 
	{
		if (this.value=="") this.value=undefined;
		
		if (this.TheLayer.TheStyle==null) this.TheLayer.TheStyle={};
		this.TheLayer.TheStyle.miterLimit=this.value;
		this.TheLayer.GetScene().Repaint();
	});

	YPosition+=40;

	//  add the line width control
	
	var lineWidth=null;
	if (this.TheStyle!=null) lineWidth=this.TheStyle.lineWidth;
	
	var LineWidthControl=TheDialog.AddTextControl("Width:",XPosition,YPosition,lineWidth);
	LineWidthControl.TheLayer=this; // set the current layer so the functions can access it
	$(LineWidthControl).change(function() 
	{
		if (this.value=="") this.value=undefined;
		
		if (this.TheLayer.TheStyle==null) this.TheLayer.TheStyle={};
		this.TheLayer.TheStyle.lineWidth=this.value;
		this.TheLayer.GetScene().Repaint();
	});

	YPosition+=40;

	//****************************************************************************************
	//  add the fill color 
	
	YPosition=50;
	XPosition=300;
	
	var TheLineHeading=TheDialog.AddLabel("Fill Settings:",XPosition,YPosition);
	TheLineHeading.style.fontSize="18px";
	
	YPosition+=40;
	
	var fillStyle=null;
	if (this.TheStyle!=null) fillStyle=this.TheStyle.fillStyle;
	
	var FillColorControl=TheDialog.AddColorControl("Fill Color:",XPosition,YPosition,fillStyle);
	FillColorControl.TheLayer=this; // set the current layer so the functions can access it
	$(FillColorControl).change(function() 
	{
		var RGBAColor=CMDialog.GetRGBAFromControls(this,this.FillTransparencyControl);
		
		if (this.TheLayer.TheStyle==null) this.TheLayer.TheStyle={};
		this.TheLayer.TheStyle.fillStyle=RGBAColor;
		this.TheLayer.GetScene().Repaint();
	});

	YPosition+=40;

	//  add the fill color  transparency control
	
	var Transparency=100;
	if (this.TheStyle!=null)
	{
		var fillStyle=this.TheStyle.fillStyle;
		var Result=CMUtilities.GetRGBAValuesFromRGBA(fillStyle);
		Transparency=Result.Transparency*100.0;
	}
	var FillTransparencyControl=TheDialog.AddSliderControl("Transparency:",XPosition,YPosition,0,100,Transparency);
	FillTransparencyControl.TheLayer=this; // set the current layer so the functions can access it
	$(FillTransparencyControl).change(function() 
	{
		var RGBAColor=CMDialog.GetRGBAFromControls(this.FillColorControl,this);
		
		if (this.TheLayer.TheStyle==null) this.TheLayer.TheStyle={};
		this.TheLayer.TheStyle.fillStyle=RGBAColor;
		this.TheLayer.GetScene().Repaint();
	});

	YPosition+=40;

	// the two fill controls must be able to see each other
	
	FillColorControl.FillTransparencyControl=FillTransparencyControl;
	FillTransparencyControl.FillColorControl=FillColorControl;
	
	//****************************************************************************************
	// Shadow settings
	// Shadows cause major performance problems so they are off for now
	
	var TheLineHeading=TheDialog.AddLabel("Shadow Settings:",XPosition,YPosition);
	TheLineHeading.style.fontSize="18px";
	
	YPosition+=40;
	
	// Shadow color
	
	var ShadowColorControl=TheDialog.AddColorControl("Color:",XPosition,YPosition,this.TheStyle.shadowColor);
	ShadowColorControl.TheLayer=this; // set the current layer so the functions can access it
	$(ShadowColorControl).change(function() 
	{
//		var RGBAColor=GetRGBAFromControls(this,null);
		
		this.TheLayer.TheStyle.shadowColor=this.value;
		this.TheLayer.GetScene().Repaint();
	});

	YPosition+=40;

	//  shadow blur
	
	var ShadowBlurControl=TheDialog.AddTextControl("Blur:",XPosition,YPosition,this.TheStyle.shadowBlur);
	ShadowBlurControl.TheLayer=this; // set the current layer so the functions can access it
	$(ShadowBlurControl).change(function() 
	{
		this.TheLayer.TheStyle.shadowBlur=this.value;
		this.TheLayer.GetScene().Repaint();
	});

	YPosition+=40;

	//  shadow x offset
	
	var ShadowOffsetX=TheDialog.AddTextControl("X Offset:",XPosition,YPosition,this.TheStyle.shadowOffsetX);
	ShadowOffsetX.TheLayer=this; // set the current layer so the functions can access it
	$(ShadowOffsetX).change(function() 
	{
		this.TheLayer.TheStyle.shadowOffsetX=this.value;
		this.TheLayer.GetScene().Repaint();
	});

	YPosition+=40;

	// shadow y offset
	
	var ShadowOffsetY=TheDialog.AddTextControl("Y Offset:",XPosition,YPosition,this.TheStyle.shadowOffsetY);
	ShadowOffsetY.TheLayer=this; // set the current layer so the functions can access it
	$(ShadowOffsetY).change(function() 
	{
		this.TheLayer.TheStyle.shadowOffsetY=this.value;
		this.TheLayer.GetScene().Repaint();
	});

	YPosition+=40;

	//****************************************************************************************
	// OK button

	YPosition=300;
	
	var OKButton=TheDialog.AddButtonControl("OK",0,YPosition);
	OKButton.TheDialog=TheDialog;
	$(OKButton).click(function() 
	{
		TheDialog.SetVisibile(false);
//		document.body.removeChild(this.TheElement);
	});

	var CancelButton=TheDialog.AddButtonControl("Cancel",100,YPosition);
	CancelButton.TheDialog=TheDialog;
	$(CancelButton).click(function() 
	{
		TheDialog.SetVisibile(false);
//		document.body.removeChild(this.TheElement);
	});

	YPosition+=40;

//	var TheColorControl=document.getElementById("LayerVector_Settings_FillColor");

/*	var TheColorControl=document.getElementById("LayerVector_Settings_PenColor");
	TheColorControl.value=this.TheStyle.strokeStyle;
	TheColorControl.TheLayer=this; // set the current layer so the functions can access it
*/	
//	TheDialog.style.visibility="visible";
};


/*
* Called to obtain the data for the layer from a URL.
*
* TheView is required so the layer can be repainted when data is received.
*/
CMLayer.prototype.SetURL=function(URL,NewView) 
{
	alert("Sorry, SetURL() is not implemented for this layer");
}

//**************************************************************
// Overrides for attribute tables
//**************************************************************
CMLayer.prototype.GetNumAttributeRows=function() { return(0); }
CMLayer.prototype.GetNumAttributeColumns=function() { return(0); }
CMLayer.prototype.GetAttributeHeading=function(ColumnIndex) { return(""); }
CMLayer.prototype.GetAttributeCell=function(ColumnIndex,RowIndex) { return(""); }
//******************************************************************
// These are for more advanced layers (like pyramids) so they can
// reload images before a paint occurs.
//******************************************************************
CMLayer.prototype.ZoomLevelChanged=function(TheView) 
{
}
CMLayer.prototype.ViewMoved=function(TheView) 
{
}

//******************************************************************
// Mouse event handling
//******************************************************************

/*
* returns the feature index for the coordinate in projected space
* returns -1 if the coordinate is not in a feature
*/
CMLayer.prototype.In=function(TheView,RefX,RefY) 
{
	var FeatureIndex=-1;
	
	return(FeatureIndex);
};
/*
*
*/
CMLayer.prototype.MouseDown=function(TheView,RefX,RefY) 
{
	var Used=false;
	
	return(Used);
};
CMLayer.prototype.MouseMove=function(TheView,RefX,RefY) 
{
	var Used=false;
	
	var FeatureIndex=this.In(TheView,RefX,RefY);
	
	if (FeatureIndex!==-1) this.MouseOver(TheView,RefX,RefY,FeatureIndex);
	else this.ResetMouseOverFeature();
	
	return(Used);
};
CMLayer.prototype.MouseUp=function(TheView,RefX,RefY) 
{
	var Used=false;
	
	return(Used);
};
CMLayer.prototype.MouseOver=function(TheView,RefX,RefY,FeatureIndex) 
{
	var Used=false;
	
	this.SetMouseOverFeature(FeatureIndex);
	
	return(Used);
};

//******************************************************************
// Painting
//******************************************************************
/**
* Called when the layer is resized
*/
CMLayer.prototype.Resize=function(TheView) 
{
}
/*
* Paints a layer into the canvas.  This function is provided for 
* subclasses to override.  The code below shows the sequence of steps
* a layer class should take to paint itself into the canvas.
*/
CMLayer.prototype.Paint=function(TheView) 
{

}
/**
* Just paint the selected features.  This is called after all the other features have
* been painted to paint the selected features on top
*/
CMLayer.prototype.PaintSelected=function(TheView) 
{
}

/*
* Requests search results from a layer.  The scene calls this function
*/
CMLayer.prototype.GetSearchResults=function(SearchPhrase,ResultsPanel) 
{

}

