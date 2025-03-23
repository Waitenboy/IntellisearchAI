import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function Quiz() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("topic"); // Get query from URL
    const [quiz, setQuiz] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);


    useEffect(() => {
        if (query) {
            fetchResults();
        }
        window.scrollTo(0, 0); // Scroll to top when the component loads
    }, [query]);

    const fetchResults = async () => {
        setLoading(true);
        setError(null);

        try {
            const quizRes = await axios.post("http://localhost:5000/api/quiz", { topic: query });
            console.log("📌 API Response for quiz:", quizRes.data);

            if (quizRes.data.success && quizRes.data.data && Array.isArray(quizRes.data.data)) {
                setQuiz(quizRes.data.data.slice(0, 5));
            } else {
                console.warn("Unexpected API response structure:", quizRes.data);
                setQuiz([]);
            }
        } catch (error) {
            console.error("Error fetching quiz:", error);
            setError("Failed to fetch quiz data. Please try again.");
            setQuiz([]);
        } finally {
            setLoading(false);
        }
    };

    // Handle answer selection
    const handleSelect = (questionId, optionId) => {
        if (!submitted) {
            setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionId }));
        }
    };

     // Handle quiz submission
     const handleSubmit =async () => {
        let correctCount = 0;
        quiz.forEach((q) => {
            if (selectedAnswers[q.id] === q.correctAnswer) {
                correctCount += 1;
            }
        });
        setScore(correctCount);
        setSubmitted(true);
        // Send quiz completion update to the backend
    try {
        const userId = localStorage.getItem("userId"); // Assuming you store userId in localStorage
        if (userId) {
            await axios.post(`http://localhost:5000/api/user/${userId}/quizCompleted`);
        }
    } catch (err) {
        console.error("Failed to update quiz count:", err);
    }
    };



    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
            {/* Fixed full-width header */}
            <div style={{
                backgroundColor: "#bb7777",
                color: "white",
                padding: "60px",
                fontSize: "35px",
                fontWeight: "bold",
                textAlign: "center",
                width: "100%",
                position: "fixed",
                top: "40px",
                left: "0",
                right: "0",
                zIndex: "1000"
            }}>
                Quiz for: {query}
            </div>

            {/* Push quiz content below the fixed header */}
            <div style={{ paddingTop: "150px", maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
                {loading ? (
                    <p>🔄 Generating quiz... Please wait.</p>
                ) : error ? (
                    <p style={{ color: "red" }}>{error}</p>
                ) : quiz.length > 0 ? (
                    <div>
                        {quiz.map((q) => (
                            <div key={q.id} style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px", margin: "15px 0", boxShadow: "2px 2px 10px rgba(0,0,0,0.1)", backgroundColor: "white" }}>
                                <h5>Q{q.id}: {q.question}</h5>
                                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                    {q.options.map((option) => {
                                        const isSelected = selectedAnswers[q.id] === option.id;
                                        const isCorrect = submitted && option.id === q.correctAnswer;
                                        const isWrong = submitted && isSelected && option.id !== q.correctAnswer;

                                        return (
                                            <button
                                                key={option.id}
                                                onClick={() => handleSelect(q.id, option.id)}
                                                disabled={submitted}
                                                style={{
                                                    padding: "10px",
                                                    borderRadius: "5px",
                                                    border: "1px solid #ccc",
                                                    backgroundColor: isCorrect ? "#28a745" : isWrong ? "#dc3545" : isSelected ? "#bb7777" : "#f8f9fa",
                                                    color: isCorrect || isWrong ? "#fff" : "#000",
                                                    fontWeight: isCorrect ? "bold" : "normal",
                                                    cursor: submitted ? "default" : "pointer",
                                                    transition: "background-color 0.3s",
                                                }}
                                            >
                                                {option.id}) {option.text}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}

                        {!submitted ? (
                            <button 
                                onClick={handleSubmit} 
                                style={{ 
                                    marginTop: "15px", 
                                    padding: "12px 20px", 
                                    fontSize: "16px", 
                                    backgroundColor: "#bb7777", 
                                    color: "#fff", 
                                    border: "none", 
                                    borderRadius: "5px", 
                                    cursor: "pointer",
                                    boxShadow: "2px 2px 10px rgba(0,0,0,0.1)"
                                }}
                            >
                                Submit Answers
                            </button>
                        ) : (
                            <div style={{ textAlign: "center", marginTop: "15px" }}>
                            <p style={{ fontSize: "25px", fontWeight: "bold", color: "#28a745" }}>
                                ✅ Quiz Submitted! You scored {score}/{quiz.length}.
                            </p>
                            <p 
                                style={{ 
                                    fontSize: "25px", 
                                    fontWeight: "bold", 
                                    marginTop: "10px", 
                                    color: score <= 2 ? "#d9534f"  // Red for poor
                                        : score === 3 ? "#f0ad4e" // Orange for decent
                                        : "#5cb85c" // Green for excellent
                                }}
                            >
                                {score <= 2 ? "😞 Poor! Looks like you need practice." 
                                : score === 3 ? "😊 Great! But you can do better!" 
                                : "🎉 Excellent! You are a pro!"}
                            </p>
                        </div>

                        )}
                    </div>
                ) : (
                    <p>No quiz questions available.</p>
                )}
            </div>
        </div>
    );
}

export default Quiz;
