module.exports = {
  folder: "<%-folder%>",
  migrations: "<%-migrations%>",
  primary: {
    driver: "<%-driver%>",
    params: {}
  },
  secondary: {
    drive: "<%-(secondaryDriver || driver)%>",
    params: {}
  }
};
