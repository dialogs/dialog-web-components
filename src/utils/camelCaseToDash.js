/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

module.exports = function(string) {
  return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};
