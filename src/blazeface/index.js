import * as blazeface from '@tensorflow-models/blazeface';
import {drawFacearea,drawEyes,drawDot} from '../util/draw.js';

async function main() {
    // Load the model.
    const model = await blazeface.load();
    // Pass in an image or video to the model. The model returns an array of
    // bounding boxes, probabilities, and landmarks, one for each detected face.
    const img = document.querySelector("img")
    const returnTensors = false; // Pass in `true` to get tensors back, rather than values.

    let canvas = document.getElementById('canvas');
    const predictions = await model.estimateFaces(img, returnTensors);

/**
 *  `predictions` is an array of objects describing each detected face, for example:
    
        [
          {
            topLeft: [232.28, 145.26],
            bottomRight: [449.75, 308.36],
            probability: [0.998],
            landmarks: [
              [295.13, 177.64], // right eye
              [382.32, 175.56], // left eye
              [341.18, 205.03], // nose
              [345.12, 250.61], // mouth
              [252.76, 211.37], // right ear
              [431.20, 204.93] // left ear
            ]
          }
        ]
 */

    if (predictions.length > 0) {
        for (let i = 0; i < predictions.length; i++) {
            const landmarks = predictions[i].landmarks;
            const start = predictions[i].topLeft;
            const end = predictions[i].bottomRight;
            const size = [end[0] - start[0], end[1] - start[1]];
            drawFacearea(canvas,img,start[0], start[1], size[0], size[1])
            console.log(landmarks);
            drawEyes(canvas,...landmarks[0],...landmarks[1])
            drawDot(canvas,...landmarks[2])//코
            drawDot(canvas,...landmarks[3])//입
            drawDot(canvas,...landmarks[4])//귀(왼)
            drawDot(canvas,...landmarks[5])//귀(오른쪽)
        }
    }
}


main();