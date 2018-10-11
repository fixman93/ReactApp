import React from 'react'
import uiDesigner from 'assets/images/icons/fill-1.svg'
import uxDesigner from 'assets/images/icons/101-location.svg'
import uxResearcher from 'assets/images/icons/101-settings-1.svg'
import uiUxDesigner from 'assets/images/icons/101-browser-5.svg'
import graphicDesigner from 'assets/images/icons/101-vector.svg'
import productDesigner from 'assets/images/icons/101-idea.svg'
import serviceDesign from 'assets/images/icons/101-network.svg'
import backendDeveloper from 'assets/images/icons/101-laptop-9.svg'
import frontendDeveloper from 'assets/images/icons/101-browser-7.svg'
import devopsEngineer from 'assets/images/icons/101-networking.svg'
import fullstackDeveloper from 'assets/images/icons/101-coding-1.svg'
import dataEngineer from 'assets/images/icons/101-settings-3.svg'
import './ProfessionList.css'

export const ProfessionList = () => (
  <ul className='profession-list'>
    <li>
      <img src={uiDesigner} alt='UI Designer' />
      <span>UI Designer</span>
    </li>
    <li>
      <img src={uxDesigner} alt='UX Designer' />
      <span>UX Designer</span>
    </li>
    <li>
      <img src={uxResearcher} alt='UX Researcher' />
      <span>UX Researcher</span>
    </li>
    <li>
      <img src={uiUxDesigner} alt='UI & UX Designer' />
      <span>UI & UX Designer</span>
    </li>
    <li>
      <img src={graphicDesigner} alt='Graphic Designer' />
      <span>Graphic Designer</span>
    </li>
    <li>
      <img src={productDesigner} alt='Product Designer' />
      <span>Product Designer</span>
    </li>
    <li>
      <img src={serviceDesign} alt='Service Design' />
      <span>Service Design</span>
    </li>
    <li>
      <img src={backendDeveloper} alt='Backend Developer' />
      <span>Backend Developer</span>
    </li>
    <li>
      <img src={frontendDeveloper} alt='Frontend Developer' />
      <span>Frontend Developer</span>
    </li>
    <li>
      <img src={devopsEngineer} alt='Devops Engineer' />
      <span>Devops Engineer</span>
    </li>
    <li>
      <img src={fullstackDeveloper} alt='Stack Developer' />
      <span>Full Stack Developer</span>
    </li>
    <li>
      <img src={dataEngineer} alt='Data Engineer' />
      <span>Data Engineer</span>
    </li>
  </ul>
)

export default ProfessionList
