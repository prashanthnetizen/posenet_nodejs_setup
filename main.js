const tf = require('@tensorflow/tfjs-node');
const posenet = require('@tensorflow-models/posenet');
const {
    createCanvas, Image
} = require('canvas');

/*const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const videoWidth = 600;
const videoHeight = 500;*/
let fs = require('fs');

// Function Params to decide Pose Estimation
const imageScaleFactor = 0.5;
const outputStride = 16;
const flipHorizontal = false;
const defaultQuantBytes = 2;

const defaultMobileNetMultiplier = 0.75;
const defaultMobileNetStride = 16;
const defaultMobileNetInputResolution = 801;

const defaultResNetMultiplier = 1.0;
const defaultResNetStride = 32;
const defaultResNetInputResolution = 257;

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

/**
 * Asynchronous function to calculate key points for a Single Image
 *
 * @returns {Promise<void>}
 */


const single_image_single_pose = async () => {
    console.log('Starting Pose Estimation for a Single Image');
    const net = await posenet.load({
        architecture: guiState.model.architecture,
        outputStride: guiState.model.outputStride,
        inputResolution: guiState.model.inputResolution,
        multiplier: guiState.model.multiplier,
        quantBytes: guiState.model.quantBytes
    });
    const img = new Image();

    // Provide the path to your Image
    img.src = 'frame4.png';
    const canvas = createCanvas(img.width, img.height);
    console.log("Image Height : " + img.height + " Image Width : " + img.width);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const input = tf.browser.fromPixels(canvas);
    const pose = await net.estimateSinglePose(input, imageScaleFactor, flipHorizontal, outputStride);
    // console.log(pose);
    for (const keypoint of pose.keypoints) {
        console.log(`${keypoint.part}: (${keypoint.position.x},${keypoint.position.y})`);
    }

    // Provide the path to the output filename
    fs.writeFile("./object1.json", JSON.stringify(pose), (err) => {
        if (err) {
            console.error(err);
            return;
        }
        ;
        console.log("File has been created");
    });
    console.log('Ending Pose Estimation for a Single Image');
};


// Path to the location where frames of a particular video file is stored
photo_path = "D:/Computer Engineering/Continuous Sign Translation/utterances/1/";

/**
 * Asynchronous Function to decide poses for a set of images and storing it in a single json file
 *
 * @param path_to_frames
 * @returns {Promise<void>}
 */
async function cascading_images_pose_estimation(path_to_frames) {
    console.log("Starting to estimate pose values for list of images in the given path : " + path_to_frames);
    let length = fs.readdirSync(path_to_frames).length;
    console.log("Loading posenet model: mobilenet");
    const single_net = await posenet.load({
        architecture: guiState.model.architecture,
        outputStride: guiState.model.outputStride,
        inputResolution: guiState.model.inputResolution,
        multiplier: guiState.model.multiplier,
        quantBytes: guiState.model.quantBytes
    });

    let canvas;
    let input;
    let ctx;
    let pose;
    let pose_list = [];

    for (let i = 0; i < length - 1; i++) {
        let image = new Image();
        image.src = path_to_frames + i + ".png";
        canvas = createCanvas(image.width, image.height);
        ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
        input = tf.browser.fromPixels(canvas);
        pose = await single_net.estimateSinglePose(input, imageScaleFactor, flipHorizontal, outputStride);
        pose_list.push(pose);
    }
    fs.writeFile(photo_path + "key_points.json", JSON.stringify(pose_list), (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log("Key Points file has been created");
    });
}

// Call this function to estimate poses for a set of picture frames
cascading_images_pose_estimation(photo_path);
