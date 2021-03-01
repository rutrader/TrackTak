let navigate;
let Link;

try {
  const gatsby = require("gatsby");

  navigate = gatsby.navigate;
  Link = gatsby.Link;
} catch (error) {
  const reach = require("@reach/router");

  navigate = reach.navigate;
  Link = reach.Link;
}

export { navigate, Link };
