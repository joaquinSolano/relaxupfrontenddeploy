import { Component, OnInit } from '@angular/core';
import {
  Chart,
  ChartDataset,
  ChartOptions,
  ChartType,
  registerables,
} from 'chart.js';
import { RutinaService } from '../../../services/rutina.service';
import { BaseChartDirective } from 'ng2-charts';

Chart.register(...registerables);
@Component({
  selector: 'app-reporterutina',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reporterutina.component.html',
  styleUrl: './reporterutina.component.css',
})
export class ReporterutinaComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'doughnut';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private rS: RutinaService) {}
  ngOnInit(): void {
    this.rS.getCantidad().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.nombre_tecnicas);
      this.barChartData = [
        {
          data: data.map((item) => item.cantidad_rutinas),
          label: 'Cantidad de rutinas',
          backgroundColor: ['#FF0000', '#ffac33', '#FF6347', '#FF7F50'],
          borderColor: 'rgba(173,216,230,1)',
          borderWidth: 1,
        },
      ];
    });
  }
}
