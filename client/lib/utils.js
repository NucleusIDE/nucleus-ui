Utils = {
  rAdd: function(dict, key, val, isNum) {
    /**
     * Reactive add. Add 'val' to present val of dict
     */
    var oldVal = dict.get(key) || (isNum ? 0 : '');
    dict.set(key, oldVal + val);
  },
  rReplace: function(dict, key, oldVal, newVal) {
    /**
     * Replace `oldVal` with `newVal` in reactive-dict `dict`'s `key`
     */
    var val = dict.get(key);
    val = val.replace(oldVal, newVal);
    dict.set(key, val);
  },
  rToggle: function(dict, key) {
    /**
     * Toggle boolean `key` of reactive-dict `dict`
     */
    dict.set(key, ! dict.get(key));
  }
};
