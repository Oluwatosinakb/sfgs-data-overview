am5.ready(function () {
    // Create root element
    let root = am5.Root.new("chartdiv2");
  
    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);
  
    // Create chart
    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        endAngle: 270,
        layout: root.verticalLayout,
        innerRadius: am5.percent(60),
      })
    );
  
    // Create series
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
        endAngle: 270,
        labelsEnabled: false,
      })
    );
  
    series.set(
      "colors",
      am5.ColorSet.new(root, {
        colors: [
          am5.color(0x7e57c2), // Purple color for male students
          am5.color(0x42a5f5), // Blue color for female students
        ],
      })
    );
  
    let data = [
      {
        category: "Male",
        value: 48,
      },
      {
        category: "Female",
        value: 52,
      },
    ];
  
    // Set data
    series.data.setAll(data);
  
    let legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 15,
        marginBottom: 15,
      })
    );
    legend.markerRectangles.template.adapters.add("fillGradient", function () {
      return undefined;
    });
    legend.data.setAll(series.dataItems);
  
    series.appear(1000, 100);
  }); // end am5.ready()