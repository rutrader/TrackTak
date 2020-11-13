import styled from "styled-components";

export const breakpoints = {
  sm: "@media screen and (max-width: 768px)",
  md: "@media screen and (min-width: 768px) and (max-width: 992px)",
  lg: "@media screen and (min-width: 1200px)",
};

export const hidden = (key) => (props) => props[key] ? {
  [breakpoints[key]]: {
    display: "none"
  }
} : null;

export const sm = hidden("sm");
export const md = hidden("md");
export const lg = hidden("lg");

const Hide = styled.div([],
  sm,
  md,
  lg
);

export default Hide;
