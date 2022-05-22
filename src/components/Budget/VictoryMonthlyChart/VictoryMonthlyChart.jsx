import React from "react";
import {
  VictoryZoomContainer,
  VictoryScatter,
  VictoryTooltip,
  VictoryLabel,
  VictoryChart,
} from "victory";
import * as _ from "lodash";
import moment from "moment";

const VictoryMonthlyChart = ({ expenses }) => {
  const newData = expenses.map((expense) => {
    const date = moment(expense.date).date();
    return {
      x: date,
      y: expense.amount,
      id: expense.id,
      label: `${expense.title} expense has Rs.${expense.amount} on ${date}th`,
    };
  });
  const min = newData.reduce((min, obj) => (_.lt(min, obj.y) ? min : obj.y));
  const max = newData.reduce((max, obj) => (_.gt(max, obj.y) ? max : obj.y), 0);
  return (
    <VictoryChart
      height={500}
      width={500}
      domainPadding={10}
      animate={{ duration: 2000, easing: "bounce" }}
      containerComponent={
        <VictoryZoomContainer zoomDomain={{ x: [0, 31], y: [0, max] }} />
      }
    >
      <VictoryScatter
        style={{
          data: {
            opacity: ({ datum }) => (datum.y % 3 === 0 ? 1 : 0.7),
            fill: ({ datum }) => (datum.y % 3 === 0 ? "tomato" : "black"),
          },
          labels: {
            fill: "#01579b",
            fontSize: 8,
            padding: 8,
            width: "100%",
            border: 0,
            strokeWidth: 0,
          },
        }}
        bubbleProperty="y"
        maxBubbleSize={10}
        minBubbleSize={3}
        labelComponent={<VictoryTooltip flyoutPadding={8} />}
        data={newData}
        domain={{ x: [0, 31], y: [min, max] }}
      />
      <VictoryLabel
        textAnchor="middle"
        style={{ fontSize: 14, fill: "#8b8b8b" }}
        x={270}
        y={490}
        text={`Days ---->`}
      />
      <VictoryLabel
        textAnchor="middle"
        style={{ fontSize: 14, fill: "#8b8b8b" }}
        x={-30}
        y={190}
        angle={270}
        text={`Amount (Rs) ---->`}
      />
    </VictoryChart>
  );
};

export default VictoryMonthlyChart;
