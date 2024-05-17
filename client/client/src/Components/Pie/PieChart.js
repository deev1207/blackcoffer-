import './pie.css'
import { Pie } from 'react-chartjs-2';
function PieChart({ chartData, text, title }) {

    return (
        <div className="flex-container-pie">
            <div className="chart-container-pie">
                <h2 style={{ textAlign: "center" }}>{title}</h2>
                <Pie
                    data={chartData}
                    height={"75%"}
                    options={{

                        indexAxis: 'y',
                        plugins: {
                            title: {
                                display: true,
                                text: text
                            }
                        },

                    }}
                />
            </div>
        </div>

    );
}
export default PieChart;
