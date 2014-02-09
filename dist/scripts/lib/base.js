$.RaCalendar = {
  version: '<%= meta.version %>',
  elements: {
    root: null,
    header: null,
    resources: null,
    content: null
  },
  config: {
    defaults: {
      begin_time: "09:00:00",
      duration: 3600
    },
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
  resorces: [],
  default_color: {
    color: '#000000',
    background: '#eeeeee'
  }
};
