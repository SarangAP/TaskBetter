import React, { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';

const MD_Renderer = ({ path }) => {
  const [md_content, setContent] = useState('');

  useEffect(() => {
    fetch(path)
      .then(response => response.text())
      .then(text => setContent(text))
      .catch(error => console.error('Something went wrong', error));
  }, [path]);

  return (
    <div className="md-renderer">
      <ReactMarkdown>{md_content}</ReactMarkdown>
    </div>
  );
};

export default MD_Renderer;
