var Tree = function(nodes) {
  this.setNodes(nodes);
  return this;
};
Tree.prototype.setNodes = function(nodes) {
  var self = this;
  this.nodes = nodes;
  this.nodes = nodes.map(function(row) {
    row.rowClasses = row.rowClasses || '';
    if (row.hasChildren)  //show icon in front of row with children
      row.rowClasses += ' nucleus-tree__row--has-children ';

    //set the left-padding as per row's level
    var basePadding = 20;
    var rowLevel = self.getNodeLevel(row);
    var padding = (rowLevel * 12) + basePadding;
    row.styles = "padding-left: " + padding + "px;";

    if (row.parentId) {
      row.rowClasses += ' hidden ';
    }

    return row;
  });
};
Tree.prototype.findById = function(nodeId) {
  for(var i = 0; i < this.nodes.length; i++) {
    if (this.nodes[i].id === nodeId) {
      return this.nodes[i];
    }
  }
};
Tree.prototype.getNodeLevel = function(node) {
  var self = this;

  if (!node.parentId) {
    return 1;
  }

  return 1 + self.getNodeLevel(self.findById(node.parentId));
};
Tree.prototype.getChildren = function(node) {
  var children = [];

  for(var i = 0; i < this.nodes.length; i++) {
    if (this.nodes[i].parentId === node.id) {
      children.push(this.nodes[i]);
    }
  }

  return children;
};

var tree = new Tree([{
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


Template.nucleusTree.helpers({
  treeHeight: function() {
    var baseHeight = 24;
    return tree.nodes.length * baseHeight + 'px';
  },
  rows: function() {
    return tree.nodes;
  },
});

Template.nucleusTree.events({
  "click .nucleus-tree__row": function(e) {
    var target = $(e.currentTarget);
    var row = this;
    if (this.hasChildren)
      target.toggleClass('nucleus-tree__row--expanded');

    $('[data-parent-id="' + this.id + '"]').toggleClass('hidden');
  }
});
