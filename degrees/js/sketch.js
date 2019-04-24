function setup() {
	createCanvas(233, 350);
  
  //in order to stop
  //noLoop();
/*
    img = createImg('david1.jpg', imageReady); //david1 233 350 kouro.png 339 460 augusto 600 900 disco 197 300 statue-pose 790 790  olimpica 882 1390 
    											//filatrice 400 600 filatrice_andrea 400 600 filatrice_00 194 259 tribu 800 600
    img.size(width, height);
    //img.hide(); // hide the image in the browser
    frameRate(1); // set the frameRate to 1 since we don't need it tobe running quickly in this case
*/
}

function draw() {
  background(240);
  let u0 = createVector(0,0);
  let v0 = createVector(100, 100);
  let myVect1  = createVector((84.0706 - 120.7581), (119.0182 - 152.0736));
  let myVect  = createVector((84.0706 - 156.9366), (119.0182 - 123.2364));
  
  
  let ElbWri = createVector((136.7180 - 152.0736), (85.3096 - 120.7581));
  let HipKne = createVector((139.8510 - 123.2364), (238.3160 - 156.9366));
  
  let HipSho = createVector(119.0182 - 123.2364, 84.0706 - 156.9366);
  let h = createVector(119.0182 - 123.2364, 84.0706 - 156.9366);
  

  let ElbSho = createVector(119.0182 - 152.0736, 84.0706 - 120.7581);
  let e = createVector(119.0182 - 152.0736, 84.0706 - 120.7581);

  //drawArrow(u0, ElbWri.add(10,10), 'red');
  drawArrow(v0, HipSho, 'red');

  //drawArrow(u0, HipKne.add(10,10), 'blue');
  drawArrow(v0, ElbSho, 'blue');



  let v1 = createVector(50, 100);
  //drawArrow(u0, v1, 'red');
  
  //print (cossim(ElbSho.x, ElbSho.y, HipSho.x, HipSho.y));
  //print (cossim(ElbWri.x, ElbWri.y, HipKne.x, HipKne.y));
  print (cossim(ElbSho, HipSho));
  print (cossim(vers(ElbSho), vers(HipSho) ));

  print ("ElbWri, HipKne", cossim(ElbWri, HipKne));
  
  
  //versore
  function vers(u)
  {
   let norm = Math.sqrt( (u.x * u.x)+(u.y * u.y) ); //norma u (modulo)
   let vers = createVector( (u.x/norm), (u.y/norm) );
   return u;
  }
  
/*
  function cossim(x1, y1, x2, y2) //coseno di similitudine
  {
  	let ps  = (x1*y1) + (x2*y2); //prodotto scalare
  	let norm1 = Math.sqrt( (x1*x1)+(y1*y1) ); //norma v1 (modulo)
  	let norm2 =  Math.sqrt( (x2*x2)+(y2*y2) ); //norma v2 (modulo)
  	let pnorm = norm1*norm2; //prodotto modulo v1 e modulo v2
  	let cs = ps / pnorm; //coseno di similitudine (prodotto scalare tra vettori / prodotto dei moduli)
  	//console.log("pnorm: ", pnorm);
  	//console.log("norm2: ", norm2);
  	//console.log("c: ", cs);
  	return cs;
  	//print(c);
  }
*/

//coseno di similitudine dati due vett bidim
  function cossim(u, v) //coseno di similitudine
  {
  	let ps  = (u.x * u.y) + (v.x * v.y); //prodotto scalare
  	let norm1 = Math.sqrt( (u.x * u.x)+(u.y * u.y) ); //norma v1 (modulo)
  	let norm2 =  Math.sqrt( (v.x * v.x)+(v.y * v.y) ); //norma v2 (modulo)
  	let pnorm = norm1*norm2; //prodotto modulo v1 e modulo v2
  	let cs = ps / pnorm; //coseno di similitudine (prodotto scalare tra vettori / prodotto dei moduli)
  	//console.log("pnorm: ", pnorm);
  	//console.log("norm2: ", norm2);
  	//console.log("c: ", cs);
  	return cs;
  	//print(c);
  } 

  /* hip shoulder HipSho
	Punto A.x:  123.23640206447342   
	Punto A.y:  156.93664625379773
	Punto B.x:  119.01817887756168	
	Punto B.y:  84.07056396484376
	v = (119.0182 - 123.2364, 84.0706 - 156.9366);
*/
/* left Elbow Shoulder ElbSho
	Punto A.x:  152.07357208523624
	Punto A.y:  120.7580933295356
	Punto B.x:  119.01817887756168
	Punto B.y:  84.07056396484376

    	leftElbow, leftWrist		(gomito, polso sx)
    		Punto A.x:  152.07357208523624
			Punto A.y:  120.7580933295356
			Punto B.x:  136.71798932446217
			Punto B.y:  85.30960106743707
    	leftHip, leftKnee    		(anca, ginocchio sx)
			Punto A.x:  123.23640206447342
			Punto A.y:  156.93664625379773
			Punto B.x:  139.85106923813638
			Punto B.y:  238.31605516221788  
*/
  

  let v2 = /*myVect;*/createVector(200 - 50, 200 - 50);
  //drawArrow(v0, v2, 'blue');
  //
  //let angleBetween = myVect1.angleBetween(myVect);
    let angleBetween = ElbWri.angleBetween(HipKne);

    //drawArrow(myVect1.add(100,100), myVect.add(100,100), 'yellow');
//drawArrow(myVect1.add(50,50), myVect.add(50,50), 'yellow');    
//drawArrow(u0, myVect.add(100,100), 'yellow');
//drawArrow(u0, myVect1.add(100,100), 'yellow');
  
  noStroke();
  text(
    'angle between: ' +
      angleBetween.toFixed(2) +
      ' radians or ' +
      degrees(angleBetween).toFixed(2) +
      ' degrees',
    10,
    50,
    90,
    50
  );
}

// draw an arrow for a vector at a given base position
function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}