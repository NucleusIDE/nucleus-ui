Template.nucleusActivitybarItem.helpers({
  active: function(template) {
    var activeSidebarTemplate = Session.get('activeSidebarTemplate') || null;
    if (template === activeSidebarTemplate)
      return "activitybar__action-label--active";

    return false;
  }
});
