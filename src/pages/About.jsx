import { Container } from 'react-bootstrap'
export default function About(){
  return (
    <section className="py-5" style={{background:'linear-gradient(180deg,#000,#0b0b12)'}}>
      <Container>
        <h1 className="mb-3" style={{ fontFamily:"'Playfair Display', serif" }}>Chi siamo</h1>
        <p style={{opacity:.9}}>Racconta la storia della compagnia, missione, traguardi e il team.</p>
      </Container>
    </section>
  )
}
