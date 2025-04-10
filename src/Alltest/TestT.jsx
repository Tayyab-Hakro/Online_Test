import React, { useEffect, useState } from "react";

function TestT() {
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
      question: "Which keyword is used to declare a constant in JavaScript?",
      options: ["var", "const", "let", "define"],
      answer: "const",
    },
    {
      id: 2,
      question: "Which method converts a JSON string into a JavaScript object?",
      options: ["JSON.stringify()", "JSON.parse()", "JSON.convert()", "JSON.decode()"],
      answer: "JSON.parse()",
    },
    {
      id: 3,
      question: "What is the output of `typeof null` in JavaScript?",
      options: ["null", "undefined", "object", "boolean"],
      answer: "object",
    },
    {
      id: 4,
      question: "Which HTML tag is used to link a JavaScript file?",
      options: ["<link>", "<script>", "<js>", "<src>"],
      answer: "<script>",
    },
    {
      id: 5,
      question: "Which of the following is a JavaScript framework?",
      options: ["Laravel", "React", "Django", "Flask"],
      answer: "React",
    },
    {
      id: 6,
      question: "Which symbol is used for comments in JavaScript?",
      options: ["//", "<!--", "#", "/*"],
      answer: "//",
    },
    {
      id: 7,
      question: "How do you declare an arrow function?",
      options: [
        "function => () {}",
        "() => {}",
        "() -> {}",
        "function() => {}",
      ],
      answer: "() => {}",
    },
    {
      id: 8,
      question: "Which company developed JavaScript?",
      options: ["Google", "Microsoft", "Netscape", "Apple"],
      answer: "Netscape",
    },
    {
      id: 9,
      question: "What does DOM stand for?",
      options: [
        "Document Object Model",
        "Data Object Management",
        "Digital Object Method",
        "Document Oriented Module",
      ],
      answer: "Document Object Model",
    },
    {
      id: 10,
      question: "Which loop is guaranteed to run at least once?",
      options: ["for", "while", "do...while", "foreach"],
      answer: "do...while",
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


    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
        {!quizCompleted ? (
          <>
            <h1 className="text-xl font-semibold mb-4">
              {currentQ.id}. {currentQ.question}
            </h1>
            <div className="grid gap-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={`w-full py-2 px-4 rounded border text-left transition-all duration-300 ${
                    selectedOption
                      ? option === currentQ.answer
                        ? "bg-green-100 border-green-500 text-green-800"
                        : option === selectedOption
                        ? "bg-red-100 border-red-500 text-red-800"
                        : "bg-gray-100 border-gray-300 text-gray-600"
                      : "hover:bg-blue-100 border-gray-300"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-sm text-gray-600">
              <p>Time Left: <span className="font-bold">{timer}s</span></p>
              <p>Question: {currentQuestionIndex + 1}/{AllQuestions.length}</p>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
            <p className="mb-6 text-lg">
              Your Score: <strong>{score}/{AllQuestions.length}</strong> — {score > 5 ? "✅ Pass" : "❌ Fail"}
            </p>

            <div className="text-left">
              <h3 className="text-lg font-semibold text-green-600 mb-2">Correct Answers:</h3>
              {RightAnswer.map((item, index) => (
                <div key={index} className="mb-3 p-3 bg-green-50 rounded border border-green-300">
                  <p><strong>Q:</strong> {item.question}</p>
                  <p><strong>Your Answer:</strong> {item.selected}</p>
                </div>
              ))}

              <h3 className="text-lg font-semibold text-red-600 mt-6 mb-2">Wrong Answers:</h3>
              {WrongAnswer.map((item, index) => (
                <div key={index} className="mb-3 p-3 bg-red-50 rounded border border-red-300">
                  <p><strong>Q:</strong> {item.question}</p>
                  <p><strong>Your Answer:</strong> {item.selected}</p>
                  <p><strong>Correct Answer:</strong> {item.correctAnswer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default TestT;
