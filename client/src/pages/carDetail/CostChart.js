import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import '../../styles/costChart.css';

const CostChart = () => {
  const today = new Date();
  const formattedYear = today.getFullYear().toString().slice(-2);
  const formattedDate = `${formattedYear}년 ${
    today.getMonth() + 1
  }월 ${today.getDate()}일`;
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,

      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: formattedDate,
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  return (
    <div className="costChart">
      <div className="car_info_charging">충전요금</div>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <BarChart data={data} height={400}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* <Bar dataKey="pv" fill="#8884d8" /> */}
          <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default CostChart;