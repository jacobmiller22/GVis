import { Button, Paper, Typography } from "@mui/material";
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
    setActiveStep(-1);
  }, [generator, labels]);

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
    <Paper variant="outlined" className={styles["container"]}>
      <div>
        <span>
          <Button onClick={handlePrev} disabled={activeStep <= -1}>
            Prev
          </Button>
          <Typography variant="body1" component="span">
            {activeStep + 1} / {steps.length}
          </Typography>
          <Button
            onClick={handleNext}
            disabled={activeStep >= steps.length - 1}
          >
            Next
          </Button>
        </span>
      </div>
      <div className={styles["message-container"]}>
        <Typography>{steps[activeStep]?.msg || ""}</Typography>
      </div>
    </Paper>
  );
};

export default AlgorithmControls;

const finalStep = { msg: "Done!", edges: [[-1, -1]] };
