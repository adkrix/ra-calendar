/*
  file: jquery.ra-calendar.js
  version: 0.0.1 
 */
$(function() {
'use strict';


// Source: dist/scripts/lib/init.js
$.RaCalendar = {
  version: '0.0.1',
  config: {
    default_duration: 3600,
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
  resources: [],
  resource: {
    color: '#000000',
    background: '#eeeeee'
  }
};

$.fn.RaCalendar = function(settings) {
  return $(this).each(function() {
    var $C, $ELEM, $H, $M, $ROOT, $TMPL, list;
    $ELEM = $(this);
    $ROOT = $.RaCalendar;
    $C = $ROOT.config;
    if (settings.config) {
      $.extend(true, $C, settings.config);
    }
    $H = $ROOT.handlers;
    if (settings.handlers) {
      $.extend(true, $H, settings.handlers);
    }
    $TMPL = $ROOT.template;
    if (settings.template) {
      $.extend(true, $TMPL, settings.template);
    }
    $M = $ROOT.methods;
    if (settings.events) {
      $M.updateEvents(settings.events);
    } else {
      $ROOT.events = [];
    }
    if (settings.resources) {
      $M.updateResources(settings.resources);
    } else {
      $ROOT.resources = [];
    }
    list = "";
    $.each($ROOT.events, function(i, n) {
      return list += n.url ? $H.nano($TMPL.li_link, n) : $H.nano($TMPL.li_div, n);
    });
    return $ELEM.html($H.nano($TMPL.ul, {
      list: list
    }));
  });
};
;;
// Source: dist/scripts/lib/handlers.js
$.RaCalendar.handlers = {
  parseDate: function(date) {
    return Date.parse(date);
  },
  formatDate: function(date, format) {
    return DateFormat.format.date(date, format);
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
  nano: function(template, data) {
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
  }
};
;;
// Source: dist/scripts/lib/methods.js
$.RaCalendar.methods = {
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
// Source: dist/scripts/lib/templates.js
$.RaCalendar.template = {
  ul: "<ul>{list}</ul>",
  li_link: "<li><a href='{url}'>{title}</a></li>",
  li_div: "<li><div>{title}</div> </li>"
};

});