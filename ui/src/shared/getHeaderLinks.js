import featureToggle from "./featureToggle";

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
    { to: "/stock-valuations", text: "Valuations" },
    { to: "/blogs", text: "Blogs" },
    ...landingPageLinks,
  ];

  if (featureToggle.AUTHENTICATION && !isAuthenticated) {
    links.push(signInLink);
  }

  return links;
};

export const signInLink = {
  to: "/sign-in",
  text: "Sign in",
};