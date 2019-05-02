
let video;
let poseNet;
let camPoseNet;
let poses = [];
let theta1 = [];
let theta2 = [];
let statueAngles = [];
	
//let skeleton_vectors = new Array() ;
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

let camPoses = [];
let skeletons = [];
let skelVecs = [];
let camSkel = [];
var s1 = s2 = null;
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
  select('#status').html('Imita la posizione del braccio sx (a dx dell\'immagine)');
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

	  count++;
	  console.log("Count value:", count);

	  let currentA = partA["part"];
	  let currentB = partB["part"];
	  	  
      console.log(currentA); //partA poses[i].skeleton[j][0]
	  console.log(" and ", currentB); //partB poses[i].skeleton[j][1]

	  vectorAB=createVector(partB.position.x - partA.position.x, partB.position.y - partA.position.y);
	  vectorAB.name = currentA+currentB;
	 
	  //skeleton_vectors['LES'] = null;
	  //skeleton_vectors['LEW'] = null;
	  
	  if ((s1==null)&& vectorAB.name == "leftElbowleftShoulder")
	  {	s1 = vectorAB; console.log("S1: ", s1);}
	  if ((s2==null) && vectorAB.name == "leftElbowleftWrist")
	  {	s2 = vectorAB; console.log("S2: ", s2);}

	  
	  skelVecs[count-1] = vectorAB;
	  
	  if( (v1 == null) || (check ==0))
	  {
	    console.log("V1 = NULL OPPURE CHECK == 0");
	    console.log("Quindi valorizzo V1 con ab, e segno CHECK = 1.");	    
	  	v1=vectorAB;
	    console.log("** v1 valorizzato: ", v1)

	  	check = 1;
	  	
	  }
	  else
	  {
	    console.log("Se V1 diverso da null e CHECK diverso da 0");
	    console.log("Il count sara' cresciuto; Valorizzo v2 con ab, pongo CHECK = 0.");

	  	v2=vectorAB;
		console.log("** v2 valorizzato: ", v2)
	  	
	  	check = 0;

	  }
	  if( (v1 != null && v2!=null) && check == 0)
	  {
	    console.log("A questo punto dovrei trovare v1 e v2 diversi da null, e check = 0:");
	    console.log("Quindi stampo i due vettori, calcolo e stampo l'angolo tra i due.");
	    

	  	//calcolo l'angolo tra i due vettori
	  	console.log("** v1: ", v1)
	  	console.log("** v2: ", v2)
	  	console.log("************************** vettore ************************** ", vettore);


	  	let angle = degrees(v2.angleBetween(v1));
	  	theta1[v1.name+v2.name]=angle;


	  	console.log("** angle between v2, v1: ", angle);


	  }


	  if((partA["part"] == "leftHip") && (partB["part"] == "rightHip"))
	  { 	
	   console.log("*********************************   daccapo");
	   count = 0;
	  }
	}
  }
  	  if((s1!=null)&&(s2!=null))
	  {	
	  	statueAngles[s1.name+s2.name]= degrees(s2.angleBetween(s1));
	    console.log("Statue angle left ELBOWSHOULDER left ELBOWWRIST: ", statueAngles[s1.name+s2.name]);
	  }
  
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
	let c1 = c2 = null;

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
	
	for (let i = 0; i < camPoses.length; i++) {
	
    	for (let j = 0; j < camPoses[i].skeleton.length; j++) {
    	
      		let partA = camPoses[i].skeleton[j][0];
      		let partB = camPoses[i].skeleton[j][1];

	 
      		let keypoint = camPoses[i].pose.keypoints[j];
      		
      		if (keypoint.score > 0.2)
      		{
      		 	vectorCD=createVector(partB.position.x - partA.position.x, partB.position.y - partA.position.y);
	 	 		vectorCD.name = partA["part"]+partB["part"];
	 	 		
	  			//camSkel[count]=createVector(partB.position.x - partA.position.x, partB.position.y - partA.position.y);
	  			//camSkel[count].name = partA["part"]+partB["part"];
	  			//count++;
	  		}
			if((c1==null)&& vectorCD.name == "leftElbowleftShoulder")
				{	c1 = vectorCD; }
			if ((c2==null) && vectorCD.name == "leftElbowleftWrist")
				{	c2 = vectorCD; console.log("C1: ", c1); console.log("C2: ", c2);}
	  		
  	  		if((c1!=null)&&(c2!=null))
	  		{	
	  			let camAngle = Math.floor ( degrees(c2.angleBetween(c1)) );// Math.floor (n);
	  			if(camAngle < Math.floor (statueAngles[s1.name+s2.name]))
	  				{print("Angolo inferiore!"); select('#status').html('Imita la posizione del braccio sx (a dx dell\'immagine): angolo inferiore.');}
	  			else if(camAngle > Math.floor (statueAngles[s1.name+s2.name]))
	  				{print("Angolo maggiore!"); select('#status').html('Imita la posizione del braccio sx (a dx dell\'immagine): angolo maggiore.');}
	  			else 
	  				{ print("Angolo uguale!"); select('#status').html('Imita la posizione del braccio sx (a dx dell\'immagine): angolo uguale!!.');}
	    		//console.log("Statue angle left ELBOWSHOULDER left ELBOWWRIST: ", statueAngles[s1.name+s2.name]);
	  		}
			//console.log("PART-A from showSkelVecs: ", partA["part"]);
			//leftHipleftShoulderleftElbowleftShoulder
			
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


