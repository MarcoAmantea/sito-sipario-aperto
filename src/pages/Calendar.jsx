import { Container } from 'react-bootstrap'
export default function Calendar(){
  return (
    <section className="py-5" style={{background:'linear-gradient(180deg,#0b0b12,#0f0f22)'}}>
      <Container>
        <h1 className="mb-3" style={{ fontFamily:"'Playfair Display', serif" }}>Programmazione</h1>
        <p style={{opacity:.9}}>Qui potrai mostrare il calendario completo con tutte le date e la biglietteria.</p>
      </Container>
    </section>
  )
}
