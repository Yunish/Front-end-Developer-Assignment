import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { ApiNames, fetchJsonData } from "../../utils/dataFetchers";
import { removeDuplicates } from "../../utils/removeDuplicates";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// show number of users of different subscription plans

function PieGraph() {
  const [data, setData] = useState([]);

  const fetchSubscribers = async () => {
    const subscriptionDetails = await fetchJsonData(ApiNames.Subscriptions);

    const totalSubscriptionPlans = removeDuplicates(
      subscriptionDetails.data?.map((subs) => subs.package)
    ).sort();

    totalSubscriptionPlans.forEach((plan) => {
      const plans = subscriptionDetails.data.filter(
        (subs) => subs.package === plan
      );

      setData((prev) => [...prev, { name: plan, value: plans.length }]);
    });
  };

  let renderLabel = function (entry) {
    return `${entry.name} - ${entry.value} `;
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  return (
    <ResponsiveContainer width='90%' height='80%'>
      <PieChart>
        <Pie
          data={data}
          innerRadius={60}
          outerRadius={80}
          fill='#8884d8'
          paddingAngle={5}
          dataKey='value'
          label={renderLabel}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default PieGraph;
