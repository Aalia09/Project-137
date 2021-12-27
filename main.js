statuss = "";
objects = [];

function preload()
{
  
}

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380 , 380);
    video.hide();
    
}

function start()
{
    objectDetector = ml5.objectDetector("cocossd" , modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";

    var value = document.getElementById("object_name").value;



}

function modelLoaded()
{
    console.log("Model is loaded");
    statuss = true;
}

function gotResult(error , results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw()
{
    image(video, 0 , 0 , 380 , 380);
    if(statuss != "")
    {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            
            fill("#3d3ca6");

            percent = floor(objects[i].confidence *100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke("#3d3ca6");
            rect(objects[i].x, objects[i].y , objects[i].width , objects[i].height);


             if(objects[i].label == value)
             {
                 video.stop();
                 objectDetector.detect(gotResult);
                 document.getElementById("value").innerHTML = value + "Found";
                 synth = window.speechSynthesis;
                 utterThis = new SpeechSynthesisUtterance(value + "Found");
                 synth.speak(utterThis);
             }
             else{
                 document.getElementById("value").innerHTML = value + "Not Found";
             }
        }
    }
}