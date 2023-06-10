import React, { useState, useEffect} from "react";
import QuestionItem from "./QuestionItem"

function QuestionList({ questionList, setQuestionList }) {

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then((res) => res.json())
    .then((data) => setQuestionList(data))
  }, [])

  function handleDeleteQuestion(deletedQuestion){
    const updatedQuestionList = questionList.filter((question) => question.id !== deletedQuestion.id);
    setQuestionList(updatedQuestionList)
  }

  function handleUpdateAnswer(updatedQuestion){
    const updatedQuestionList = questionList.map((question) => {
      if (question.id === updatedQuestion.id){
        return updatedQuestion
      } else {
        return question
      }
    })
    setQuestionList(updatedQuestionList)
  }

  const displayQuestions = questionList.map((question) => {
    return <QuestionItem question={question} key={question.id} onDeleteQuestion={handleDeleteQuestion} onUpdateAnswer={handleUpdateAnswer}/>
  })

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{displayQuestions}</ul>
    </section>
  );
}

export default QuestionList;
