import './horizontal.css'
import { Bar } from 'react-chartjs-2';
function Horizontal({ chartData, text, title }) {



    return (
        <div className="flex-container">
            <div className="chart-container">
                <h2 style={{ textAlign: "center" }}>{title}</h2>
                <Bar
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
export default Horizontal;
