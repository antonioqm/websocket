
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import * as echarts from 'echarts';
import { ECharts } from 'echarts';
import { Observable, Subscription } from 'rxjs';
import { WebSocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class ChartComponent implements OnInit, OnDestroy {
  public subscription!: Subscription;
  public chart!: ECharts;
  public prices: number[] = [];
  public times: string[] = [];
  public connectionStatus$:  Observable<boolean> = this.wsService.getConnectionStatus();

  constructor(private wsService: WebSocketService) {}

  ngOnInit() {
    this.subscription = this.wsService.getMessages().subscribe((message: any[]) => {
      if (message && message.length > 0) {
        const trade = message[0];
        this.addData(new Date(trade.T).toLocaleTimeString(), trade.p);
      }
    });

    this.initializeChart();

    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeMediaQuery.addEventListener('change', () => this.updateChartTheme());
    this.updateChartTheme();
  }

  get hasMessage(): boolean{
    return this.prices.length > 0;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  initializeChart() {
    this.chart = echarts.init(
      document.getElementById('chart') as HTMLDivElement,
      'null',
      { renderer: 'svg'}

    );
    this.chart.setOption(this.getChartOptions() as any);
  }

  getChartOptions(): echarts.EChartsOption {
    const tooltipBg = this.getThemeColor('--chart-tooltip-bg');
    const textColor = this.getThemeColor('--chart-text-color');
    const lineColor = this.getThemeColor('--chart-line-color');

    return {
      title: {
        text: 'Gráfico'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: tooltipBg
          }
        }
      },
      xAxis: {
        type: 'category',
        data: this.times,
        axisLabel: {
          color: textColor
        }
      },
      yAxis: {
        type: 'value',
        scale: true,
        boundaryGap: ['20%', '20%'],
        axisLabel: {
          color: textColor
        }
      },
      series: [{
        data: this.prices,
        type: 'line',
        smooth: true,
        lineStyle: {
          color: lineColor,
          width: 2
        },
        itemStyle: {
          color: lineColor
        }
      }]
    } as echarts.EChartsOption;
  }

  addData(time: string, price: number) {
    this.times.push(time);
    this.prices.push(price);
    this.chart?.setOption({
      xAxis: {
        data: this.times
      },
      series: [{
        data: this.prices
      }]
    });
  }

  updateChartTheme() {
    if (this.chart) {
      const tooltipBg = this.getThemeColor('--chart-tooltip-bg');
      const textColor = this.getThemeColor('--chart-text-color');
      const lineColor = this.getThemeColor('--chart-line-color');

      this.chart.setOption({
        tooltip: {
          axisPointer: {
            label: {
              backgroundColor: tooltipBg
            }
          }
        },
        xAxis: {
          axisLabel: {
            color: textColor
          }
        },
        yAxis: {
          axisLabel: {
            color: textColor
          }
        },
        series: [{
          lineStyle: {
            color: lineColor
          },
          itemStyle: {
            color: lineColor
          }
        }]
      });
    }
  }

  getThemeColor(cssVar: string): string {
    return getComputedStyle(document.documentElement).getPropertyValue(cssVar);
  }
}
