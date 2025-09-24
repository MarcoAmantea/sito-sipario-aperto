import { Container } from 'react-bootstrap'
export default function Contact(){
  return (
    <section className="py-5" style={{background:'linear-gradient(180deg,#0f0f22,#0a0a12)'}}>
      <Container>
        <h1 className="mb-3" style={{ fontFamily:"'Playfair Display', serif" }}>Contatti</h1>
        <p style={{opacity:.9}}>Inserisci email di riferimento, canali social e modulo contatti.</p>
      </Container>
    </section>
  )
}
