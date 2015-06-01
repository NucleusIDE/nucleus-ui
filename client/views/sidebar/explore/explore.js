// LiveUpdate.configure({
//   interceptReload: false
// });

var workingFilesState = new ReactiveDict();
var projectExplorerState = new ReactiveDict();

workingFilesState.set("workingFiles", [{
  labelClasses: 'working-files-item-label',
  subcontentClasses: "working-files-item",
  filename: "_base.scss",
  filepath: "/client/app/styles",
  actions: [{
    actionLabelClasses: "icon icon-close-file"
  }]
}, {
  labelClasses: 'working-files-item-label',
  subcontentClasses: 'working-files-item',
  filename: "template.scss",
  filepath: "/client/app/styles",
  actions: [{
    actionLabelClasses: "icon icon-close-file"
  }]
}, {
  labelClasses: 'working-files-item-label',
  subcontentClasses: 'working-files-item',
  filename: "admin_controller.js",
  filepath: "/client/views/admin",
  actions: [{
    actionLabelClasses: "icon icon-close-file"
  }]
}]);
workingFilesState.set("collapsed", false);

workingFilesState.set("filetree", {});
projectExplorerState.set('collapsed', false);

Template.nucleusSidebarExplore.helpers({
  workingFiles: function() {
    var files = workingFilesState.get('workingFiles');
    return files;
  },
  workingFilesHeight: function() {
    var files = workingFilesState.get('workingFiles');
    var height = files.length * 24;

    var appliedHeight = workingFilesState.get('collapsed') ?
          0 : height;

    return appliedHeight;
  },
  projectExplorerCollapsedClass: function() {
    return
  },
  projectExplorerStyles: function() {
    var collapsed = projectExplorerState.get('collapsed');
    var height = collapsed ? '0px' : '100%';
    var display = collapsed ? 'none' : 'block';
    return "{height: " + height + "; display: " + display + ";}";
  },
  workingFilesSplitView: function() {
    return {
      title: "Working Files",
      actions: [{
        actionClasses: "action-item--disabled",
        actionLabelClasses: "icon icon-save-all",
        actionTitle: "Save All"
      }, {
        actionClasses: "",
        actionLabelClasses: "icon icon-close-all",
        actionTitle: "Close All"
      }]
    };
  },
  projectExplorerSplitView: function() {
    return {
      title: "Nucleus Code UI",
      actions: [{
        actionLabelClasses: "icon icon-new-file",
        actionTitle: "New File"
      }, {
        actionLabelClasses: "icon icon-new-folder",
        actionTitle: "New Folder"
      }, {
        actionLabelClasses: "icon icon-refresh-explorer",
        actionTitle: "Refresh"
      }, {
        actionLabelClasses: "icon icon-collapse-explorer",
        actionTitle: "Close All"
      }]
    };
  }
});
