<template>
  <div class="warp">
    <div class="chartList center">
      <div id="from" class="chartBox"></div>
      <div id="chart" class="chartBox"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {};
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      let myChart = echarts.init(document.getElementById("from"));
      // console.log(document.getElementById('from'))
      let option = {
        title: {
          text: "订单数量折线图"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["订单总数", "当月订单数"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        // toolbox: {
        //     feature: {
        //         saveAsImage: {}
        //     }
        // },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["八月", "九月", "十月", "十一月", "十二月", "一月"]
        },
        yAxis: {
          type: "value",
          name: "数量"
        },
        series: [
          {
            name: "订单总数",
            type: "line",
            // stack: '总量',
            data: [5, 10, 15, 20, 25, 30]
          },
          {
            name: "当月订单数",
            type: "line",
            // stack: '总量',
            data: [5, 5, 5, 5, 5, 5]
          }
        ]
      };
      this.$nextTick(_ => {
        myChart.setOption(option);
      });

      let chart = echarts.init(document.getElementById("chart"));
      let chartOption = {
        title: {
          text: "订单收入图"
        },
        legend: {},
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        dataset: {
          source: [
            ["money", "收款", "付款"],
            ["八月", 43.3, 85.8],
            ["九月", 83.1, 73.4],
            ["十月", 86.4, 65.2],
            ["十一月", 72.4, 53.9],
            ["十二月", 100.4, 53.9],
            ["一月", 500.4, 53.9]
            // ['money', '收款', '付款'],
            // ['Matcha Latte', 43.3, 85.8],
            // ['Milk Tea', 83.1, 73.4],
            // ['Cheese Cocoa', 86.4, 65.2],
            // ['Walnut Brownie', 72.4, 53.9]
          ]
        },
        xAxis: { type: "category" },
        yAxis: {
          name: "元"
        },
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: "bar" }, { type: "bar" }]
      };
      this.$nextTick(_ => {
        chart.setOption(chartOption);
      });
      //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      window.addEventListener("resize", function() {
        myChart.resize();
        // chart.resize()
      });
    }
  }
};
</script>

<style scoped="scoped" lang="scss">
.chartBox {
  min-width: 450px;
  height: 400px;
  margin: 0 20px;
}
</style>
