$.RaCalendar.methods.date =
  isLeapYear: (year) ->
    (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0))

  getDaysInMonth: (year, month) ->
    [31, (@.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]

  clone: (date) ->
    new Date(date.getTime())

  parse: (date) ->
    new Date(Date.parse(date))

  format: (date, format) ->
    DateFormat.format.date(date, format)

  reformat: (date, format) ->
    @.format(this.parseDate(date), format)

  normalize: (date) ->
    if date
      if typeof date == 'number'
        new Date(date)
      else if typeof date == 'object'
        @.clone(date)
      else
        @.parse(date)
    else
      $.now()

  round: (date, discrete) ->
    discrete = switch discrete
      when '1m' then 60000
      when '5m' then 300000
      when '10m' then 600000
      when '15m' then 900000
      when '30m' then 1800000
      else 60000
    new Date(Math.floor(new Date(date).getTime() / discrete) * discrete)

  update: (date, duration) ->
    @.normalize(date).setSeconds(duration)

