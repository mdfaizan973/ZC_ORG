import PropTypes from "prop-types";
import ReactECharts from "echarts-for-react";

export default function Analytics({ chart_data, bar_title, pie_title }) {
  //   const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF"];
  const colors = [
    "#00A8E8", // Cyan
    "#FF6F61", // Coral
    "#3357FF", // Blue
    "#33FF57", // Green
    "#FF5733", // Red-Orange
    "#6A0572", // Deep Violet
    "#A133FF", // Purple
    "#FFC300", // Yellow
    "#FF33A1", // Pink
    "#2ECC71", // Emerald Green
  ];

  const barOptions = {
    title: {
      text: bar_title,
      left: "center",
      textStyle: { fontSize: 18, fontWeight: "bold" },
    },
    tooltip: { trigger: "axis" },
    grid: { left: "5%", right: "5%", bottom: "10%" },
    xAxis: {
      type: "category",
      data: chart_data?.map((item) => item.prod_category),
      axisLabel: { rotate: 30 },
    },
    yAxis: { type: "value" },
    series: [
      {
        name: "Sales Value",
        type: "bar",
        data: chart_data?.map((item, index) => ({
          value: item.value,
          itemStyle: { color: colors[index % colors.length] },
        })),
        barWidth: "50%",
      },
    ],
  };

  const pieOptions = {
    title: {
      text: pie_title,
      left: "center",
      textStyle: { fontSize: 18, fontWeight: "bold" },
    },
    tooltip: { trigger: "item" },
    legend: { orient: "horizontal", bottom: 10 },
    series: [
      {
        name: "Sales",
        type: "pie",
        radius: "50%",
        data: chart_data?.map((item, index) => ({
          name: item.prod_category,
          value: item.value,
          itemStyle: { color: colors[index % colors.length] },
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return (
    <>
      <ChartDisplay barOptions={barOptions} pieOptions={pieOptions} />
    </>
  );
}

// **Define PropTypes**
Analytics.propTypes = {
  chart_data: PropTypes.arrayOf(
    PropTypes.shape({
      prod_category: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  bar_title: PropTypes.object.isRequired,
  pie_title: PropTypes.object.isRequired,
};

const ChartDisplay = ({ barOptions, pieOptions }) => {
  return (
    <>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <ReactECharts
          option={barOptions}
          style={{ height: 400, width: "100%" }}
        />
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <ReactECharts
          option={pieOptions}
          style={{ height: 400, width: "100%" }}
        />
      </div>
    </>
  );
};

// **Define PropTypes for ChartDisplay**
ChartDisplay.propTypes = {
  barOptions: PropTypes.object.isRequired,
  pieOptions: PropTypes.object.isRequired,
};
