import { Component, OnInit } from '@angular/core';
import { Chart, ChartDataset, ChartOptions, ChartType, registerables } from 'chart.js';
import { register } from 'module';
import { BaseChartDirective } from 'ng2-charts';
import { EventosService } from '../../../services/eventos.service';
Chart.register(...registerables)
@Component({
  selector: 'app-reporte-confirmaron',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reporte-confirmaron.component.html',
  styleUrl: './reporte-confirmaron.component.css'
})
export class ReporteConfirmaronComponent implements OnInit{
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  //barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'polarArea';
  //barChartType: ChartType = 'pie';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private cs:EventosService){}
  ngOnInit(): void {
    this.cs.getCantidad().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.titulo);
      this.barChartData = [
        {
          data: data.map((item) => item.cantidad_confirmado),
          label: 'Cantidad de eventos confirmados',
          backgroundColor: [
            '#FF0000',
            '#FF4500',
            '#FF6347',
            '#FF7F50',
            '#CD5C5C',
            '#D2691E',
            '#B22222',
            '#800000',
          ],
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        },
      ];
    });
  }
}
