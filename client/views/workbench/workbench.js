Template.nucleusWorkbench.helpers({
  shouldShowUltimateLoginButton: function() {
    return Session.get('should_show_ultimate_login_button');;
  },
  githubAuthProxyURL: function() {
    return 'http://ultimate-ide-auth-proxy.meteor.com/github-auth' + '?subdomain=' + window.location.href.split('/',3).join('/');
  }
});
