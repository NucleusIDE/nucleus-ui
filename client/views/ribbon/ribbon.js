Template.ultimate_ribbon.rendered = function() {
  var invert = "100%";
  Meteor.setInterval(function() {
    invert = invert == "100%" ? "50%" : "100%";
    $(".ultimate-ribbon-wrapper img").css({
      "filter": ("invert(" + invert +")"),
      "-webkit-filter": ("invert(" + invert +")")
    });
  }, 1500);
};

Template.ultimate_ribbon.events({
  "click #ultimate_client_init": function(e) {
    e.preventDefault();
    UltimateIDE.popup();
  }
});
