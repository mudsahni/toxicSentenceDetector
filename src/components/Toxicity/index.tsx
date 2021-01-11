import * as React from 'react'
import * as toxicity from '@tensorflow-models/toxicity'
import './style.css'
import * as tfcpu from '@tensorflow/tfjs-backend-cpu'
import { Button, Input } from 'semantic-ui-react'
import AI from '../../robot.svg'
import { PredictionBox } from './predictionBox'
import NonToxic from '../../non-toxic.svg'
import Toxic from '../../toxic.svg'

interface ToxicityProps {

}

export const Toxicity = ({ }) => {
    const [value, setValue] = React.useState<string>('')
    const [predictionsList, setPredictionsList] = React.useState<{ label: string, results: { probabilities: Float32Array, match: boolean }[] }[]>()
    const [loading, setLoading] = React.useState<boolean>(false)
    const [toxic, setToxic] = React.useState<boolean>(null)

    const managePredictions = (predictions: { label: string, results: { probabilities: Float32Array, match: boolean }[] }[]) => {
        setPredictionsList(predictions)
        // setLoading(false)

    }
    const run = () => {
        setLoading(true)
        const threshold = 0.9;
        toxicity.load(threshold, []).then(model => {
            const sentences = [value];
            model.classify(sentences).then(predictions => {
                console.log(predictions);
                managePredictions(predictions)
                let isToxic = false
                for (let i = 0; i < 7; i++) {
                    if (predictions[i].results[0].match) {
                        isToxic = true
                        console.log(predictions[i].label +
                            " was found with probability of " +
                            predictions[i].results[0].probabilities[1]);
                    }
                }
                setToxic(isToxic)
            });
        });
    }

    const handleTextInput = (e) => {
        setValue(e.target.value)
    }
    return (
        <div className="toxicity-classifier-container">
            <div className="header">
                <img src={toxic === null ? AI : toxic === false ? NonToxic : Toxic} width="100px"></img>
                <span>Is this toxic?</span>
            </div>
            <div className="input-container">
                <Input size="big" placeholder="..." onChange={handleTextInput} value={value} loading={loading} action>
                    <input />
                    <Button positive onClick={run} icon="question" />
                </Input>
                {/* <input className='sentence-input' value={value || ''} type="text" onChange={handleTextInput} /> */}
                {/* <div>{value}</div> */}
            </div>
            <div className="results">
                <div className="predictions">
                    {predictionsList && predictionsList.map((p, index) => {
                        return (
                            <PredictionBox key={index} text={p.label} value={p.results[0].probabilities[1]} />

                        )
                    })}
                </div>
            </div>
        </div>
    );
}