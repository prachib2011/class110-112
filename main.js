prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width:350,
    height:300,
    image_from:'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot() {

    Webcam.snap(function (date_uri){
    document.getElementById("result").innerHTML= "<img id='capture_image' src="+date_uri+">";
    })
}
console.log('ml5.version', ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/GO2nODhfp/model.json", modelLoaded);

function modelLoaded(){
    console.log('Model Loaded!');
}

function speak(){
var synth = window.seepchSythesis;
speak_date_1 = "The First Prediction is" + prediction_1;
speak_date_2 = " And The Second Prediction is" + prediction_2;
var utterThis = new SpeechSynthesisUtterance(speak_date_1 + speak_date_2);
synth.speak(utterThis);
}

function check(){

img = document.getElementById('capture_image');
classifier.classify(img, gotResult);

}

function gotResult(error, result){
if(error){
    console.log(error);
}

else{
    console.log(result);
    document.getElementById("result_emotion_name").innerHTML = results[0].lable;
    document.getElementById("result_emotion_name_2").innerHTML = results[1].lable;
    prediction_1 = results[0].lable;
    prediction_2 = results[1].lable;
  speak()
  if (result[0].lable =="happy"){
      document.getElementById('updata_emoji').innerHTML = "&#128522;";
  }
  if(result[0].lable == "sad"){
      document.getElementById('updata_emoji').innerHTML = "&#128532;";
  }
  if(result[0].lable == "angry"){
      document.getElementById('updata_emoji').innerHTML = "&#128545;";
}
if (result[1].lable == "happy"){
      document.getElementById('updata_emoji').innerHTML = "&#128512;";
}
if(result[1].lable =="sad"){
      document.getElementById('updata_emoji').innerHTML = "&#128546;";
}
if (result[1].lable == "angry"){
      document.getElementById('updata_emoji').innerHTML = "&#128548;";
}
}
}