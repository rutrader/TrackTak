export const landingPageLinks = [
  { to: "/contact-us", text: "Contact" },
  {
    to: "/about-us",
    text: "About us",
  },
];

export const getHeaderLinks = (isAuthenticated) => {
  const links = [
    { to: "/how-to-do-a-dcf", text: "Documentation" },
    { to: "/blogs", text: "Blogs" },
    ...landingPageLinks,
  ];

  if (!isAuthenticated) {
    links.push(signInLink);
  }

  if (isAuthenticated && process.env.GATSBY_PREMIUM_ENABLED === "true") {
    links.push(upgradePlanLink);
  }

  return links;
};

export const signInLink = {
  to: "/sign-in",
  text: "Sign in",
};

export const upgradePlanLink = {
  to: "/pricing",
  text: "Upgrade plan",
};
