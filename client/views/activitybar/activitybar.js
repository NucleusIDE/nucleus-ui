var SessionToggle = function(key, val) {
  if (Session.get(key) === val) {
    return Session.set(key, null);
  }
  return Session.set(key, val);
};

Template.nucleusActivitybar.helpers({
  active: function(template) {
    var activeSidebarTemplate = Session.get('activeSidebarTemplate') || null;
    if (template === activeSidebarTemplate)
      return "activitybar__action-label--active";

    return false;
  }
});

Template.nucleusActivitybar.events({
  "click .activitybar__actions-list-item": function() {
    if (this.sidebarTemplate) {
      SessionToggle('activeSidebarTemplate', this.sidebarTemplate);
    }
  }
});
