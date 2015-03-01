// Generated by CoffeeScript 1.8.0
var bind,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

bind = function() {
  var Statistics;
  Statistics = (function() {
    function Statistics() {
      this.notify = __bind(this.notify, this);
      this.relative = __bind(this.relative, this);
      this.absolute = __bind(this.absolute, this);
      this.stats = {};
      this.derived = {};
    }

    Statistics.prototype.absolute = function(entity, values) {
      var current, derived, key, value, _i, _len, _ref, _results;
      _results = [];
      for (key in values) {
        value = values[key];
        if (this.stats[key] == null) {
          this.stats[key] = 0;
        }
        if (this.derived[key] != null) {
          current = this.stats[key];
          _ref = this.derived[key];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            derived = _ref[_i];
            derived(entity, current, value);
          }
        }
        _results.push(this.stats[key] = value);
      }
      return _results;
    };

    Statistics.prototype.relative = function(entity, values) {
      var key, p, value, _results;
      _results = [];
      for (key in values) {
        value = values[key];
        if (this.stats[key] == null) {
          this.stats[key] = 0;
        }
        p = {};
        p[key] = this.stats[key] + value;
        _results.push(this.absolute(entity, p));
      }
      return _results;
    };

    Statistics.prototype.notify = function(key, cb) {
      if (this.derived[key] == null) {
        this.derived[key] = [];
      }
      this.derived[key].push(cb);
      return {
        off: (function(_this) {
          return function() {
            var index;
            index = _this.derived[key].indexOf(cb);
            if (index !== -1) {
              return _this.derived[key].splice(index, 1);
            }
          };
        })(this)
      };
    };

    return Statistics;

  })();
  return new Statistics;
};

if (typeof define !== "undefined" && define !== null) {
  define([], bind);
} else if (typeof module !== "undefined" && module !== null) {
  module.exports = bind();
} else {
  window.statistics = bind();
}
