var state = new ReactiveDict();

Template.nucleusSidebar.helpers({
  hideSidebarClass: function() {
    var show = !! Session.get('activeSidebarTemplate');

    if (show) {
      GlobalState.set('sidebarWidth', 288);
      return '';
    }

    GlobalState.set('sidebarWidth', 0);
    return 'hidden';
  },
  activeTemplate: function() {
    var template = Session.get('activeSidebarTemplate');

    if (template === 'nucleusSidebarExplore') {
      $('.should-hide-nucleus-sidebar-explore').removeClass('hidden');
      return null;
    }

    $('.should-hide-nucleus-sidebar-explore').addClass('hidden');
    return template || null;
  }
});
