import React from "react";
import "./styles.css";

function Profile({ user }) {
  console.log({ user });
  return (
    <>
      <h1 className='heading'>User Details</h1>
      <div className='profile'>
        <div className='profile_featured'>
          <div className='profile_img'>
            <img
              src={require("../../../assets/user.webp")}
              width={150}
              height={150}
              alt='User Avatar'
            />
          </div>
          <div className='detail_item'>
            <h3>
              {user?.first_name} {user?.middle_name} {user?.last_name}
            </h3>
            <h4>
              {user?.address}, {user?.country}
            </h4>
          </div>
        </div>
        <div>
          <div className='profile_details'>
            <div className='detail_item'>
              <h3>Username</h3>
              <span>{user?.username}</span>
            </div>
            <div className='detail_item'>
              <h3>Email</h3>
              <span>{user?.email}</span>
            </div>
            <div className='detail_item'>
              <h3>Joined Date</h3>
              <span>{user?.join_date}</span>
            </div>
            <div className='detail_item'>
              <h3>Status</h3>
              <span>{user?.status ? "Active" : "Inactive"}</span>
            </div>
          </div>
          {user?.subscriptions.length > 0 ? (
            <div className='user_subscriptions'>
              <h2 className='heading'>Subscriptions</h2>
              {user?.subscriptions.map((subscription) => (
                <div className='user_subscription' key={subscription.id}>
                  <div className='detail_item'>
                    <h3>Plan package</h3>
                    <span>{subscription?.package}</span>
                  </div>
                  <div className='detail_item' key={subscription.id}>
                    <h3>Expired time</h3>
                    <span>{subscription?.expires_on}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p className='no_subscription'>No subscriptions available.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
