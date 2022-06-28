img="";
status="";
object=[];

function setup(){
    canvas=createCanvas(640,420);
    canvas.center();
    objectDtector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
}
function preload(){
    img=loadImage("room.png");
}
function draw(){
    image(img,0,0,640,420);
    if (status!=""){
        for (i=0;i<object.length;i++){
            document.getElementById("status").innerHTML="Status : Object Detected";
            fill("#FF0000");
            percent=floor(object[i].confidence*100);
    text(object[i].label+" "+percent+"%",object[i].x,object[i].y);
    noFill();
    stroke("#FF0000");
    rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
}
}
function modelLoaded(){
    console.log("Model is loaded");
    status=true;
    objectDtector.detect(img,gotResults);
}
function gotResults(error,result){
    if (error){
        console.log(error);
    }
    else {
        console.log(result);
        object=result;
    }
}