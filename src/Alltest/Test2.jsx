import React, { useEffect, useState } from "react";

function Test2() {
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
      question: "Which of the following is a synonym for 'happy'?",
      options: ["Sad", "Joyful", "Angry", "Tired"],
      answer: "Joyful",
    },
    {
      id: 2,
      question: "What is the correct plural form of 'child'?",
      options: ["Childs", "Childes", "Children", "Childrens"],
      answer: "Children",
    },
    {
      id: 3,
      question: "Choose the correctly spelled word:",
      options: ["Definately", "Definitely", "Defanitely", "Definetely"],
      answer: "Definitely",
    },
    {
      id: 4,
      question: "Identify the adjective in the sentence: 'The quick brown fox jumps over the lazy dog.'",
      options: ["Jumps", "Fox", "Quick", "Dog"],
      answer: "Quick",
    },
    {
      id: 5,
      question: "Which sentence is in the passive voice?",
      options: [
        "The cat chased the mouse.",
        "The mouse was chased by the cat.",
        "The dog is barking.",
        "She wrote a letter.",
      ],
      answer: "The mouse was chased by the cat.",
    },
    {
      id: 6,
      question: "What does the prefix 'un-' mean?",
      options: ["Again", "Not", "Very", "Before"],
      answer: "Not",
    },
    {
      id: 7,
      question: "Which of the following is a preposition?",
      options: ["Quickly", "Because", "On", "Happy"],
      answer: "On",
    },
    {
      id: 8,
      question: "Which sentence uses correct subject-verb agreement?",
      options: [
        "He go to school every day.",
        "They goes to school.",
        "She go to school.",
        "He goes to school every day.",
      ],
      answer: "He goes to school every day.",
    },
    {
      id: 9,
      question: "What is the past tense of 'run'?",
      options: ["Runed", "Runned", "Ran", "Running"],
      answer: "Ran",
    },
    {
      id: 10,
      question: "Choose the correct article: She adopted ___ cat from the shelter.",
      options: ["a", "an", "the", "some"],
      answer: "a",
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className='flex justify-center font-bold text-3xl p-4' >Made by Tayyab</h1>
      
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
          English Language MCQ Test
        </h1>

        {!quizCompleted ? (
          <>
            <h2 className="text-lg font-semibold mb-4">
              Q{currentQ.id}: {currentQ.question}
            </h2>

            <div className="grid grid-cols-1 gap-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={`py-2 px-4 rounded-lg border text-left transition-all duration-200
                  ${
                    selectedOption === option
                      ? option === currentQ.answer
                        ? "bg-green-200 border-green-500"
                        : "bg-red-200 border-red-500"
                      : "bg-gray-50 hover:bg-gray-100 border-gray-300"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
              <p>⏱ Time Left: <span className="font-semibold">{timer}s</span></p>
              <p>Total Questions: {AllQuestions.length}</p>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold text-green-600 text-center mb-4">Quiz Completed!</h2>
            <p className="text-center mb-6">
              Your Score: <span className="font-bold">{score}/{AllQuestions.length}</span> –{" "}
              {score > 5 ? "Pass ✅" : "Fail ❌"}
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-green-700 mb-2">✅ Correct Answers:</h3>
                {RightAnswer.map((item, index) => (
                  <div key={index} className="bg-green-50 border-l-4 border-green-500 p-2 rounded mb-2">
                    <p><strong>Q:</strong> {item.question}</p>
                    <p><strong>Your Answer:</strong> {item.selected}</p>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-bold text-red-700 mb-2">❌ Wrong Answers:</h3>
                {WrongAnswer.map((item, index) => (
                  <div key={index} className="bg-red-50 border-l-4 border-red-500 p-2 rounded mb-2">
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
  );
}

export default Test2;
