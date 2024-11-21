import { Component, OnInit } from '@angular/core';
import {
  Chart,
  ChartDataset,
  ChartOptions,
  ChartType,
  registerables,
} from 'chart.js';
import { EmergenciaService } from '../../../services/emergencia.service';
import { BaseChartDirective } from 'ng2-charts';

Chart.register(...registerables);
@Component({
  selector: 'app-reporteemergencia',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reporteemergencia.component.html',
  styleUrl: './reporteemergencia.component.css',
})
export class ReporteemergenciaComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private eS: EmergenciaService) {}
  ngOnInit(): void {
    this.eS.getCantidad().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.nombreUser);
      this.barChartData = [
        {
          data: data.map((item) => item.QuantityEmergencias),
          label: 'Cantidad de emergencias',
          backgroundColor: ['#FF0000', '#ffac33', '#FF6347', '#FF7F50'],
          borderColor: 'rgba(173,216,230,1)',
          borderWidth: 1,
        },
      ];
    });
  }
}
