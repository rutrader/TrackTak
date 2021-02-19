exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions;

  console.log(page.path);

  if (page.path === "/") {
    page.context.layout = "home";
    createPage(page);
  }

  if (page.path.match(/discounted-cash-flow/)) {
    page.context.layout === "fullScreen";
    createPage(page);
  }
};
