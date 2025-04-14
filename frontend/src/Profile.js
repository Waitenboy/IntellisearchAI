import React, { useEffect, useState } from "react";


const Profile = () => {
    const [searchHistory, setSearchHistory] = useState([]);
    const [searchCount, setSearchCount] = useState(0);
    const [quizCount, setQuizCount] = useState(0);
    const userId = localStorage.getItem("userId");
    // console.log("🟢 Stored userId:", userId);
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState(null);
    // const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

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
    
     useEffect(() => {
        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://unpkg.com/@splinetool/viewer@1.9.82/build/spline-viewer.js';
        document.body.appendChild(script);
    
        return () => {
          document.body.removeChild(script); // Clean up when component unmounts
        };
      }, []);
    
    const handleUpdate = async () => {
        setMessage("");
        try {
            const response = await fetch("http://localhost:5000/api/update-user", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ username, email, password }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                // ✅ Refresh user data from server
                await fetchProfile();
    
                setIsEditing(false);
                setMessage("Profile updated successfully!");
            } else {
                setMessage(data.error || "Failed to update profile.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            setMessage("Error updating profile.");
        }
    };
    

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
    
    
    function TypingText({ text, speed = 100 }) {
        const [displayedText, setDisplayedText] = useState("");
      
        useEffect(() => {
          let i = 0;
          const interval = setInterval(() => {
            setDisplayedText((prev) => prev + text.charAt(i));
            i++;
            if (i === text.length) clearInterval(interval);
          }, speed);
      
          return () => clearInterval(interval);
        }, [text, speed]);
      
        return <span>{displayedText}</span>;
      }

    return (

        <div style={styles.container}>
           <spline-viewer
  url="https://prod.spline.design/RanRhVh36B0213ao/scene.splinecode"
  style={{
    width: "100%",
    height: "80%",
    transform: "scale(1.7) translateY(-50px)", // shift up by 80px
    transformOrigin: "top center",
    zIndex: -1
    // pointerEvents: "none",
  }}
></spline-viewer>

        {/* Header Section */}
        <div style={{
  position: "absolute",
  top: "120%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
  zIndex: 10, // make sure it appears above the Spline scene
  marginTop:"100px"
}}>
  <h2 style={{
    fontSize: "82px",
    fontFamily: "Iceland",
    color: "#fff",
    // background: "rgba(0, 0, 0, 0.4)",
    padding: "12px 24px",
    // borderRadius: "12px",
    display: "inline-flex",
    alignItems: "center",
    gap: "10px"
  }}>
    {user ? <TypingText text={`Weelcome ${user.username}!`} speed={110} /> : "Loading..."}
    {badge && <img src={badge} alt="Badge" style={{ height: "32px" }} />}
  </h2>


        
        {/* Page Layout: Left (Profile & Stats) | Right (Search History) */}
         {/* Profile section with gap */}
  <div style={{ marginTop: "40px" }}> {/* Add margin here */}
    <div style={styles.statsContainer}>
      <div style={styles.leftSection}>
        {user ? (
          <div style={{ maxWidth: "400px", margin: "auto", textAlign: "left", color:"white" }}>
            <label><strong>Username:</strong></label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={!isEditing}
              style={inputStyle}
            />

            <label><strong>Email:</strong></label>
            <input
              type="email"
              value={user?.email}
              readOnly
              style={{ ...inputStyle, backgroundColor: "#f0f0f0", cursor: "not-allowed" }}
            />

            <label><strong>New Password:</strong></label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={!isEditing}
              placeholder="Enter new password (optional)"
              style={inputStyle}
            />

            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} style={buttonStyle}>
                Edit Profile
              </button>
            ) : (
              <button onClick={handleUpdate} style={buttonStyle}>
                Save Changes
              </button>
            )}
          </div>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>
    
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
    </div>
    
    
    );
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  backgroundColor: "rgb(105, 32, 232)",
  color: "white",
  padding: "10px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};


const styles = {
    rightSection: {
        background: "linear-gradient(145deg, rgba(50, 30, 80, 0.95), rgba(40, 20, 60, 0.95))",
        padding: "24px",
        borderRadius: "16px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
        maxWidth: "420px",
        textAlign: "center",
        margin: "auto",
        marginTop: "100px",
        marginBottom: "100px",
        color: "#e0e0e0",
        backdropFilter: "blur(10px)",
      },
      
      historyTitle: {
        fontSize: "22px",
        fontWeight: "bold",
        marginBottom: "16px",
        color: "#f1f1f1",
        letterSpacing: "0.5px",
      },
      
      historyList: {
        listStyleType: "none",
        padding: "0",
      },
      
      historyItem: {
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        padding: "12px",
        margin: "10px 0",
        borderRadius: "10px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
        fontSize: "16px",
        fontWeight: "500",
        color: "#f0f0f0",
        transition: "background 0.3s ease",
        cursor: "pointer",
      },
      
      noHistory: {
        fontSize: "16px",
        fontStyle: "italic",
        color: "#999",
      },
      
      clearButton: {
        backgroundColor: "rgb(170, 84, 210)",
        color: "#fff",
        border: "none",
        padding: "12px 18px",
        borderRadius: "10px",
        cursor: "pointer",
        marginTop: "20px",
        fontSize: "15px",
        fontWeight: "bold",
        transition: "background 0.3s ease, transform 0.2s ease",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
      },
      

    container: {
        maxWidth: "1200px",
        margin: "0 auto",
        paddingTop: "80px", // Adjusted to avoid hiding the header
        fontFamily: "monospace",
        marginBottom:"600px"
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
        marginTop:"700px"
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
        backgroundColor: " #f9f9f9",
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
        background: "linear-gradient(145deg, rgba(40,30,70,0.9), rgba(30,20,50,0.9))",
        padding: "20px",
        borderRadius: "12px",
        textAlign: "center",
        fontSize: "18px",
        fontWeight: "bold",
        color: "#e0e0e0",
        boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
        backdropFilter: "blur(10px)",
      },
      
      card: {
        padding: "24px",
        backgroundColor: "rgba(73, 33, 153, 0.8)", // slightly transparent dark purple
        borderRadius: "16px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
        textAlign: "center",
        color: "#f5f5f5",
        backdropFilter: "blur(8px)",
      },
      
      statTitle: {
        fontSize: "16px",
        fontWeight: "600",
        color: "#bbb",
        marginBottom: "6px",
        textTransform: "uppercase",
        letterSpacing: "1px",
      },
      
      statValue: {
        fontSize: "28px",
        fontWeight: "700",
        color: "#ffffff",
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
