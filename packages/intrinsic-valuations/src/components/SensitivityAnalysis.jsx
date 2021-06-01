import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  FormGroup,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import TTTable from "./TTTable";
import CheckboxSlider from "./CheckboxSlider";
import { useTheme } from "@material-ui/core/styles";
import { isNil } from "lodash-es";
import { useSelector } from "react-redux";
import selectCells from "../selectors/dcfSelectors/selectCells";
import selectScope from "../selectors/dcfSelectors/selectScope";
import FormatRawNumberToCurrency from "./FormatRawNumberToCurrency";
import useSensitivityAnalysisDataTable, {
  getSliderValuesFromMinMax,
} from "../hooks/useSensitivityAnalysisDataTable";
import useInputQueryParams from "../hooks/useInputQueryParams";
import getChunksOfArray from "../shared/getChunksOfArray";
import { Fragment } from "react";
import useHasAllRequiredInputsFilledIn from "../hooks/useHasAllRequiredInputsFilledIn";
import { computeSensitivityAnalysis } from "../api/api";
import { allInputNameTypeMappings } from "../discountedCashFlow/scopeNameTypeMapping";

const getModelScopes = (scope, xElement, yElement) => {
  const doesScopeExist =
    scope && !isNil(scope[xElement?.name]) && !isNil(scope[yElement?.name]);

  if (!doesScopeExist) return null;

  const scopes = xElement.data.flatMap((xElementValue) => {
    return yElement.data.map((yElementValue, i) => {
      return {
        [xElement.name]: xElementValue,
        [yElement.name]: yElementValue,
      };
    });
  });

  return scopes;
};

const getColumns = (yElement) => {
  if (!yElement) return [];

  return yElement.data.map((value, i) => {
    const Formatter = yElement.formatter;

    return {
      Header: (
        <b>
          <Formatter value={value} />
        </b>
      ),
      accessor: i.toString(),
    };
  });
};

const getRowData = (estimatedValues, xElement, cells, theme) => {
  if (!xElement) return [];

  const chunkedData = getChunksOfArray(estimatedValues, xElement.data.length);
  const XFormatter = xElement.formatter;

  const rowData = chunkedData.map((chunk, i) => {
    const row = {
      dataField: (
        <b>
          <XFormatter value={xElement.data[i]} />
        </b>
      ),
    };

    chunk.forEach((estimatedValue, z) => {
      let sx;

      if (cells.B36.value === estimatedValue) {
        sx = {
          color: theme.palette.primary.main,
        };
      }

      row[z.toString()] = (
        <Box sx={sx}>
          <FormatRawNumberToCurrency value={estimatedValue} />
        </Box>
      );
    });

    return row;
  });

  return rowData;
};

const SensitivityAnalysis = () => {
  const theme = useTheme();
  const cells = useSelector(selectCells);
  const scope = useSelector(selectScope);
  const [estimatedValues, setEstimatedValues] = useState([]);
  const [data, setData] = useState([]);
  const [dataTable, setDataTable] = useSensitivityAnalysisDataTable();
  const hasAllRequiredInputsFilledIn = useHasAllRequiredInputsFilledIn();
  const inputQueryParams = useInputQueryParams();
  const [isLoading, setIsLoading] = useState(false);
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const [checkedItems, setCheckedItems] = useState([
    {
      name: "cagrInYears_1_5",
      value: true,
    },
    {
      name: "ebitTargetMarginInYear_10",
      value: true,
    },
  ]);
  const dataTableValues = dataTable.filter((x) =>
    checkedItems.some((z) => z.name === x.name),
  );
  const xElement = dataTableValues[0];
  const yElement = dataTableValues[1];

  const onSliderChangeCommitted = (name, sliderValue) => {
    const type = allInputNameTypeMappings[name];

    let minPoint = sliderValue[0];
    let maxPoint = sliderValue[1];

    if (type === "percent") {
      minPoint /= 100;
      maxPoint /= 100;
    }

    const newDataTable = dataTable.map((datum) => {
      if (name === datum.name) {
        return {
          ...datum,
          data: getSliderValuesFromMinMax(minPoint, maxPoint),
        };
      }
      return datum;
    });

    setDataTable(newDataTable);
  };

  const setChecked = (name, checked) => {
    let newCheckedItems = [...checkedItems];
    const existingItem = checkedItems.find((x) => x.name === name);

    if (existingItem) {
      newCheckedItems = checkedItems.filter((x) => x.name !== name);
    } else {
      if (checkedItems.length === 2) {
        newCheckedItems.shift();
      }
      newCheckedItems.push({
        name,
        value: checked,
      });
    }

    setCheckedItems(newCheckedItems);
  };

  const columns = [
    {
      Header: "",
      accessor: "dataField",
    },
    ...getColumns(yElement),
  ];

  useEffect(() => {
    setIsLoading(false);
    setData(getRowData(estimatedValues, xElement, cells, theme));
  }, [cells, estimatedValues, theme, xElement]);

  useEffect(() => {
    const fetchComputeSensitivityAnalysis = async () => {
      const currentScopes = getModelScopes(scope, xElement, yElement);

      if (currentScopes) {
        setIsLoading(true);

        const { data } = await computeSensitivityAnalysis(
          cells,
          scope,
          currentScopes,
        );

        setEstimatedValues(data);
      }
    };

    fetchComputeSensitivityAnalysis();
  }, [cells, scope, xElement, yElement]);

  return (
    <Fragment>
      <Typography variant="h5">Sensitivity Analysis</Typography>
      <Typography gutterBottom>Estimated Value Per Share</Typography>
      <Box
        sx={{
          display: "flex",
          gridColumnGap: theme.spacing(8.75),
          gridRowGap: theme.spacing(2),
          flexWrap: "wrap",
        }}
      >
        <FormGroup
          sx={{
            flex: "0.5",
            minWidth: "300px",
          }}
        >
          {dataTable.map(({ modifier, data, name, ...datum }) => {
            const disabled = isNil(inputQueryParams[name]);

            return (
              <CheckboxSlider
                {...datum}
                key={name}
                disabledSlider={isLoading || !hasAllRequiredInputsFilledIn}
                disabled={disabled || !hasAllRequiredInputsFilledIn}
                checked={
                  checkedItems.find((x) => x.name === name)?.value ?? false
                }
                name={name}
                value={[modifier(data[0]), modifier(data[data.length - 1])]}
                setChecked={setChecked}
                onChangeCommitted={onSliderChangeCommitted}
              />
            );
          })}
        </FormGroup>
        {xElement && yElement && hasAllRequiredInputsFilledIn && (
          <Box sx={{ flex: 1, minWidth: "288px", overflow: "auto" }}>
            {smDown && (
              <Box sx={{ mb: 2 }}>
                <Box mb={1}>X = {xElement.label}</Box>
                <Box>Y = {yElement.label}</Box>
              </Box>
            )}
            <Typography align="center" variant="h6">
              {smDown ? "Y" : yElement.label}
            </Typography>
            <Box
              style={{ display: "flex", alignItems: "center", gridGap: "10px" }}
            >
              <Typography
                variant="h6"
                style={{
                  flex: "0 1 auto",
                  textAlign: "center",
                }}
              >
                {smDown ? "X" : xElement.label}
              </Typography>
              {isLoading ? (
                <Box
                  sx={{
                    width: "100%",
                    height: 322,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <TTTable sx={{ flex: 1 }} columns={columns} data={data} />
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Fragment>
  );
};

export default SensitivityAnalysis;
