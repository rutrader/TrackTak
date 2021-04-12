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
import { isNil } from "lodash";
import { useSelector } from "react-redux";
import selectCells from "../selectors/dcfSelectors/selectCells";
import selectScope from "../selectors/dcfSelectors/selectScope";
import FormatRawNumberToCurrency from "./FormatRawNumberToCurrency";
import useSensitivityAnalysisDataTable, {
  findType,
  getSliderValuesFromMinMax,
} from "../hooks/useSensitivityAnalysisDataTable";
import useInputQueryParams, {
  inputQueries,
} from "../hooks/useInputQueryParams";
import getChunksOfArray from "../shared/getChunksOfArray";
import { Fragment } from "react";
import useHasAllRequiredInputsFilledIn from "../hooks/useHasAllRequiredInputsFilledIn";
import useUpdateDCFModels from "../hooks/useUpdateDCFModels";

const getModelScopes = (scope, xElement, yElement) => {
  const doesScopeExist =
    !isNil(scope[xElement?.name]) && !isNil(scope[yElement?.name]);

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

const getRowData = (dcfModels, xElement, cells, theme) => {
  if (!xElement) return [];

  const chunkedData = getChunksOfArray(dcfModels, xElement.data.length);
  const XFormatter = xElement.formatter;

  const rowData = chunkedData.map((chunk, i) => {
    const row = {
      dataField: (
        <b>
          <XFormatter value={xElement.data[i]} />
        </b>
      ),
    };

    chunk.forEach((model, z) => {
      let sx;

      if (cells.B36.value === model.B36.value) {
        sx = {
          color: theme.palette.primary.main,
        };
      }

      row[z.toString()] = (
        <Box sx={sx}>
          <FormatRawNumberToCurrency value={model.B36.value} />
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
  const [dcfModels, updateDCFModels] = useUpdateDCFModels([]);
  const [data, setData] = useState([]);
  const [dataTable, setDataTable] = useSensitivityAnalysisDataTable();
  const hasAllRequiredInputsFilledIn = useHasAllRequiredInputsFilledIn();
  const inputQueryParams = useInputQueryParams();
  const [isLoading, setIsLoading] = useState(false);
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const [checkedItems, setCheckedItems] = useState([
    {
      name: "cagrYearOneToFive",
      value: true,
    },
    {
      name: "ebitTargetMarginInYearTen",
      value: true,
    },
  ]);
  const dataTableValues = dataTable.filter((x) =>
    checkedItems.some((z) => z.name === x.name),
  );
  const xElement = dataTableValues[0];
  const yElement = dataTableValues[1];

  const onSliderChangeCommitted = (name, sliderValue) => {
    const type = findType(inputQueries, name);

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
    setData(getRowData(dcfModels, xElement, cells, theme));
  }, [cells, dcfModels, theme, xElement]);

  useEffect(() => {
    const currentScopes = getModelScopes(scope, xElement, yElement);

    if (currentScopes) {
      setIsLoading(true);

      updateDCFModels(currentScopes);
    }
  }, [scope, updateDCFModels, xElement, yElement]);

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
          column
        >
          {dataTable.map(({ modifier, data, name, ...datum }) => {
            const disabled = isNil(inputQueryParams[name]);

            return (
              <CheckboxSlider
                key={name}
                {...datum}
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
        {xElement && yElement && (
          <Box sx={{ flex: 1 }}>
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
                <TTTable
                  sx={{ flex: 1, overflow: "auto", minWidth: "300px" }}
                  columns={columns}
                  data={data}
                />
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Fragment>
  );
};

export default SensitivityAnalysis;
