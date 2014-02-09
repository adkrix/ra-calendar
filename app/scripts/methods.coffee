$.RaCalendar.methods =

  #! Nano Templates (Tomasz Mazur, Jacek Becela)
  tmpl: (template, data) ->
    template.replace /\{([\w\.]*)\}/g, (str, key) ->
      keys = key.split(".")
      v = data[keys.shift()]
      for key in keys
        v = v[key]
      if typeof v != "undefined" and v != null then v else ""



  roundDate: (date, discrete) ->
    discrete = switch discrete
      when '1m' then 60000
      when '5m' then 300000
      when '10m' then 600000
      when '15m' then 900000
      when '30m' then 1800000
      else 60000
    Math.floor(+date / discrete) * discrete


  normalizeEvents: (event) ->
    R = $.RaCalendar.config.events
    H = $.RaCalendar.handlers
    event

  updateEvents: (events) ->
    events

  updateResources: (resources) ->
    resources

