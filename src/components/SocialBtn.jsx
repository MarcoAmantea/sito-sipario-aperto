export default function SocialBtn({ href, label, children }){
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      className="d-inline-flex align-items-center justify-content-center"
      style={{width:44,height:44,borderRadius:999,background:'rgba(255,255,255,.1)',color:'#fff',border:'1px solid rgba(255,255,255,.15)',transition:'all .2s'}}
      onMouseEnter={(e)=> e.currentTarget.style.background='rgba(255,255,255,.2)'}
      onMouseLeave={(e)=> e.currentTarget.style.background='rgba(255,255,255,.1)'}
    >
      <span style={{fontSize:18,display:'inline-flex'}}>{children}</span>
    </a>
  )
}
