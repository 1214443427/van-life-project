import React, { useRef, useState } from 'react'
import { useOutletContext } from 'react-router-dom'


function HostVansPhotos() {
  const [index, setIndex] = useState(0)
  const [vanData, setVanData] = useOutletContext()
  console.log(vanData)
  const modalRef = useRef(null)
  const imgRef = useRef(null)
  
  function toggleModal(index){
    modalRef.current.classList.toggle("visible")
    setIndex(index)
    imgRef.current.src = vanData.imageUrlArray[index]
  }

  function changeImg(event, direction){
    event.stopPropagation()
    if(index == 0 && direction===-1) return null
    if(index == vanData.imageUrlArray.length-1  && direction===1) return null
    imgRef.current.src = vanData.imageUrlArray[index + direction]
    setIndex(index + direction)
  }

  return (
    <div>
      <div className='modal-container' ref={modalRef} onClick={toggleModal}>
        <button onClick={(event)=>changeImg(event, -1)}>{'<'}</button>
        <img className='modal-images' ref={imgRef}/>
        <button onClick={(event)=>changeImg(event, 1)}>{'>'}</button>
      </div>
      <div className='host-vans-photos'>
      {vanData.imageUrlArray? vanData.imageUrlArray?.map((van, index)=><img 
          src={van} 
          className='host-vans-photos-images'
          onClick={()=>toggleModal(index)}
          id={index}
          key={index}
          />): "Could not find any photos"}
      </div>
    </div>
  )
}

export default HostVansPhotos