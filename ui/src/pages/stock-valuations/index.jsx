import React from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  List,
  ListItem,
  Typography,
  useTheme,
} from "@material-ui/core";
import { navigate, graphql, Link } from "gatsby";
import { Helmet } from "react-helmet";
import getTitle from "../../shared/getTitle";
import resourceName from "../../shared/resourceName";
import LinesEllipsis from "react-lines-ellipsis";
import setURLSearchQuery from "../../shared/setURLSearchQuery";

const EOD_URL = "https://eodhistoricaldata.com";

export const query = graphql`
  query ValuationsQuery {
    allContentfulDcfTemplate {
      edges {
        node {
          ...ValuationInformation
        }
      }
    }
  }
`;

const Valuations = ({ data }) => {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title>{getTitle("Stock Valuations")}</title>
        <link rel="canonical" href={`${resourceName}/stock-valuations`} />
        <meta
          name="description"
          content="Stock valuations and research on public companies."
        />
      </Helmet>
      <Typography variant="h5" gutterBottom>
        Stock Valuations
      </Typography>
      <List>
        {data.allContentfulDcfTemplate.edges
          .sort((a, b) => {
            const dateA = new Date(a.node.dateOfValuation);
            const dateB = new Date(b.node.dateOfValuation);

            return dateB - dateA;
          })
          .map(
            ({
              node: {
                ticker,
                dateOfValuation,
                data: { General: general },
                ...fields
              },
            }) => {
              const searchParams = setURLSearchQuery(fields);
              const valuationUrl = `/stock-valuations/${ticker}/?${searchParams.toString()}`;

              return (
                <ListItem key={ticker}>
                  <Card>
                    <CardActionArea
                      style={{ padding: theme.spacing(2) }}
                      onClick={() => {
                        navigate(valuationUrl);
                      }}
                    >
                      <img
                        alt={general.Name}
                        width={120}
                        src={EOD_URL + general.LogoURL}
                        title={general.Name}
                        style={{
                          float: "left",
                          marginRight: theme.spacing(2.5),
                        }}
                      />
                      <Typography gutterBottom variant="h5">
                        {general.Name} Valuation
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        paragraph
                        component="div"
                      >
                        <LinesEllipsis text={general.Description} maxLine="3" />
                      </Typography>
                    </CardActionArea>
                    <CardActions>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flex: 1,
                        }}
                      >
                        <Button
                          to={valuationUrl}
                          size="small"
                          color="primary"
                          component={Link}
                        >
                          Learn More
                        </Button>
                        <Typography>{dateOfValuation}</Typography>
                      </Box>
                    </CardActions>
                  </Card>
                </ListItem>
              );
            },
          )}
      </List>
    </>
  );
};

export default Valuations;
