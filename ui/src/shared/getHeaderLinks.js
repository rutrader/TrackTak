export const landingPageLinks = [
  { to: "/contact-us", text: "Contact" },
  {
    to: "/about-us",
    text: "About us",
  },
];

export const getHeaderLinks = () => {
  const links = [
    { to: "/how-to-do-a-dcf", text: "Documentation" },
    { to: "/blogs", text: "Blogs" },
    ...landingPageLinks,
  ];

  return links;
};
