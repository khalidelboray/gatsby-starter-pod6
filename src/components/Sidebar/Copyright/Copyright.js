// @flow strict
import React from 'react';
import styles from './Copyright.module.scss';


const Copyright = ({ copyright }) => (
  <div className={styles['copyright']} dangerouslySetInnerHTML={{ __html: copyright }} /> 
);

export default Copyright;
