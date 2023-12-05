import { useEffect, useState } from "react";
import { ApiNames, fetchJsonData } from "../../utils/dataFetchers";

import "./styles.css";

function OverviewChart() {
  const [activeUsersCount, setActiveUsersCount] = useState(0);
  const [inActiveUsersCount, setInActiveUsersCount] = useState(0);

  const fetchUserList = async () => {
    const userList = await fetchJsonData(ApiNames.Users);

    const activeUsers = userList.data.filter((user) => user.active === "1");
    const inactiveUsers = userList.data.filter((user) => user.active === "0");

    setActiveUsersCount(activeUsers.length);
    setInActiveUsersCount(inactiveUsers.length);
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  return (
    <div className='overview_chart'>
      <ul>
        <li className='active_users'>
          Total Active Users <span>{activeUsersCount}</span>
        </li>
        <li className='inactive_users'>
          Total Inactive Users <span>{inActiveUsersCount}</span>
        </li>
        <li className='users'>
          Total Users <span>{activeUsersCount + inActiveUsersCount}</span>
        </li>
      </ul>
    </div>
  );
}

export default OverviewChart;
