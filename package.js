Package.describe({
  name: 'nucleuside:nucleus-ui',
  version: '0.0.1',
  summary: 'UI for Nucleus IDE',
  git: 'https://github.com/nucleuside/nucleus-ui',
  documentation: 'README.org'
});

// Ugly-ass function stolen from http://stackoverflow.com/a/20794116/586086
// TODO make this less ugly in future
function getFilesFromFolder(packageName, folder){
  // local imports
  var _ = Npm.require("underscore");
  var fs = Npm.require("fs");
  var path = Npm.require("path");
  // helper function, walks recursively inside nested folders and return absolute filenames
  function walk(folder){
    var filenames = [];
    // get relative filenames from folder
    var folderContent = fs.readdirSync(folder);
    // iterate over the folder content to handle nested folders
    _.each(folderContent, function(filename) {
      // build absolute filename
      var absoluteFilename = path.join(folder, filename);
      // get file stats
      var stat = fs.statSync(absoluteFilename);
      if(stat.isDirectory()){
        // directory case => add filenames fetched from recursive call
        filenames = filenames.concat(walk(absoluteFilename));
      }
      else{
        // file case => simply add it
        filenames.push(absoluteFilename);
      }
    });
    return filenames;
  }
  // save current working directory (something like "/home/user/projects/my-project")
  var cwd = process.cwd();

  var isRunningFromApp = fs.existsSync(path.resolve("packages"));
  var packagePath = "";
  if (isRunningFromApp) {
    packagePath = path.resolve("packages", packageName);
  }

  packagePath = path.resolve(packagePath);

  // chdir to our package directory
  process.chdir(path.join(packagePath));
  // launch initial walk
  var result = walk(folder);
  // restore previous cwd
  process.chdir(cwd);
  return result;
}

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  api.use([
    'jquery', 'deps', 'session',
    'reactive-dict'
  ]);

  var publicFiles = getFilesFromFolder('nucleuside:nucleus-ui', 'public');
  var clientFiles = getFilesFromFolder('nucleuside:nucleus-ui', 'client');

  api.add_files(publicFiles, 'client', {isAsset: true});
  api.add_files(clientFiles, 'client', {isAsset: true});

  api.add_files([

  ], 'client');

});
