import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { UsuarioRutinaService } from '../../../services/usuario-rutina.service';

@Component({
  selector: 'app-reporte-progreso',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reporte-progreso.component.html',
  styleUrl: './reporte-progreso.component.css'
})
export class ReporteProgresoComponent {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: String[] = [];
  //barChartType: ChartType = 'pie';
  //barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  //barChartType: ChartType = 'bar';
  barChartType: ChartType = 'polarArea';

  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private usr: UsuarioRutinaService) {}

  ngOnInit(): void {
    this.usr.getprogreso().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.nombreusuario);
      this.barChartData = [
        {
          data: data.map((item) => item.progreso),
          label: 'Progreso',
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
