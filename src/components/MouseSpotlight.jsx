import { useEffect } from 'react'
export default function MouseSpotlight(){
  useEffect(()=>{
    const el = document.getElementById('spotlightLayer')
    if(!el) return
    const onMove = (e)=>{
      el.style.setProperty('--x', e.clientX+'px')
      el.style.setProperty('--y', e.clientY+'px')
    }
    window.addEventListener('pointermove', onMove)
    return ()=> window.removeEventListener('pointermove', onMove)
  },[])
  return null
}
