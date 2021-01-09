import * as React from 'react'
import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis'

import './style.css'
import { getModel, train } from '../../models/mnist'
import { MnistData } from '../../data/data'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAllergies, faCheckSquare, faEraser, faBaby, faTrain } from '@fortawesome/free-solid-svg-icons'

interface CanvasProps {
    width: number;
    height: number;
    color: string;
}
let pos = { x: 0, y: 0 };

export const Canvas = ({ width, height }): JSX.Element => {
    const [drawing, setDrawing] = React.useState<boolean>(false)
    const [color, setColor] = React.useState<string>("#fff")
    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    let rawImage = document.getElementById('canvasimg') as HTMLImageElement
    console.log(rawImage)
    const ctx = React.useRef<any>()
    let model: any;


    model = getModel()

    const run = async () => {
        console.log("starting")
        const data = new MnistData();
        await data.load();

        console.log('data loaded')
        tfvis.show.modelSummary({ name: 'Model Architecture' }, model);

        await train(model, data);
        console.log("training done")
        console.log("hello")
    }

    React.useEffect(() => {
        ctx.current = canvasRef?.current?.getContext('2d')
        ctx.current.fillStyle = "black"
        ctx.current.fillRect(0, 0, width, height)
        console.log("Hello")
    }, [])

    const clearCanvas = () => {
        ctx.current.clearRect(0, 0, width, height)
        ctx.current.fillStyle = "black"
        ctx.current.fillRect(0, 0, width, height)
    }

    const predict = () => {
        let raw = tf.browser.fromPixels(rawImage, 1);
        let resized = tf.image.resizeBilinear(raw, [28, 28]);
        let tensor = resized.expandDims(0);
        let prediction = model.predict(tensor);
        let pIndex = tf.argMax(prediction, 1).dataSync();
        console.log(prediction)
        console.log(pIndex)
        alert(pIndex);
    }
    // const handleSubmit = () => {
    //     rawImage.src = canvasRef.current.toDataURL('image/png');

    // }


    const setPosition = (e: any) => {
        pos.x = e.clientX - canvasRef.current.offsetLeft;
        pos.y = e.clientY - canvasRef.current.offsetTop;

    }
    const draw = (e: any) => {
        if (e.buttons != 1) return;
        rawImage = document.getElementById('canvasimg') as HTMLImageElement

        if (rawImage) {
            ctx.current.beginPath();
            ctx.current.lineWidth = 24;
            ctx.current.lineCap = 'round';
            ctx.current.strokeStyle = 'white';
            ctx.current.moveTo(pos.x, pos.y);
            setPosition(e);
            ctx.current.lineTo(pos.x, pos.y);
            ctx.current.stroke();
            rawImage.src = canvasRef.current.toDataURL('image/png');
        }

    }
    const handleMouseMove = (e: any) => {
        draw(e)
        // if (canvasRef.current) {
        //     const coords = [
        //         e.clientX - canvasRef.current.offsetLeft,
        //         e.clientY - canvasRef.current.offsetTop
        //     ]
        //     if (drawing) {
        //         ctx.current.lineTo(...coords)
        //         ctx.current.stroke()
        //     }
        //     // handleMouseMove(...coords)
        // }
    }

    // const startDrawing = (e: any) => {
    //     if (canvasRef.current) {

    //         ctx.current.lineJoin = "round"
    //         ctx.current.lineCap = 'round'
    //         ctx.current.lineWidth = 10
    //         ctx.current.strokeStyle = color
    //         ctx.current.beginPath();
    //         // actual coordinates
    //         ctx.current.moveTo(
    //             e.clientX - canvasRef.current.offsetLeft,
    //             e.clientY - canvasRef.current.offsetTop
    //         )

    //         setDrawing(true)
    //     }
    // }

    // const stopDrawing = (e: any) => {
    //     ctx.current.closePath()
    //     rawImage.src = canvasRef.current.toDataURL('image/png');

    //     setDrawing(false)

    // }
    return (
        <div className="app-box">

            <div className="canvas-container">
                <div className="color-picker">
                    <div className="color-pick" onClick={() => setColor("#fff")} style={color === "#fff" ? { 'transform': 'scale(1.3)' } : {}}></div>
                    <div className="color-pick black-color" onClick={() => setColor("black")} style={color === "black" ? { 'transform': 'scale(1.3)' } : {}}></div>
                    <div className="eraser" onClick={clearCanvas}>
                        <FontAwesomeIcon icon={faEraser} size="2x" />
                    </div>
                </div>

                <canvas
                    ref={canvasRef}
                    id="canvas"
                    width={width}
                    height={height}
                    onMouseDown={setPosition}
                    // onMouseUp={stopDrawing}
                    onMouseEnter={setPosition}
                    // onMouseOut={stopDrawing}
                    onMouseMove={draw}
                />

                <div className="bottom-bar">
                    <div className="submit" onClick={predict}>
                        <FontAwesomeIcon icon={faCheckSquare} size="2x" />
                    </div>
                    <div className="submit" onClick={run}>
                        <FontAwesomeIcon icon={faTrain} size="2x" />
                    </div>
                </div>
            </div>
            <img id="canvasimg" style={{ display: "none" }} width={280} height={280} />

        </div>
    )
}