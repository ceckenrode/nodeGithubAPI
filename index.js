var express = require('express');
var app = express();
var github = require('github');

var github = new github({
  // required 
  version: "3.0.0",
  // optional 
  debug: true,
  protocol: "https",
  host: "api.github.com", // should be api.github.com for GitHub 
  pathPrefix: "", // for some GHEs; none for GitHub 
  timeout: 5000,
  headers: {
    "user-agent": "node-github-lab" // GitHub is happy with a unique user agent 
  }
});

var PORT = process.env.PORT || 8080;

app.use("/js", express.static("public/js"));
app.use("/css", express.static("public/css"));

app.get('/dashboard', function(req, res) {

  res.sendFile(process.cwd() + '/dashboard.html');

});

app.get('/:username', function(req, res) {
  github.user.getFollowingFromUser({
    // optional: 
    // headers: { 
    //     "cookie": "blahblah" 
    // }, 
    user: req.params.username
}, function(err, res2) {
    res.write(JSON.stringify(res2));

});

})

app.listen(PORT, function() {
  console.log('Listening on port %s', PORT);
})
