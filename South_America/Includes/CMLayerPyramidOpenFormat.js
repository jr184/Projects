//******************************************************************
// CMLayerPyramid Class
//******************************************************************
//******************************************************************
// Global Variables
//******************************************************************

// object reference for the balloon if it is displayed
var Layer_Vector_Pyramid_Balloon=null;

//******************************************************************
// CMLayerGeoJSON Constructor
//******************************************************************
function CMLayerPyramidOpenFormat() 
{
	this.TileWidthInPixels=256;
	
	this.PaintDebugTile=false;
	this.DebugZoomLevel=-1;
	this.DebugGlobalColumn=0;
	this.DebugGlobalRow=0;
}
CMLayerPyramidOpenFormat.prototype=new CMLayer(); // inherit prototype functions from PanelBase()

CMLayerPyramidOpenFormat.prototype.contructor=CMLayerPyramidOpenFormat; // override the constructor to go to ours

//******************************************************************
// Private functions
//******************************************************************
/**
* Find the row and column of the tile in the upper left corner of the canvas
* and save it as a member variable
*/
CMLayerPyramidOpenFormat.prototype.GetUpperLeftColumnRow=function(TheView) 
{
	var RefLeft=TheView.GetRefXFromPixelX(0); // get the reference location of the upper left pixel in the canvas
	var RefTop=TheView.GetRefYFromPixelY(0);
	
	var RefWidth=TheView.GetRefWidthFromPixelWidth(this.TileWidthInPixels); // find the width of a tile in ref units
	
	var LeftColumnIndex=Math.floor(RefLeft/RefWidth);
	var TopRowIndex=Math.floor(-RefTop/RefWidth);

	// move the 0,0 tile to the upper left of the map
	
	var ZoomLevel=18+TheView.ZoomLevel;//+this.ZoomLevelOffset;
	var NumTiles=Math.pow(2,ZoomLevel);
	
//	if (NumTiles>1)
	{
//		LeftColumnIndex+=NumTiles;
//		TopRowIndex+=NumTiles;
	}
	if (LeftColumnIndex==-0) LeftColumnIndex=0;
	if (TopRowIndex==-0) TopRowIndex=0;
	
	var Result={
		LeftColumnIndex:LeftColumnIndex,
		TopRowIndex:TopRowIndex
	}
	return(Result);
}
/**
* Create a single image tile and attempt to load it
*/
CMLayerPyramidOpenFormat.prototype.CreateImageTile=function(Column,Row,TheView) 
{
	if (this.ImageTiles[TheView.ZoomLevel][Row][Column]==null)
	{
		this.ImageTiles[TheView.ZoomLevel][Row][Column]= new Image(); 
		
		var TheImageTile=this.ImageTiles[TheView.ZoomLevel][Row][Column];
		
		TheImageTile.Loaded=false;
		TheImageTile.TheLayer=this;
		
		TheImageTile.onload=function() 
		{ 
			this.Loaded=true;
			this.TheLayer.Repaint(); 
		};
	
		var ZoomLevel=18+TheView.ZoomLevel;//+this.ZoomLevelOffset;
		
		var StepColumn=this.LeftColumnIndex+Column;
		var StepRow=this.TopRowIndex+Row;
		
		var StepColumn=Column;
		var StepRow=Row;
		
		if ((StepColumn>=0)&&(StepRow>=0)) // only load valid tiles
		{
		//	var FileName=ZoomLevel+"/"+(Column)+"/"+(Row)+".jpg";
			var FileName=ZoomLevel+"/"+(StepColumn)+"/"+(StepRow)+"."+this.FileExtension;
			
			var TheSource=this.URL+FileName;
			
		//	prompt("hi",TheSource);
			
			TheImageTile.src=TheSource;
		}
	}
}
/*
CMLayerPyramidOpenFormat.prototype.LoadImages=function() 
{
	var TheScene=this.GetScene();
	var TheView=TheScene.GetView(0);
	
	// find the number of rows and columns of tiles for this canvas
	
	var CanvasWidthInPixels=TheView.TheCanvas.width;
	var CanvasHeightInPixels=TheView.TheCanvas.height;
	
	var NumRows=Math.floor(CanvasHeightInPixels/this.TileWidthInPixels)+2; // we need up to 1 additional tile on each side of the canvas
	var NumColumns=Math.floor(CanvasWidthInPixels/this.TileWidthInPixels)+2;
	
	// find the row and column of the upper left tile
	
	var Tile=this.GetUpperLeftColumnRow(TheView);
	this.LeftColumnIndex=Tile.LeftColumnIndex;
	this.TopRowIndex=Tile.TopRowIndex;
	
	// allocate the image tiles array and load the images
	
	if (this.GetVisible())
	{
		this.ImageTiles=null;
		
		this.ImageTiles=[NumRows];
		
		for (Row=0;Row<NumRows;Row++)
		{
			this.ImageTiles[Row]=[NumColumns];
			
			for (Column=0;Column<NumColumns;Column++)
			{
				this.CreateImageTile(Column,Row,TheView);
			}
		}
	}
}*/
//******************************************************************
// Functions used by subclasses and not overriden
//*****************************************************************
CMLayerPyramidOpenFormat.prototype.SetDebugTile=function(ZoomLevel,GlobalColumn,GlobalRow) 
{
	this.PaintDebugTile=true;
	this.DebugZoomLevel=ZoomLevel;
	this.DebugGlobalColumn=GlobalColumn;
	this.DebugGlobalRow=GlobalRow;
}

/*
* Called to obtain the data for the layer from a URL.
* Currently,only GeoJSON is supported as the transfer type.
*/
CMLayerPyramidOpenFormat.prototype.SetURL=function(URL,NewView) 
{
	var Index=URL.lastIndexOf(".");
	
	this.FileExtension=URL.substr(Index+1);
	
	Index=URL.indexOf("{z}");
	
	URL=URL.substr(0,Index);

	this.URL=URL;
	this.TheView=NewView;
//	this.ZoomToBounds=ZoomToBounds;

	this.ImageTiles=[];

/*	for (Row=0;Row<this.NumRows;Row++)
	{
//		this.TheLayer.Tiles[Row]=[];
			
		for (Column=0;Column<this.TheLayer.NumColumns;Column++)
		{
			var GlobalRow=this.TheLayer.MaxRow-Row;
			var GlobalColumn=Column+this.TheLayer.MinColumn;
			var ZoomLevel=this.TheLayer.ZoomLevel;
			
			this.CreateImageTile(GlobalRow,GlobalCOlumn,NewView);
		}
	}
	//*******************
	if (this.ZoomToBounds)
	{
		this.TheView.ZoomToBounds(this.TheLayer.GetBounds());
	}
*/	this.Repaint(); 
}


//******************************************************************
// Messages
//******************************************************************
CMLayerPyramidOpenFormat.prototype.ZoomLevelChanged=function(TheView) 
{
}
//******************************************************************
// Mouse event handling
//******************************************************************


CMLayerPyramidOpenFormat.prototype.Resize=function(TheView) 
{
}
//******************************************************************
// Painting
//******************************************************************

/*
* Paints a layer into the canvas
*/
CMLayerPyramidOpenFormat.prototype.Paint=function(TheView) 
{
	if (this.IsVisible())
	{
		// Get the drawing context from our <canvas> and
		// set the fill to determine what color our map will be.
		var TheContext=TheView.GetContext();
		
		var PaintedAtLeastOneTile=false;
		
		if (this.ImageTiles!=null)
		{
			var ZoomLevel=TheView.ZoomLevel;
			
			if (this.ImageTiles[ZoomLevel]==null) this.ImageTiles[ZoomLevel]=[];
			
			// find the row and column of the upper left tile
			
			var Result=this.GetUpperLeftColumnRow(TheView);
			
			var LeftColumnIndex=Result.LeftColumnIndex;
			var TopRowIndex=Result.TopRowIndex;
			
			// find the number of rows and columns of tiles for this canvas
			
			var CanvasWidthInPixels=TheView.TheCanvas.width;
			var CanvasHeightInPixels=TheView.TheCanvas.height;
			
			var NumRows=Math.floor(CanvasHeightInPixels/this.TileWidthInPixels)+2; // we need up to 1 additional tile on each side of the canvas
			var NumColumns=Math.floor(CanvasWidthInPixels/this.TileWidthInPixels)+2;
			
			// find the pixel location for the tile in the upper left corner of the canvas
			
			var PixelX=TheView.GetPixelXFromRefX(0);
			var PixelY=TheView.GetPixelYFromRefY(0);
			
			var TileRefWidth=TheView.GetRefWidthFromPixelWidth(256);
			
			var SceneTileWidth=Math.pow(2,18-ZoomLevel);
			
			// draw the tiles from the top down and from left to right 
			
			var TheStyle=this.GetStyle();
			if (TheStyle!=null) TheView.SetStyle(TheStyle);
			
			for (var Row=0;Row<NumRows;Row++)
			{
				var GlobalRow=Row+TopRowIndex;
				
				if (this.ImageTiles[TheView.ZoomLevel][GlobalRow]==null) this.ImageTiles[TheView.ZoomLevel][GlobalRow]=[];
				
//				var NumColumns=this.ImageTiles[TheView.ZoomLevel][Row].length;
			
				for (var Column=0;Column<NumColumns;Column++)
				{
					var GlobalColumn=Column+LeftColumnIndex;
					
					if (this.ImageTiles[ZoomLevel][GlobalRow][GlobalColumn]==null) 
					{
						this.CreateImageTile(GlobalColumn,GlobalRow,TheView);
					}
					else if (this.ImageTiles[ZoomLevel][GlobalRow][GlobalColumn].Loaded)
					{
						var X=PixelX+(GlobalColumn*this.TileWidthInPixels);
						var Y=PixelY+(GlobalRow*this.TileWidthInPixels);
						
						TheContext.drawImage(this.ImageTiles[TheView.ZoomLevel][GlobalRow][GlobalColumn],X,Y);
						
						PaintedAtLeastOneTile=true;
						
						if (TheStyle!=null) // triggers drawing the boundary and row,column
						{
							TheContext.strokeRect(X,Y,this.TileWidthInPixels,this.TileWidthInPixels);
						}
					}
				} // for column
			} // for row
			if (TheStyle!=null) TheView.RestoreStyle();
			
			// draw the text in the tiles if desired (debugging)
			
			var TheLabelStyle=this.GetLabelStyle();
			
			if (TheLabelStyle!=null)
			{
				if (TheLabelStyle!=null) TheView.SetStyle(TheLabelStyle);
			
				for (var Row=0;Row<NumRows;Row++)
				{
					var NumColumns=this.ImageTiles[TheView.ZoomLevel][Row].length;
				
					for (var Column=0;Column<NumColumns;Column++)
					{
						if ((this.ImageTiles[TheView.ZoomLevel][Row][Column]!=null)&&(this.ImageTiles[TheView.ZoomLevel][Row][Column].Loaded))
						{
							var X=PixelX+(Column*this.TileWidthInPixels);
							var Y=PixelY+(Row*this.TileWidthInPixels);
							
							var Text=this.LeftColumnIndex+Column+","+this.TopRowIndex+Row;
							
							var Offset=this.TileWidthInPixels/2;
							
//							TheContext.strokeText(Text,X+Offset,Y+Offset);
							TheContext.fillText(Text,X+Offset,Y+Offset);
							
							if (true) // debugging
							{
								var RefX=TheView.GetRefXFromPixelX(X);
								var RefY=TheView.GetRefYFromPixelY(Y);
								var j=12;
							}
						}
					}
				}
				if (TheLabelStyle!=null) TheView.RestoreStyle();
			}
			
		}
		if (PaintedAtLeastOneTile==false)
		{
			if ((this.TheBounds!=null)&&(this.GetStyle()!=null))
			{
				var TheStyle=this.GetStyle();
				if (TheStyle!=null) TheView.SetStyle(TheStyle);
				
				var PixelX=TheView.GetPixelXFromRefX(this.TheBounds.XMin);
				var PixelY=TheView.GetPixelYFromRefY(this.TheBounds.YMax);
				
				var PixelWidth=TheView.GetPixelWidthFromRefWidth(this.TheBounds.XMax-this.TheBounds.XMin);
				var PixelHeight=TheView.GetPixelHeightFromRefHeight(this.TheBounds.YMin-this.TheBounds.YMax);
				
				if (PixelWidth<4) PixelWidth=4;
				if (PixelHeight<4) PixelHeight=4;
				
				if (TheContext.strokeStyle!=null) 
				{
					TheContext.strokeRect(PixelX,PixelY,PixelWidth,PixelHeight);
				}
//				TheView.PaintRect(this.TheBounds);
				if (TheStyle!=null) TheView.RestoreStyle();
			}
		}

//		TheView.PaintRefRasterthis.TheImage,this.TheBounds);
	}
}


