import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Button, Spinner, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAllQuestions from '../hooks/useAllQuestions';
import paths from '../router/paths';
import OneTestForm from '../components/oneTest/OneTestForm';
import { QUESTIONS } from '../constants/settings';

export default function OneTest() {
    const [questions, { loading: isLoading, error, refetch: refetchBooks }] = useAllQuestions();
    const [isAdding, setIsAdding] = useState(false);
    const history = useHistory();
    const [randomQuestion, setRandomQuestion] = useState(null);

    const getRandomQuestionId = () => {
        const questionIds = questions.map((question) => question._id);
        const randomIndex = Math.floor(Math.random() * questionIds.length);
        return questionIds[randomIndex];
    };

    const handleCheckAnswers = () => {
        randomQuestion.answers.forEach((answer) => {
            const checkbox = document.getElementById(answer._id);

            if (checkbox.checked && answer.isCorrect) {
                checkbox.parentElement.style.color = 'green';
            } else if (checkbox.checked && !answer.isCorrect) {
                checkbox.parentElement.style.color = 'red';
            } else if (!checkbox.checked && answer.isCorrect) {
                checkbox.parentElement.style.color = 'green';
            }
        });
    };

    const handleNextQuestion = () => {
        const randomQuestionId = getRandomQuestionId();
        const nextRandomQuestion = questions.find((question) => question._id === randomQuestionId);
        setRandomQuestion(nextRandomQuestion);
    };

    useEffect(() => {
        if (questions.length > 0) {
            const randomQuestionId = getRandomQuestionId();
            const initialRandomQuestion = questions.find((question) => question._id === randomQuestionId);
            setRandomQuestion(initialRandomQuestion);
        }
    }, [questions]);

    if (isLoading) {
        return <Spinner animation="border" />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <Row>
                <Col lg="8" md="10" sm="14" className="mt-4">
                    {randomQuestion && <OneTestForm item={randomQuestion} nameItem={QUESTIONS} />}
                </Col>
            </Row>
            <Button variant="primary" onClick={handleCheckAnswers} style={{ marginTop: '15px', marginRight: '15px', marginBottom: '20px' }}>
                Check Answers
            </Button>
            <Button variant="primary" onClick={handleNextQuestion} style={{ marginTop: '15px', marginBottom: '20px' }}>
                Next question
            </Button>
        </>
    );
}