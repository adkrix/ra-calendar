$.RaCalendar.methods.date = {
  isLeapYear: function(year) {
    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
  },
  getDaysInMonth: function(year, month) {
    var _ref;
    return [
      31, (_ref = this.isLeapYear(year)) != null ? _ref : {
        29: 28
      }, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
    ][month];
  },
  clone: function(date) {
    return new Date(date.getTime());
  },
  parse: function(date) {
    return new Date(Date.parse(date));
  },
  format: function(date, format) {
    return DateFormat.format.date(date, format);
  },
  reformat: function(date, format) {
    return this.format(this.parseDate(date), format);
  },
  normalize: function(date) {
    if (date) {
      if (typeof date === 'number') {
        return new Date(date);
      } else if (typeof date === 'object') {
        return this.clone(date);
      } else {
        return this.parse(date);
      }
    } else {
      return $.now();
    }
  },
  round: function(date, discrete) {
    discrete = (function() {
      switch (discrete) {
        case '1m':
          return 60000;
        case '5m':
          return 300000;
        case '10m':
          return 600000;
        case '15m':
          return 900000;
        case '30m':
          return 1800000;
        default:
          return 60000;
      }
    })();
    return new Date(Math.floor(new Date(date).getTime() / discrete) * discrete);
  },
  update: function(date, duration) {
    return this.normalize(date).setSeconds(duration);
  }
};
