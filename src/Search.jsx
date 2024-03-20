import React, { useState } from 'react';
import data from './words.json';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedWord, setSelectedWord] = useState('');
  const [history, setHistory] = useState('');
  
  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if(searchTerm.endsWith(" ") && searchTerm.length > 0) {
      setHistory(searchTerm);
    } else if (searchTerm.endsWith("") && searchTerm.length == 0) {
      setHistory("");
    }

    const words = term.trim().split(' ');
    const lastWord = words[words.length - 1];
    setSelectedWord(lastWord);

    if (lastWord.length > 0) {
      const filteredResults = data.filter((result) =>
        result.data.toLowerCase().startsWith(lastWord.toLowerCase())
      );
      setSearchResults(filteredResults.slice(0, 10));
    } else {
      setSearchResults([]);
    }
  };

  const handleResultClick = (result) => {
    const selected = result.data.split(' ')[0];
    setSelectedWord(selected);
    setSearchTerm((prevTerm) => {
      const prevWords = prevTerm.trim().split(' ');
      prevWords.pop();
      return `${prevWords.join(' ')} ${selected} `;
    });
    setSearchResults([]);
    setHistory("")
  };

  return (
    <div className='container'>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {searchResults.length > 0 && (
        <ul>
          {searchResults.map((result) => (
            <li
              key={result.data}
              onClick={() => handleResultClick(result)}
              style={{ cursor: 'pointer' }}
            >
              {history + result.data}
            </li>
          ))}
        </ul>
      )}
      <div>
        Selected Input: {searchTerm}
        <br />
        Selected Word: {selectedWord}
      </div>
      <button>Search</button>
    </div>
  );
};

export default Search;
