$.RaCalendar.methods.date =
  clone: (date) ->
    new Date(date.getTime())

  parse: (date) ->
    new Date(Date.parse(date))

  format: (date, format) ->
    DateFormat.format.date(date, format)

  reformat: (date, format) ->
    this.format(this.parseDate(date), format)



  isLeapYear: (year) ->
    (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0))

  getDaysInMonth: (year, month) ->
    [31, (this.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]

  normalize: (date) ->
    if date
      if typeof date == 'object'
        date
      else
        this.parse(date)
    else
      $.now()

  update: (date, duration) ->
    new Date(date.setSeconds(duration))

