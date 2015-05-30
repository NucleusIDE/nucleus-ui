var treeState = new ReactiveDict();

treeState.set("rows", [{
  type: "folder",
  name: ".meteor",
  children: [1, 2],
  itemClasses: "",
  labelClasses: ""
}]);

var getRowLevel = function(row) {
  var level = 1;

  return level;
};

Template.nucleusTree.helpers({
  treeHeight: function() {
    var baseHeight = 24;
    return treeState.get('rows').length * baseHeight + 'px';
  },
  rows: function() {
    return treeState.get('rows').map(function(row) {

      if (row.children && row.children.length)  //show icon in front of row with children
        row.hasChildrenClass = 'nucleus-tree__row--has-children';

      //set the left-padding as per row's level
      var basePadding = 32;
      var rowLevel = getRowLevel(row);
      row.styles = "padding-left: " + rowLevel * basePadding + "px";

      return row;
    });
  },
});

Template.nucleusTree.events({
  "click .nucleus-tree__row": function(e) {
    var target = $(e.currentTarget);
    if (target.hasClass('nucleus-tree__row--has-children'))
      target.toggleClass('nucleus-tree__row--expanded');
  }
});
