var Tree = function(nodes) {
  this.setNodes(nodes);
  return this;
};

Tree.prototype.getNodeLevel = function(node) {
  var self = this;

  if (typeof node === 'undefined' || !node.get('parentId')) {
    return 1;
  }

  return 1 + self.getNodeLevel(self.nodes[node.get('parentId')]);
};

Tree.prototype.setExpandAutorun = function(node) {
  if(!node) return;
  var self = this;

  Tracker.autorun(function() {
    var isExpanded = node.get('expanded');
    var target = $(document.getElementById(node.get('id')));

    if (isExpanded === false) {
      Tracker.nonreactive(function() {
        target.removeClass('nucleus-tree__row--expanded');

        var children = self.$getAllChildren(node);
        children.forEach(function(child) { $(child).addClass('hidden'); });
      });
    } else if (isExpanded === true) {
      Tracker.nonreactive(function() {
        target.addClass('nucleus-tree__row--expanded');

        var children = self.$getAllChildren(node);

        children.forEach(function(child) {
          child = $(child);
          parent = $(document.getElementById(child.attr('data-parent-id')));
          if (parent.hasClass('nucleus-tree__row--expanded')) {
            child.removeClass('hidden');
          }
        });

      });
    }

  });
};

Tree.prototype.setNodes = function(nodes) {
  var self = this;
  this.nodes = {};

  nodes.forEach(function(row) {
    self.nodes[row.id] = new ReactiveDict();

    Object.keys(row).forEach(function(key) {
      self.nodes[row.id].set(key, row[key]);
    });
    row = self.nodes[row.id];

    if (row.get('hasChildren'))  //show icon in front of row with children
      Utils.rAdd(row, 'rowClasses', ' nucleus-tree__row--has-children ');

    //set the left-padding as per row's level
    var rowLevel = self.getNodeLevel(row);
    var padding = (rowLevel * 12) + 20;
    Utils.rAdd(row, 'styles', ";padding-left: " + padding + "px;");

    if (row.get('parentId')) {
      row.setDefault('expanded', false);
      Utils.rAdd(row, 'rowClasses', 'hidden');
    }

    self.setExpandAutorun(row);
  });
};
Tree.prototype.$getChildren = function(nodes) {
  if (! Array.isArray(nodes)) {
    nodes = [nodes];
  }
  var children = [];

  nodes.forEach(function(node) {
    if (!(node instanceof ReactiveDict)) {
      node = $(node); //kill two birds with one stone. Am I genius or what? /s
      node.get = node.attr.bind(node);
    }
    children = children.concat($('[data-parent-id="'+ node.get('id') +'"]').toArray());
  });

  return children;
};
Tree.prototype.$getAllChildren = function(nodes) {
  var children = this.$getChildren(nodes);

  if (!children.length)
    return children;

  return children.concat(this.$getAllChildren(children));
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
    return Object.keys(tree.nodes).length * baseHeight + 'px';
  },
  rows: function() {
    return Object.keys(tree.nodes).map(function(key) {
      return tree.nodes[key];
    });
  },
});

Template.nucleusTree.events({
  "click .nucleus-tree__row": function(e) {
    Utils.rToggle(this, 'expanded');
  }
});
