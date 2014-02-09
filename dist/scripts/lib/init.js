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
