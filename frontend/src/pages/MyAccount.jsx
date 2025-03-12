import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const MyAccount = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        role: "", 
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const navigate = useNavigate();  // Hook for navigation
    const token = Cookies.get("token");

    useEffect(() => {
        if (!token) {
            navigate("/login"); // Redirect to login if no token
            return;
        }

        fetch("http://localhost:3002/api/profile", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.user) {
                    setUser(data.user);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Fetch error:", err);
                setError("Something went wrong.");
                setLoading(false);
            });
    }, [token, navigate]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        fetch("http://localhost:3002/api/update-profile", {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
        .then((res) => res.json())
        .then((data) => {
            setIsEditing(false);
        })
        .catch((err) => {
            console.error("Update error:", err);
            alert("Something went wrong.");
        });
    };

    const handleLogout = () => {
        Cookies.remove("token");  
        navigate("/login"); // Redirect to login after logout
    };

    return (
        <div className="container mt-4">
            <h1>My Account</h1>

            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">{error}</p>}

            {!loading && !error && (
                <div>
                    <div className="mb-3">
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            className="form-control"
                            value={user.username}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={user.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>

                    <div className="mb-3">
                        <label>First Name:</label>
                        <input
                            type="text"
                            name="firstName"
                            className="form-control"
                            value={user.firstName}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Last Name:</label>
                        <input
                            type="text"
                            name="lastName"
                            className="form-control"
                            value={user.lastName}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Phone Number:</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            className="form-control"
                            value={user.phoneNumber}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Role:</label>
                        <input
                            type="text"
                            name="role"
                            className="form-control"
                            value={user.role}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>

                    {isEditing ? (
                        <button className="btn btn-success me-2" onClick={handleSave}>
                            Save Changes
                        </button>
                    ) : (
                        <button className="btn btn-primary me-2" onClick={() => setIsEditing(true)}>
                            Edit Profile
                        </button>
                    )}

                    <button className="btn btn-danger" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default MyAccount;
