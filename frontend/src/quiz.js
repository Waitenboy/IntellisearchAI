import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function Quiz() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("topic");
    const [quiz, setQuiz] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(20);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        if (query) {
            fetchResults();
        }
        window.scrollTo(0, 0);
    }, [query]);

    useEffect(() => {
        if (timeLeft === 0) {
            handleNextQuestion();
        }
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const fetchResults = async () => {
        setLoading(true);
        setError(null);
        try {
            const quizRes = await axios.post("http://localhost:5000/api/quiz", { topic: query });
            if (quizRes.data.success && quizRes.data.data && Array.isArray(quizRes.data.data)) {
                setQuiz(quizRes.data.data.slice(0, 5));
            } else {
                setQuiz([]);
            }
        } catch (error) {
            setError("Failed to fetch quiz data. Please try again.");
            setQuiz([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSelect = (optionId) => {
        if (!submitted) {
            const correctAnswer = quiz[currentQuestionIndex].correctAnswer;
            setSelectedAnswer(optionId);
            setAnswers((prev) => [...prev, { 
                question: quiz[currentQuestionIndex].question, 
                selected: optionId, 
                correct: correctAnswer,
                options: quiz[currentQuestionIndex].options
            }]);

            if (correctAnswer === optionId) {
                setScore((prev) => prev + 1);
            }

            setTimeout(() => {
                handleNextQuestion();
            }, 1000);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quiz.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
            setSelectedAnswer(null);
            setTimeLeft(20);
        } else {
            setSubmitted(true);
        }
    };

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa", textAlign: "center" }}>
            <div style={{ backgroundColor: "#bb7777", color: "white", padding: "60px", fontSize: "35px", fontWeight: "bold" }}>
                Quiz for: {query}
            </div>
            
            {loading ? (
                <p>🔄 Generating quiz... Please wait.</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : submitted ? (
                <div>
                    <h2>Your Final Score: {score}/{quiz.length}</h2>
                    <p style={{ fontSize: "20px", fontWeight: "bold", color: score <= 2 ? "#d9534f" : score === 3 ? "#f0ad4e" : "#5cb85c" }}>
                        {score <= 2 ? "😞 Need more practice!" : score === 3 ? "😊 Great job!" : "🎉 Excellent!"}
                    </p>
                    
                    <h3>Review Your Answers</h3>
                    <ul style={{ textAlign: "left", maxWidth: "600px", margin: "0 auto" }}>
                        {answers.map((answer, index) => (
                            <li key={index} style={{ marginBottom: "15px" }}>
                                <p><strong>Q{index + 1}: {answer.question}</strong></p>
                                {answer.options.map((option) => (
                                    <p 
                                        key={option.id} 
                                        style={{ 
                                            backgroundColor: answer.selected === option.id 
                                                ? (answer.correct === option.id ? "#28a745" : "#dc3545") 
                                                : (answer.correct === option.id ? "#28a745" : "transparent"),
                                            color: answer.selected === option.id || answer.correct === option.id ? "#fff" : "#000",
                                            padding: "5px",
                                            borderRadius: "5px"
                                        }}
                                    >
                                        {option.text}
                                    </p>
                                ))}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div style={{ padding: "50px", maxWidth: "600px", margin: "0 auto" }}>
                    <h3>Q{currentQuestionIndex + 1}: {quiz[currentQuestionIndex]?.question}</h3>
                    <p>Time Left: {timeLeft}s</p>
                    <div>
                        {quiz[currentQuestionIndex]?.options.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => handleSelect(option.id)}
                                style={{
                                    padding: "10px",
                                    margin: "5px",
                                    borderRadius: "5px",
                                    backgroundColor: selectedAnswer
                                        ? option.id === quiz[currentQuestionIndex]?.correctAnswer
                                            ? "#28a745"
                                            : option.id === selectedAnswer
                                                ? "#dc3545"
                                                : "#f8f9fa"
                                        : "#f8f9fa",
                                    color: selectedAnswer ? "#fff" : "#000",
                                    cursor: "pointer",
                                    transition: "background-color 0.3s",
                                    width: "100%"
                                }}
                                disabled={selectedAnswer !== null}
                            >
                                {option.text}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Quiz;
