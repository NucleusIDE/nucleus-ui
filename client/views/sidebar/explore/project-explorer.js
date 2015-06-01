var tree = new ExpandingTree([{
  type: "folder",
  id: "/.meteor",
  name: ".meteor",
  hasChildren: true,
  itemClasses: "explorer-item folder-icon",
  labelClasses: "explorer-item-label"
}, {
  id: '/.meteor/local',
  type: "folder",
  name: "local",
  hasChildren: true,
  parentId: "/.meteor"
}, {
  id: '/.meteor/local/db',
  name: 'db',
  type: 'folder',
  hasChildren: true,
  parentId: '/.meteor/local'
}]);

Template.projectExplorer.helpers({
  treeHeight: function() {
    var baseHeight = 24;
    return Object.keys(tree.nodes).length * baseHeight + 'px';
  },
  rows: function() {
    return Object.keys(tree.nodes).map(function(key) {
      return tree.nodes[key];
    });
  },
});
