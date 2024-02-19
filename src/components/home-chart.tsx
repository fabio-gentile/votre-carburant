'use client';

import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Legend, Tooltip, ChartOptions } from 'chart.js';
import { AverageFuel } from '@/types';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ArcElement, Legend, Tooltip, ChartDataLabels);

export const HomeChart = ({ averageFuel, totalCount }: { averageFuel: AverageFuel[]; totalCount: number }) => {
  const data = {
    labels: Array.from(averageFuel.map((fuel) => fuel.name_fuel)),
    datasets: [
      {
        label: 'Stations services recensées',
        data: Array.from(averageFuel.map((fuel) => fuel.count)),
        backgroundColor: ['#29C3BE', '#5D62B5', '#FFC533', '#BC95DF', '#62B58F', '#F2726F'],
        hoverOffset: 4,
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions = {
    maintainAspectRatio: true,
    layout: {
      padding: {
        top: -16,
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'hsla(240, 3.8%, 46.1%, 0.6)',
          font: { size: 14, weight: 'bold' },
          boxHeight: 18,
          boxWidth: 36,
          padding: 16,
        },
      },
      datalabels: {
        formatter: function (value) {
          const percentage = (value / totalCount) * 100;
          return `${Math.round(percentage * 100) / 100}%`;
        },
        color: '#ffffff',
        font: {
          size: 12,
        },
        display: function () {
          return window.screen.width > 700;
        },
      },
    },
  };

  return (
    <>
      <h2 className='secondary-title text-center'>{totalCount.toLocaleString('fr-FR')} stations services recensées</h2>
      <div className='relative mx-auto flex justify-center sm:h-[450px] sm:w-9/12 lg:h-[600px]'>
        <Doughnut
          data={data}
          // @ts-ignore plugin bug
          options={options}
        />
      </div>
    </>
  );
};
