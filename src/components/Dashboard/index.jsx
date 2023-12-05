import Overview from "../Overview";
import UsersList from "../Users/users.list";

function Dashboard() {
  return (
    <>
      <h1 className="heading">DASHBOARD</h1>
      <Overview />
      <UsersList />
    </>
  );
}

export default Dashboard;
