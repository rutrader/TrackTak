import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  List,
  ListItem,
  Typography,
  useTheme,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import axios from "../axios/axios";
import { useHistory } from "react-router";
import { inputQueryNames } from "../shared/parseInputQueryParams";

const EOD_URL = "https://eodhistoricaldata.com";

const Valuations = () => {
  const entries = useSelector((state) => state.contentful.entries);
  const [stocks, setStocks] = useState();
  const theme = useTheme();
  const history = useHistory();

  useEffect(() => {
    if (entries) {
      const fetchStockData = async () => {
        try {
          const promises = entries.items.map(({ fields }) => {
            return axios.get(`/api/v1/fundamentals/${fields.ticker}`);
          });
          const responses = await Promise.all(promises);
          const valuesAsObject = {};

          responses.forEach(({ data }) => {
            const ticker = data.General.Code;

            valuesAsObject[ticker] = data;
          });

          setStocks(valuesAsObject);
        } catch (error) {
          console.error(error);
          throw error;
        }
      };
      fetchStockData();
    }
  }, [entries]);

  if (!stocks || !entries) return null;

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Intrinsic Stock Valuations
      </Typography>
      <List>
        {entries.items.map(({ fields, sys }) => {
          const { General } = stocks[fields.ticker];
          const searchParams = new URLSearchParams();

          inputQueryNames.forEach((inputQueryName) => {
            if (fields[inputQueryName]) {
              searchParams.set(inputQueryName, fields[inputQueryName]);
            }
          });

          const valuationUrl = `/valuations/${
            sys.id
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
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {General.Description}
                  </Typography>
                </CardActionArea>
                <CardActions>
                  <Button to={valuationUrl} size="small" color="primary">
                    Learn More
                  </Button>
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
