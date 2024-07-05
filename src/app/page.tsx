"use client";
import React from "react";
import { useState } from "react";
import {
  Box,
  Step,
  Stepper,
  StepButton,
  Button,
  Typography,
} from "@mui/material";
import Address from "@/components/forms/Address";
import Achievements from "@/components/forms/Achievements";
import Jobinformation from "@/components/forms/Jobinformation";
import Educationqualification from "@/components/forms/Educationqualification";
import Declarationinfo from "@/components/forms/Declarationinfo";
import PersonalDetails from "@/components/forms/PersonalDetails";

const DbApp = () => {
  const steps = [
    "Personal Information",
    "Address Details",
    "Education Details",
    "Job Details",
    "Achievements",
    "Declaration",
  ];

  const [activeStep, setActiveStep] = useState<number>(0);
  const [completed, setCompleted] = useState<{ [k: number]: boolean }>({});

  const [formData, setFormdata] = useState({
    personalInformation: {},
    addressDetails: {},
    educationalDetails: {},
    jobDetails: {},
    achievements: {},
  });

  const totalSteps = () => steps.length;
  const completedSteps = () => Object.keys(completed).length;
  const isLastStep = () => activeStep === totalSteps() - 1;
  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  const handleStep = (step: number) => () => setActiveStep(step);
  const handleComplete = () => {
    const newCompleted = { ...completed };
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };
  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        p: 2,
      }}
    >
      <Stepper nonLinear activeStep={activeStep} sx={{ width: "80%", mb: 4 }}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ width: "80%" }}>
        {allStepsCompleted() ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </>
        ) : (
          <>
            <Box sx={{ mt: 4 }}>
              {activeStep === 0 && <PersonalDetails setData={setFormdata} />}
              {activeStep === 1 && <Address />}
              {activeStep === 2 && <Educationqualification />}
              {activeStep === 3 && <Jobinformation />}
              {activeStep === 4 && <Achievements />}
              {activeStep === 5 && <Declarationinfo />}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", mt: 1 }}>
              <Button
                variant="contained"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button variant="contained" onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography
                    variant="caption"
                    sx={{ display: "inline-block" }}
                  >
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button variant="contained" onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? "Finish"
                      : "Complete Step"}
                  </Button>
                ))}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default DbApp;
