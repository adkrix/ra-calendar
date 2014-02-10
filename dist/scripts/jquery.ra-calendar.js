/*
  file: jquery.ra-calendar.js
  version: 0.0.1 
 */
$(function() {
'use strict';


// Source: dist/scripts/lib/base.js
$.RaCalendar = {
  version: '0.0.1',
  elements: {
    root: null,
    header: null,
    resources: null,
    content: null
  },
  config: {
    defaults: {
      begin_time: "09:00:00",
      duration: 3600
    },
    date_round: '15m',
    events: {
      id: "id",
      resource_id: "resource_id",
      title: "name",
      begin: "begin",
      end: "end",
      duration: ""
    },
    resources: {
      id: "",
      title: "name"
    }
  },
  events: [],
  resorces: [],
  default_color: {
    color: '#000000',
    background: '#eeeeee'
  }
};
;;
// Source: dist/scripts/lib/methods.js
$.RaCalendar.methods = {
  tmpl: function(template, data) {
    return template.replace(/\{([\w\.]*)\}/g, function(str, key) {
      var keys, v, _i, _len;
      keys = key.split(".");
      v = data[keys.shift()];
      for (_i = 0, _len = keys.length; _i < _len; _i++) {
        key = keys[_i];
        v = v[key];
      }
      if (typeof v !== "undefined" && v !== null) {
        return v;
      } else {
        return "";
      }
    });
  },
  roundDate: function(date, discrete) {
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
    return Math.floor(+date / discrete) * discrete;
  },
  normalizeEvents: function(event) {
    var H, R;
    R = $.RaCalendar.config.events;
    H = $.RaCalendar.handlers;
    return event;
  },
  updateEvents: function(events) {
    return events;
  },
  updateResources: function(resources) {
    return resources;
  }
};
;;
// Source: dist/scripts/lib/methods-date.js
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
;;
// Source: dist/scripts/lib/templates.js
$.RaCalendar.template = {
  header: {
    main: "<div class='rac-header'>header</div>"
  },
  resources: {
    main: "<div class='rac-resources'>resources</div>"
  },
  content: {
    main: "<div class='rac-content'>content</div>"
  },
  ul: "<ul>{list}</ul>",
  li_link: "<li><a href='{url}'>{title}</a></li>",
  li_div: "<li><div>{title}</div> </li>"
};
;;
// Source: dist/scripts/lib/init.js
$.fn.RaCalendar = function(settings) {
  return $(this).each(function() {
    var $BASE, $CONF, $ELEM, $FUNC, $TMPL, list;
    $BASE = $.extend(true, {}, $.RaCalendar);
    $ELEM = $BASE.elements;
    $ELEM.root = $(this).empty();
    $CONF = $BASE.config;
    if (settings.config) {
      $.extend(true, $CONF, settings.config);
    }
    $TMPL = $BASE.template;
    if (settings.template) {
      $.extend(true, $TMPL, settings.template);
    }
    $FUNC = $BASE.methods;
    if (settings.parseDate) {
      $FUNC.date.parse = settings.parseDate;
    }
    if (settings.formatDate) {
      $FUNC.date.format = settings.formatDate;
    }
    $BASE.date = $FUNC.date.normalize(settings.date);
    $BASE.events = settings.events ? $FUNC.updateEvents(settings.events) : [];
    $BASE.resources = settings.resources ? $FUNC.updateResources(settings.resources) : [];
    $ELEM.header = $($TMPL.header.main).appendTo($ELEM.root);
    $ELEM.resources = $($TMPL.resources.main).appendTo($ELEM.root);
    $ELEM.content = $($TMPL.content.main).appendTo($ELEM.root);
    list = "";
    $.each($BASE.events, function(i, n) {
      return list += n.url ? $FUNC.tmpl($TMPL.li_link, n) : $FUNC.tmpl($TMPL.li_div, n);
    });
    $.each($BASE.events, function(i, n) {
      return list += n.url ? $FUNC.tmpl($TMPL.li_link, n) : $FUNC.tmpl($TMPL.li_div, n);
    });
    $.each($BASE.events, function(i, n) {
      return list += n.url ? $FUNC.tmpl($TMPL.li_link, n) : $FUNC.tmpl($TMPL.li_div, n);
    });
    return $ELEM.content.html($FUNC.tmpl($TMPL.ul, {
      list: list
    }));
  });
};

});