import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ApiNames, fetchJsonData } from "../../utils/dataFetchers";
import { removeDuplicates } from "../../utils/removeDuplicates";

// show total number of active and deactive users based on join date on continuos year

function LineGraph() {
  const [data, setData] = useState([]);

  const fetchUserList = async () => {
    const userList = await fetchJsonData(ApiNames.Users);

    const dateFormattedUserList = userList.data.map((user) => {
      return {
        ...user,
        join_date: new Date(user.join_date * 1000).toLocaleDateString(),
      };
    });

    const allYearsArr = dateFormattedUserList.map((user) =>
      user.join_date.substr(user.join_date.length - 4)
    );

    const filteredYearsArr = removeDuplicates(allYearsArr).sort();

    filteredYearsArr?.forEach((year) => {
      const yearUsers = dateFormattedUserList.filter((user) =>
        user.join_date.includes(year)
      );

      const activeUsers = yearUsers.filter((user) => user.active === "1");

      const inactiveUsers = yearUsers.filter((user) => user.active === "0");

      setData((prev) => [
        ...prev,
        {
          name: year,
          active: activeUsers.length,
          inactive: inactiveUsers.length,
        },
      ]);
    });
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  return (
    <ResponsiveContainer width='90%' height='80%'>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type='monotone'
          dataKey='active'
          stroke='#008000'
          activeDot={{ r: 8 }}
        />
        <Line type='monotone' dataKey='inactive' stroke='#ff0000' />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineGraph;
