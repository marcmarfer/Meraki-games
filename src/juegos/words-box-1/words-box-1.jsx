import React, { useState } from 'react';
import './words-box-1.css';

const WordsBox1 = () => {
    const [words, setWords] = useState([
      { id: '1', content: 'alo' },
      { id: '2', content: 'me' },
      { id: '3', content: 'llamo' },
      { id: '4', content: 'Marc' },
    ]);
    const [wordsWithA, setWordsWithA] = useState([]);
  
    const onDragStart = (e, id, content) => {
      e.dataTransfer.setData('id', id);
      e.dataTransfer.setData('content', content);
    };
  
    const onDrop = (e, target) => {
      e.preventDefault();
      const id = e.dataTransfer.getData('id');
      const content = e.dataTransfer.getData('content');
      if (target === 'box-a' && content.startsWith('a')) {
        setWordsWithA(prevState => [...prevState, { id, content }]);
        setWords(prevState => prevState.filter(word => word.id !== id));
      }
    };
  
    const onDragOver = (e) => {
      e.preventDefault();
    };
  
    return (
      <div className='words-box-1-container'>
        <div
          onDrop={(e) => onDrop(e, 'box-1')}
          onDragOver={onDragOver}
          style={{ border: '1px solid black', padding: '10px', width: '200px', minHeight: '100px' }}
        >
          {words.map(word => (
            <div
              key={word.id}
              draggable
              onDragStart={(e) => onDragStart(e, word.id, word.content)}
              style={{ margin: '8px 0', cursor: 'move' }}
            >
              {word.content}
            </div>
          ))}
        </div>
        <div
          onDrop={(e) => onDrop(e, 'box-a')}
          onDragOver={onDragOver}
          style={{ marginTop: '20px', border: '1px solid green', padding: '10px', width: '200px', minHeight: '100px' }}
        >
          {wordsWithA.map(word => (
            <div key={word.id} style={{ margin: '8px 0' }}>
              {word.content}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default WordsBox1;