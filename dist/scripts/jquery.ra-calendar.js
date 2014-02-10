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
    date: {
      begin_time: "09:00:00",
      duration: 3600,
      round: '15m'
    },
    events: {
      id: "id",
      resource_id: "resource_id",
      title: "name",
      begin: "begin",
      end: "end",
      duration: "",
      url: "url"
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
  normalizeEvent: function(event, i, a) {
    var conf, res;
    conf = this.base.config;
    res = {
      id: event[conf.events.id] ? event[conf.events.id] : i,
      resource_id: event[conf.events.resource_id] ? event[conf.events.resource_id] : 0,
      title: event[conf.events.title],
      begin: this.date.round(event[conf.events.begin], conf.date.round),
      event: event,
      url: event[conf.events.url] ? event[conf.events.url] : ""
    };
    res.end = conf.events.end && event[conf.events.end] ? this.date.round(event[conf.events.end], conf.date.round) : conf.events.duration && event[conf.events.duration] ? this.date.round(this.date.update(res.begin, event[conf.events.duration]), conf.date.round) : conf.date.duration ? this.date.round(this.date.update(res.begin, conf.date.duration), conf.date.round) : void 0;
    return res;
  },
  updateEvents: function(events) {
    var $this;
    $this = this;
    this.base.events = events ? $.map(events, function(n, i) {
      return $this.normalizeEvent(n, i);
    }) : [];
    return console.log(this.base.events, events);
  },
  updateResources: function(resources) {
    return resources;
  }
};
;;
// Source: dist/scripts/lib/methods-date.js
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
;;
// Source: dist/scripts/lib/templates.js
$.RaCalendar.template = {
  header: {
    main: "<div class='ra-header'>header</div>"
  },
  resources: {
    main: "<div class='ra-resources'>resources</div>"
  },
  content: {
    main: "<div class='ra-content'>content</div>"
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
    $BASE.methods.base = $BASE;
    if (settings.parseDate) {
      $FUNC.date.parse = settings.parseDate;
    }
    if (settings.formatDate) {
      $FUNC.date.format = settings.formatDate;
    }
    $BASE.date = $FUNC.date.normalize(settings.date);
    $FUNC.updateEvents(settings.events);
    $FUNC.updateResources(settings.resources);
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