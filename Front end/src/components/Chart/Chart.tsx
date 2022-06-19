import {useState} from 'react'
import { BarChart, Bar, ResponsiveContainer, Cell } from "recharts";
import styles from "../../pages/Dashboard/Dashboard.module.scss"

interface Sale {
    month: string,
    totalSale: number,
}
interface ChartProps {
    title?: String,
    data: Sale[],
}

const Chart = ({data, title}: ChartProps) => {
    const [activeIndex, setActiveIndex] = useState<Number>(0);

    const onMouseOver = (data: any, index: number):void => setActiveIndex(index);
    return (
    <>      
            {title && <p className={styles.dateRange}>{title}</p>}
            <ResponsiveContainer width="100%" height="9%">
              <BarChart data={data}>
                <Bar
                  dataKey="totalSale"
                  fill="rgba(21, 122, 255, .2)"
                  onMouseOver={onMouseOver}
                >
                  {data.map((entry, index) => (
                    <Cell
                      cursor="pointer"
                      fill={
                        index === activeIndex
                          ? "rgb(21, 122, 255)"
                          : "rgba(21, 122, 255, .2)"
                      }
                      key={index}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
    </>
  )
}

export default Chart