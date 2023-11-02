import Chart from 'chart.js/auto';
import { useRef, useEffect } from 'react';

export default function finance() {
  const estimatedCanvas = useRef(null);
  const actualCanvas = useRef(null);

  useEffect(() => {
    const estimatedCtx = estimatedCanvas.current;
    const actualCtx = actualCanvas.current;

    let chartStatus = Chart.getChart('myChart');
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }

    if (estimatedCtx !== null) {
      const chart = new Chart(estimatedCtx, {
        type: 'pie',
        data: {
          labels: ['Research Funding', 'Dev funding', 'Food', 'Merchandise', 'Other'],
          datasets: [
            {
              label: '% of Budget',
              data: [12, 19, 3, 2, 3],
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 05)',
                'rgba(255, 159, 64, 0.5)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: 'white',
              },
            },
            title: {
              display: true,
              text: 'Estimated Budget',
              color: 'white',
            },
          },
        },
      });
    }
    if (actualCtx !== null) {
      const chart = new Chart(actualCtx, {
        type: 'pie',
        data: {
          labels: ['Research Funding', 'Dev funding', 'Food', 'Merchandise', 'Other'],
          datasets: [
            {
              label: '% of Budget',
              data: [12, 19, 3, 2, 3],
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 05)',
                'rgba(255, 159, 64, 0.5)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: 'white',
              },
            },
            title: {
              display: true,
              text: 'Actual Budget',
              color: 'white',
            },
          },
        },
      });
    }
  }, []);

  return (
    <>
      <div className="pb-24"></div>
      <div className="container h-96 flex cols cols-2 pl-24">
        <canvas ref={estimatedCanvas}></canvas>
        <canvas ref={actualCanvas}></canvas>
      </div>
    </>
  );
}
