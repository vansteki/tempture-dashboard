$(function() {

  var appConfig = {
    label1: '',
    label2: ''
  };

  var options = {
    circleGrpTop: 15,
    circleGrpLeft: 15,
    circleR: 150,
    circleOffset: 100,
    nCircleEachLine: 2,
    needleWidth: 5,
    needleFill: "green",
    inBorderColor: "gray",
    inBorderWidth: 3,
    inFill: "white",
    outBorderColor: "gray",
    outBorderWidth: 3,
    outFill: "white",
    markFill: "black",
    labelFontSize: 14,
    labelColor: "black"
  };

  var racingClockPanel = function(options, data) {

    //clock
    var n = data.length;
    var nEachLine = options.nCircleEachLine;
    var r = options.circleR;
    var offset = options.circleOffset;
    var border_top = options.circleGrpTop;
    var border_left = options.circleGrpLeft;
    var inBorderColor = options.inBorderColor;
    var inBorderWidth = options.inBorderWidth;
    var inFill = options.inFill;
    var outBorderColor = options.outBorderColor;
    var outBorderWidth = options.outBorderWidth;
    var outFill = options.outFill;
    //needle
    var needleWidth = options.needleWidth;
    var needleFill = options.needleFill;
    //mark
    var markFill = options.markFill;
    //label
    var labelFontSize = options.labelFontSize;
    var labelColor = options.labelColor;

    var clock = d3.select("#clock")
      .append("svg")
      .attr("width", border_left + 2 * (r + offset) * nEachLine)
      .attr("height", border_top + 2 * (r + offset) * Math.floor(n / nEachLine));

    for (var i = 0; i < n; i++) {
      var circleX = border_left + r + 2 * (r + offset) * (i % nEachLine);
      var circleY = border_top + r + 2 * (r + offset) * Math.floor(i / nEachLine);
      //outcircle
      clock.append("circle")
        .style("stroke", outBorderColor)
        .style("stroke-width", outBorderWidth)
        .style("fill", inFill)
        .attr("r", r)
        .attr("cx", circleX)
        .attr("cy", circleY);

      //incircle
      clock.append("circle")
        .style("stroke", inBorderColor)
        .style("stroke-width", inBorderWidth)
        .style("fill", outFill)
        .attr("r", r - Math.floor(r / 10))
        .attr("cx", circleX)
        .attr("cy", circleY);

      //label
      clock.append("text").text(data[i].label)
        .attr("x", 2 * (r + offset) * (i % nEachLine) + ((2 * (r + offset) - data[i].label.length * labelFontSize) / 2))
        .attr("y", 2 * (r + offset) * (Math.floor(i / nEachLine) + 1))
        .attr("fill", labelColor)
        .style("font-size", labelFontSize + "px");

      //mark
      var max = (data[i].max < 9) ? 9 : data[i].max;
      for (var j = 0; j <= max; j += Math.floor(max / 9)) {
        clock.append("text").text(j)
          .attr("x", circleX - 15 + Math.cos(((j / max) * 3 + 1) * Math.PI / 2) * (r - Math.floor(r / 10) * 2))
          .attr("y", circleY + 5 + Math.sin(((j / max) * 3 + 1) * Math.PI / 2) * (r - Math.floor(r / 10) * 2))
          .attr("fill", markFill);
      }

      var needleX = circleX - needleWidth;
      var needleY = circleY;
      var needle = clock
        .append("svg")
        .append("path")
        .style("fill", needleFill)
        .attr('d', "M " + needleX + " " + needleY + " L " + (needleX + needleWidth) + " " + needleY + " L " + (needleX + needleWidth * 3 / 4) + " " + (needleY + r - 20) + " L " + (needleX + needleWidth * 1 / 4) + " " + (needleY + r - 20) + " z")
        .attr("x", (needleX + needleWidth / 2))
        .attr("y", needleY);
    }

    var count = 0;
    var needle_arr = d3.selectAll("path")[0];
    async.forEachSeries(needle_arr, function(val, callback) {
      var duraTime = Math.floor(Math.random() * 500 + 1500);
      var angle = (data[count].now / data[count].max * 270);
      count++;
      d3.select(val)
        .transition()
        .duration(duraTime)
        .attrTween("transform", function() {
        var left = parseInt(d3.select(val).attr("x"), 10);
        var top = parseInt(d3.select(val).attr("y"), 10);
        return d3.interpolateString("rotate(0, " + left + ", " + top + ")", "rotate(" + angle + ", " + left + ", " + top + ")");
      });
      setTimeout(function() {
        callback(null);
      }, 0);
    });

  };

  /* var data_set = [{
  max: 1260,
  now: 960,
  label: "溫度"
}, {
  max: 1500,
  now: 1499,
  label: "溼度"
}]; */

  var data_set = '';
  $("#status").change(function() {
    $('#clock').html(' ');
    var status = $(this).val();
    console.log(status);

    if (status == 1) {
      data_set = [{
          max: 30,
          now: 24,
          label: appConfig.label1
        }, {
          max: 100,
          now: 60,
          label: appConfig.label2
        }
      ];
      racingClockPanel(options, data_set);
    }

    if (status == 2) {
      data_set = [{
          max: 30,
          now: 24,
          label: appConfig.label1
        }, {
          max: 100,
          now: 70,
          label: appConfig.label2
        }
      ];
      racingClockPanel(options, data_set);
    }

    if (status == 3) {
      data_set = [{
          max: 30,
          now: 24,
          label: appConfig.label1
        }, {
          max: 100,
          now: 90,
          label: appConfig.label2
        }
      ];
      racingClockPanel(options, data_set);
    }

    if (status == 4) {
      data_set = [{
          max: 30,
          now: 27,
          label: appConfig.label1
        }, {
          max: 100,
          now: 50,
          label: appConfig.label2
        }
      ];
      racingClockPanel(options, data_set);
    }

    if (status == 5) {
      data_set = [{
          max: 30,
          now: 27,
          label: appConfig.label1
        }, {
          max: 100,
          now: 70,
          label: appConfig.label2
        }
      ];
      racingClockPanel(options, data_set);
    }

    if (status == 6) {
      data_set = [{
          max: 30,
          now: 27,
          label: appConfig.label1
        }, {
          max: 100,
          now: 90,
          label: appConfig.label2
        }
      ];
      racingClockPanel(options, data_set);
    }

    if (status == 7) {
      data_set = [{
          max: 30,
          now: 30,
          label: appConfig.label1
        }, {
          max: 100,
          now: 50,
          label: appConfig.label2
        }
      ];
      racingClockPanel(options, data_set);
    }

    if (status == 8) {
      data_set = [{
          max: 30,
          now: 30,
          label: appConfig.label1
        }, {
          max: 100,
          now: 70,
          label: appConfig.label2
        }
      ];
      racingClockPanel(options, data_set);
    }

    if (status == 9) {
      data_set = [{
          max: 30,
          now: 30,
          label: appConfig.label1
        }, {
          max: 100,
          now: 90,
          label: appConfig.label2
        }
      ];
      racingClockPanel(options, data_set);
    }

  });


});