Template.nucleusSplitView.events({
  "click .split-view-header": function(e) {
    var target = $(e.currentTarget);
    var body = target.parent().find('.split-view-body');

    target.toggleClass('split-view-header--collapsed');

    if (target.hasClass('split-view-header--collapsed')) {
      body.height(0);
    } else {
      body.height("100%");
    }
  }
});
