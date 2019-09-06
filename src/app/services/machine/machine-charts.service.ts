import { Injectable, NgZone } from '@angular/core';

// For Amcharts
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { MachineApiService } from './machine-api.service';
import { debug } from 'util';

@Injectable({
  providedIn: 'root'
})
export class MachineChartsService {

  RPMGaugeChart: am4charts.GaugeChart;
  TempGaugeChart: am4charts.GaugeChart;
  EnergyLiveChart: am4charts.XYChart;

  constructor(public zone: NgZone,
    public machineApiService: MachineApiService) {
    am4core.options.commercialLicense = true;
  }

  destroyCharts() {

    if (this.RPMGaugeChart) {
      this.RPMGaugeChart.clearCache()
      this.RPMGaugeChart.dispose();
      this.RPMGaugeChart = null;
    }

  }

  rpmGaugeChart() {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("RPMGaugeChartID", am4charts.GaugeChart);
      chart.hiddenState.properties.opacity = 0;

      let axis = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
      axis.min = 0;
      axis.max = 150;
      axis.strictMinMax = true;
      axis.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor("background");
      axis.renderer.grid.template.strokeOpacity = 0.3;

      let colorSet = new am4core.ColorSet();

      let hand = chart.hands.push(new am4charts.ClockHand());

      setInterval(() => {
        hand.showValue(this.machineApiService.Machine_Live_Array.RPM, 1000, am4core.ease.cubicOut);
      }, 1000)

      chart.innerRadius = -20;

      setTimeout(() => {
        let range0 = axis.axisRanges.create();
        range0.value = 0;
        range0.endValue = 20;
        range0.axisFill.fillOpacity = 1;
        range0.axisFill.fill = am4core.color("#f47d42");
        range0.axisFill.zIndex = - 1;

        let range01 = axis.axisRanges.create();
        range01.value = 20;
        range01.endValue = 40;
        range01.axisFill.fillOpacity = 1;
        range01.axisFill.fill = am4core.color("#ffd456");
        range01.axisFill.zIndex = - 1;

        let range1 = axis.axisRanges.create();
        range1.value = 40;
        range1.endValue = 80;
        range1.axisFill.fillOpacity = 1;
        range1.axisFill.fill = am4core.color("#0ebc85");
        range1.axisFill.zIndex = -1;

        let range2 = axis.axisRanges.create();
        range2.value = 80;
        range2.endValue = 110;
        range2.axisFill.fillOpacity = 1;
        range2.axisFill.fill = am4core.color("#ffd456");
        range2.axisFill.zIndex = -1;

        let range21 = axis.axisRanges.create();
        range21.value = 110;
        range21.endValue = 150;
        range21.axisFill.fillOpacity = 1;
        range21.axisFill.fill = am4core.color("#dc6967");
        range21.axisFill.zIndex = -1;
      }, 2000);

    })
  }

  tempGaugeChart() {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("TempGaugeChartID", am4charts.GaugeChart);
      chart.hiddenState.properties.opacity = 0;

      let axis = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
      axis.min = 0;
      axis.max = 150;
      axis.strictMinMax = true;
      axis.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor("background");
      axis.renderer.grid.template.strokeOpacity = 0.3;

      let colorSet = new am4core.ColorSet();

      let hand = chart.hands.push(new am4charts.ClockHand());

      setInterval(() => {
        hand.showValue(this.machineApiService.Machine_Live_Array.Temp, 1000, am4core.ease.cubicOut);
      }, 1000)

      chart.innerRadius = -20;

      setTimeout(() => {

        let range10 = axis.axisRanges.create();
        range10.value = 0;
        range10.endValue = 20;
        range10.axisFill.fillOpacity = 1;
        range10.axisFill.fill = am4core.color("#dc6967");
        range10.axisFill.zIndex = - 1;

        let range08 = axis.axisRanges.create();
        range08.value = 20;
        range08.endValue = 40;
        range08.axisFill.fillOpacity = 1;
        range08.axisFill.fill = am4core.color("#f3ec98");
        range08.axisFill.zIndex = - 1;

        let range0 = axis.axisRanges.create();
        range0.value = 40;
        range0.endValue = 80;
        range0.axisFill.fillOpacity = 1;
        range0.axisFill.fill = am4core.color("#0ebc85");
        range0.axisFill.zIndex = - 1;

        // let range1 = axis.axisRanges.create();
        // range1.value = 70;
        // range1.endValue = 80;
        // range1.axisFill.fillOpacity = 1;
        // range1.axisFill.fill = am4core.color("#f3ec98");
        // range1.axisFill.zIndex = -1;

        let range2 = axis.axisRanges.create();
        range2.value = 80;
        range2.endValue = 150;
        range2.axisFill.fillOpacity = 1;
        range2.axisFill.fill = am4core.color("#dc6967");
        range2.axisFill.zIndex = -1;
      }, 2000);

    })
  }

  energyLiveChart() {
    this.zone.runOutsideAngular(() => {
      if (!this.EnergyLiveChart) {
        let chart = am4core.create("energyLiveChartID", am4charts.XYChart);
        chart.hiddenState.properties.opacity = 0;

        chart.padding(0, 0, 0, 0);

        chart.zoomOutButton.disabled = true;

        let data = [];
        let visits = 10;
        let i = 0;

        for (i = 0; i <= 30; i++) {
          visits -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
          data.push({ date: new Date().setSeconds(i - 30), value: visits });
        }

        chart.data = data;

        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;
        dateAxis.renderer.minGridDistance = 30;
        dateAxis.dateFormats.setKey("second", "ss");
        dateAxis.periodChangeDateFormats.setKey("second", "[bold]h:mm a");
        dateAxis.periodChangeDateFormats.setKey("minute", "[bold]h:mm a");
        dateAxis.periodChangeDateFormats.setKey("hour", "[bold]h:mm a");
        dateAxis.renderer.inside = true;
        dateAxis.renderer.axisFills.template.disabled = true;
        dateAxis.renderer.ticks.template.disabled = true;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.interpolationDuration = 500;
        valueAxis.rangeChangeDuration = 500;
        valueAxis.renderer.inside = true;
        valueAxis.renderer.minLabelPosition = 0.05;
        valueAxis.renderer.maxLabelPosition = 0.95;
        valueAxis.renderer.axisFills.template.disabled = true;
        valueAxis.renderer.ticks.template.disabled = true;

        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "value";
        series.interpolationDuration = 500;
        series.defaultState.transitionDuration = 0;
        series.tensionX = 0.8;

        series.stroke = am4core.color("#174793");

        series.fillOpacity = 1;
        let gradient = new am4core.LinearGradient();
        gradient.addColor(am4core.color("#174793"), 0.2);
        gradient.addColor(am4core.color("#174793"), 0);
        series.fill = gradient;

        chart.events.on("datavalidated", function () {
          dateAxis.zoom({ start: 1 / 15, end: 1.2 }, false, true);
        });

        dateAxis.interpolationDuration = 500;
        dateAxis.rangeChangeDuration = 500;

        // add data
        let interval;

        setInterval(() => {
          visits = visits + Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 5);
          let lastdataItem = series.dataItems.getIndex(series.dataItems.length - 1);
          chart.addData(
            { date: new Date(lastdataItem.dateX.getTime() + 1000), value: this.machineApiService.Machine_Live_Array.Energy_V1 },
            1
          );
        }, 1000)

        // this makes date axis labels to fade out
        dateAxis.renderer.labels.template.adapter.add("fillOpacity", function (fillOpacity, target) {
          let dataItem = target.dataItem;
          return dataItem.position;
        })

        // need to set this, otherwise fillOpacity is not changed and not set
        dateAxis.events.on("validated", function () {
          am4core.iter.each(dateAxis.renderer.labels.iterator(), function (label) {
            label.fillOpacity = label.fillOpacity;
          })
        })

        // bullet at the front of the line
        let bullet = series.createChild(am4charts.CircleBullet);
        bullet.circle.radius = 5;
        bullet.fillOpacity = 1;
        bullet.fill = am4core.color("#174793");
        bullet.isMeasured = false;

        series.events.on("validated", function () {
          bullet.moveTo(series.dataItems.last.point);
          bullet.validatePosition();
        });
      }
    })



  }

  rpmLiveChart() {
    this.zone.runOutsideAngular(() => {
      if (!this.EnergyLiveChart) {
        let chart = am4core.create("rpmLiveChartID", am4charts.XYChart);
        chart.hiddenState.properties.opacity = 0;

        chart.padding(0, 0, 0, 0);

        chart.zoomOutButton.disabled = true;

        let data = [];
        let visits = 10;
        let i = 0;

        for (i = 0; i <= 30; i++) {
          visits -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
          data.push({ date: new Date().setSeconds(i - 30), value: visits });
        }

        chart.data = data;

        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;
        dateAxis.renderer.minGridDistance = 30;
        dateAxis.dateFormats.setKey("second", "ss");
        dateAxis.periodChangeDateFormats.setKey("second", "[bold]h:mm a");
        dateAxis.periodChangeDateFormats.setKey("minute", "[bold]h:mm a");
        dateAxis.periodChangeDateFormats.setKey("hour", "[bold]h:mm a");
        dateAxis.renderer.inside = true;
        dateAxis.renderer.axisFills.template.disabled = true;
        dateAxis.renderer.ticks.template.disabled = true;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.interpolationDuration = 500;
        valueAxis.rangeChangeDuration = 500;
        valueAxis.renderer.inside = true;
        valueAxis.renderer.minLabelPosition = 0.05;
        valueAxis.renderer.maxLabelPosition = 0.95;
        valueAxis.renderer.axisFills.template.disabled = true;
        valueAxis.renderer.ticks.template.disabled = true;

        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "value";
        series.interpolationDuration = 500;
        series.defaultState.transitionDuration = 0;
        series.tensionX = 0.8;

        
        chart.events.on("datavalidated", function () {
          dateAxis.zoom({ start: 1 / 15, end: 1.2 }, false, true);
        });
        
        series.stroke = am4core.color("#c40101");
        series.fillOpacity = 1;
        let gradient = new am4core.LinearGradient();
        gradient.addColor(am4core.color("#c40101"), 0.2);
        gradient.addColor(am4core.color("#c40101"), 0);
        series.fill = gradient;

        chart.events.on("datavalidated", function () {
          dateAxis.zoom({ start: 1 / 15, end: 1.2 }, false, true);
        });

        dateAxis.interpolationDuration = 500;
        dateAxis.rangeChangeDuration = 500;

        // add data
        let interval;

        setInterval(() => {
          visits = visits + Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 5);
          let lastdataItem = series.dataItems.getIndex(series.dataItems.length - 1);
          chart.addData(
            { date: new Date(lastdataItem.dateX.getTime() + 1000), value: this.machineApiService.Machine_Live_Array.RPM },
            1
          );
        }, 1000)

        // this makes date axis labels to fade out
        dateAxis.renderer.labels.template.adapter.add("fillOpacity", function (fillOpacity, target) {
          let dataItem = target.dataItem;
          return dataItem.position;
        })

        // need to set this, otherwise fillOpacity is not changed and not set
        dateAxis.events.on("validated", function () {
          am4core.iter.each(dateAxis.renderer.labels.iterator(), function (label) {
            label.fillOpacity = label.fillOpacity;
          })
        })

        // bullet at the front of the line
        let bullet = series.createChild(am4charts.CircleBullet);
        bullet.circle.radius = 5;
        bullet.fillOpacity = 1;
        bullet.fill = am4core.color("#c40101");
        bullet.isMeasured = false;

        series.events.on("validated", function () {
          bullet.moveTo(series.dataItems.last.point);
          bullet.validatePosition();
        });
      }
    })

  }

}
