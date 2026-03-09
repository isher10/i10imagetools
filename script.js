function compressImage(){

let fileInput = document.getElementById("upload");
let sizeInput = document.getElementById("size").value;

if(fileInput.files.length === 0){
alert("Please upload an image");
return;
}

let file = fileInput.files[0];
let reader = new FileReader();

reader.onload = function(e){

let img = new Image();
img.src = e.target.result;

img.onload = function(){

let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");

canvas.width = img.width;
canvas.height = img.height;

ctx.drawImage(img,0,0);

let quality = 0.9;

let dataUrl = canvas.toDataURL("image/jpeg",quality);

let download = document.getElementById("download");

download.href = dataUrl;
download.download = "compressed-image.jpg";
download.style.display = "inline-block";
download.innerText = "Download Image";

}

}

reader.readAsDataURL(file);

}

function convertToJPG() {

const fileInput = document.getElementById("upload");
const downloadLink = document.getElementById("download");
document.getElementById("progressText").innerText = "Converting Image...";
if(fileInput.files.length === 0){
alert("Please upload an image first");
return;
}

const file = fileInput.files[0];
const img = new Image();
const reader = new FileReader();

reader.onload = function(e){

img.src = e.target.result;

img.onload = function(){

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

canvas.width = img.width;
canvas.height = img.height;

ctx.drawImage(img,0,0);

const jpg = canvas.toDataURL("image/jpeg",0.9);

downloadLink.href = jpg;
downloadLink.download = "converted-image.jpg";
downloadLink.style.display = "inline-block";
downloadLink.innerText = "Download JPG";
document.getElementById("afterImage").src = jpg;

document.getElementById("compareBox").style.display = "block";
}

}

reader.readAsDataURL(file);

}

function convertToPNG() {

const fileInput = document.getElementById("upload");
const downloadLink = document.getElementById("download");

if(fileInput.files.length === 0){
alert("Please upload an image first");
return;
}

const file = fileInput.files[0];
const img = new Image();
const reader = new FileReader();

reader.onload = function(e){

img.src = e.target.result;

img.onload = function(){

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

canvas.width = img.width;
canvas.height = img.height;

ctx.drawImage(img,0,0);

const png = canvas.toDataURL("image/png");

downloadLink.href = png;
downloadLink.download = "converted-image.png";
downloadLink.style.display = "inline-block";
downloadLink.innerText = "Download PNG";

}

}

reader.readAsDataURL(file);

}

const uploadInput = document.getElementById("upload");
const previewImage = document.getElementById("previewImage");

if(uploadInput){

uploadInput.addEventListener("change", function(){

const file = this.files[0];

if(file){

const reader = new FileReader();

reader.onload = function(e){

previewImage.src = e.target.result;
previewImage.style.display = "block";
document.getElementById("beforeImage").src = e.target.result;
}

reader.readAsDataURL(file);

}

});

}

const uploadArea = document.getElementById("uploadArea");
const uploadFile = document.getElementById("upload");

if(uploadArea){

uploadArea.addEventListener("click", () => uploadFile.click());

uploadArea.addEventListener("dragover", (e)=>{
e.preventDefault();
uploadArea.style.background="#eef1ff";
});

uploadArea.addEventListener("dragleave", ()=>{
uploadArea.style.background="#f9f9ff";
});

uploadArea.addEventListener("drop",(e)=>{
e.preventDefault();

uploadArea.style.background="#f9f9ff";

uploadFile.files = e.dataTransfer.files;

const event = new Event("change");
uploadFile.dispatchEvent(event);

});

}

const imageInfo = document.getElementById("imageInfo");

if(uploadInput){

uploadInput.addEventListener("change", function(){

const file = this.files[0];

if(file){

const img = new Image();

img.onload = function(){

const sizeKB = (file.size / 1024).toFixed(2);

imageInfo.innerHTML =
"Width: " + img.width + "px | Height: " + img.height + "px | Size: " + sizeKB + " KB";

}

img.src = URL.createObjectURL(file);

}

});

}

function reduceImage(){

const fileInput = document.getElementById("imageInput");

const targetSize = document.getElementById("targetSize").value;

if(!fileInput.files[0]){

alert("Please select image");

return;

}

const file = fileInput.files[0];

const reader = new FileReader();

reader.onload = function(e){

const img = new Image();

img.src = e.target.result;

img.onload = function(){

const canvas = document.createElement("canvas");

const ctx = canvas.getContext("2d");

canvas.width = img.width;

canvas.height = img.height;

ctx.drawImage(img,0,0);

let quality = 0.9;

let dataUrl;

do{

dataUrl = canvas.toDataURL("image/jpeg",quality);

quality -= 0.05;

}while(dataUrl.length/1024 > targetSize && quality > 0.05);

document.getElementById("resultBox").innerHTML =

`
<h3>Download Image</h3>

<img src="${dataUrl}" style="max-width:200px">

<p>Size: ${(dataUrl.length/1024).toFixed(1)} Kb</p>

<input type="text" id="rename" placeholder="Rename Image">

<br><br>

<button onclick="downloadImage('${dataUrl}')">Download</button>

<br><br>

<button onclick="deleteImage()">Delete Your Images From Server Now</button>
`;

}

}

reader.readAsDataURL(file);

}

function deleteImage(){

document.getElementById("resultBox").innerHTML="";

alert("Image deleted");

}

function downloadImage(dataUrl){

let name = document.getElementById("rename").value;

if(name == ""){
name = "compressed-image";
}

const a = document.createElement("a");

a.href = dataUrl;

a.download = name + ".jpg";

a.click();

}

const upload = document.getElementById("upload");
const preview = document.getElementById("preview");
const download = document.getElementById("download");

let originalImage = new Image();

upload.addEventListener("change", function(){

const file = this.files[0];

if(!file) return;

const reader = new FileReader();

reader.onload = function(e){

preview.src = e.target.result;
preview.style.display = "block";

originalImage.src = e.target.result;

}

reader.readAsDataURL(file);

});

function resizeImage(){

const widthInput = document.getElementById("width").value;
const heightInput = document.getElementById("height").value;

const unit = document.getElementById("unit").value;

const format = document.getElementById("format").value;
const quality = document.getElementById("quality").value / 100;

let width;
let height;

if(unit === "percent"){

width = originalImage.width * (widthInput/100);
height = originalImage.height * (heightInput/100);

}

else if(unit === "px"){

width = widthInput;
height = heightInput;

}

else if(unit === "cm"){

width = widthInput * 37.8;
height = heightInput * 37.8;

}

else if(unit === "inch"){

width = widthInput * 96;
height = heightInput * 96;

}

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

canvas.width = width;
canvas.height = height;

ctx.drawImage(originalImage,0,0,width,height);

const dataUrl = canvas.toDataURL("image/"+format,quality);

const filename = document.getElementById("filename").value || "resized-image";

download.href = dataUrl;
download.download = filename + "." + format;
download.style.display = "inline";

}

let lock = true;

const widthInput = document.getElementById("width");
const heightInput = document.getElementById("height");
const lockBtn = document.getElementById("lockBtn");

let ratio = 1;

lockBtn.addEventListener("click",function(){

lock = !lock;

if(lock){

lockBtn.innerHTML="🔒";

}else{

lockBtn.innerHTML="🔓";

}

});

upload.addEventListener("change",function(){

const file = this.files[0];

if(!file) return;

const reader = new FileReader();

reader.onload = function(e){

originalImage = new Image();

originalImage.onload = function(){

document.getElementById("previewImage").src = e.target.result;

document.getElementById("previewBox").style.display = "block";

widthInput.value = originalImage.width;

heightInput.value = originalImage.height;

ratio = originalImage.width / originalImage.height;

const sizeKB = (file.size/1024).toFixed(2);

document.getElementById("imageInfo").innerText =
originalImage.width + " x " + originalImage.height +
" | " + sizeKB + " KB";

}

originalImage.src = e.target.result;

}

reader.readAsDataURL(file);

});

widthInput.addEventListener("input",function(){

if(lock){

heightInput.value = Math.round(widthInput.value / ratio);

}

});

heightInput.addEventListener("input",function(){

if(lock){

widthInput.value = Math.round(heightInput.value * ratio);

}

});
