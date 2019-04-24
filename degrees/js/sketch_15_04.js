// Sketch One




//let video;
let img;
let poseNet;
let poses = [];
let skeletons = [];
	  
	  var v1=null;
	  var v2=null;    
      var check =0;
      
function setup() {
	createCanvas(233, 350);
	//video = createCapture(VIDEO);
	//video.size(width, height);
    //frameRate(30);
    img = createImg('david1.jpg', imageReady); //david1 233 350 kouro.png 339 460 augusto 600 900 disco 197 300 statue-pose 790 790  olimpica 882 1390 
    											//filatrice 400 600 filatrice_andrea 400 600 filatrice_00 194 259 tribu 800 600
    img.size(width, height);
    //img.hide(); // hide the image in the browser
    frameRate(1); // set the frameRate to 1 since we don't need it tobe running quickly in this case

    //Creo l'oggetto poseNet preso da libreria ml5 che lo integra
	//poseNet = ml5.poseNet(video, modelReady);
	//setInterval(poseNet.on('pose', gotPoses), 1000)
	//poseNet.on('pose', gotPoses);
  
  	//video.hide();
  	
  	
  	
  	
let u1 = createVector(1, 0, 0);
let u2 = createVector(0, 1, 0);

let angle1 = degrees(u1.angleBetween(u2));
// angle is PI/2
print(angle1);
  	
}

////

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
    
   /* poseNet.on('pose', function (results) {
        poses = results;
    });*/
}
////

function modelReady() {
  select('#status').html('Model Loaded');
  	//select('#show').html('Info Loading');
	//poseNet.multiPose(img);
	poseNet.singlePose(img);
	

}

//funzione draw: necessaria per disegnare sul canvas
function draw() {
  image(img, 0, 0, width, height);
  drawKeypoints();
  drawSkeleton();
  //drawSquare();

}

/*
function drawSquare()
{
 let d = 120;
  let p1 = d;
  let p2 = p1 + d;
  let p3 = p2 + d;
  let p4 = p3 + d;
  
  stroke(153);
  line(p3, p3, p2, p3);
  line(p2, p3, p2, p2);
  line(p2, p2, p3, p2);
  line(p3, p2, p3, p3);

}
*/
//
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
     
      //parti adiacenti A(X/Y), B(X/Y)
      let partA = poses[i].skeleton[j][0];
      let partB = poses[i].skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
      //console.log("Current Line j: ", j);
      //console.log("Current Line position: ",partA.position.x, partA.position.y, partB.position.x, partB.position.y );
	  //console.log("j: ", j);
	  //	skels.skeleton[j][i]['part']
	  //console.log("PART a:",poses[i].skeleton[j][0]["part"]);
	  //console.log("PART b:", poses[i].skeleton[j][1]["part"]);
	  let vectorAB, vecA, vecB = "";//[2];

    	/*
    	angoli possibili:
    	
    	leftHip, leftShoulder		(anca, spalla sx)
    	leftElbow, leftShoulder		(gomito, spalla sx)
    	leftElbow, leftWrist		(gomito, polso sx)
    	leftHip, leftKnee    		(anca, ginocchio sx)
    	leftKnee, leftAnkle			(ginocchio, caviglia sx)
    	
    	rightHip, rightShoulder		(anca, spalla dx)
    	rightElbow, rightShoulder	(gomito, spalla dx)
    	rightElbow, rightWrist		(gomito, polso dx)
    	rightHip, rightKnee    		(anca, ginocchio dx)
    	rightKnee, rigtAnkle		(ginocchio, caviglia dx)
    	
    	leftShoulder, rightShoulder (spalla sx, spalla dx)
    	leftHip, rightHip			(anca sx, anca dx)
    	
    	
    	
    	*/


      console.log(partA["part"]); //partA poses[i].skeleton[j][0]
	  console.log(" and ", partB["part"]); //partB poses[i].skeleton[j][1]
	  vectorAB=createVector(partB.position.x - partA.position.x, partB.position.y - partA.position.y);
	  console.log(" Vector AB: " ,vectorAB);
	  
	  vecA = createVector(partA.position.x, partA. position.y);
	  vecB = createVector(partB.position.x, partB. position.y);	  
	  
	  console.log(partA["part"]);
	  console.log("A X: " ,vecA.x);
	  console.log("A Y: " ,vecA.y);
	  console.log(partB["part"]);
	  console.log("B X: " ,vecB.x);
	  console.log("B Y: " ,vecB.y);
	  vecAB = createVector(vecB.x - vecA.x, vecB.y - vecA.y);
	  console.log("VEC AB: " ,vecAB);


	  if( (v1 == null) || (check ==0))
	  {
	  	v1=vectorAB;
	    console.log("** v1 valorizzato: ", v1)

	  	check = 1;
	  	
	  }
	  else
	  {
	  	v2=vectorAB;
		console.log("** v2 valorizzato: ", v2)
	  	
	  	check = 0;

	  }
	  if( (v1 != null && v2!=null) && check == 0)
	  {
	  	//calcolo l'angolo tra i due vettori
	  	console.log("** v1: ", v1)
	  	console.log("** v2: ", v2)
	  	
	  	let angle = degrees(v2.angleBetween(v1));
	  	//let angle = (v2.angleBetween(v1));
	  	console.log("** angle between v1, v2: ", angle);
	  	angle = "";
	  	//3 4 , 3 0
	  	//let a1 = createVector(3,4);
	  	//let a2 = createVector(3,0);	  	
	  	//console.log("** angle between (3,4), (3,0): ", degrees(a1.angleBetween(a2)));

	  }
	  
	  //let va = createVector(partA.position.x, partA.position.y);
	  //let vb = createVector(partB.position.x, partB.position.x);
	  
/*	 
	  console.log("Angle between ");
	  console.log(poses[i].skeleton[j][0]["part"]);
	  
	  console.log(" and ", poses[i].skeleton[j][1]["part"]);
	  
	  let angle = va.angleBetween(vb);
		// angle is PI/2
	console.log(" => :", angle*(180/PI)); 	
		print(angle);
*/
	  //console.log("Vectors A, B: ", a, b);
	  
	  
    }
  }
}

 //setInterval(gotPoses, 1000);

function gotPoses(results) {
	poses = results;
	console.log("POSES: ",poses);
	
  for (let i = 0; i < poses.length; i++) 
	showSkeletonPoses(poses[i]);
	
	//getElbow0(poses[0]);
	//getElbow1(poses[1]);	
	//getElbow2(poses[2]);	
}

function showSkeletonPoses(skels)
{
	let v1 = createVector(40, 50);
	let v2 = createVector(40, 50);
	    for (let j = 0; j < skels.skeleton.length; j++) {
			console.log("*** Skeleton j :",     	skels.skeleton[j]);
	    	for (let i = 0; i < skels.skeleton[j].length; i++) {
	    					console.log("*** Skeleton part: ",     	skels.skeleton[j][i]['part']);

	    	}
	    		

		} 
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
function getElbow0(inElbow)
{
	var elbow = inElbow;
	
	if(elbow!=null)
	{
		
		console.log("Skeleton 0");
		console.log("Part:", elbow['pose']['keypoints'][7]['part']);
		console.log("Score:", elbow['pose']['keypoints'][7]['score']);
		console.log("X:",elbow['pose']['keypoints'][7]['position']['x']);
		console.log("Y:", elbow['pose']['keypoints'][7]['position']['y']);
	}
	else
	{
		console.log("*********************************** Skeleton 0 => (results[0] = NULL ***********************************");
	}
}

function getElbow1(inElbow)
{
	var elbow = inElbow;
	
	if(elbow!=null)
	{
		console.log("Skeleton 1");
		console.log("Part:", elbow['pose']['keypoints'][7]['part']);
		console.log("Score:", elbow['pose']['keypoints'][7]['score']);
		console.log("X:",elbow['pose']['keypoints'][7]['position']['x']);
		console.log("Y:", elbow['pose']['keypoints'][7]['position']['y']);
	}
	else
	{
		console.log("*********************************** Skeleton 1 => (results[0] = NULL ***********************************");
	}
}

function getElbow2(inElbow)
{
	var elbow = inElbow;
	
	if(elbow!=null)
	{
		console.log("Skeleton 2");
		console.log("Part:", elbow['pose']['keypoints'][7]['part']);
		console.log("Score:", elbow['pose']['keypoints'][7]['score']);
		console.log("X:",elbow['pose']['keypoints'][7]['position']['x']);
		console.log("Y:", elbow['pose']['keypoints'][7]['position']['y']);
	}
	else
	{
		console.log("*********************************** Skeleton 2 => (results[0] = NULL ***********************************");
	}
}

*/


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Sketch Two
/*
var t = function( p ) { 

  var x = 100.0; 
  var y = 100; 
  var speed = 2.5; 
  p.setup = function() {
  
  	p.createCanvas(400, 200);
	video = createCapture(VIDEO);
	video.size(width, height);
    frameRate(30);
  
    //p.createCanvas(400, 200);
  };

  p.draw = function() {
    p.background(100);
    p.fill(1);
    x += speed; 
    if(x > p.width){
      x = 0; 
    }
    p.ellipse(x,y,50,50);

  };
};
var myp5 = new p5(t, 'c2');
*/