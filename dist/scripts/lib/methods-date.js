$.RaCalendar.methods.date = {
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
  normalize: function(date) {
    if (date) {
      if (typeof date === 'object') {
        return date;
      } else {
        return this.parse(date);
      }
    } else {
      return $.now();
    }
  },
  update: function(date, duration) {
    return new Date(date.setSeconds(duration));
  }
};
