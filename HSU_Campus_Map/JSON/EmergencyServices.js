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