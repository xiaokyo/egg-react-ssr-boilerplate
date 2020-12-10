module.exports = [
  {
    name: "default",
    modifyVars: {
      "@primary-color": "#2626B8"
    },
    root: {
      "--primaryColor": "#2626B8",
      "--bg-color": "#2626B8"
    }
  },
  {
    name: "theme1",
    modifyVars: {
      "@primary-color": "red"
    },
    root: {
      "--primaryColor": "red",
      "--bg-color": "red"
    }
  },
  {
    name: "theme2",
    modifyVars: {
      "@primary-color": "#66CE8E",
    },
    root: {
      "--primaryColor": "#66CE8E",
      "--bg-color": "#66CE8E"
    }
  }
]
