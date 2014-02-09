$.RaCalendar =
  version: '<%= meta.version %>'
  config:
    default_duration: 3600
    date_round: '15m'
    events:
      id: "id"
      resource_id: "resource_id"
      title: "name"
      begin: "begin"
      end: "end"
      duration: ""
    resources:
      id: ""
      title: "name"
  events: []
  resources:[]
  resource:
    color: '#000000'
    background: '#eeeeee'


$.fn.RaCalendar = (settings) ->
  $(@).each ()->
    # root element
    $ELEM = $(@)

    # root of global configuration
    $ROOT = $.RaCalendar

    # actual config
    $C = $ROOT.config
    $.extend(true, $C, settings.config) if settings.config

    # actrual handlers like $H.parse
    $H = $ROOT.handlers
    $.extend(true, $H, settings.handlers) if settings.handlers

    $TMPL = $ROOT.template
    $.extend(true, $TMPL, settings.template) if settings.template

    $M = $ROOT.methods
    if settings.events
      $M.updateEvents(settings.events)
    else
      $ROOT.events = []

    if settings.resources
      $M.updateResources(settings.resources)
    else
      $ROOT.resources = []

    list = ""
    $.each $ROOT.events, (i, n)->
      list += if n.url
        $H.nano($TMPL.li_link, n)
      else
        $H.nano($TMPL.li_div, n)

    $ELEM.html($H.nano($TMPL.ul,{list: list}))



