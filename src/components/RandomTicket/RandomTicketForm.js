import React, { useState } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import { generatePath, Link } from 'react-router-dom';
import { QUESTIONS } from '../../constants/settings';
import paths from '../../router/paths';


export default function RandomTicketForm({ item, refetchItems, nameItem, handleCheckAnswers }) {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isChecking, setIsChecking] = useState(false);

    const handleAnswerSelection = (answerId) => {
        setSelectedAnswer(answerId);
    };

    return (
        <>
            <Card>
                <Link
                    to={generatePath(nameItem === QUESTIONS ? paths.randomTicket : paths.randomTicket, { id: item._id })}
                >
                    {item.url && (
                        <Card.Img
                            title="Open details"
                            style={{ cursor: 'pointer' }}
                            alt={`${item.name} image`}
                            variant="top"
                            src={item.url}
                        />
                    )}
                </Link>
                <Card.Body>
                    <Card.Title>{item.text}</Card.Title>
                    {item.answers && item.answers.map((answer) => (
                        <div key={answer._id}>
                            <input
                                type="checkbox"
                                id={answer._id}
                                checked={selectedAnswer === answer._id}
                                onChange={() => handleAnswerSelection(answer._id)}
                            />
                            <label htmlFor={answer._id}>{answer.text}</label>
                        </div>
                    ))}
                </Card.Body>
            </Card>
        </>
    );
}
