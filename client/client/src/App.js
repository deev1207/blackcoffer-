import './App.css';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import * as Utils from './utils/utils';
import Horizontal from './Components/HorizontalBar/horizontalbar';
import { useEffect, useRef, useState } from 'react';
import Box from './Components/box/Box';
import cloneDeep from 'lodash/cloneDeep';
import axios from "axios";
import PieChart from './Components/Pie/PieChart';
Chart.register(CategoryScale);

function App() {
  const [chartDataIntensity, setChartDataIntensity] = useState();
  const [chartDataLikelihood, setChartDataLikelihood] = useState();
  const [chartDataSector, setChartDataSector] = useState();
  const intensity_ref = useRef()
  const likelihood_ref = useRef()
  const sector_ref = useRef()
  const country_ref = useRef()
  const sector = useRef()
  useEffect(() => {
    async function fetchData() {
      intensity_ref.current = await axios.get('http://localhost:8000/intensity')
      likelihood_ref.current = await axios.get('http://localhost:8000/likelihood')
      sector_ref.current = await axios.get('http://localhost:8000/sector')

      setChartDataIntensity({
        labels: intensity_ref.current.data.map((item) => item.country),
        datasets: [
          {
            label: 'intensity',
            data: intensity_ref.current.data.map((item) => item.totalIntensity),
            borderColor: Utils.CHART_COLORS.red,
            backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
          }

        ]
      })
      setChartDataLikelihood({
        labels: likelihood_ref.current.data.map((item) => item.country),
        datasets: [
          {
            label: 'Likelihood',
            data: likelihood_ref.current.data.map((item) => item.totalLikelihood),
            borderColor: Utils.CHART_COLORS.red,
            backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
          }

        ]
      })

      setChartDataSector({
        labels: sector_ref.current.data.map((item) => item.sector),
        datasets: [
          {
            label: 'Sector',
            data: sector_ref.current.data.map((item) => item.count),
            borderColor: Utils.CHART_COLORS.red,
            backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
          }

        ]
      })

      country_ref.current = intensity_ref.current.data.map((item) => item.country)
      sector.current = sector_ref.current.data.map((item) => item.sector)

    }
    fetchData()

  }, [])



  function onFiltersChange(val) {
    if (!val) {

      setChartDataIntensity(prev => {
        const new_chart = cloneDeep(prev); // Deep copy of previous state
        new_chart.labels = intensity_ref.current.data.map((item) => item.country); // Updating labels
        new_chart.datasets[0].data = intensity_ref.current.data.map((item) => item.totalIntensity); // Updating data
        return new_chart; // Returning new state
      });

      setChartDataLikelihood(prev => {
        const new_chart = cloneDeep(prev); // Deep copy of previous state
        new_chart.labels = likelihood_ref.current.data.map((item) => item.country); // Updating labels
        new_chart.datasets[0].data = likelihood_ref.current.data.map((item) => item.totalLikelihood); // Updating data
        return new_chart; // Returning new state
      });




    }
    else {
      const new_intensity_data = intensity_ref.current.data.filter((item) => {
        return item.country === val
      })

      const new_likelihood_data = likelihood_ref.current.data.filter((item) => {
        return item.country === val
      })




      setChartDataIntensity(prev => {
        const new_chart = cloneDeep(prev); // Deep copy of previous state
        new_chart.labels = new_intensity_data.map((item) => item.country); // Updating labels
        new_chart.datasets[0].data = new_intensity_data.map((item) => item.totalIntensity); // Updating data
        return new_chart; // Returning new state
      });

      setChartDataLikelihood(prev => {
        const new_chart = cloneDeep(prev); // Deep copy of previous state
        new_chart.labels = new_likelihood_data.map((item) => item.country); // Updating labels
        new_chart.datasets[0].data = new_likelihood_data.map((item) => item.totalLikelihood); // Updating data
        return new_chart; // Returning new state
      });
    }

  }

  function handleSectorFilter(val) {
    if (!val) {

      setChartDataSector(prev => {
        const new_chart = cloneDeep(prev); // Deep copy of previous state
        new_chart.labels = sector_ref.current.data.map((item) => item.sector); // Updating labels
        new_chart.datasets[0].data = sector_ref.current.data.map((item) => item.count); // Updating data
        return new_chart; // Returning new state
      });


    }
    else {

      const new_sector_data = sector_ref.current.data.filter((item) => {
        return item.sector === val
      })




      setChartDataSector(prev => {
        const new_chart = cloneDeep(prev); // Deep copy of previous state
        new_chart.labels = new_sector_data.map((item) => item.sector); // Updating labels
        new_chart.datasets[0].data = new_sector_data.map((item) => item.count); // Updating data
        return new_chart; // Returning new state
      });

    }

  }


  return (
    <>
      <div className='filter-container'>
        {country_ref.current && <Box onFiltersChange={onFiltersChange} filter_name='Country' data={country_ref.current} />}
        {sector.current && <Box onFiltersChange={handleSectorFilter} filter_name='Sector' data={sector.current} />}
      </div>


      {chartDataIntensity && <Horizontal chartData={chartDataIntensity} text={'Intensity Aggregate By Country'} title={'Intensity'} />}
      {chartDataLikelihood && <Horizontal chartData={chartDataLikelihood} text={'Likelihood Aggregate By Country'} title={'Likelihood'} />}


      {chartDataSector && <PieChart chartData={chartDataSector} text={'Sector Count'} title={'Sector Trends'} />}

    </>
  );
}

export default App;
