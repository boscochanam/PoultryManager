"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface BarGraphProps {
  graphData: Array<{
    date: string
    [key: string]: string | number
  }>
  
  xKey: string
  yKeys: string[]
  labels?: { [key: string]: string }
  title?: string
  description?: string
  height?: number
  dateFormat?: Intl.DateTimeFormatOptions
  tooltipWidth?: number
  className?: string
}

export function BarGraph({ 
  graphData, 
  xKey, 
  yKeys, 
  labels = {}, 
  title = "Bar Chart", 
  description = "Showing total values over time",
  height = 250,
  dateFormat = { month: "short", day: "numeric" },
  tooltipWidth = 150,
  className
}: BarGraphProps) {
  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {
      views: { label: "Values" }
    }
    yKeys.forEach((key, index) => {
      config[key] = {
        label: labels[key] || key,
        color: `hsl(var(--chart-${index + 1}))`
      }
    })
    return config
  }, [yKeys, labels])

  const [activeChart, setActiveChart] = React.useState<string>(yKeys[0])

  const total = React.useMemo(
    () => {
      const totals: { [key: string]: number } = {}
      yKeys.forEach(key => {
        totals[key] = graphData.reduce((acc, curr) => acc + (Number(curr[key]) || 0), 0)
      })
      return totals
    },
    [graphData, yKeys]
  )

  return (
    <Card className={className}>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {description}
          </CardDescription>
        </div>
        <div className="flex">
          {yKeys.map((key) => (
            <button
              key={key}
              data-active={activeChart === key}
              className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              onClick={() => setActiveChart(key)}
            >
              <span className="text-xs text-muted-foreground">
                {chartConfig[key].label}
              </span>
              <span className="text-lg font-bold leading-none sm:text-3xl">
              ₹{total[key].toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className={`aspect-auto w-full`}
          style={{ height: `${height}px` }}
        >
          <BarChart
            accessibilityLayer
            data={graphData}
            margin={{
              left: 0, 
              right: 0,
              top: 10
            }}
          >
            <CartesianGrid vertical={false} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₹${value}`}
              width={40}
            />
            <XAxis
              dataKey={xKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", dateFormat)
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className={`w-[${tooltipWidth}px]`}
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      ...dateFormat,
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
