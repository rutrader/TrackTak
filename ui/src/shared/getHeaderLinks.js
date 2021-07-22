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

  return links;
};

export const signOutButton = {
  id: "sign-out",
  text: "Sign out",
};

export const signInLink = {
  to: "/sign-in",
  text: "Sign in",
};
