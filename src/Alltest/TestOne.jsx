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
    <>
    <h1 className='flex justify-center font-bold text-3xl p-4' >Made by Tayyab</h1>
  
  <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
     
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6">
        {!quizCompleted ? (
          <>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6">
              {currentQ.id}. {currentQ.question}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={`py-2 px-4 rounded-lg border text-sm sm:text-base font-medium transition-colors duration-300 
                  ${selectedOption === option
                      ? option === currentQ.answer
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                      : "bg-gray-200 hover:bg-blue-500 hover:text-white"
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-4">
              <p>Time Left: <span className="font-semibold">{timer}s</span></p>
              <p>Total Questions: {AllQuestions.length}</p>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-4">Quiz Completed!</h2>
            <p className="text-center text-lg mb-6">
              Your Score: <span className="font-bold">{score}/{AllQuestions.length}</span> - {score > 5 ? "🎉 Pass" : "❌ Fail"}
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-green-600 mb-2">Correct Answers:</h3>
                {RightAnswer.map((item, index) => (
                  <div key={index} className="bg-green-100 p-4 rounded mb-2">
                    <p><strong>Q:</strong> {item.question}</p>
                    <p><strong>Your Answer:</strong> {item.selected}</p>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-xl font-semibold text-red-600 mb-2">Wrong Answers:</h3>
                {WrongAnswer.map((item, index) => (
                  <div key={index} className="bg-red-100 p-4 rounded mb-2">
                    <p><strong>Q:</strong> {item.question}</p>
                    <p><strong>Your Answer:</strong> {item.selected}</p>
                    <p><strong>Correct Answer:</strong> {item.correctAnswer}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>

    </>  );
}

export default TestOne;
