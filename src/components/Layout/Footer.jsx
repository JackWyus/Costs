import { FaInstagram, FaTelegram, FaGithub } from 'react-icons/fa'
import { BsFacebook } from 'react-icons/bs'

import React from 'react'
import {Container, Gradient} from './Footer.js'

function Footer() {
  return (
    <>
    <Gradient></Gradient>
    <Container>
      <ul className="social_list">
        <li><FaInstagram/></li>
        <li><BsFacebook/></li>
        <li><FaGithub/></li>
        <li><FaTelegram/></li>
      </ul>
      <p className="copy_right"><span>Costs</span> &copy; 2022</p>
    </Container>
    </>
  )
};

export default Footer;