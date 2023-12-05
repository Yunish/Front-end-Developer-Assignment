import React from "react";
import PieGraph from "../Charts/Piechart";
import Card from "./Card";
import LineGraph from "../Charts/LineChart";
import OverviewChart from "../Charts/OverviewChart";

function Overview() {
  return (
    <div className='overview'>
      <Card title='Overview'>
        <OverviewChart />
      </Card>
      <Card title='Active VS Inactive Users'>
        <LineGraph />
      </Card>
      <Card title='Subscription Plans'>
        <PieGraph />
      </Card>
    </div>
  );
}

export default Overview;
