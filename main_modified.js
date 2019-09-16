const tf = require('@tensorflow/tfjs-node');
const posenet = require('@tensorflow-models/posenet');

const {
    createCanvas, Image
} = require('canvas');

let fs = require('fs');
let path = require('path');

// Function Params to decide Pose Estimation
const imageScaleFactor = 0.5;
const outputStride = 16;
const flipHorizontal = false;
const defaultQuantBytes = 2;

const defaultMobileNetMultiplier = 0.75;
const defaultMobileNetStride = 16;
const defaultMobileNetInputResolution = 801;

// Posenet instance params used
let guiState = {
    net: null,
    model: {
        architecture: 'MobileNetV1',
        outputStride: defaultMobileNetStride,
        inputResolution: defaultMobileNetInputResolution,
        multiplier: defaultMobileNetMultiplier,
        quantBytes: defaultQuantBytes,
    },
    image: 'tennis_in_crowd.jpg',
    multiPoseDetection: {
        minPartConfidence: 0.1,
        minPoseConfidence: 0.2,
        nmsRadius: 20.0,
        maxDetections: 15,
    },
    showKeypoints: true,
    showSkeleton: true,
    showBoundingBox: false,
};

// Path to the location where frames of all the video files are stored
photo_path_to_frames = "D:/Computer Engineering/American Sign Language/Videos_mega_collection/sd/";

/**
 * Asynchronous Function to decide poses for a set of images and storing it in a single json file
 *
 * @returns {Promise<void>}
 * @param photo_path
 */
async function cascading_images_pose_estimation(photo_path) {
    console.log("Starting to estimate pose values for list of Video frames in the given path : " + photo_path);
    const single_net = await posenet.load({
        architecture: guiState.model.architecture,
        outputStride: guiState.model.outputStride,
        inputResolution: guiState.model.inputResolution,
        multiplier: guiState.model.multiplier,
        quantBytes: guiState.model.quantBytes
    });
    console.log("Posenet model loaded: Mobile Net");

    let canvas;
    let input;
    let ctx;
    let pose;
    let pose_list = [];

    fs.readdir(photo_path, function(err, items) {
        let func_path = "";
        for (let i=0; i<items.length; i++) {

            if(path.extname(items[i]) === "") {
                console.log(items[i]);
                func_path = photo_path + items[i] + "/";

                let length = fs.readdirSync(func_path).length;
                for (let i = 0; i < length - 1; i++) {
                    let image = new Image();
                    image.src = func_path + i + ".png";
                    canvas = createCanvas(image.width, image.height);
                    ctx = canvas.getContext('2d');
                    ctx.drawImage(image, 0, 0);
                    input = tf.browser.fromPixels(canvas);
                    pose = single_net.estimateSinglePose(input, imageScaleFactor, flipHorizontal, outputStride);
                    pose_list.push(pose);
                }

                fs.writeFile(func_path + "keypoints.json", JSON.stringify(pose_list), (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    console.log("Keypoints json for \""+items[i]+"\" has been created");
                });
            }

        }
    });

}
cascading_images_pose_estimation(photo_path_to_frames);