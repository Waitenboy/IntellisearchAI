import React, { useEffect, useState } from "react";


const Profile = () => {
    const [searchHistory, setSearchHistory] = useState([]);
    const [searchCount, setSearchCount] = useState(0);
    const [quizCount, setQuizCount] = useState(0);
    const userId = localStorage.getItem("userId");
    console.log("🟢 Stored userId:", userId);

    const [user, setUser] = useState(null);
    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log("🔵 Sending Token:", token); // Debugging line

            if (!token) {
                console.error("❌ No token found in localStorage!");
                return;
            }
            const response = await fetch("http://localhost:5000/profile", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            const data = await response.json();
            if (response.ok) {
                setUser(data);  // ✅ Store user data (username & email)
            } else {
                console.error("Error fetching profile:", data.error);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    

    useEffect(() => {
        if (!userId) return;

        fetchProfile();

        fetch(`http://localhost:5000/api/user/${userId}/history`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        .then(res => {
            if (!res.ok) throw new Error(`Server error: ${res.status}`);
            return res.json();
        })
        .then(data => {
            console.log("✅ Fetched history:", data);
            setSearchHistory(data.searchHistory || []);
            setSearchCount(data.searchCount || 0);
            setQuizCount(data.quizCount || 0);
        })
        .catch(err => console.error("Error fetching history:", err));
    }, [userId]);
    
    

    const clearHistory = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/user/${userId}/clear-history`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });

            if (!res.ok) throw new Error("Failed to clear history");

            setSearchHistory([]);
            setSearchCount(0);
            setQuizCount(0);
        } catch (err) {
            console.error("Error clearing history:", err);
        }
    };

    // 🏅 Determine Badge & Award Message
    let badge = null;
    let awardMessage = "";

    console.log("🔎 Search Count:", searchCount);
    console.log("📜 Quiz Count:", quizCount);


    if (searchCount >= 30 && quizCount >= 15) {
        console.log("🏆 Assigning Gold Badge");
    } else if (searchCount >= 20 && quizCount >= 10) {
        console.log("🥈 Assigning Silver Badge");
    } else if (searchCount >= 10 && quizCount >= 5) {
        console.log("🥉 Assigning Bronze Badge");
    } else {
        console.log("No Badge Yet");
    }

    const getSearchBadgeMessage = () => {
        if (searchCount >=15) return "🏆 Gold Search Badge! You made more than 15 searches!";
        if (searchCount >= 10) return "🥈 Silver Search Badge! You made more than 10 searches";
        if (searchCount >= 5) return "🥉 Bronze Search Badge! You made more than 5 searches";
        return null;
    };
    
    const getQuizBadgeMessage = () => {
        if (quizCount >= 15) return "🏆 Gold Quiz Badge! You solved more than 15 quizzes!";
        if (quizCount >= 10) return "🥈 Silver Quiz Badge! You solved more than 10 quizzes!";
        if (quizCount >= 5) return "🥉 Bronze Quiz Badge! You solved more than 5 quizzes!";
        return null;
    };
    
    const searchBadgeMessage = getSearchBadgeMessage();
    const quizBadgeMessage = getQuizBadgeMessage();
    
    
    

    return (
        <div style={styles.container}>
        {/* Header Section */}
        <div style={styles.header}>
            <h2 style={styles.headerText}>
                {user ? `Welcome ${user.username}!` : "Loading..."}
                {badge && <img src={badge} alt="Badge" style={styles.badge} />}
            </h2>
        </div>
    
        {/* Page Layout: Left (Profile & Stats) | Right (Search History) */}
        <div style={styles.statsContainer}>
            
            {/* Left Section: Profile & Stats */}
            <div style={styles.leftSection}>
                
                {/* User Details */}
                {user ? (
                    <div style={styles.userDetails}>
                        <div style={styles.detailsRow}>
                            <p style={styles.label}><strong>Username:</strong></p>
                            <p style={styles.value}>{user.username}</p>
                        </div>
                        <div style={styles.detailsRow}>
                            <p style={styles.label}><strong>Email:</strong></p>
                            <p style={styles.value}>{user.email}</p>
                        </div>
                    </div>
                ) : (
                    <p style={styles.loadingText}>Loading user details...</p>
                )}
    
                {/* Award Message */}
                {awardMessage && <p style={styles.awardMessage}>{awardMessage}</p>}
    
                {/* Stats Section */}
                <div style={styles.statsBox}>
                    <div style={styles.card}>
                        <h3 style={styles.statTitle}>Total Searches</h3>
                        <p style={styles.statValue}>{searchCount}</p>
                        {searchBadgeMessage && <p style={styles.awardMessage}>{searchBadgeMessage}</p>}
                    </div>
    
                    <div style={styles.card}>
                        <h3 style={styles.statTitle}>Total Quizzes Submitted</h3>
                        <p style={styles.statValue}>{quizCount}</p>
                        {quizBadgeMessage && <p style={styles.awardMessage}>{quizBadgeMessage}</p>}
                    </div>
                </div>
            </div>
    
            {/* Right Section: Search History */}
            <div style={styles.rightSection}>
                <h3 style={styles.historyTitle}>📜 Search History</h3>

                {searchHistory.length > 0 ? (
                    <ul style={styles.historyList}>
                        {searchHistory.map((query, index) => (
                            <li key={index} style={styles.historyItem}>{query}</li>
                        ))}
                    </ul>
                ) : (
                    <p style={styles.noHistory}>🔍 No search history found.</p>
                )}

                {/* Clear History Button */}
                {searchHistory.length > 0 && (
                    <button onClick={clearHistory} style={styles.clearButton}>
                        🗑️ Clear History
                    </button>
                )}
            </div>

        </div>
    </div>
    
    
    );
};


const styles = {
    rightSection: {
        backgroundColor: "#f9f9f9",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        maxWidth: "400px",
        textAlign: "center",
        margin: "auto",
    },
    historyTitle: {
        fontSize: "22px",
        fontWeight: "bold",
        marginBottom: "12px",
        color: "#333",
    },
    historyList: {
        listStyleType: "none",
        padding: "0",
    },
    historyItem: {
        backgroundColor: "#fff",
        padding: "10px",
        margin: "8px 0",
        borderRadius: "8px",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        fontSize: "16px",
        fontWeight: "500",
        transition: "background 0.3s ease",
        cursor: "pointer",
    },
    noHistory: {
        fontSize: "16px",
        fontStyle: "italic",
        color: "#777",
    },
    clearButton: {
        backgroundColor: "rgb(210, 84, 84)",
        color: "white",
        border: "none",
        padding: "10px 15px",
        borderRadius: "8px",
        cursor: "pointer",
        marginTop: "15px",
        fontSize: "14px",
        fontWeight: "bold",
        transition: "background 0.3s ease",
    },


    container: {
        maxWidth: "1200px",
        margin: "0 auto",
        paddingTop: "80px", // Adjusted to avoid hiding the header
        fontFamily: "monospace",
    },
    
    header: {
        width: "100vw",
        backgroundColor: "rgb(206, 101, 101)",
        color: "white",
        padding: "20px 20px", // Adjusted padding for better spacing
        textAlign: "left",
        fontSize: "28px",
        fontWeight: "bold",
        position: "fixed",
        top: "50px",
        left: "0",
        zIndex: "1000",
        height: "100px",
        display: "flex", // Use flexbox
        alignItems: "flex-end", // Center text vertically
    },
    
    // Add padding below this section
    contentWrapper: {
        paddingTop: "120px", // Ensure content below the header has space
    },
    
    statsContainer: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "20px",
        gap: "100px",
    },
    leftSection: {
        flex: "1",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    userDetails: {
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        maxWidth: "400px",
    },
    detailsRow: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "10px",
        fontSize: "16px",
    },
    label: {
        fontWeight: "bold",
        color: "#333",
    },
    value: {
        fontStyle: "italic",
        color: "#555",
    },
    statsBox: {
        backgroundColor: "#f1f1f1",
        padding: "15px",
        borderRadius: "8px",
        textAlign: "center",
        fontSize: "18px",
        fontWeight: "bold",
    },
    card: {
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
    },
    statTitle: {
        fontSize: "18px",
        fontWeight: "bold",
        marginBottom: "5px",
    },
    statValue: {
        fontSize: "24px",
        fontWeight: "bold",
        color: "#333",
    },
    // rightSection: {
    //     flex: "1",
    //     textAlign: "left",
    // },
    // historyTitle: {
    //     fontSize: "22px",
    //     fontWeight: "bold",
    //     marginBottom: "10px",
    // },
    // historyList: {
    //     listStyleType: "none",
    //     padding: 0,
    // },
    // historyItem: {
    //     padding: "10px 0",
    //     fontSize: "18px",
    //     borderBottom: "1px solid #ccc",
    // },
    // noHistory: {
    //     fontSize: "18px",
    //     color: "#777",
    // },
    // clearButton: {
    //     marginTop: "20px",
    //     padding: "10px 15px",
    //     fontSize: "16px",
    //     backgroundColor: "#ff4d4d",
    //     color: "white",
    //     border: "none",
    //     borderRadius: "5px",
    //     cursor: "pointer",
    //     transition: "background 0.3s",
    // },
};

styles.historyItem[":hover"] = {
    backgroundColor: "rgb(199, 73, 73)",
};

// Hover effect for the clear button
styles.clearButton[":hover"] = {
    backgroundColor: "rgb(205, 84, 84)",
};



export default Profile;
