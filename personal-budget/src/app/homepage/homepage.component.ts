import { AfterViewInit, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';
import * as d3 from 'd3';
import { DataService } from '../data.service';
@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements AfterViewInit {
  public dataSource: any = {
    datasets: [
      {
        data: [],
        backgroundColor: ['#ffcd56', '#ff6384', '#36a2eb', '#fd6b19'],
      },
    ],
    labels: [],
  };

  private color: d3.ScaleOrdinal<string, string>; // Explicitly type color

  constructor(private dataService: DataService)  {
    this.color = d3.scaleOrdinal<string, string>() // Explicitly specify the types
      .domain(["Eat out", "Rent", "Grocery", "Transportation", "Entertainment", "Utilities", "Insurance"])
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
  }

  ngAfterViewInit(): void {
    this.dataService.fetchData().subscribe((res: any) =>  {
      console.log(res);
      for (let i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
      }
      this.createChart();
    });
  }

  createChart() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    const myPieChart = new Chart(ctx, {
      type: 'pie',
      data: this.dataSource,
    });
  }

  createPieChart(data:any) {
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select('#pie-chart-container')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal().domain(data.map((d:any) => d.label)).range(d3.schemeSet2);

    const pie = d3.pie().value((d:any) => d.value);

    const path = d3.arc().outerRadius(radius - 10).innerRadius(0);

    const label = d3
      .arc()
      .outerRadius(radius)
      .innerRadius(radius - 80);


      const arcs = svg
  .selectAll('.arc')
  .data(pie(data.map((d: any) => d.value)))
  .enter()
  .append('g')
  .attr('class', 'arc');

  arcs
  .append('path')
  .attr('d', (d: any) => path(d) as string) // Cast the result of path(d) to a string
  .attr('fill', (d: any) => color(d.data.label) as string)
  .attr('stroke', 'white')
  .style('stroke-width', '2px');



    arcs
      .append('text')
      .attr('transform', (d:any) => `translate(${label.centroid(d)})`)
      .attr('dy', '0.35em')
      .text((d:any) => d.data.label);

  }
  }

