import * as echarts from 'echarts/core'

import {
  BarChart,
  LineChart,
  MapChart,
  PictorialBarChart,
  PieChart,
  RadarChart,
} from 'echarts/charts'

import {
  AriaComponent,
  GridComponent,
  LegendComponent,
  ParallelComponent,
  PolarComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components'

import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PolarComponent,
  AriaComponent,
  ParallelComponent,
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  CanvasRenderer,
  PictorialBarChart,
  RadarChart,
])

export default echarts
