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
