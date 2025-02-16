import PropTypes from "prop-types";
import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";

export default function Analytics({
  chart_data,
  bar_title,
  pie_title,
  showBarChart,
}) {
  const colors = [
    "#6366F1", // Modern Indigo
    "#14B8A6", // Teal Green
    "#F59E0B", // Vibrant Amber
    "#EF4444", // Bright Red
    "#3B82F6", // Electric Blue
    "#10B981", // Fresh Green
    "#A855F7", // Soft Purple
    "#EC4899", // Neon Pink
    "#EAB308", // Golden Yellow
    "#9333EA", // Deep Violet
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
      <ChartDisplay
        barOptions={barOptions}
        pieOptions={pieOptions}
        showBarChart={showBarChart}
      />
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
  showBarChart: PropTypes.object.isRequired,
};

const ChartDisplay = ({ barOptions, pieOptions, showBarChart = true }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [showBarChart]);

  return (
    <div className="bg-white dark:bg-gray-800  rounded-lg p-6 min-h-[420px] flex items-center justify-center">
      {isLoading ? (
        <p className="text-gray-500">Loading chart...</p>
      ) : showBarChart ? (
        <ReactECharts
          option={barOptions}
          style={{ height: 600, width: "100%" }}
        />
      ) : (
        <ReactECharts
          option={pieOptions}
          style={{ height: 600, width: "100%" }}
        />
      )}
    </div>
  );
};

// **Define PropTypes for ChartDisplay**
ChartDisplay.propTypes = {
  barOptions: PropTypes.object.isRequired,
  pieOptions: PropTypes.object.isRequired,
  showBarChart: PropTypes.object.isRequired,
};
