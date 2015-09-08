Template.nucleusTree_collapse_row.events({
    'click .nucleus-tree__row': function(e) {
        if (this.get('type') === 'folder') {
            this.set('expanded', !this.get('expanded'));
        }
    }
});
