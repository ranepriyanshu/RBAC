const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const fs = require("fs")
const { PythonShell } = require("python-shell")

const app = express()
const PORT = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors())

// Load your machine learning model
const MODEL_FILE_PATH = "papers.pkl"

app.get("/api/recommend", async (req, res) => {
  const paper = req.body.paper

  // Run Python script to use the machine learning model
  const pyshell = new PythonShell("final_script.py")

  // Send paper title to Python script
  pyshell.send(paper)

  let recommendedPapers = []

  // Receive recommended papers from Python script
  pyshell.on("message", (message) => {
    recommendedPapers.push(message)
  })

  // End Python shell
  pyshell.end((err) => {
    if (err) throw err
    res.json(recommendedPapers)
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
