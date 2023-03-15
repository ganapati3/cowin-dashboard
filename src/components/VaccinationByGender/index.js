import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

const VaccinationByGender = props => {
  const {vaccinationDataByGender} = props
  console.log(vaccinationDataByGender)

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          cx="50%"
          cy="40%"
          data={vaccinationDataByGender}
          startAngle={180}
          endAngle={0}
          innerRadius="40%"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="Male" fill="#f54394" />
          <Cell name="Female" fill="#2d87bb" />
          <Cell name="Others" fill="#2cc6c6" />
        </Pie>
        <Legend
          align="center"
          iconType="circle"
          layout="vertical"
          verticalAlign="middle"
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default VaccinationByGender
