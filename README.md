# Pose Estimation using PoseNet

## Pre-Requisites:

* Python3
* OpenCV Python version
* Node js
* Tensorflow for js
* tensorflow-models

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

* Get your recorded videos and place them all inside a directory. Note down the path to the directory as master path.
* You can use the python script -> Frames_Extractor.py and specify the master path to the variable "path_to_video_files" and run it to obtain some further directories inside your path containing video frames of respective videos.
* After installing node js server and required libraries, use the js file "scale_to_videos.js" and specify the master path to the variable "photo_path_to_frames" and execute this script.
* The console asks for your choice of Architecture for PoseNet -> Residual Net gives better accuracy compared to Mobile Net but the latter is fast.
* After providing your choice of architecture, wait for key points to get generated for individual videos inside their corresponding directories.
* Optional -> You can use the convert_to_csv.py script to convert the key_points.json files to CSV files.


***
> "Intelligence is the ability to avoid doing work, yet getting the work done." - Linus Torvalds
***
Cheers ! Get Inspired :)