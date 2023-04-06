import * as React from 'react';
import dayjs from 'dayjs';
import Paper from '@mui/material/Paper';
import {
    Chart,
    BarSeries,
    ValueAxis,
    ArgumentAxis,
    Tooltip,
    Title,
} from '@devexpress/dx-react-chart-material-ui';
import { scaleBand } from '@devexpress/dx-chart-core';
import { Animation } from '@devexpress/dx-react-chart';
import { ArgumentScale, Stack } from '@devexpress/dx-react-chart';
import { EventTracker } from '@devexpress/dx-react-chart';
import { Container } from '@mui/material';

export default function TransactionChart({ data }) {
    const chartData = data.map((item) => {
        item.month = dayjs().month(item._id - 1).format('MMMM');
        return item;
    })
    return (
        <Container >
            <Container>
                <Container>
                    <Paper sx={{ marginTop: 5, backgroundColor: 'rgb(240,255,252)',borderRadius:'20px' }}>
                        <Chart
                            data={chartData}
                        >
                            <ArgumentScale factory={scaleBand} />
                            <ArgumentAxis />
                            <ValueAxis />
                            <Title 
                                text='Transaction/Month'
                                position='top'
                            />
                            <BarSeries
                            valueField="totalExpenses"
                            argumentField="month"
                            />
                            <Animation />
                            <EventTracker />
                            <Tooltip />
                            <Stack />
                        </Chart>
                    </Paper>
                </Container>
            </Container> </Container>
    );
}
