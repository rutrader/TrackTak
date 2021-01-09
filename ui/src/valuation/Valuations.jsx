import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { getDCFTemplateEntries } from "../redux/actions/contentfulActions";
import { inputQueryNames } from "../selectors/selectQueryParams";

const EOD_URL = "https://eodhistoricaldata.com";

const Valuations = () => {
  const dispatch = useDispatch();
  const entries = useSelector((state) => state.contentful.entries);
  const theme = useTheme();
  const history = useHistory();

  useEffect(() => {
    dispatch(getDCFTemplateEntries());
  }, [dispatch]);

  if (!entries) return null;

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Intrinsic Stock Valuations
      </Typography>
      <List>
        {entries.items.map(({ fields }) => {
          const { General } = fields.data;
          const searchParams = new URLSearchParams();

          inputQueryNames.forEach((inputQueryName) => {
            if (fields[inputQueryName]) {
              searchParams.set(inputQueryName, fields[inputQueryName]);
            }
          });

          const valuationUrl = `/valuations/${
            fields.ticker
          }?${searchParams.toString()}`;

          return (
            <ListItem key={fields.ticker}>
              <Card>
                <CardActionArea
                  style={{ padding: theme.spacing(2) }}
                  onClick={() => {
                    history.push(valuationUrl);
                  }}
                >
                  <img
                    alt={General.Name}
                    height={200}
                    width={200}
                    src={EOD_URL + General.LogoURL}
                    title={General.Name}
                    style={{
                      float: "left",
                      marginRight: theme.spacing(2.5),
                    }}
                  />
                  <Typography gutterBottom variant="h5">
                    {General.Name} Valuation
                  </Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    {General.Description}
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
                    <Typography>{fields.dateOfValuation}</Typography>
                  </Box>
                </CardActions>
              </Card>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default Valuations;
