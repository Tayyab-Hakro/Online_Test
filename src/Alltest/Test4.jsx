import React, { useEffect, useState } from "react";

function Test4() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [WrongAnswer, setWrongAnswers] = useState([]);
  const [RightAnswer, setRightAnswers] = useState([]);

  const [timer, setTimer] = useState(30);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const AllQuestions = [
    {
      id: 1,
      question: "Which of the following is a JavaScript data type?",
      options: ["Float", "String", "Character", "Double"],
      answer: "String",
    },
    {
      id: 2,
      question: "What does HTML stand for?",
      options: [
        "Hyper Trainer Marking Language",
        "Hyper Text Markup Language",
        "Hyper Text Markdown Language",
        "HighText Machine Language",
      ],
      answer: "Hyper Text Markup Language",
    },
    {
      id: 3,
      question: "Which symbol is used for single-line comments in JavaScript?",
      options: ["<!-- -->", "#", "//", "/* */"],
      answer: "//",
    },
    {
      id: 4,
      question: "Which company developed the React library?",
      options: ["Google", "Facebook", "Microsoft", "Amazon"],
      answer: "Facebook",
    },
    {
      id: 5,
      question: "What is the correct syntax to declare a constant in JavaScript?",
      options: ["const x = 5;", "constant x = 5;", "let const x = 5;", "int x = 5;"],
      answer: "const x = 5;",
    },
    {
      id: 6,
      question: "Which HTML tag is used to link JavaScript files?",
      options: ["<link>", "<script>", "<js>", "<code>"],
      answer: "<script>",
    },
    {
      id: 7,
      question: "What does CSS stand for?",
      options: [
        "Cascading Style Sheets",
        "Computer Style Sheets",
        "Creative Style Sheets",
        "Colorful Style Sheets",
      ],
      answer: "Cascading Style Sheets",
    },
    {
      id: 8,
      question: "Which of the following is NOT a JavaScript framework?",
      options: ["React", "Vue", "Angular", "Django"],
      answer: "Django",
    },
    {
      id: 9,
      question: "How do you write an arrow function in JavaScript?",
      options: [
        "function => () {}",
        "() -> {}",
        "() => {}",
        "function() => {}",
      ],
      answer: "() => {}",
    },
    {
      id: 10,
      question: "Which method is used to fetch data from an API in JavaScript?",
      options: ["get()", "fetch()", "request()", "retrieve()"],
      answer: "fetch()",
    },
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
    <>
    <h1 className='flex justify-center font-bold text-3xl p-4' >Made by Tayyab</h1>

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
    </>
  );
}

export default Test4;
