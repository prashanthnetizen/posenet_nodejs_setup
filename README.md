# PoseNet Estimation using Mobile Net V1

## Installation (Windows 10):

* Download the Node JS installer for windows from [here](https://nodejs.org/en/download/)
* After installing Node js, add it to your Environment PATH variable.
* Please make sure whether you have installed Microsoft .NET Framework 4.5.1+ in your windows machine.
* Install Windows Build Tools globally to support running node js by using the following command:
```
npm install --global --production windows-build-tools
```
* Unzip the code in your machine locally and do the following inside the directory to install necessary packages locally.

```
npm install
```
* Use the same command to install any missing packages mentioning its name.

## Executing:

* Get the subject video and extract images using any Graphics libraries (OpenCV) you like.
* Extract and number each frame in integers with the .png extension inside a separate directory.
* Mention the path to your image frames using the variable "photo_path" inside main.js.
* Run the main.js file using node and obtain the key_points.json file under the directory.

