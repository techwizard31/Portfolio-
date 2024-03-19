import React from 'react';
import { useState,useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { styles } from '../style';
import { EarthCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';

const Contact = () => {
  const formRef = useRef();
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [message,setMessage]=useState('');
  const [isloading,setIsloading]=useState(false)

  const handleSubmit = (e)=>{
    e.preventDefault();
    setIsloading(true)
    emailjs.send( 'service_4rwq7qu', 'template_do9bz1b', {
      from_name: name,
      to_name: 'Istaprasad',
      from_email: email,
      to_email: 'istaprasad.patra@gmail.com',
      message: message,
    }, 'I-S-JlrpMC7v_hVgs').then(()=>{
      setIsloading(false)
      alert(' Thank you. I will get back to you as soon as possible. ')
      setName('')
      setEmail('')
      setMessage('')
    }, (error)=>{
      setIsloading(false)
      alert('Something went wrong')
      console.log(error)
    })

  }

  return (
    <div className='xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden'>
      <motion.div variants={slideIn('left','tween',0.2,1)} className='flex-[0.75] bg-black-100 p-8 rounded-2xl'>
        <p className={styles.heroSubText}>Get In Touch</p>
        <h3 className={styles.heroHeadText}>Contact.</h3>
        <form action="" ref={formRef} onSubmit={handleSubmit} className='mt-12 flex flex-col gap-8'>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
             <input type="text" name='name'value={name} onChange={(e)=>setName(e.target.value)} placeholder="What's your name ?" className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'/>
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Email</span>
             <input type="email" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="What's your email ?" className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'/>
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Message</span>
             <textarea value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="What do you want to say ?" className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'/>
          </label>
          <button type='submit' className='bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl'>{isloading ? 'Sending...':'Sent'}</button>
        </form>
      </motion.div>
      <motion.div variants={slideIn('left','tween',0.2,1)} className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'>
        <EarthCanvas />
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact,"contact")