import React, { useEffect, useState } from "react";
import { Box, FormGroup, Typography } from "@material-ui/core";
import TTTable from "./TTTable";
import FormGroupSlider from "./FormGroupSlider";
import { makeStyles } from "@material-ui/core/styles";
import { isNil } from "lodash";
import { useSelector } from "react-redux";
import selectCells from "../selectors/dcfSelectors/selectCells";
import selectScope from "../selectors/dcfSelectors/selectScope";
import FormatRawNumberToCurrency from "./FormatRawNumberToCurrency";
import useSensitivityAnalysisDataTable, {
  findType,
  getSliderValuesFromMinMax,
} from "../hooks/useSensitivityAnalysisDataTable";
import { inputQueries } from "../hooks/useInputQueryParams";
import sensitivityAnalysisWorker from "../workers/sensitivityAnalysisWorker";
import getChunksOfArray from "../shared/getChunksOfArray";

const useStyles = makeStyles((theme) => ({
  slider: {
    maxWidth: 400,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const marks = [
  {
    value: -50,
    label: "-50",
  },
  {
    value: 0,
    label: "0",
  },
  {
    value: 50,
    label: "50",
  },
];

const getColumns = (yElement) => {
  if (yElement) {
    return yElement.data.map((value, i) => {
      const Formatter = yElement.formatter;

      return {
        Header: <Formatter value={value} />,
        accessor: i.toString(),
      };
    });
  }

  return [];
};

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

const SensitivityAnalysis = () => {
  const classes = useStyles();
  const cells = useSelector(selectCells);
  const scope = useSelector(selectScope);
  const [data, setData] = useState([]);
  const [xElement, setXElement] = useState();
  const [yElement, setYElement] = useState();
  const [dataTable, setDataTable] = useSensitivityAnalysisDataTable();

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
    const newDataTable = dataTable.map((datum) => {
      if (name === datum.name) {
        return {
          ...datum,
          checked,
        };
      }

      return datum;
    });

    setDataTable(newDataTable);
  };

  const columns = [
    {
      Header: "",
      accessor: "dataField",
    },
    ...getColumns(yElement),
  ];

  useEffect(() => {
    const checkedValues = dataTable.filter((x) => x.checked);
    const xElement = checkedValues.length === 2 ? checkedValues[0] : null;
    const yElement = checkedValues.length === 2 ? checkedValues[1] : null;

    setXElement({ ...xElement });
    setYElement({ ...yElement });
  }, [dataTable]);

  useEffect(() => {
    const currentScopes = getModelScopes(scope, xElement, yElement);

    if (currentScopes) {
      sensitivityAnalysisWorker.postMessage({
        cells,
        existingScope: scope,
        currentScopes,
      });

      sensitivityAnalysisWorker.onmessage = ({ data }) => {
        const chunkedData = getChunksOfArray(data, xElement.data.length);
        const XFormatter = xElement.formatter;

        const rowData = chunkedData.map((chunk, i) => {
          const row = {
            dataField: <XFormatter value={xElement.data[i]} />,
          };

          chunk.forEach((model, z) => {
            row[z.toString()] = (
              <FormatRawNumberToCurrency value={model.B36.value} />
            );
          });

          return row;
        });

        setData(rowData);
      };
    }
  }, [cells, scope, xElement, yElement]);

  return (
    <Box sx={{ overflow: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Sensitivity Analysis
      </Typography>
      {xElement && yElement && (
        <Box>
          <Typography align="center" variant="h6">
            {yElement.label}
          </Typography>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6">{xElement.label}</Typography>
            <TTTable sx={{ flex: 1 }} columns={columns} data={data} />
          </Box>
        </Box>
      )}
      <FormGroup column className={classes.slider}>
        {dataTable.map(({ modifier, data, ...datum }) => (
          <FormGroupSlider
            {...datum}
            value={[modifier(data[0]), modifier(data[data.length - 1])]}
            marks={marks}
            setChecked={setChecked}
            onChangeCommitted={onSliderChangeCommitted}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default SensitivityAnalysis;
