NucleusExpandingTree = function(nodes) {
  if (!nodes)
    return null;

  this.setNodes(nodes);
  return this;
};

NucleusExpandingTree.prototype.getNodeLevel = function(node) {
  var self = this;

  if (typeof node === 'undefined' || !node.get('parentId')) {
    return 1;
  }

  return 1 + self.getNodeLevel(self.nodes[node.get('parentId')]);
};

NucleusExpandingTree.prototype.setExpandAutorun = function(node) {
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

NucleusExpandingTree.prototype.setNodes = function(nodes) {
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
NucleusExpandingTree.prototype.$getChildren = function(nodes) {
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
NucleusExpandingTree.prototype.$getAllChildren = function(nodes) {
  var children = this.$getChildren(nodes);

  if (!children.length)
    return children;

  return children.concat(this.$getAllChildren(children));
};
