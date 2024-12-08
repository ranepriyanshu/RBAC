import { PythonShell } from "python-shell";
import asyncHandler from "../utils/asyncHandler.js";

// const MODEL_FILE_PATH = "../allFiles/papers.pkl";
const getResearchPaper = asyncHandler(async (req, res) => {
  console.log("Fetching....");
  const paperTitle = req.body.paperTitle;
  // Run Python script to use the machine learning model
  const pyshell = new PythonShell("final_script.py");

  // Send paper title to Python script
  pyshell.send(paperTitle)

  let recommendedPapers = []

  // Receive recommended papers from Python script
  pyshell.on("message", (message) => {
    recommendedPapers.push(message)
  })


  // End Python shell
  pyshell.end((err) => {
    if (err) throw err
    res.json(recommendedPapers)
    console.log("Fetch Operation completed successfully!");
  })
})
export { getResearchPaper }