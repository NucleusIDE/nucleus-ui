Session.toggle = function(key, val) {
  if (Session.get(key) === val) {
    return Session.set(key, null);
  }
  return Session.set(key, val);
};

Template.activitybar.helpers({
  active: function(template) {
    var activeSidebarTemplate = Session.get('activeSidebarTemplate') || null;
    if (template === activeSidebarTemplate)
      return "activitybar__action-label--active";

    return false;
  }
});

Template.activitybar.events({
  "click #activitybar-git": function(e) {
    e.preventDefault();
    Session.toggle('activeSidebarTemplate', "nucleusSidebarGit");
  },
  "click #activitybar-explore": function(e) {
    e.preventDefault();
    Session.toggle('activeSidebarTemplate', "nucleusSidebarExplore");
  }
});
