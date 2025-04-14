
import React, { useEffect, useState } from "react";
import axios from "axios";
import Lottie from "lottie-react";
import foruming from "./forumimg.json";

const Forum = () => {
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState("");
    const [replies, setReplies] = useState({});
    const [searchQuery, setSearchQuery] = useState(""); // New search state
    const [userId] = useState(localStorage.getItem("userId")); // Fetch logged-in userId

    useEffect(() => {
            window.scrollTo(0, 0);
          }, []);
    

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await axios.get("http://localhost:5000/forum/get-questions");
            setQuestions(response.data);
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };

    const postQuestion = async () => {
        if (!newQuestion.trim()) return alert("Question cannot be empty!");
        try {
            await axios.post("http://localhost:5000/forum/post-question", {
                userId,
                question: newQuestion
            });
            setNewQuestion("");
            fetchQuestions(); // Refresh questions
        } catch (error) {
            console.error("Error posting question:", error);
        }
    };

    const postReply = async (postId) => {
        if (!replies[postId] || !replies[postId].trim()) return alert("Reply cannot be empty!");
        try {
            await axios.post(`http://localhost:5000/forum/post-reply/${postId}`, {
                userId,
                replyText: replies[postId]
            });
            setReplies((prev) => ({ ...prev, [postId]: "" }));
            fetchQuestions(); // Refresh replies
        } catch (error) {
            console.error("Error posting reply:", error);
        }
    };

    // **Search Logic: Filter questions based on search query**
    // const filteredQuestions = questions.filter(q =>
    //     q.question.toLowerCase().includes(searchQuery.toLowerCase())
    // );
    // **Enhanced Search Logic: Filter questions based on search query or their replies**
    const filteredQuestions = questions.filter(q =>
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.replies.some(reply =>
            reply.replyText.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );


    return (
        <div style={{ fontFamily: "monospace" }}>
           
           {/* Full-width Header */}
           <div style={{
  width: "100vw",
  background: "linear-gradient(135deg, #1e1e2f, rgb(54, 11, 73))",
  color: "#e0e0e0",
  padding: "20px 40px",
  marginTop: "30px",
  borderRadius: "12px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.6)",
  backdropFilter: "blur(10px)",
  fontFamily: "Iceland",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "60px",
  flexWrap: "wrap" // allows responsiveness
}}>
  {/* Left: Lottie */}
  <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
    <Lottie 
      animationData={foruming} 
      style={{ width: 120, height: 120 }} 
    />

    {/* Heading beside Lottie */}
    <span style={{
      fontSize: "48px",
      fontWeight: "600",
      letterSpacing: "1px",
    marginLeft: "20px"
    }}>
      Discussion Forum
    </span>
  </div>

  {/* Right: Search Bar */}
  <input
    type="text"
    placeholder="Search for a post (e.g. Machine Learning)"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    style={{
      padding: "12px 18px",
      borderRadius: "8px",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      outline: "none",
      backgroundColor: "#eeeeee",
      color: "#111",
      fontSize: "14px",
      width: "100%",
      maxWidth: "450px",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
      fontFamily:"monospace"
    }}
  />
</div>

    
            {/* Main Content Container */}
            <div style={{
  maxWidth: "1200px",
  margin: "0 auto",
  paddingTop: "50px",
  marginBottom: "200px",
  fontFamily: "monospace"
}}>
<div style={{ textAlign: "center" , fontFamily:"monospace"}}>
<h3
  style={{
    marginBottom: "30px",
    fontWeight: "700",
    fontSize: "26px",
    color: "#ffffff",
    letterSpacing: "1.2px",
    padding: "14px 28px",
    // backgroundColor: "#1e1e2f", // Clean solid dark background
    borderRadius: "14px",
    display: "inline-block",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)",
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.4)",
    // border: "1px solid rgba(255, 255, 255, 0.1)", // Subtle border for definition
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "scale(1.03)";
    e.currentTarget.style.boxShadow = "0 12px 28px rgba(0, 0, 0, 0.6)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.5)";
  }}
>
  ✨ Post Your Question Here ✨
</h3>
</div>


  {/* New Question Input */}
  <textarea
    value={newQuestion}
    onChange={(e) => setNewQuestion(e.target.value)}
    placeholder="Ask a question..."
    rows="3"
    style={{
      width: "100%",
      padding: "14px",
      marginTop: "10px",
      marginBottom: "20px",
      borderRadius: "10px",
      border: "1.5px solid #9c6fff",
      backgroundColor: "rgb(41, 30, 47)",
      color: "#fff",
      fontSize: "16px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
      resize: "vertical"
    }}
  />

  <button
    onClick={postQuestion}
    style={{
      padding: "10px 20px",
      backgroundColor: " #9c6fff",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.3s ease"
    }}
    onMouseOver={(e) => (e.target.style.backgroundColor = "#a782ff")}
    onMouseOut={(e) => (e.target.style.backgroundColor = "#9c6fff")}
  >
    Post
  </button>

  {/* Questions List */}
  <div style={{ marginTop: "30px" }}>
    {filteredQuestions.length === 0 ? (
      <p style={{ color: "#aaa", fontSize: "18px" }}>No matching posts found.</p>
    ) : (
      filteredQuestions.map((q) => (
        <div
          key={q._id}
          style={{
            border: "1.5px solid #444",
            borderRadius: "12px",
            padding: "16px",
            marginBottom: "25px",
            backgroundColor: "rgb(47, 34, 59)",
            boxShadow: "0 4px 14px rgba(0, 0, 0, 0.5)",
            color: "rgb(255, 252, 252)"
          }}
        >
          <p style={{ marginBottom: "4px", fontSize: "16px", color: "white" }}>
                <strong>{q.userName}</strong>{" "}
                <span style={{ opacity: 0.8 }}>
                    ({new Date(q.date).toLocaleDateString()})
                </span>
                </p>

                <p style={{ fontSize: "20px", marginBottom: "12px", color: "rgb(186, 183, 189)", lineHeight: "1.6" }}>
                {q.question}
                </p>


          {/* Replies Section */}
          <div style={{ marginTop: "10px" }}>
            {q.replies.map((reply, index) => (
              <div
                key={index}
                style={{
                  padding: "10px 15px",
                  borderLeft: "3px solid #9c6fff",
                  backgroundColor: "rgb(104, 73, 126)",
                  marginTop: "10px",
                  borderRadius: "8px",
                }}
              >
                <p style={{ fontSize: "16px" , color: "rgb(201, 201, 201)"}}>
                  <strong>{reply.userName}</strong> <span style={{ color: "rgb(201, 201, 201)" }}>({new Date(reply.date).toLocaleDateString()})</span>
                </p>
                <p style={{color:"white", fontSize:"18px"}}>{reply.replyText}</p>
              </div>
            ))}
          </div>

          {/* Reply Input */}
          <textarea
            value={replies[q._id] || ""}
            onChange={(e) => setReplies({ ...replies, [q._id]: e.target.value })}
            placeholder="Write a reply..."
            rows="2"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "12px",
              borderRadius: "8px",
              backgroundColor: "rgb(28, 21, 34)",
              color: "white",
              border: "1px solid #666",
              resize: "vertical"
            }}
          />
          <button
            onClick={() => postReply(q._id)}
            style={{
              padding: "8px 14px",
              backgroundColor: "#9c6fff",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontSize: "14px",
              marginTop: "8px",
              cursor: "pointer"
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#a782ff")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#9c6fff")}
          >
            Reply
          </button>
        </div>
      ))
    )}
  </div>
</div>

        </div>
    );
    
    
    
};

export default Forum;
