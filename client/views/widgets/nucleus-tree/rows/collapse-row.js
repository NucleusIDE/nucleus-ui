Template.nucleusTree_collapse_row.events({
  "click .nucleus-tree__row": function(e) {
    if (this.get('type') === 'folder') {
      Utils.rToggle(this, 'expanded');
    }
  }
});
