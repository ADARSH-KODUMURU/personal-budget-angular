import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { DataService } from '../data.service';
@Component({
  selector: 'pb-d3js',
  templateUrl: './d3js.component.html',
  styleUrls: ['./d3js.component.scss']
})

export class D3jsComponent implements OnInit {


  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.fetchData().subscribe((res: any) =>{
    this.createPieChart(res);
    })
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
