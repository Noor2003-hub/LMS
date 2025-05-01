import { Participation } from "@/payload-types";
import { useEffect, useState } from "react";
import NextButton from "./NextButton";
import { markProgress } from "../_actions/markProgress";
import { HiDocument, HiDocumentSearch } from "react-icons/hi";

interface QuizProps {
  module: any;
  participation: Participation;
  onCompleted: (nextIndex: number) => void;
}

export default function QuizModule({
  module,
  participation,
  onCompleted,
}: QuizProps) {
  const [message, setMessage] = useState("");
  const [userAnswers, setUserAnswers] = useState<boolean[][]>([]);
  const [loading, setLoading] = useState(false);
  const [allAnswerCorrect, setAllAnswerCorrect] = useState(false);

  useEffect(() => {
    setEmptyUserAnswers();
  }, []);

  function setEmptyUserAnswers() {
    const temp = module.questions.map((question: any) =>
      question.answers.map(() => false)
    );
    setUserAnswers(temp);
  }

  async function handelNextModule() {
    setLoading(true);
    try {
      const updatedParticipation = await markProgress(participation);
      if (updatedParticipation && updatedParticipation.progress) {
        onCompleted(updatedParticipation.progress);
      } else {
        console.log("Error updating participation progress");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleCheckAnswer() {
    let allCorrect = true;
  
    for (let i = 0; i < module.questions.length; i++) {
      const question = module.questions[i];
      const correctAnswers = question.answers.map((a: any) => a["true"]);
      const userSelected = userAnswers[i] || [];
  
      console.log(`\nQuestion ${i + 1}: ${question.question}`);
      question.answers.forEach((answer: any, j: number) => {
        console.log(
          `- Answer ${j + 1}: "${answer.answer}" | Correct: ${
            correctAnswers[j]
          } | Selected: ${userSelected[j]}`
        );
      });
  
      for (let j = 0; j < correctAnswers.length; j++) {
        const expected = !!correctAnswers[j];
        const selected = !!userSelected[j];
  
        if (expected !== selected) {
          allCorrect = false;
          break;
        }
      }
  
      if (!allCorrect) break;
    }
  
    if (allCorrect) {
      setAllAnswerCorrect(true);
      setMessage("✅ All answers are correct!");
    } else {
      setMessage("❌ Some answers are incorrect. Try again.");
    }
  }
  

  return (
    <div>
      <h2>{module.title}</h2>
      <div>
        {module.questions.map((question: any, index: number) => (
          <div key={index}>
            <p>{index + 1}. {question.question}</p>
            {question.answers.map((answer: any, answerIndex: number) => (
              <div key={`${index}-${answerIndex}`}>
                <input
                  type="checkbox"
                  id={`answer-${index}-${answerIndex}`}
                  checked={
                    userAnswers[index] ? userAnswers[index][answerIndex] : false
                  }
                  onChange={(e) => {
                    setMessage("");
                    const tempAns = [...userAnswers];
                    if (!tempAns[index]) tempAns[index] = [];
                    tempAns[index][answerIndex] = e.target.checked;
                    setUserAnswers(tempAns);
                  }}
                />
                <label htmlFor={`answer-${index}-${answerIndex}`}>
                  {answer.answer}
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>

      {message && (
        <div
            style={{
            marginTop: "10px",
            color: allAnswerCorrect ? "green" : "red",
            fontWeight: "bold",
            }}
        >
            {message}
        </div>
        )}

      <div style={{ marginTop: "20px" }}>
        {allAnswerCorrect ? (
          <NextButton loading={loading} text="Next" onClick={handelNextModule} />
        ) : (
          <button onClick={handleCheckAnswer}>
            Check Answers <HiDocumentSearch />
          </button>
        )}
      </div>
    </div>
  );
}
