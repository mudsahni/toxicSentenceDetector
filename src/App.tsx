import * as  React from 'react';
import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis'
import { MnistData } from './data/data';

import './App.css';
import { Canvas } from './components/Canvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faCheckSquare, faAllergies } from '@fortawesome/free-solid-svg-icons'
import { getModel, train } from './models/mnist'

// import { Canvas } from './components/Canvas';


function App() {

  return (
    <div>
      <Canvas height={600} width={600}></Canvas>
    </div>
  );
}

export default App;
