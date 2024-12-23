
const tabs = document.querySelector(".tabs");
const buttons = tabs.querySelectorAll("button");
const teacherTable = document.getElementById("teacherTable");
const studentTable = document.getElementById("studentTable");
const staffTable = document.getElementById("staffTable");
const line = document.querySelector(".line");
const studentBtn = document.getElementById("studentTab");
const sideBarSelector = document.querySelector(".selectorsCombined");
const allSelectors = document.querySelectorAll(".selectors");

let removeAllTables = function () {
  teacherTable.classList.add("hidden");
  studentTable.classList.add("hidden");
  staffTable.classList.add("hidden");
};

let removeActive = function () {
  buttons.forEach((button) => {
    button.classList.remove("active");
  });
};

let removeActiveBar = function () {
  allSelectors.forEach((selector) => {
    selector.classList.remove("activeBar");
  });
};

removeAllTables();
studentTable.classList.remove("hidden");
line.style.left = studentBtn.offsetLeft + "px";

sideBarSelector.addEventListener("click", function (selected) {
  const clickedSelector = selected.target;
  if (clickedSelector.className === "selectors default") {
    removeActiveBar();
    clickedSelector.classList.add("activeBar");
  }
});

tabs.addEventListener("click", function (button) {
  const clickedButton = button.target;

  if (clickedButton.tagName === "BUTTON") {
    removeActive();
    removeAllTables();
    clickedButton.classList.add("active");

    if (clickedButton.id === "teacherTab") {
      teacherTable.classList.remove("hidden");
    } else if (clickedButton.id === "studentTab") {
      studentTable.classList.remove("hidden");
    } else if (clickedButton.id === "staffTab") {
      staffTable.classList.remove("hidden");
    }

    line.style.width = clickedButton.offsetWidth + "px";
    line.style.left = clickedButton.offsetLeft + "px";
  }
});

// chart1
/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://www.amcharts.com/docs/v5/
 * ---------------------------------------
 */

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv1");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: true,
    panY: true,
    wheelX: "panX",
    wheelY: "zoomX",
    pinchZoomX: true,
    paddingLeft: 0,
    paddingRight: 1,
  })
);

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
cursor.lineY.set("visible", false);

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, {
  minGridDistance: 0,
  minorGridEnabled: false,
});

xRenderer.labels.template.setAll({
  rotation: -90,
  centerY: am5.p50,
  centerX: am5.p100,
  paddingRight: 15,
});

xRenderer.grid.template.setAll({
  location: 1,
});

var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    maxDeviation: 0.3,
    categoryField: "year",
    renderer: xRenderer,
    tooltip: am5.Tooltip.new(root, {}),
  })
);

var yRenderer = am5xy.AxisRendererY.new(root, {
  strokeOpacity: 0,
});

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    maxDeviation: 0.3,
    renderer: yRenderer,
  })
);

yAxis.get("renderer").grid.template.set("forceHidden", true);
xAxis.get("renderer").grid.template.set("forceHidden", true);
// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series 1",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    sequencedInterpolation: true,
    categoryXField: "year",
    tooltip: am5.Tooltip.new(root, {
      labelText: "{valueY}",
    }),
  })
);

series.columns.template.setAll({
  cornerRadiusTL: 5,
  cornerRadiusTR: 5,
  strokeOpacity: 0,
});
series.columns.template.adapters.add("fill", function (fill, target) {
  return chart.get("colors").getIndex(series.columns.indexOf(target));
});

series.columns.template.adapters.add("stroke", function (stroke, target) {
  return chart.get("colors").getIndex(series.columns.indexOf(target));
});

// Set data
var data = [
  {
    year: "2017",
    value: 650,
  },
  {
    year: "2018",
    value: 550,
  },
  {
    year: "2019",
    value: 700,
  },
  {
    year: "2020",
    value: 400,
  },
  {
    year: "2021",
    value: 800,
  },
  {
    year: "2022",
    value: 450,
  },
  {
    year: "2023",
    value: 750,
  },
  {
    year: "2024",
    value: 700,
  },
];

xAxis.data.setAll(data);
series.data.setAll(data);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear(1000);
chart.appear(1000, 100);
