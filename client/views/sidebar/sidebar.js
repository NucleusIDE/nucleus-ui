var state = new ReactiveDict();

/**
 * XXX: hack
 * We don't want to re-create the filetree template on every switch.
 * So we hide that one template instead. This should be turned to a feature
 * I guess, to have some sidebar templates which are hidden on toggle and not
 * removed with {{#if}} blocks
 */
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

    if (template === 'ultimateSidebarExplore') {
      $('.should-hide-nucleus-sidebar-explore').removeClass('hidden');
      return null;
    }

    $('.should-hide-nucleus-sidebar-explore').addClass('hidden');
    return template || null;
  }
});
