import { Box, styled } from "@material-ui/core";

const StatsContainer = styled(Box)`
  display: flex;
  flex-drection: column;
  grid-row-gap: ${({ theme }) => theme.spacing(0.7)};
`;

export default StatsContainer;
