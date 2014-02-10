$.RaCalendar.methods =

  #! Nano Templates (Tomasz Mazur, Jacek Becela)
  tmpl: (template, data) ->
    template.replace /\{([\w\.]*)\}/g, (str, key) ->
      keys = key.split(".")
      v = data[keys.shift()]
      for key in keys
        v = v[key]
      if typeof v != "undefined" and v != null then v else ""

  normalizeEvent: (event, i, a) ->
    conf = @.base.config

    res =
      id: if event[conf.events.id] then event[conf.events.id] else i
      resource_id: if event[conf.events.resource_id] then event[conf.events.resource_id] else 0
      title: event[conf.events.title]
      begin: @.date.round(event[conf.events.begin], conf.date.round)
      event: event
      url: if event[conf.events.url] then event[conf.events.url] else ""

    res.end =
      if conf.events.end && event[conf.events.end]
        @.date.round(event[conf.events.end], conf.date.round)
      else if conf.events.duration && event[conf.events.duration]
        @.date.round(@.date.update(res.begin, event[conf.events.duration]), conf.date.round)
      else if conf.date.duration
        @.date.round(@.date.update(res.begin, conf.date.duration), conf.date.round)
    res

  updateEvents: (events) ->
    $this = @
    @.base.events =
      if events
        $.map events, (n, i)-> $this.normalizeEvent(n, i)
      else
        []
    console.log @.base.events, events

  updateResources: (resources) ->
    resources

