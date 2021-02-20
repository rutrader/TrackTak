exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions;

  if (page.path === "/") {
    page.context.layout = "home";
    createPage(page);
  }

  console.log(page.path);
  if (page.path.match(/stock\//)) {
    page.context.layout = "fullscreen";

    createPage(page);
  }
};
