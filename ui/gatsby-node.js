exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions;

  if (page.path === "/") {
    page.context.layout = "home";
    createPage(page);
  }

  if (page.path.match(/discounted-cash-flow/)) {
    page.context.layout === "fullScreen";
    createPage(page);
  }
};
