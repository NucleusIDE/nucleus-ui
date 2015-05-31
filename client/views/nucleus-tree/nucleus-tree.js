UI.registerHelper('rDict', function(dict, key) {
  /**
   * Return `key` of reactive `dict`. Assumes `dict` to be `this` if only `key` is given
   */
  if (typeof key !== 'string') {
    key = dict;
    dict = this;
  }

  window.reactiveDict = dict;
  return dict.get(key);
});

var Utils = {
  rAdd: function(dict, key, val, isNum) {
    /**
     * Reactive add. Add 'val' to present val of dict
     */
    var oldVal = dict.get(key) || (isNum ? 0 : '');
    dict.set(key, oldVal + val);
  }
};
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

    if (row.get('parentId'))
      row.setDefault('expanded', false);

    Tracker.autorun(function() {
      var isExpanded = row.get('expanded');
      if (isExpanded === false) {
        Tracker.nonreactive(function() {
          Utils.rAdd(row, 'rowClasses', ' hidden ');
        });
      }
    });
  });
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
    var target = $(e.currentTarget);
    var row = this;
    if (this.get('hasChildren'))
      target.toggleClass('nucleus-tree__row--expanded');

    $('[data-parent-id="' + this.get('id') + '"]').toggleClass('hidden');
  }
});
