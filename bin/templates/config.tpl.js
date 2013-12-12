module.exports = {
  folder: "<%-folder%>",
  migrations: "<%-migrations%>",
  primary: {
    driver: "<%-driver%>",
    params: {}
  },
  secondary: {
    driver: "<%-(secondaryDriver || driver)%>",
    params: {}
  }
};
