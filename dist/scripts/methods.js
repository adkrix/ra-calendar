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
