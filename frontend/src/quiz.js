import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import quizbg from "./components/quizbg2.jpg";


const XP_BAR_MAX = 100; // XP needed for a level-up
const STREAK_BONUS = 5; // Bonus XP for streaks



const XPBarContainer = styled.div`
  width: 80%;
  background-color: #ddd;
  border-radius: 10px;
  margin: 20px auto;
  height: 20px;
  overflow: hidden;
  position: relative;
`;

const XPBar = styled.div`
  height: 100%;
  width: ${({ xp }) => xp}%;
  background: ${({ xp }) =>
    xp < 30 ? "#28a745" : // Green (low XP)
    xp < 60 ? "#ffc107" : // Yellow (medium XP)
    xp < 90 ? "#fd7e14" : // Orange (high XP)
    "#dc3545"}; // Red (max XP)
  transition: width 0.8s ease-in-out, background-color 0.5s;
`;

const Message = styled.p`
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  color: ${({ xp }) =>
    xp <=0 ? "#28a745" :
    xp < 3 ? "#ffc107" :
    xp < 4 ? "#fd7e14" :
    "#dc3545"};
`;


const Container = styled.div`
  width: 100vw;
  min-height: calc(100vh - 160px); /* Adjusting for header (100px) and footer (60px) */
  background: url(${quizbg}) no-repeat center center/cover;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Pushes content between header and footer */
  padding-top: 50px; /* Moves content below the fixed header */
  padding-bottom: 180px; /* Prevents content from overlapping with the footer */
`;


const Header = styled.div`
 margin-top: 90px; /* Push content down to avoid overlap */
  width: 100%;
  background-color:rgb(28, 13, 35);
  color: white;
  padding: 40px 0; /* Adjusted height */
  font-size: 45px;
  font-weight: bold;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: flex-end; /* Moves text to the bottom */
  padding-bottom: 20px; /* Space from bottom */
  height: 100px; /* Fixed height for control */
  font-family: "Iceland", sans-serif;
`;


const QuizContainer = styled.div`
  padding: 44px;
  width: 60%;
  max-width: 900px;
  margin: 80px auto 20px auto; /* Reduced spacing */
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.2);
  border: 4px solid rgba(255, 255, 255, 0.15);
  text-align: center;
  transition: transform 0.25s ease-in-out;

  &:hover {
    transform: scale(1.015);
  }

  & p,
  & h3,
  & div {
    font-weight: normal;
    transition: none !important;
  }
`;


const ScoreText = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: ${({ score }) => (score <= 2 ? "#d9534f" : score === 3 ? "#f0ad4e" : "#5cb85c")};
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #007bff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
  margin: 20px auto;
`;

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
    const [xp, setXP] = useState(0);
    const [streak, setStreak] = useState(0);

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
            
            // Store the answer for review
            setAnswers((prev) => [...prev, { 
                question: quiz[currentQuestionIndex].question, 
                selected: optionId, 
                correct: correctAnswer,
                options: quiz[currentQuestionIndex].options
            }]);
    
            if (correctAnswer === optionId) {
                setScore((prev) => prev + 1);
            
                const xpGain = 10 + (streak > 0 ? STREAK_BONUS : 0); // Base XP + Streak Bonus
                let newXP = xp + xpGain;
            
                // Ensure XP bar reaches full when all answers are correct
                const totalQuestions = quiz.length;
                const totalCorrect = score + 1; // Since we're increasing score
                newXP = (totalCorrect / totalQuestions) * XP_BAR_MAX; // Scale XP to fill bar at max
            
                setXP(Math.min(newXP, XP_BAR_MAX)); // Cap XP at max
                setStreak((prev) => prev + 1);
            } else {
                setStreak(0);
            }
            
            
            
            // Wait 1 second before moving to the next question
            setTimeout(() => {
                handleNextQuestion();
                if (currentQuestionIndex < quiz.length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                    setSelectedAnswer(null);}
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

    const getMessage = () => {
        if (xp <= 0) return "Keep going! You're off to a great start! 🚀";
        if (xp < 3) return "Nice work! You're making progress! 💪";
        if (xp < 4) return "Almost there! Stay strong! 🔥";
        return "Amazing! You're a champion! 🎉";
      };

    return (
        <Container>
            <Header> Test yourself about {query}</Header>
                
            {loading ? (
                <LoadingSpinner />
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : submitted ? (
                <QuizContainer>
                    <h2 style={{color:"white"}}>Your Final Score: {score}/{quiz.length}</h2>
                    <ScoreText score={score}>
                        {score <= 2 ? "😞 Need more practice!" : score === 3 ? "😊 Great job!" : "🎉 Excellent!"}
                    </ScoreText>
                    
                    <h3 style={{color:"white", marginBottom:"55px"}}>Review Your Answers</h3>
                    <ul style={{ textAlign: "left", maxWidth: "700px", margin: "0 auto", padding: "0" }}>
                    {answers.map((answer, index) => (
                        <li
                        key={index}
                        style={{
                            marginBottom: "25px",
                            backgroundColor: "rgb(39, 30, 43)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "12px",
                            padding: "20px",
                            boxShadow: "0 6px 18px rgba(0, 0, 0, 0.4)",
                            listStyle: "none"
                        }}
                        >
                        <p style={{ color: "white", fontSize: "18px", marginBottom: "12px" }}>
                            <strong>Q{index + 1}:</strong> {answer.question}
                        </p>

                        {answer.options.map((option) => (
                            <p
                            key={option.id}
                            style={{
                                backgroundColor:
                                answer.selected === option.id
                                    ? answer.correct === option.id
                                    ? " #28a745"
                                    : " #dc3545"
                                    : answer.correct === option.id
                                    ? " #28a745"
                                    : "rgb(110, 75, 137)",
                                color: "#fff",
                                padding: "10px 14px",
                                borderRadius: "8px",
                                marginBottom: "8px",
                                transition: "0.3s ease"
                            }}
                            >
                            {option.text}
                            </p>
                        ))}
                        </li>
                    ))}
                    </ul>

                </QuizContainer>
            ) : (
                <QuizContainer>
    {/* Question Counter as Heading */}
    <h4 style={{ textAlign: "center", marginBottom: "10px" , color:"white"}}>
        Question {currentQuestionIndex + 1} of {quiz.length}
    </h4>

    {/* Actual Question */}
    <h4 style={{color:"white"}}>{quiz[currentQuestionIndex]?.question}</h4>

    {/* Timer */}
    <p style={{ color: "white" }}>Time Left: {timeLeft}s</p>


   {/* Timer Bar */}
<div
  style={{
    height: "14px",
    width: "100%",
    backgroundColor: "#1e1e2f",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "inset 0 1px 4px rgba(0,0,0,0.6)",
    marginTop: "20px",
  }}
>
  <div
    style={{
      height: "100%",
      width: `${(timeLeft / 20) * 100}%`,
      background: "linear-gradient(90deg, #ff416c, #ff4b2b)",
      transition: "width 1s linear",
      borderRadius: "10px",
    }}
  />
</div>

{/* XP Bar & Streak Icon */}
<div
  style={{
    display: "flex",
    alignItems: "center",
    marginTop: "16px",
    gap: "16px",
  }}
>
  {/* XP Bar */}
  <div
    style={{
      flex: 1,
      height: "14px",
      backgroundColor: "#2c2c3e",
      borderRadius: "10px",
      overflow: "hidden",
      boxShadow: "inset 0 1px 4px rgba(0,0,0,0.6)",
    }}
  >
    <div
      style={{
        height: "100%",
        width: `${(xp / XP_BAR_MAX) * 100}%`,
        background: "linear-gradient(90deg, #00c6ff, #0072ff)",
        transition: "width 0.5s ease",
        borderRadius: "10px",
      }}
    />
  </div>

  {/* Streak Icon */}
  <span
    style={{
      fontSize: "22px",
      color: "#ffa726",
      textShadow: "0 0 6px rgba(255, 167, 38, 0.7)",
    }}
  >
    {setStreak} 🔥
  </span>
</div>


    {/* Supportive Message
    <Message xp={xp}>{getMessage()}</Message> */}

    {/* Score */}
    <p style={{ color: "white" }}>Score: {score}</p>


    {/* Options */}
    <div>
        {quiz[currentQuestionIndex]?.options.map((option) => (
            <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                style={{
                    padding: "10px",
                    margin: "5px 0",
                    borderRadius: "5px",
                    backgroundColor:
                        selectedAnswer
                            ? option.id === quiz[currentQuestionIndex]?.correctAnswer
                                ? "#28a745" // Green for correct answer
                                : option.id === selectedAnswer
                                    ? "#dc3545" // Red for wrong selected answer
                                    : "#f8f9fa"
                            : "#f8f9fa", // Default background
                    color: selectedAnswer ? "#fff" : "#000",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                    width: "100%",
                    border: "1px solid #ccc",
                    fontSize: "16px",
                    fontWeight: "bold",
                }}
                disabled={selectedAnswer !== null} // Disable buttons after selecting
            >
                {option.text}
            </button>
        ))}
    </div>
</QuizContainer>

            )}
        </Container>
    );
}

export default Quiz;

