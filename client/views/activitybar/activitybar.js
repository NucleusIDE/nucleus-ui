SessionToggle = function(key, val) {
  if (Session.get(key) === val) {
    return Session.set(key, null);
  }
  return Session.set(key, val);
};

Template.nucleusActivitybar.rendered = function() {
  Session.setDefault('activeSidebarTemplate', 'nucleusSidebarExplore');
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
  "click #activitybar-git": function(e) {
    e.preventDefault();
    SessionToggle('activeSidebarTemplate', "nucleusSidebarGit");
  },
  "click #activitybar-explore": function(e) {
    e.preventDefault();
    SessionToggle('activeSidebarTemplate', "nucleusSidebarExplore");
  }
});
