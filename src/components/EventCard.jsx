import { Card, Badge, Button } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { FiCalendar, FiMapPin, FiClock, FiExternalLink } from 'react-icons/fi'

export default function EventCard({ ev, i }){
  const d = new Date(ev.whenISO)
  const date = new Intl.DateTimeFormat('it-IT',{day:'2-digit',month:'long',year:'numeric'}).format(d)
  const time = new Intl.DateTimeFormat('it-IT',{hour:'2-digit',minute:'2-digit'}).format(d)
  const statusVariant = ev.status==='Debutto' ? 'warning' : ev.status==='Anteprima' ? 'info' : 'success'

  return (
    <motion.div whileHover={{scale:1.02}}>
      <Card className="h-100 shadow-sm" style={{background:'rgba(255,255,255,.04)',color:'#fff',border:'1px solid rgba(255,255,255,.12)'}}>
        <div className="ratio ratio-4x3">
          <img src={ev.poster} alt={`Locandina ${ev.title}`} className="w-100 h-100" style={{objectFit:'cover'}}
               onError={(e)=> e.currentTarget.src = `https://picsum.photos/seed/${i+10}/600/450`} />
        </div>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start mb-2">
            <Card.Title className="mb-0" style={{fontSize:'1rem',lineHeight:1.1}}>{ev.title}</Card.Title>
            <Badge bg={statusVariant}>{ev.status}</Badge>
          </div>
          <Card.Text className="mb-2 line-clamp-3" style={{opacity:.95}}>{ev.excerpt}</Card.Text>
          <div className="d-flex align-items-center gap-2 small mb-1"><FiCalendar/> <small>{date}</small></div>
          <div className="d-flex align-items-center gap-2 small mb-1"><FiClock/> <small>{time}</small></div>
          <div className="d-flex align-items-center gap-2 small mb-3"><FiMapPin/> <small>{ev.venue} — {ev.city}</small></div>
          <div className="d-flex justify-content-between align-items-center">
            <Button variant="light" size="sm" href={ev.link}>Prenota</Button>
            <a href={ev.link} className="text-decoration-none small" style={{color:'rgba(255,255,255,.85)'}}>Dettagli <FiExternalLink/></a>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  )
}
