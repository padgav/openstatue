
let video;
let camPoseNet;
let camPoses = [];

let poses = [];
let poseNet;

let skeletons = [];
let skelVecs = [];
let camSkel = [];
let altezze =[]; //eyes, mouth, chin, shoulder, hip, knee, ankle
//var s1 = s2 = null;
let count = 0;  
let camX = 255;
	  var v1=null;
	  var v2=null;    
      var check =0;
      var vettore = new Array (17); //crea un array contenente 17 elementi
var vec;

function setup() {
	createCanvas(1024, 768);
	//in order to stop
	//noLoop();

	img = createImg('david1.jpg', imageReady); //david1 233 350 kouro.png 339 460 augusto 600 900 disco 197 300 statue-pose 790 790  olimpica 882 1390    	//filatrice 400 600 filatrice_andrea 400 600 filatrice_00 194 259 tribu 800 600
    img.size(233, 350);
    img.hide(); // hide the image in the browser
    

    video = createCapture(VIDEO);
	video.size(320, 240);
	frameRate(30);
	//poseNet = ml5.poseNet(video);
	video.hide(); // hide the image in the browser


}


function draw() {
  //background(150);
	image(img, 0, 0); // draw a second copy to canvas
	image(video, camX, 0); // draw the video frame to canvas
	filter(GRAY);

	drawKey();
	drawSkeleton();

}


// when the image is ready, then load up poseNet
function imageReady(){
    // set some options
    let options = {
    imageScaleFactor: 1,
    minConfidence: 0.1    
}

    // assign poseNet
    poseNet = ml5.poseNet(modelReady, options);
    // This sets up an event that listens to 'pose' events
    
    poseNet.on('pose', gotPoses);


}

function modelReady() {
  select('#status').html('Let\'s start!');
	//poseNet.multiPose(img);
	poseNet.singlePose(img);
	

}

function gotPoses(results) {
	poses = results;
	console.log("POSES: ",poses);
	
	/////
for (let i = 0; i < poses.length; i++) {
    for (let j = 0; j < poses[i].skeleton.length; j++) {
      let partA = poses[i].skeleton[j][0];
      let partB = poses[i].skeleton[j][1];

	  let vectorAB = "";//[2];

	  //count++;
	  //console.log("Count value:", count);

	  let currentA = partA["part"];
	  let currentB = partB["part"];
	  	  
      console.log(currentA); //partA poses[i].skeleton[j][0]
	  console.log(" and ", currentB); //partB poses[i].skeleton[j][1]

	  vectorAB=createVector(partB.position.x - partA.position.x, partB.position.y - partA.position.y);
	  vectorAB.name = currentA+currentB;
	  
	  skelVecs[currentA+currentB] = vectorAB;

	  if((partA["part"] == "leftHip") && (partB["part"] == "rightHip"))
	  { 	
	   console.log("*********************************   fine");
	   count = 0;
	  }
	  
	  
	  
	}
	
	
  }
  /*
  	  if((s1!=null)&&(s2!=null))
	  {	
	  	statueAngles[s1.name+s2.name]= degrees(s2.angleBetween(s1));
	    console.log("Statue angle left ELBOWSHOULDER left ELBOWWRIST: ", statueAngles[s1.name+s2.name]);
	  }
  */
	/////
	showSkelVecs();


}

function showSkelVecs()
{
 	console.log("skels: ", skelVecs);
 	camPoseNet = ml5.poseNet(video);

	camPoseNet.on('pose', getCamPoses);

}

function getCamPoses(results) {
	camPoses = results;
	let vectorCD = "";//[2];
	let LES = LEW = LHS = null;
	
	//console.log("POSES: ",camPoses);
	/*
skeleton_vectors['LHS'] = null;
skeleton_vectors['LES'] = null;

skeleton_vectors['LEW'] = null;
skeleton_vectors['LHK'] = null;

skeleton_vectors['LKA'] = null;
skeleton_vectors['RHS'] = null;

skeleton_vectors['RES'] = null;
skeleton_vectors['REW'] = null;

skeleton_vectors['RHK'] = null;
skeleton_vectors['RKA'] = null;

skeleton_vectors['LSRS'] = null;
skeleton_vectors['LHRH'] = null;
*/
	 
	 //skelVecs // camPoses // let skelVecs = [];

	//let count = 0;
	let LESLEW = degrees( skelVecs["leftElbowleftWrist"].angleBetween(skelVecs["leftElbowleftShoulder"]));
	let LHSLES = degrees( skelVecs["leftElbowleftShoulder"].angleBetween(skelVecs["leftHipleftShoulder"]));
	
	
	let point;
	let lWristHeight, lShoulderHeight;
	/*
	point = poses[0].pose.keypoints[0];
	console.log("THE POINT IS: ", point.position.y);

	*/
	for (let i = 0; i < camPoses.length; i++) {
		
		//if(camPoses[i].pose.keypoints[0].part == "nose")
		//	console.log("abbiamo il naso all'altezza di: ", camPoses[i].pose.keypoints[0].position.y);
			
    	for (let j = 0; j < camPoses[i].skeleton.length; j++) {
    	
      		let partA = camPoses[i].skeleton[j][0];
      		let partB = camPoses[i].skeleton[j][1];

	 
	 


      		let keypoint = camPoses[i].pose.keypoints[j];

      		if ((camPoses[i].skeleton[j][0].score > 0.2)&&(camPoses[i].skeleton[j][1].score > 0.2))  //keypoint.score > 0.2)
      		{
      		 	vectorCD=createVector(partB.position.x - partA.position.x, partB.position.y - partA.position.y);
	 	 		vectorCD.name = partA["part"]+partB["part"];
	 	 		//console.log("**** partA[part]+partB[part]", partA["part"]+partB["part"]);
	  			//camSkel[count]=createVector(partB.position.x - partA.position.x, partB.position.y - partA.position.y);
	  			//camSkel[count].name = partA["part"]+partB["part"];
	  			//count++;
	  		}
			if((LES == null)&& vectorCD.name == "leftElbowleftShoulder")
				{	LES = vectorCD; }
			if ((LEW == null) && vectorCD.name == "leftElbowleftWrist")
				{	LEW = vectorCD; console.log("LES: ", LES); console.log("LEW: ", LEW);}
			if ((LHS == null) && vectorCD.name == "leftHipleftShoulder")
				{	LHS = vectorCD; console.log("LHS: ", LHS); console.log("LHS: ", LHS);}
	  		
	  		//console.log("*****CURRENT J: ", j);
	  		//console.log("*****Keypoint cam-part: ", camPoses[i].pose.keypoints[j] );
	  		
	  		
	  		//console.log("******** wrist score: ",camPoses[i].pose.keypoints[9].score);
			//console.log("******** wrist pos y: ",camPoses[i].pose.keypoints[9].position.y);
	  		
      		/*
      		if(keypoint.part == "leftWrist") 
      		{	lWristHeight = keypoint.position.y;	console.log("******wrist position NAME?: ", keypoint.part);}
      		if(keypoint.part == "leftShoulder") 
      			lShoulderHeight = keypoint.position.y;	
      		
      		//console.log("******wrist position NAME?: ", keypoint.part);
      		//console.log("******wrist position from CAM: ", lWristHeight);
      		*/
      		
      		
      		
	  		
	  		//LES^LEW
  	  		if((LES!=null)&&(LEW!=null))
	  		{	
	  			let camAngle = Math.floor ( degrees(LEW.angleBetween(LES)) );// Math.floor (n);
	  			//console.log("Angolo cam: ", camAngle);  	    			 	    				    			
	    		
	    		if(camAngle < Math.floor(LESLEW)-20)//statueAngles[s1.name+s2.name])-1)
	  				{print("Angolo LESLEW inferiore!"); select('#LESLEW').html('decisamente inferiore.');}
	  			else if(camAngle < Math.floor(LESLEW)-10)//statueAngles[s1.name+s2.name])-1)
	  				{print("Angolo LESLEW inferiore!"); select('#LESLEW').html('ancora inferiore, ma ci siamo quasi.');}			  			
	  			
	  			
	  			else if(camAngle > Math.floor(LESLEW)+20)
	  				{print("Angolo LESLEW maggiore! ", camAngle); select('#LESLEW').html('decisamente maggiore.');}
	  			else if(camAngle > Math.floor(LESLEW)+10)
	  				{print("Angolo LESLEW maggiore!", camAngle); select('#LESLEW').html('ancora maggiore, ma ci siamo quasi..');}	  	
	  				
	  			else if( (camAngle > Math.floor(LESLEW)-2) && (camAngle < Math.floor(LESLEW)+2) )//statueAngles[s1.name+s2.name])-1)
	  				{ print("Angolo LESLEW uguale!", camAngle); select('#LESLEW').html(' uguale!!.');}	  							
	  		 
	  				
	  		}
	  		
	  		//LHS^LES
  	  		if((LHS != null)&&(LES != null))
	  		{	
	  			let camAngle = Math.floor ( degrees(LES.angleBetween(LHS)) );// Math.floor (n);
	  			//console.log("Angolo cam: ", camAngle);
	  			
	  			
	  			console.log("Angolo statue: ", Math.floor (LHSLES)); //statueAngles[s1.name+s2.name]));
	  			if(camAngle < Math.floor(LHSLES)-20)//statueAngles[s1.name+s2.name])-1)
	  				{print("Angolo inferiore!"); select('#LHSLES').html('decisamente inferiore.');}
	  			else if(camAngle < Math.floor(LHSLES)-10)//statueAngles[s1.name+s2.name])-1)
	  				{print("Angolo inferiore!"); select('#LHSLES').html('ancora inferiore, ma ci siamo quasi.');}
	  					  				
	  			else if(camAngle > Math.floor(LHSLES)+20)//statueAngles[s1.name+s2.name])+1)
	  				{print("Angolo maggiore!"); select('#LHSLES').html('decisamente maggiore.');}
	  			else if(camAngle > Math.floor(LHSLES)+10)//statueAngles[s1.name+s2.name])+1)
	  				{print("Angolo maggiore!"); select('#LHSLES').html('ancora maggiore, ma ci siamo quasi...');}	  				
	  			else if( (camAngle > Math.floor(LHSLES)-2) && (camAngle < Math.floor(LHSLES)+2) )
	  				{ print("Angolo uguale!"); select('#LHSLES').html(' uguale!!.');}
	    		//console.log("Statue angle left ELBOWSHOULDER left ELBOWWRIST: ", statueAngles[s1.name+s2.name]);
	  		}	  		
			//console.log("PART-A from showSkelVecs: ", partA["part"]);
			//leftHipleftShoulderleftElbowleftShoulder
			
      	}
      	//console.log("**********Vettore di keypoints: ",camPoses[i].pose.keypoints);
      	
      	
      	
	if(camPoses[i].pose.keypoints[9].score > 0.2 && camPoses[i].pose.keypoints[5].score > 0.2)
    {   
    	
    	let yStatueWrists =  poses[0].pose.keypoints[9].position.y;
    	let yStatueShoulder =  poses[0].pose.keypoints[5].position.y;
		let yCamWrists =  camPoses[0].pose.keypoints[9].position.y;
    	let yCamShoulder =  camPoses[0].pose.keypoints[5].position.y;
    	
    	let diffStatue = yAHeigthB(yStatueShoulder, yStatueWrists);
    	let diffCam = yAHeigthB(yCamShoulder, yCamWrists);
		let uOd = upOrDown(diffStatue, diffCam);
		//lWristHeight
		
		//print("DIFF STATUE: ", diffStatue);
		//print("DIFF CAM: ", diffCam);
		switch(uOd){
			case 0:
				select('#lWristHeight').html(' perfetto!'); 
			break;

			case 1:
				select('#lWristHeight').html('devi sollevarlo.');
			break;
			
			case -1:
				select('#lWristHeight').html('devi abbassarlo.');
			break;
		}
		/*
    	if(diffStatue  < 0)
    		if(diffCam < 0) 
				if((diffCam > diffStatue - 10) && (diffCam < diffStatue +10))
					{print("*** ALTEZZA POLSO RISPETTO ALLA SPALLA: perfetto!"); select('#lWristHeight').html(' perfetto!'); }
				else
					{print("*** ALTEZZA POLSO RISPETTO ALLA SPALLA: troppo basso! devi sollevarlo!"); select('#lWristHeight').html('devi sollevarlo.');}
			else
				{print("*** ALTEZZA POLSO RISPETTO ALLA SPALLA: troppo alto. Portalo verso la spalla!"); select('#lWristHeight').html('devi abbassarlo.'); }
				
		else if(diffStatue  > 0)
    		if(diffCam > 0) 
				if((diffCam > diffStatue - 10) && (diffCam < diffStatue +10))
					{print("*** ALTEZZA POLSO RISPETTO ALLA SPALLA: perfetto!"); }
				else
					{print("*** ALTEZZA POLSO RISPETTO ALLA SPALLA: troppo alto! devi abbassarlo!"); }
			else
				{print("*** ALTEZZA POLSO RISPETTO ALLA SPALLA: troppo basso. Portalo verso la spalla!"); }
		*/		
				
		/*		
		else if(diffStatue  > 0)
				
				
				
					
				else if (diffCam < diffStatue)
					print("*** ALTEZZA POLSO: SOLLEVA IL POLSO!!");
		if(diffStatue < 0)
    		if(diffCam < 0) 
 				if((diffCam > diffStatue - 10) && (diffCam < diffStatue +10))
					print("*** ALTEZZA POLSO RISPETTO A SPALLA OK!");
				else if (diffCam < diffStatue)
					print("*** ALTEZZA POLSO: SOLLEVA IL POLSO!!");
	
		*/


		/*
    	//if +diff heigth b more a
		else if ( diff < 0) //-diff height b less a
		else // equals
		*/

    	//if( (poses[0].pose.keypoints[9].position.y > poses[0].pose.keypoints[9].position.y - 5) &&
    	//(poses[0].pose.keypoints[9].position.y > poses[0].pose.keypoints[9].position.y + 5)
    	//)
    	
	    		//ALTEZZA POLSO RISPETTO AL CANVAS - DA RIVEDERE IN FUNZIONE DI: 
	    		// - altezze relative a parti del corpo invece che il canvas
	    		// - altezze relative a asse y invertita
	    /*	    		
		if( camPoses[i].pose.keypoints[9].position.y > poses[0].pose.keypoints[9].position.y+30 )
	    	{console.log("Devi abbassare ancora il polso..");  select('#lWristHeight').html('devi decisamente abbassarlo.');}
	    else if(camPoses[i].pose.keypoints[9].position.y > poses[0].pose.keypoints[9].position.y+15 )
	    	{print("Devi abbassare ancora il polso, ma ci siamo quasi!"); select('#lWristHeight').html('Devi abbassare ancora il polso, ma ci siamo quasi!');}
	    else if(camPoses[i].pose.keypoints[9].position.y < poses[0].pose.keypoints[9].position.y-30 )
	    	{print("Devi sollevare ancora il polso.."); select('#lWristHeight').html('devi decisamente sollevarlo.');}
	    else if(camPoses[i].pose.keypoints[9].position.y < poses[0].pose.keypoints[9].position.y-15 )
	    	{print("Devi sollevare ancora il polso, ma ci siamo quasi!"); select('#lWristHeight').html('Devi sollevare ancora il polso, ma ci siamo quasi!');}		
	    else {print("Altezza del polso ok!"); select('#lWristHeight').html('Così va bene!.');}
		*/
	}
      }
     //console.log("vettori da cam: ",camSkel);
     
     
				

	/*
	camSkel.forEach(function(entry) {
		//skeleton_vectors['LHS'] = null;
		//skeleton_vectors['LES'] = null;
		let v1 = v2 = null;
		
		if(entry.name=="leftElbowleftShoulder")
			v1 = entry;
		if(entry.name=="LeftElbowleftWrist")
		{
			v2 = entry;
			let angle = degrees(v2.angleBetween(v1));
			console.log("Angle between v1, v2 cam:", angle);

		}
		//if(v1 e v2 not null)
		//	calcola angolo e poi confronta con statua
			
		//console.log("visualizza v1 e v2", v1+v2)	
			
    	//console.log("Entries: ",entry.name);
    	
	});
	*/
	
	
	
	
		
     /*
     for(let k = 0; k < skelVecs.length; k++)
	 {
		if( (partA["part"]+partB["part"]) ==  skelVecs[k].name)
		{
			//console.log("skelVecs name: ", skelVecs[k].name);
					
		}
			
			
	}
    */
    /*
    let partA = poses[i].skeleton[j][0];
      let partB = poses[i].skeleton[j][1];

	  let vectorAB = "";//[2];

	  count++;
	  console.log("Count value:", count);

	  let currentA = partA["part"];
	  let currentB = partB["part"];
	  	  
      console.log(currentA); //partA poses[i].skeleton[j][0]
	  console.log(" and ", currentB); //partB poses[i].skeleton[j][1]

	  vectorAB=createVector(partB.position.x - partA.position.x, partB.position.y - partA.position.y);
	  vectorAB.name = currentA+currentB;
	 
    
    */
}

function drawKey()
{
  //
  let altezze =[]; //eyes, mouth, chin, shoulder, hip, knee, ankle

  for (let i = 0; i < poses.length; i++) {
    for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
      let keypoint = poses[i].pose.keypoints[j];
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        //disegna i punti, per ogni coppia x/y, come ellissi (cerchi) 10x10
        ellipse(keypoint.position.x, keypoint.position.y, 5, 5);
      }
    }
  }
}

function drawSkeleton()
{  
  //
  for (let i = 0; i < poses.length; i++) {
    for (let j = 0; j < poses[i].skeleton.length; j++) {
      let partA = poses[i].skeleton[j][0];
      let partB = poses[i].skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
      //console.log("Current Line j: ", j);
      //console.log("Current Line position: ",partA.position.x, partA.position.y, partB.position.x, partB.position.y );
	  
    }
  }
}

//function that calculate diff between a, b on y axs
//if( diff  > 0) // +diff heigth b more a
//else if ( diff < 0) //-diff height b less a
function yAHeigthB(a, b)
{
	return (a-b);
}


//compare diffs between 2 statuePoint vs 2 camPoint. If the cam point have to be upper, return 1, viceversa return -1. If its ok return 0
function upOrDown(diffStatue, diffCam)
{
	
	let s = abs(diffStatue);
	let c = abs(diffCam);
	if( (c > (s - 3)) && (c < (s + 3)) ) //se la differenza tra spalla e polso di statue e di cam è nel range di -3/+3 è ok
	//if((diffStatue == 0) && (diffCam ==0))
		return 0;//ok
	
	else if(diffCam<diffStatue) //se la differenza di cam è inferiore si deve sollevare il polso
		return 1;
	else	//viceversa sarà maggiore dunque abbassare il polso
		return -1;

}
