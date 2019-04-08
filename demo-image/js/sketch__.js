// Sketch One

//let video;
let img;
let poseNet;
let poses = [];
let skeletons = [];

function setup() {
	createCanvas(600, 900);
	//video = createCapture(VIDEO);
	//video.size(width, height);
    //frameRate(30);
    img = createImg('augusto.jpg', imageReady);
    img.size(width, height);
    img.hide(); // hide the image in the browser
    frameRate(1); // set the frameRate to 1 since we don't need it tobe running quickly in this case

    //Creo l'oggetto poseNet preso da libreria ml5 che lo integra
	//poseNet = ml5.poseNet(video, modelReady);
	//setInterval(poseNet.on('pose', gotPoses), 1000)
	//poseNet.on('pose', gotPoses);
  
  	//video.hide();
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
    poseNet.on('pose', function (results) {
        poses = results;
    });
}
////

function modelReady() {
  select('#status').html('Model Loaded');
  //select('#show').html('Info Loading');
      poseNet.singlePose(img)

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
      let partA = poses[i].skeleton[j][0];
      let partB = poses[i].skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
      //console.log("Current Line j: ", j);
      //console.log("Current Line position: ",partA.position.x, partA.position.y, partB.position.x, partB.position.y );

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