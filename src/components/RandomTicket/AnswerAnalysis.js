import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function AnswerAnalysis({ questions }) {
    const getChartData = () => {
        const correctAnswers = questions.reduce(
            (total, question) =>
                total +
                question.answers.filter((answer) => answer.isCorrect).every((answer) => document.getElementById(answer._id).checked),
            0
        );

        const incorrectAnswers = questions.reduce(
            (total, question) =>
                total +
                question.answers.filter((answer) => !answer.isCorrect).some((answer) => document.getElementById(answer._id).checked),
            0
        );

        const unansweredQuestions = questions.length - (correctAnswers + incorrectAnswers);

        return [
            { name: 'Correct', value: correctAnswers },
            { name: 'Incorrect', value: incorrectAnswers },
            { name: 'Unanswered', value: unansweredQuestions },
        ];
    };

    const COLORS = ['#0088FE', '#FF8042', '#FFBB28'];

    const renderLegend = (props) => {
        const { payload } = props;

        return (
            <ul>
                {payload.map((entry, index) => (
                    <li key={entry.name} style={{ color: entry.color }}>
                        {entry.value}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={getChartData()}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                >
                    {getChartData().map((entry, index) => (
                        <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend content={renderLegend} />
            </PieChart>
        </ResponsiveContainer>
    );
}
