import React, { useState } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAllQuestions from '../hooks/useAllQuestions';
import paths from '../router/paths';
import RandomTicketForm from '../components/RandomTicket/RandomTicketForm';
import { QUESTIONS } from '../constants/settings';
import AnswerAnalysis from '../components/RandomTicket/AnswerAnalysis';

export default function RandomTicket() {
    const [questions, { loading: isLoading, error, refetch: refetchBooks }] = useAllQuestions();
    const [isAdding, setIsAdding] = useState(false);
    const [showAnswerAnalysis, setShowAnswerAnalysis] = useState(false);
    const history = useHistory();

    const handleCheckAnswers = () => {
        questions.forEach((question) => {
            question.answers.forEach((answer) => {
                const checkbox = document.getElementById(answer._id);

                if (checkbox.checked && answer.isCorrect) {
                    checkbox.parentElement.style.color = 'green';
                } else if (checkbox.checked && !answer.isCorrect) {
                    checkbox.parentElement.style.color = 'red';
                } else if (!checkbox.checked && answer.isCorrect) {
                    checkbox.parentElement.style.color = 'green';
                }
            });
        });

        setShowAnswerAnalysis(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            {showAnswerAnalysis && (
                <Row>
                    <Col lg="4" md="6" sm="12" className="mt-4">
                        <AnswerAnalysis questions={questions} />
                    </Col>
                </Row>
            )}
            <Row>
                {questions?.map((question) => (
                    <Col key={question._id} lg="8" md="10" sm="14" className="mt-4">
                        {showAnswerAnalysis ? (
                            <RandomTicketForm item={question} nameItem={QUESTIONS} disabled />
                        ) : (
                            <RandomTicketForm item={question} nameItem={QUESTIONS} />
                        )}
                    </Col>
                ))}
            </Row>
            <Button variant="primary" onClick={handleCheckAnswers} style={{ marginTop: '15px', marginBottom: '20px' }}>
                Check Answers
            </Button>
        </>
    );
}