import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";

import { ApiNames, fetchJsonData } from "../../utils/dataFetchers";

import Modal from "../Modal";
import Table from "../Table";
import Profile from "./Profile";

function UsersList() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [filters, setFilters] = useState({ status: "" });
  const [subscriptionList, setSubscriptionList] = useState([]);

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();

  const fetchSubscribers = async () => {
    const subscriptionDetails = await fetchJsonData(ApiNames.Subscriptions);

    setSubscriptionList(subscriptionDetails.data);
  };

  const fetchUserList = async (status) => {
    const userList = await fetchJsonData(ApiNames.Users);

    let dateFormattedUserList = userList.data.map((user) => {
      return {
        ...user,
        join_date: new Date(user.join_date * 1000).toLocaleDateString(),
      };
    });

    if (status && status !== "") {
      dateFormattedUserList = dateFormattedUserList.filter(
        (user) => user.active === status
      );
    }

    setUsers(dateFormattedUserList);
  };

  useEffect(() => {
    fetchUserList();
    fetchSubscribers();
  }, []);

  useEffect(() => {
    fetchUserList(filters.status);
  }, [filters.status]);

  const handleSelectUser = (userDetails) => {
    setSelectedUser(() => {
      const userSubscription = subscriptionList.filter((subscription) => {
        return subscription.user_id === userDetails?.id?.toString();
      });

      return {
        ...userDetails,
        subscriptions: [...userSubscription],
      };
    });

    setIsProfileOpen(true);
  };

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("id", {
      header: "SN",
      enableSorting: false,
      cell: ({ row: { index } }) => {
        return index + 1;
      },
    }),
    columnHelper.accessor("first_name", {
      header: "Name",
      cell: ({ row: { original } }) => {
        return `${original.first_name} ${original.middle_name} ${original.last_name}`;
      },
    }),
    columnHelper.accessor("username", {
      header: "Username",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("join_date", {
      header: "Join Date",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("active", {
      header: "Status",
      cell: (info) => (info.getValue() === "1" ? "Active" : "Inactive"),
    }),
    columnHelper.display({
      header: "Actions",
      cell: ({ row }) => {
        return (
          <div
            className="actions"
            onClick={() => handleSelectUser(row.original)}
          >
            <AiFillEye size={18} />
          </div>
        );
      },
    }),
  ];

  return (
    <>
      <Table
        data={users}
        columns={columns}
        filters={filters}
        setFilters={setFilters}
      />
      {isProfileOpen && (
        <Modal handleClose={() => setIsProfileOpen(false)}>
          <Profile user={selectedUser} />
        </Modal>
      )}
    </>
  );
}

export default UsersList;
