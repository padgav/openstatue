
    	/*
    	angoli possibili:
    	
    	leftHip, leftShoulder		(anca, spalla sx) LHS
    	leftElbow, leftShoulder		(gomito, spalla sx) LES
    	leftElbow, leftWrist		(gomito, polso sx) LEW
    		Punto A.x:  152.07357208523624
			Punto A.y:  120.7580933295356
			Punto B.x:  136.71798932446217
			Punto B.y:  85.30960106743707
    	leftHip, leftKnee    		(anca, ginocchio sx)	LHK
			Punto A.x:  123.23640206447342
			Punto A.y:  156.93664625379773
			Punto B.x:  139.85106923813638
			Punto B.y:  238.31605516221788    	

    	leftKnee, leftAnkle			(ginocchio, caviglia sx) LKA
    	
    	rightHip, rightShoulder		(anca, spalla dx)	RHS
    	rightElbow, rightShoulder	(gomito, spalla dx) RES
    	rightElbow, rightWrist		(gomito, polso dx)	REW
    	rightHip, rightKnee    		(anca, ginocchio dx)	RHK
    	rightKnee, rigtAnkle		(ginocchio, caviglia dx)	RKA
    	
    	leftShoulder, rightShoulder (spalla sx, spalla dx)	LSRS
    	leftHip, rightHip			(anca sx, anca dx)		LHRH
    	*/
let video;
let poseNet;
let camPoseNet;
let poses = [];

	
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
    //frameRate(1); // set the frameRate to 1 since we don't need it tobe running quickly in this case
    

    video = createCapture(VIDEO);
	video.size(320, 240);
	frameRate(30);
	//poseNet = ml5.poseNet(video);
	video.hide(); // hide the image in the browser
	camPoseNet = ml5.poseNet(video);

	camPoseNet.on('pose', getCamPoses);
    //frameRate(30);
    //console.log("show skel vect:", showskelvec());

    /* 
      image(fingers, 10, 10); // draw the video frame to canvas
  filter(GRAY);
  image(fingers, 150, 150); // draw a second copy to canvas
    */

}


function draw() {
  //background(150);
    image(img, 0, 0); // draw a second copy to canvas
  image(video, camX, 0); // draw the video frame to canvas
  filter(GRAY);

  drawKey();
  drawSkeleton();
  //getCam();
  //drawCamSkel();
  //drawCamKey();

// drawKeypoints();
//drawSkeleton();
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
  select('#status').html('Model Loaded');
	//poseNet.multiPose(img);
	poseNet.singlePose(img);
	

}

/*
function getAngle(cx, cy, ex, ey) {
  var dy = ey - cy;
  var dx = ex - cx;
  var theta = Math.atan2(dy, dx); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  //if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;
}
function angle360(cx, cy, ex, ey) {
  var theta = getAngle(cx, cy, ex, ey); // range (-180, 180]
  if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;
}
*/

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

/*
	  if((currentA == "leftHip") && (currentB == "leftShoulder"))
	  skeleton_vectors['LHS']=createVector(partB.position.x - partA.position.x, partB.position.y - partA.position.y);
	  if((currentA == "leftElbow") && (currentB == "leftShoulder"))
	  skeleton_vectors['LES']=createVector(partB.position.x - partA.position.x, partB.position.y - partA.position.y);
	  if((currentA == "lefElbow") && (currentB == "leftWrist"))
	  skeleton_vectors['LEW']=createVector(partB.position.x - partA.position.x, partB.position.y - partA.position.y);
	  
	  if((currentA == "leftHip") && (currentB == "leftShoulder"))
	  skeleton_vectors['LHS']=createVector(partB.position.x - partA.position.x, partB.position.y - partA.position.y);
	  if((currentA == "leftHip") && (currentB == "leftShoulder"))
	  skeleton_vectors['LHS']=createVector(partB.position.x - partA.position.x, partB.position.y - partA.position.y);
	  
	  if((currentA == "leftHip") && (currentB == "leftShoulder"))
	  skeleton_vectors['LHS']=createVector(partB.position.x - partA.position.x, partB.position.y - partA.position.y);
	  if((currentA == "leftHip") && (currentB == "leftShoulder"))
	  skeleton_vectors['LHS']=createVector(partB.position.x - partA.position.x, partB.position.y - partA.position.y);
	  if((currentA == "leftHip") && (currentB == "leftShoulder"))
	  skeleton_vectors['LHS']=createVector(partB.position.x - partA.position.x, partB.position.y - partA.position.y);
	  if((currentA == "leftHip") && (currentB == "leftShoulder"))
	  skeleton_vectors['LHS']=createVector(partB.position.x - partA.position.x, partB.position.y - partA.position.y);
	  if((currentA == "leftHip") && (currentB == "leftShoulder"))
	  skeleton_vectors['LHS']=createVector(partB.position.x - partA.position.x, partB.position.y - partA.position.y);	  	  	  	  	  	  	  	  
	  	//leftHip leftShoulder
	  //skeleton_vectors 
*/	
	  vectorAB=createVector(partB.position.x - partA.position.x, partB.position.y - partA.position.y);
	  vectorAB.name = currentA+currentB;
	  
	  /*
	  if((currentA == "leftHip") && (currentB == "leftShoulder"))  
	  skeleton_vectors['LHS']=vectorAB;//createVector(partB.position.x - partA.position.x, partB.position.y - partA.position.y);
	  */
	  	
	  //let at = atan2(partB.position.x - partA.position.x, partB.position.y - partA.position.y);
	  //console.log("** Atan2  vAB: ", at);
	  
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
	  	
	  	//let th = angle(v1.x, v1.y, v2.x , v2.y);
	  	
	  	/*
		let th = angle360(v1.x, v1.y,v2.x, v2.y);
	    console.log("** (angle360) Angle th v2, v1: ", th);

		let the = getAngle(v1.x, v1.y,v2.x, v2.y);
	    console.log("** (getAngle) Angle th v2, v1: ", the);
	  	*/
	  		  	
	  	let angle = degrees(v2.angleBetween(v1));
	  	console.log("** angle between v2, v1: ", angle);
	  	
  		//let part = 360 - (angle + 90);
  		//let myAngle = 90 - part;
	  	//console.log("** myAngle between v2, v1: ", myAngle);


	  	//atan2(y, x)
	  	//let angle2  = atan2( partB.position.y - partA.position.y,  partB.position.x -  partA.position.x) ;
	  	//console.log("atan2 : ", angle2);
	  	//console.log("atan2 degrees: ", degrees(angle2));
	  	//console.log("atan2 angle: ", angle2*180 / PI );

	  	//let angle2 = degrees(v1.angleBetween(v2));
	  	//console.log("** angle between v1, v2: ", angle2);

	  }


	  if((partA["part"] == "leftHip") && (partB["part"] == "rightHip"))
	  { 	
	   console.log("*********************************   daccapo");
	   count = 0;
	  }
	}
  }
	/////

}


function getCamPoses(results) {
	camPoses = results;
	//console.log("POSES: ",camPoses);

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


/*
function drawCamKey()
{
  //
  for (let i = 0; i < camPoses.length; i++) {
    for (let j = 0; j < camPoses[i].pose.keypoints.length; j++) {
      let keypoint = camPoses[i].pose.keypoints[j];
      if (keypoint.score > 0.8) {
        fill(255, 0, 0);
        noStroke();
        //disegna i punti, per ogni coppia x/y, come ellissi (cerchi) 10x10
        ellipse(keypoint.position.x+camX, keypoint.position.y, 5, 5);
      }
    }
  }
}  

function drawCamSkel()
{
  //
  for (let i = 0; i < camPoses.length; i++) {
    for (let j = 0; j < camPoses[i].skeleton.length; j++) {
      let partA = camPoses[i].skeleton[j][0];
      let partB = camPoses[i].skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x+camX, partA.position.y, partB.position.x+camX, partB.position.y);
      //console.log("Current Line j: ", j);
      //console.log("Current Line position: ",partA.position.x, partA.position.y, partB.position.x, partB.position.y );

    }
  }
}
*/
/*
function drawKeypoints()  {
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


function drawSkeleton() {
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
*/


