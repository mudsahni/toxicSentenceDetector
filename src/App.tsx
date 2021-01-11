import * as  React from 'react';
import 'semantic-ui-css/semantic.min.css'


import './App.css';
import { Toxicity } from './components/Toxicity';
import Running from './jogging.svg'

// import { Canvas } from './components/Canvas';


function App() {

  return (
    <div>
      {/* <Canvas height={600} width={600}></Canvas> */}
      {/* <CanvasAlt /> */}
      <Toxicity />
      <div className='footer'>
        Made&nbsp;<img src={Running} width={20} />&nbsp;by &nbsp; <a href="https://www.muditsahni.com" target="_blank">Mudit Sahni</a>
      </div>
    </div>
  );
}

export default App;
