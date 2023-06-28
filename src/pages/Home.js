import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import paths from '../router/paths';

export default function Home() {
  const history = useHistory();

  const handleRedirectToTests = () => {
    history.push(paths.Tests);
  };

  const handleRedirectToTheory = () => {
    window.open('https://pdr.infotech.gov.ua/theory/rules', '_blank');
  };

  return (
    <Container className="text-center">
      <h1 style={{ marginTop: '20px' }}>Tests Traffic Rules</h1>
      <p>
      Ласкаво просимо на наш веб-сайт для проходження тестів ПДР. Перевірте та покращуйте свої знання правил дорожнього руху, проходячи тести. Готуйтеся до майбутніх поїздок на дорозі з впевненістю та безпекою. Бажаємо успіху!
      </p>
      <Row className="mt-3">
        <Button variant="primary" onClick={handleRedirectToTests} style={{ marginTop: '20px', marginRight: '10px' }}>
          Go to Tests
        </Button>
        <Button variant="primary" onClick={handleRedirectToTheory} style={{ marginTop: '20px' }}>
          Go to Theory
        </Button>
      </Row>
    </Container>
  );
}
