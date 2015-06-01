UI.registerHelper('dict', function(dict, key) {
  /**
   * Return `key` of reactive `dict`. Assumes `dict` to be `this` if only `key` is given.
   * `dict` can also be an Object
   */
  if (typeof key !== 'string') {
    key = dict;
    dict = this;
  }

  if (!(dict instanceof ReactiveDict)) {
    return dict[key];
  }

  return dict.get(key);
});
