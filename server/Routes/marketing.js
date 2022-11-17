const express = require("express");
const router = express.Router();
const print = console.log
const {spawn} = require('child_process');

router.post("/analyze", async (req, res)=>{
    var pythonDataOutput;
    var code = 200;
    const analyzeScript = spawn('python3', ['marketing_system/scripts/analyze.py','node.js','python']);
    //Stdout logging from python script
    analyzeScript.stdout.on('data', (data) => {
        console.log('Pipe data from python script ...');
        pythonDataOutput = data.toString();
    });
    //Error logging from python script
    analyzeScript.stderr.on('data', (data) => {
        console.log('Pipe error data from python script ...');
        pythonDataOutput = data.toString();
        code = 500;
    });
    analyzeScript.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        console.log(pythonDataOutput)
        // send data to browser
        res.send(pythonDataOutput).status(code);
    });
}
);

module.exports = router;