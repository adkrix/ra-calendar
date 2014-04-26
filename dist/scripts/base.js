$.RaCalendar = {
  version: '<%= meta.version %>',
  elements: {
    root: null,
    header: null,
    resources: null,
    content: null
  },
  config: {
    date: {
      begin_time: "09:00:00",
      duration: 3600,
      round: '15m'
    },
    events: {
      id: "id",
      resource_id: "resource_id",
      title: "name",
      begin: "begin",
      end: "end",
      duration: "",
      url: "url"
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
