// LiveUpdate.configure({
//   interceptReload: false
// });

var workingFilesState = new ReactiveDict();
var projectExplorerState = new ReactiveDict();

workingFilesState.set("workingFiles", [{
  file: "_base.scss",
  filepath: "/client/app/styles"
}, {
  file: "template.scss",
  filepath: "/client/app/styles"
}, {
  file: "admin_controller.js",
  filepath: "/client/views/admin"
}]);
workingFilesState.set("collapsed", true);

workingFilesState.set("filetree", {});
projectExplorerState.set('collapsed', true);

Template.nucleusSidebarExplore.events({
  "click .header-working-files": function(e) {
    workingFilesState.set('collapsed', ! workingFilesState.get('collapsed'));
  },
  "click .action-item": function(e) {
    e.preventDefault();
    e.stopPropagation();
  },
  "click .header-project-explorer": function(e) {
    projectExplorerState.set('collapsed', ! projectExplorerState.get('collapsed'));
  },
});

Template.nucleusSidebarExplore.helpers({
  workingFiles: function() {
    var files = workingFilesState.get('workingFiles');
    return files;
  },
  workingFilesCollapsedClass: function() {
    return workingFilesState.get('collapsed') ? "split-view-header--collapsed" : '';
  },
  workingFilesHeight: function() {
    var files = workingFilesState.get('workingFiles');
    var height = files.length * 24;

    var appliedHeight = workingFilesState.get('collapsed') ?
          0 : height;

    return appliedHeight;
  },
  projectName: function() {
    return "Nucleus Code UI";
  },
  projectExplorerCollapsedClass: function() {
    return projectExplorerState.get('collapsed') ? "split-view-header--collapsed" : '';
  }
});
