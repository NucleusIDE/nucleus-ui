Template.nucleusSidebar.helpers({
  activeTemplate: function() {
    return Session.get('activeSidebarTemplate') || null;
  }
});
