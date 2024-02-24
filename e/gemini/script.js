import { GoogleGenerativeAI } from "@google/generative-ai";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js"; // Convert MarkDown to HTML

const API_KEY = "AIzaSyAWqxUcGcTcpu8ioALrzuRuPy-UUqDnHg0";

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);

// Foe the text-only input
async function run_text() {

  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = document.getElementById("query").value;  // To get the value from the input tag

  document.getElementById('display').append('Q. ' + prompt + '\n\n');  // To display the question

  const result = await model.generateContentStream(prompt);  // Using Streaming for faster access

  let text = '';
  for await (const chunk of result.stream) {  // For faster access
    const chunkText = chunk.text();
    console.log(chunkText);
    text += chunkText;
  }

  const html = marked.parse(text);  // To convert the markdown 
  document.getElementById("display").innerHTML += (html + '\n\n');  // Display the answer

  hljs.highlightAll();  // To highlight the code blocks
  const designs = document.querySelectorAll(".hljs");
  designs.forEach(design =>{
    design.style.display = "inline-block";  // To change the style of code block
  })
}


// Converts a File object to a GoogleGenerativeAI.Part object.
async function fileToGenerativePart(file) {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
}

// For the image only input
async function run_image() {
  // For text-and-images input (multimodal), use the gemini-pro-vision model
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const prompt = document.getElementById("query").value;  // To get the value from the input tag

  document.getElementById('display').append('Q. ' + prompt + '\n\n');  // To display the question


  const fileInputEl = document.querySelector("input[type=file]");  // To select the image
  const imageParts = await Promise.all(
    [...fileInputEl.files].map(fileToGenerativePart)
  );

  const result = await model.generateContentStream([prompt, ...imageParts]); // Streaming for faster access

  let text = '';
  for await (const chunk of result.stream) { // For the faster access
    const chunkText = chunk.text();
    console.log(chunkText);
    text += chunkText;
  }

  const html = marked.parse(text);  // To convert the markdown 
  document.getElementById("display").innerHTML += (html + '\n\n');  // Display the answer
}


// Added EventListener to the button
const send_button = document.getElementById('send-button');
send_button.addEventListener("click", () => {

  const file = document.getElementById('upload-image');  // Selecting the value of input of type file

  if (file.value){
    run_image();  // Run the function which handle image
    file.value = '';  // To reset the file selected
    console.log("Image function run");
  }
  else{
    run_text();  // Run the text-only function
    console.log("Text function run");
  }
  document.getElementById('query').value = '';  // To clear the input
})


// Added EventListener --> When Press Enter it gets executed
const input = document.getElementById('query');
input.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    event.preventDefault();  // Prevent the Default action
    send_button.click();  // Send the control to the send-button
  }
})
// 获取上传图片的input元素
const uploadImageInput = document.getElementById("upload-image");
// 获取文本输入框元素
const queryInput = document.getElementById("query");

// 监听上传图片input元素的change事件
uploadImageInput.addEventListener("change", function() {
  // 获取用户选择的文件
  const file = this.files[0];
  // 将文件名显示在文本输入框中
  queryInput.value = file.name;
});
// Added EventListener to the button
const send_button = document.getElementById('send-button');
send_button.addEventListener("click", () => {
  const file = document.getElementById('upload-image');  // Selecting the value of input of type file

  if (file.value){
    run_image();  // Run the function which handle image
    file.value = '';  // To reset the file selected
    console.log("Image function run");
  }
  else{
    run_text();  // Run the text-only function
    console.log("Text function run");
  }
  document.getElementById('query').value = '';  // To clear the input
});
