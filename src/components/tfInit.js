import * as tf from '@tensorflow/tfjs';
import { setBackend } from '@tensorflow/tfjs-core';
import { WebGLBackend } from '@tensorflow/tfjs-backend-webgl';

// set the WebGL backend as the default
setBackend(new WebGLBackend());

export { tf };