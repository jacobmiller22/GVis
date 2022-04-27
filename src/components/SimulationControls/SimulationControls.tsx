import { useState, useEffect } from "react";

import styles from "./SimulationControls.module.css";

type AlgorithmControlsProps = {
  generator: any; // Generator function
  labels: string[];
  onIteration: (steps: { edges: [number, number][]; msg: string }[]) => void;
};
const AlgorithmControls = ({
  generator,
  labels,
  onIteration,
}: AlgorithmControlsProps) => {
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [steps, setSteps] = useState<
    { msg: string; edges: [number, number][] }[]
  >([]);

  // Populate the steps array with the generator function.
  useEffect(() => {
    if (!generator) return;
    let workingSteps: any[] = [];

    // while generator is not done
    for (let step of generator) {
      let msg: string = step.msg;
      msg = msg.replace(`${step.edges[0][0]}`, `${labels[step.edges[0][0]]}`);
      msg = msg.replace(`${step.edges[0][1]}`, `${labels[step.edges[0][1]]}`);

      workingSteps.push({ msg, edges: step.edges });
    }
    // Add a final step with the final message.

    workingSteps.push(finalStep);
    setSteps(workingSteps);
  }, [generator]);

  const handleNext = () => {
    if (activeStep >= steps.length - 1) return;
    activeStep + 1 >= 0 && onIteration(getSteps(activeStep + 2));
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const getSteps = (
    end: number
  ): { msg: string; edges: [number, number][] }[] => {
    if (end === -1) return [];
    return steps.slice(0, end);
  };

  const handlePrev = () => {
    if (activeStep <= -1) return;
    activeStep - 1 >= 0 && onIteration(getSteps(activeStep));
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div>
      <div>
        <span>
          <button onClick={handlePrev} disabled={activeStep <= -1}>
            Prev
          </button>
          <span>
            {activeStep + 1} / {steps.length}
          </span>
          <button
            onClick={handleNext}
            disabled={activeStep >= steps.length - 1}
          >
            Next
          </button>
        </span>
        <span>
          <button>Play</button>
          {/* <label htmlFor="speed">Speed:</label>
        <input name="speed" type="number" /> */}
        </span>
      </div>
      <div>
        <div>{steps[activeStep]?.msg || ""}</div>
      </div>
    </div>
  );
};

export default AlgorithmControls;

const finalStep = { msg: "Done!", edges: [[-1, -1]] };
