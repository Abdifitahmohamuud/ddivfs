<img src="https://firebasestorage.googleapis.com/v0/b/ddiv-7c8a9.appspot.com/o/images%2FddivfsLogo1.png?alt=media&token=84b8aab8-3f47-4789-b4d9-ad0defbafd77" alt="Abdifitaah moha" style=""/>

# ddivfs

*ddivfs* is a high-performance, lightweight Node.js middleware designed for handling multipart/form-data, making file uploads seamless and efficient. It ensures optimal performance with minimal resource usage.

Whether you're handling small files or large-scale uploads, *ddivfs* is designed to be fast, reliable, and easy to integrate with your existing *Express.js* or Node.js applications.

## 🚀 Why Choose ddivfs?  
✔ *Blazing Fast* – Optimized for speed and efficiency  
✔ *Minimal Memory Usage* – Handles large file uploads without excessive RAM consumption  
✔ *Seamless Integration* – Works effortlessly with Express.js and other frameworks  
✔ *Single File Support* – Upload single files in a single request  
✔ *Every week new features* – New features added every week  
⚠ *Note:* ddivfs only processes forms encoded as multipart/form-data. Other form types will be ignored.

📖 *Documentation & More:* Explore the official documentation and updates at [ddiv.online](https://ddiv.online).

## Installation  
```sh
npm install ddivfs
```

## 🚀Usage
*📌 Ensure Your Form Uses multipart/form-data*
 .To correctly upload a file, your form must use the multipart/form-data encoding type. Here's an example HTML form:
  .
 ```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Upload File</title>
</head>
<body>
    <input type="file" id="fileInput" />
    <button onclick="uploadFile()">Upload</button>

    <script>
        function uploadFile() {
            const fileInput = document.getElementById("fileInput");
            const file = fileInput.files[0];

            const formData = new FormData();
            formData.append("file", file);

            fetch("http://localhost:5000/upload", {
                method: "POST",
                body: formData,
            })
            .then(response => response.json())
            .then(data => console.log("Success:", data))
            .catch(error => console.error("Error:", error));
        }
    </script>
</body>
</html>

```
### 📌 Handling File Uploads in Node.js with ddivfs

```js
const express = require("express");
const ddivfs = require("ddivfs");

const app = express();

app.post("/file", async (req, res) => {
   let arrayBuffer = [];

   req.on("data", (chunk) => {
      arrayBuffer.push(chunk);
   });

   req.on("end", async () => {
      let buffer = Buffer.concat(arrayBuffer);
      
      // Create an instance of the fileStream class with the request and buffer
      let sendFl = new ddivfs(req, buffer, 'me');
      
      try {
         // Process the file and get the information
         let file = await sendFl.buffersend();
         console.log(file);
         //if you want to see the information about the file 
         let fileInfo = await sendFl.getFileInfo();
         console.log(fileInfo);
         
         // Send the processed file as a response
         res.json(file);
      } catch (error) {
         res.status(500).json({ error: 'File processing failed' });
      }
   });
});
```


#### Collaborators


<img src="https://firebasestorage.googleapis.com/v0/b/ddiv-7c8a9.appspot.com/o/IMG_20240806_121659%20(1).jpg?alt=media&token=acfde23f-3d1d-4478-8875-e2bae381051e" alt="Abdifitaah moha" style="width: 100px;  border: 3px solid #4CAF50; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2); display: block; margin: 10px;"/>
  
*Abdifitaah moha Hassan*  
[Website](https://ddiv.online) | [github](https://github.com/Abdifitahmohamuud) 