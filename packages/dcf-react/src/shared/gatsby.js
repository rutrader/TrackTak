let navigate;
let Link;

try {
  // eslint-disable-next-line import/no-unresolved
  const gatsby = require("gatsby");

  navigate = gatsby.navigate;
  Link = gatsby.Link;
} catch (error) {
  // eslint-disable-next-line import/no-unresolved
  const reach = require("@reach/router");

  navigate = reach.navigate;
  Link = reach.Link;
}

export { navigate, Link };
