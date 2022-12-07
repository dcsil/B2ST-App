const { spawn } = require("child_process");

function analyze() {
  var pythonDataOutput;
  var code = 200;
  var analyzeScript = spawn("python3", [
    "marketing_system/scripts/analyze.py",
    "node.js",
    "python",
  ]);
  //Spawn confirmation
  analyzeScript.on("spawn", (data) => {
    console.log("Spawned");
  });
  analyzeScript.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);
  });
  return analyzeScript;
}
function query(req, res, script) {
  var query = JSON.stringify(req.body.query);
  script.stdin.write(query);
  script.stdin.end();
  script.stdout.on("data", (data) => {
    if(data.toString().includes('[')){
      console.log("Pipe data from python script ...");
      console.log(data.toString());
      res.status(200).json({ data: data.toString().replace('\n', '') });
      req.app.set("script", analyze());
    }
  });
}

module.exports = { analyze, query };
