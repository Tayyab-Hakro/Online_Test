import React, { useEffect, useState } from "react";

function TestOne() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [WrongAnswer, setWrongAnswers] = useState([]);
  const [RightAnswer, setRightAnswers] = useState([]);

  const [timer, setTimer] = useState(30);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const AllQuestions = [
    { id: 1, question: "What is the capital of France?", options: ["Paris", "Berlin", "Madrid", "Rome"], answer: "Paris" },
    { id: 2, question: "Which planet is known as the Red Planet?", options: ["Earth", "Venus", "Mars", "Jupiter"], answer: "Mars" },
    { id: 3, question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Dickens", "Hemingway", "Tolstoy"], answer: "Shakespeare" },
    { id: 4, question: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: "Pacific" },
    { id: 5, question: "Which country is famous for the Great Wall?", options: ["India", "China", "Japan", "Russia"], answer: "China" },
    { id: 6, question: "What is the currency of Japan?", options: ["Won", "Yuan", "Dollar", "Yen"], answer: "Yen" },
    { id: 7, question: "Which scientist developed the theory of relativity?", options: ["Newton", "Galileo", "Einstein", "Tesla"], answer: "Einstein" },
    { id: 8, question: "What is the longest river in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], answer: "Nile" },
    { id: 9, question: "Who painted the Mona Lisa?", options: ["Van Gogh", "Michelangelo", "Leonardo da Vinci", "Picasso"], answer: "Leonardo da Vinci" },
    { id: 10, question: "Which element has the chemical symbol O?", options: ["Oxygen", "Gold", "Silver", "Helium"], answer: "Oxygen" },
  ];

  const currentQ = AllQuestions[currentQuestionIndex];

  useEffect(() => {
    if (quizCompleted) return;

    const timerStarted = setTimeout(() => {
      if (timer <= 0) {
        nextQuestion();
      } else {
        setTimer((prev) => prev - 1);
      }
    }, 1000);

    return () => clearTimeout(timerStarted);
  }, [timer, quizCompleted]);

  const nextQuestion = () => {
    if (currentQuestionIndex < AllQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimer(30);
      setSelectedOption(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleOptionClick = (option) => {
    if (selectedOption !== null) return;

    setSelectedOption(option);

    const current = AllQuestions[currentQuestionIndex];
    const isCorrect = option === current.answer;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setRightAnswers((prev) => [...prev, { question: current.question, selected: option }]);
    } else {
      setWrongAnswers((prev) => [
        ...prev,
        { question: current.question, selected: option, correctAnswer: current.answer },
      ]);
    }

    setTimeout(() => {
      nextQuestion();
    }, 1000);
  };

  return (
    <div className="quiz-container">
      <div className="quiz-box">
        {!quizCompleted ? (
          <>
            <h1 className="question-text">{currentQ.id}. {currentQ.question}</h1>
            <div className="options-container">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={`option-btn ${selectedOption === option
                    ? option === currentQ.answer ? "correct" : "wrong"
                    : "default"
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <p className="timer-text">Time Left: {timer}s</p>
            <p className="total-questions">Total Questions: {AllQuestions.length}</p>
          </>
        ) : (
          <>
            <h2>Quiz Completed!</h2>
            <p className="result-text">
              Your Score: {score}/{AllQuestions.length} - {score > 5 ? "Pass" : "Fail"}
            </p>

            <div className="result-section">
              <h3>Correct Answers:</h3>
              {RightAnswer.map((item, index) => (
                <div key={index} className="answer correct-answer">
                  <p><strong>Q:</strong> {item.question}</p>
                  <p><strong>Your Answer:</strong> {item.selected}</p>
                </div>
              ))}

              <h3>Wrong Answers:</h3>
              {WrongAnswer.map((item, index) => (
                <div key={index} className="answer wrong-answer">
                  <p><strong>Q:</strong> {item.question}</p>
                  <p><strong>Your Answer:</strong> {item.selected}</p>
                  <p><strong>Correct Answer:</strong> {item.correctAnswer}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TestOne;
