import React from "react";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme, VictoryTooltip } from "victory";

const YearlyBar = () => {
  const monthStrings = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return (
    <VictoryChart
      theme={VictoryTheme.material}
      domainPadding={10}
      height={400}
      width={600}
    >
      <VictoryAxis />
      <VictoryBar
        categories={{
          x: monthStrings,
        }}
        style={{
          data: { fill: "black", width: 20 },
          labels: { fill: "#01579b" },
        }}
        labelComponent={
          <VictoryTooltip
            flyoutPadding={8}
            flyoutStyle={{ backgroundColor: "red" }}
          />
        }
        data={[
          { x: 5, y: 10000, id: 17 },
          { x: 1, y: 10000, id: 17 },
          { x: 2, y: 10000, id: 17 },
        ]}
        x={monthStrings["x"]}
        domain={{ x: [0, 13] }}
        labels={({ datum }) => `Rs.${datum.y}`}
      />
    </VictoryChart>
  );
};

export default YearlyBar;
