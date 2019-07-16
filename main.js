const tf = require('@tensorflow/tfjs-node');
const posenet = require('@tensorflow-models/posenet');
const {
    createCanvas, Image
} = require('canvas');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const videoWidth = 600;
const videoHeight = 500;
let fs = require('fs');
const imageScaleFactor = 0.5;
const outputStride = 16;
const flipHorizontal = false;

const defaultQuantBytes = 2;

const defaultMobileNetMultiplier =  0.75;
const defaultMobileNetStride = 16;
const defaultMobileNetInputResolution = 801;

const defaultResNetMultiplier = 1.0;
const defaultResNetStride = 32;
const defaultResNetInputResolution = 257;

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

const single_image_single_pose = async() => {
    console.log('start');
    const net = await posenet.load({
        architecture: guiState.model.architecture,
        outputStride: guiState.model.outputStride,
        inputResolution: guiState.model.inputResolution,
        multiplier: guiState.model.multiplier,
        quantBytes: guiState.model.quantBytes
    });
    const img = new Image();
    img.src = 'frame0.png';
    const canvas = createCanvas(img.width, img.height);
    console.log("Image Height : "+img.height + " Image Width : "+img.width);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const input = tf.browser.fromPixels(canvas);
    const pose = await net.estimateSinglePose(input, imageScaleFactor, flipHorizontal, outputStride);
    // console.log(pose);
    for(const keypoint of pose.keypoints) {
        console.log(`${keypoint.part}: (${keypoint.position.x},${keypoint.position.y})`);
    }

    fs.writeFile("./object.json", JSON.stringify(pose), (err) => {
        if (err) {
            console.error(err);
            return;
        };
        console.log("File has been created");
    });

    console.log('end');
}


async function video_based_pose_detection() {
    console.log("Starting to record the poses in a video.");
    let poses = [];
    /*    const pose_net = await posenet.load({
            architecture: guiState.model.architecture,
            outputStride: guiState.model.outputStride,
            inputResolution: guiState.model.inputResolution,
            multiplier: guiState.model.multiplier,
            quantBytes: guiState.model.quantBytes
        });*/
    const dom = new JSDOM('<video></video>');

}
//single_image_single_pose();

video_based_pose_detection();