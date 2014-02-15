$.fn.RaCalendar = (settings) ->
  $(@).each ()->
    $BASE = $.extend(true, {}, $.RaCalendar)

    # elements object
    $ELEM = $BASE.elements
    $ELEM.root = $(@).empty()

    # actual config
    $CONF = $BASE.config
    $.extend(true, $CONF, settings.config) if settings.config


    $TMPL = $BASE.template
    $.extend(true, $TMPL, settings.template) if settings.template

    $FUNC = $BASE.methods
    $BASE.methods.base = $BASE

    # custom handlers for parsing and formating of date
    $FUNC.date.parse = settings.parseDate if settings.parseDate
    $FUNC.date.format = settings.formatDate if settings.formatDate


    $BASE.date = $FUNC.date.normalize(settings.date)

    $FUNC.updateEvents(settings.events)

    $FUNC.updateResources(settings.resources)

    $ELEM.header = $($TMPL.header.main).appendTo($ELEM.root)
    $ELEM.resources = $($TMPL.resources.main).appendTo($ELEM.root)
    $ELEM.content = $($TMPL.content.main).appendTo($ELEM.root)

    list = ""
    $.each $BASE.events, (i, n)->
      list +=
        if n.url
          $FUNC.tmpl($TMPL.li_link, n)
        else
          $FUNC.tmpl($TMPL.li_div, n)

    $ELEM.content.html($FUNC.tmpl($TMPL.ul,{list: list}))



