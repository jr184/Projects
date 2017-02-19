//******************************************************************
// CMDialog controls
//******************************************************************

var DIALOG_WIDTH=400;
var DIALOG_HEIGHT=400;
//var PageDisabled=false;
//******************************************************************
// Static functions
//******************************************************************

CMDialog.GetRGBAFromControls=function(FillColorControl,FillTransparencyControl)
{
	var Transparency=FillTransparencyControl.value;
	var Color=FillColorControl.value;
	
	var Colors=CMUtilities.GetRGBFromHex(Color);
	
	var RGBA=Colors.Red+","+Colors.Green+","+Colors.Blue;
	
	if (Transparency!=100)
	{
		Transparency=Transparency/100;
		RGBA="rgba("+RGBA+","+Transparency+")";;
	}
	else
	{
		RGBA="rgb("+RGBA+")";;
	}
	
	return(RGBA);
}
//******************************************************************
// Constructors
//******************************************************************

function CMDialog(ID,Width,Height,PageDisabled) 
{
	if (Width==-1) Width=DIALOG_WIDTH;
	if (Height==-1) Height=DIALOG_HEIGHT;
	
	this.TheElement=document.getElementById(ID);
	if (this.TheElement==null)
	{
		this.TheElement=document.createElement("DIV"); // create the DIV element
	
		this.TheElement.id=ID; // set the ID so we can get it back
	
		document.body.appendChild(this.TheElement); // add the dialog element to the document
	}
	else
	{
		while (this.TheElement.firstChild) // while there is a first element in the dialog
		{
			// removing the first element moves the next element to the first position
			// so this little loop will remove all the elements from another element
			this.TheElement.removeChild(this.TheElement.firstChild);
		}
	}
	this.TheElement.className="CM_SettingsDialog";
//	this.TheElement.style.backgroundColor="#333";
//	this.TheElement.style.border="1px solid #C6C6C6";
	this.TheElement.style.visibility="visible";
//	this.TheElement.style.zIndex="100000000";
//	this.TheElement.style.boxShadow="1px 1px 3px #555555";
//	this.TheElement.style.color="#FFFFFF";
//	this.TheElement.style.borderRadius="5px";
//	this.TheElement.style.opacity="0.95";
	
	var DocumentHeight=$(window).height(); 
	var DocumentWidth=$(window).width();
	
	var X=(DocumentWidth-DIALOG_WIDTH)/2;
	var Y=(DocumentHeight-DIALOG_HEIGHT)/2;
	
	CMUtilities.AbsolutePosition(this.TheElement,X,Y,Width,Height);
	
	//****************************************************
	// setup the DisablePage for the dialog
	var DisablePageID = "DialogDisablePage"
	this.DisablePage=document.getElementById(DisablePageID);
	if(this.DisablePage==null)
	{
		this.DisablePage=document.createElement("DIV"); // create the DIV element
		this.DisablePage.id=DisablePageID; // set the ID so we can get it back
		document.body.appendChild(this.DisablePage); // add the DisablePage element to the document
	}
	this.DisablePage.style.visibility="hidden";

	if (PageDisabled)
	{
		this.DisablePage.style.backgroundColor="white"; // set the background color of the div element
		this.DisablePage.style.visibility="visible"
		this.DisablePage.style.opacity="0.5"; // set the opacity to 50%
		this.DisablePage.style.zIndex="99999999"; // set the zIndex to be 1 lower than the dialog, placing it directly behind it
												// but above all over elements in the DOM. 
		var DocumentHeight=$(window).height(); 
		var DocumentWidth=$(window).width();

		X=0;
		Y=0;

		CMUtilities.AbsolutePosition(this.DisablePage,X,Y,DocumentWidth,DocumentHeight);
	}
}
//******************************************************************
// Functions to get and set settings
//******************************************************************

CMDialog.prototype.SetVisibile=function(New)
{
	if (New) 
	{
		this.TheElement.style.visibility="visible";
		this.DisablePage.style.visibility="visible";
	}
	else 
	{
		this.TheElement.style.visibility="hidden";
		this.DisablePage.style.visibility="hidden";
	}
}
//******************************************************************
// Functions to add widjets
//******************************************************************



CMDialog.prototype.AddLabel=function(Text,XOffset,YPosition)
{
	var Label=document.createElement("div");
	Label.innerHTML=Text;
	this.TheElement.appendChild(Label); // add the dialog element to the document
	CMUtilities.AbsolutePosition(Label,XOffset+10,YPosition,300,30);
	
	return(Label);
}
CMDialog.prototype.AddParagraph=function(ID,Text,XOffset,YPosition,Width,Height)
{	
	// add the paragraph
	
	var TheControl=document.createElement("p");
	TheControl.innerHTML=Text;
	TheControl.id=ID;
	this.TheElement.appendChild(TheControl); // add the dialog element to the document

	CMUtilities.AbsolutePosition(TheControl,XOffset+10,YPosition,Width,Height);
	
	return(TheControl);
}

CMDialog.prototype.AddColorControl=function(Label,XOffset,YPosition,Value)
{
	var PenColorLabel=document.createElement("div");
	PenColorLabel.innerHTML=Label;
	this.TheElement.appendChild(PenColorLabel); // add the dialog element to the document
	CMUtilities.AbsolutePosition(PenColorLabel,XOffset+10,YPosition,100,30);
	
	var PenColorControl=document.createElement("input");
	
	// using a container and lettnig the browser decide the type of control allows
	// us to be compatible with IE (text field) and the other browsers (color pickters)
	
	var ColorControlContainer=document.createElement("div");
	ColorControlContainer.innerHTML="<input id='ColorControl' type='color'>";
	var PenColorControl=ColorControlContainer.childNodes[0];
	
	// must convert the value to #ffffff format
	
	Value=CMUtilities.GetHexColorFromColor(Value);

	PenColorControl.value=Value;
	this.TheElement.appendChild(PenColorControl); // add the dialog element to the document
	CMUtilities.AbsolutePosition(PenColorControl,XOffset+110,YPosition,100,20);
	
	return(PenColorControl);
}
CMDialog.prototype.AddButtonControl=function(Text,XOffset,YPosition)
{
	var OKButton=document.createElement("button");
//	OKButton.setAttribute("type", "button"); 
	var ButtonText = document.createTextNode(Text);
    OKButton.appendChild(ButtonText);
	this.TheElement.appendChild(OKButton); // add the dialog element to the document
	CMUtilities.AbsolutePosition(OKButton,XOffset+10,YPosition,80,30);
	
	return(OKButton);
}

CMDialog.prototype.AddSliderControl=function(Text,XOffset,YPosition,Min,Max,Value)
{
	var PenColorLabel=CMUtilities.CreateLabelControl(Text);
	CMUtilities.AbsolutePosition(PenColorLabel,XOffset+10,YPosition,80,30);
	this.TheElement.appendChild(PenColorLabel); // add the dialog element to the document
	
	var SliderControl=CMUtilities.CreateSliderControl(Min,Max,Value);
	CMUtilities.AbsolutePosition(SliderControl,XOffset+110,YPosition,100,30);
	this.TheElement.appendChild(SliderControl); // add the dialog element to the document

	return(SliderControl);
}
CMDialog.prototype.AddCheckBoxControl=function(Text,XOffset,YPosition,Value)
{
	// add the checkbox
	
	var TheControl=document.createElement("input");
	TheControl.type="checkbox";
	TheControl.name=Text;
	TheControl.text=Text;
	
	if (Value) TheControl.checked=true;
	else TheControl.checked=false;
	
	this.TheElement.appendChild(TheControl); // add the dialog element to the document

	CMUtilities.AbsolutePosition(TheControl,XOffset,YPosition,40,30);
	
	// add a label after the checkbox
	
	var TheLabel=document.createElement("div");
	TheLabel.innerHTML=Text;
	this.TheElement.appendChild(TheLabel); // add the dialog element to the document
	CMUtilities.AbsolutePosition(TheLabel,XOffset+60,YPosition+8,80,30);
	
	return(TheControl);
}

CMDialog.prototype.AddTextControl=function(Text,XOffset,YPosition,Value)
{
	// add a label after the checkbox
	
	var TheLabel=document.createElement("div");
	TheLabel.innerHTML=Text;
	this.TheElement.appendChild(TheLabel); // add the dialog element to the document
	CMUtilities.AbsolutePosition(TheLabel,XOffset+10,YPosition+8,100,30);
	
	// add the checkbox
	
	var TheControl=document.createElement("input");
	TheControl.type="text";
	TheControl.name=Text;
	if (Value!=undefined) TheControl.value=Value;
	this.TheElement.appendChild(TheControl); // add the dialog element to the document

	CMUtilities.AbsolutePosition(TheControl,XOffset+110,YPosition,80,24);
	
	return(TheControl);
}
/*
* Function to create a group of radio buttons.
*
* To determine which buttons is pressed, you will need to go through the returned array
* and see which value is "checked" (i.e. Result[i].checked=true).
*
* Name - the name of the radio button group
* XOffset - X Position of the radio button group in the dialog
* YPostion - Y Position of the radio button group in the dialog
* Values - array of values for the radio buttons.  These will be the names of the
* buttons.
* Selected - the selected value from values or "null" for none
*/
CMDialog.prototype.AddRadioControl=function(Name,XOffset,YPosition,Values,Selected)
{
	var Result=[];
	
	for (var i=0;i<Values.length;i++)
	{
		// add the radiobuttons
		
		var TheControl=document.createElement("input");
		TheControl.type="radio";
		TheControl.name=Name;
		TheControl.value=Values[i];
		
		if (Selected==Values[i]) 
		{
			TheControl.checked=true;
		}
		this.TheElement.appendChild(TheControl); // add the dialog element to the document
	
		CMUtilities.AbsolutePosition(TheControl,XOffset+10,YPosition,24,24);
		
		// add a label after the checkbox
		
		var TheLabel=document.createElement("div");
		TheLabel.innerHTML=Values[i];
		this.TheElement.appendChild(TheLabel); // add the dialog element to the document
		CMUtilities.AbsolutePosition(TheLabel,XOffset+50,YPosition+8,100,30);
		
		YPosition+=30;
		
		Result.push(TheControl);
	}
	return(Result);
}
/*
* Function to create a select (popup menu) control
*
*/
CMDialog.prototype.AddSelectControl=function(Name,XOffset,YPosition,Values,Selected)
{
	var Result=[];
	var SelectedIndex=-1;
	
	// add a label after the checkbox
	
	var TheLabel=document.createElement("div");
	TheLabel.innerHTML=Name;
	this.TheElement.appendChild(TheLabel); // add the dialog element to the document
	CMUtilities.AbsolutePosition(TheLabel,XOffset+10,YPosition+8,100,30);
	
	// add the control
	
	var TheControl=CMUtilities.CreateSelectControl(Values,Selected);
	
//	var TheControl=document.createElement("SELECT");
	TheControl.name=Name;
	this.TheElement.appendChild(TheControl); // add the dialog element to the document
	
	CMUtilities.AbsolutePosition(TheControl,XOffset+110,YPosition,150,24);
	
/*	for (var i=0;i<Values.length;i++)
	{
		if (Selected==Values[i]) SelectedIndex=i;
	
		var option = document.createElement("option");
		option.text =Values[i];
		TheControl.add(option);
	}
	if (SelectedIndex!=-1) TheControl.selectedIndex=SelectedIndex;
*/	
	return(TheControl);
}