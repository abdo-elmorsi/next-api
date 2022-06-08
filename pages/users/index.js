import React, { useState } from "react";
function UsersPage({ users }) {
    console.log(users);
    const [user, setUser] = useState({});

    // const fetchUsers = async () => {
    //     setUsers([]);
    //     const response = await fetch("http://localhost:3000/api/users");
    //     const data = await response.json();
    //     setUsers(data);
    // };

    const submitUser = async () => {
        if (users.length) {
            console.log(JSON.stringify({ ...user, userId: users.length + 1 }));
            const response = await fetch("http://localhost:3000/api/users", {
                method: "POST",
                body: JSON.stringify({ ...user, userId: users.length + 1 }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            alert(data.message);
            fetchUsers();
        } else {
            alert("Plz load users first.");
        }
    };

    const deleteUser = async (userId) => {
        const response = await fetch(
            `http://localhost:3000/api/users/${userId}`,
            {
                method: "DELETE",
            }
        );
        const data = await response.json();
        alert(data.message);
        // fetchUsers();
    };
    return (
        <>
            <div
                style={{
                    marginTop: "10px",
                }}
            >
                <label htmlFor="user_name">User name</label>
                <input
                    id="user_name"
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
                <label htmlFor="user_age">User age</label>
                <input
                    id="user_age"
                    type="number"
                    value={user.age}
                    onChange={(e) => setUser({ ...user, age: e.target.value })}
                />
                <button onClick={() => submitUser()}>Submit user</button>
            </div>
            <hr />
            {/* <button onClick={fetchUsers}>Load users</button> */}
            {users?.map((user) => {
                return (
                    <div key={user.userId}>
                        {user.userId}: User name is {user.name} and (his / her)
                        age is {user.age}
                        <button onClick={() => deleteUser(user.userId)}>
                            Delete
                        </button>
                    </div>
                );
            })}
        </>
    );
}

export default UsersPage;

export async function getServerSideProps() {
    const response = await fetch("http://localhost:3000/api/users");
    const users = await response.json();
    return {
        props: { users },
    };
}
