import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = ({ text, link, bgColor }) => {
  return (
    <Link to={link} className={`px-6 py-3 rounded-lg text-lg font-semibold transition ${bgColor} hover:opacity-80`}>
      {text}
    </Link>
  );
};

export default CallToAction;
