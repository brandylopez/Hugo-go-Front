var exec = require('child_process').execSync;
execSync("xterm -title RecursiveFileListing -e ls -latkR /");