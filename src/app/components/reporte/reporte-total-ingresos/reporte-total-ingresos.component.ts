import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { PlanesService } from '../../../services/planes.service';

Chart.register(...registerables);
@Component({
  selector: 'app-reporte-total-ingresos',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reporte-total-ingresos.component.html',
  styleUrl: './reporte-total-ingresos.component.css'
})
export class ReporteTotalIngresosComponent implements OnInit{
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'doughnut';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private cS: PlanesService) {}
  ngOnInit(): void {
    this.cS.getSuma().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.nombre_plan);
      this.barChartData = [
        {
          data: data.map((item) => item.total_ingresos),
          label: 'Ingresos',
          backgroundColor: ['#FF0000', '#ffac33', '#FF6347', '#FF7F50'],
          borderColor:'rgba(173,216,230,1)',
          borderWidth:1
        },
      ];
    });
  }
}