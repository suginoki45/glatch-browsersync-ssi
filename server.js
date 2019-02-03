const path = require('path');
const fs = require('fs');
const browserSync = require('browser-sync');

browserSync.init({
  server: './',
  rewriteRules: [
    {
      match: /<!--#include virtual="(.+?)" -->/g,
      fn: function(req, res, match, filename) {
        const filePath = path.join(__dirname, filename);
        if (!fs.existsSync(filePath)) {
          return `<span style="color: red">${filePath} could not be found</span>`;
        }
        return fs.readFileSync(filePath);
      }
    }
  ]
});
