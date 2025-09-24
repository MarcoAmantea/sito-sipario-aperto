import { motion } from 'framer-motion'

export default function ReviewsMarquee({ items }){
  const row = [...items, ...items]
  return (
    <div className="marquee-mask">
      <motion.div initial={{x:0}} animate={{x:'-50%'}} transition={{repeat:Infinity, duration:26, ease:'linear'}}
        style={{ display:'flex', gap:16, width:'200%' }}>
        {row.map((q, idx)=>(
          <figure key={idx} className="p-3 p-md-4 rounded"
            style={{ background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.12)', color:'#fff', minWidth:360, maxWidth:460}}>
            <blockquote className="mb-2" style={{fontStyle:'italic'}}>“{q.text}”</blockquote>
            <figcaption style={{opacity:.85, fontSize:14}}>— {q.author}</figcaption>
          </figure>
        ))}
      </motion.div>
    </div>
  )
}
