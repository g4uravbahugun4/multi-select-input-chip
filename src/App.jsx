import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Chip from './Components/Chip';

function App() {
  const names = [
    { a: 'Gaurav Bahuguna' },
    { b: 'Animesh Chauhan' },
    { c: 'Vidushi Pandey' },
    { d: 'Akriti Chaudhary' },
    { e: 'Mitul Sharma' },
    { f: 'Bhawana Tiwari' },
    { g: 'Himanshu Joshi' },
    { h: 'Vivek Bisht' },
    { i: 'Sakshi Bhandari' },
    { j:'Garvit Malhan' },
    { k:'Gauri Shankar' }

  ];

  const avatarMapping = {
  a:'/man.png',
  b:'/gamer.png',
  c:'/woman.png',
  d:'/woman2.png',
  e:'/man2.png',
  f:'/woman.png',
  g:'/profile.png',
  h:'/gamer.png',
  i:'/woman2.png',
  j:'/man.png',
  k:'woman.png'

};
  const [namesList,setNamesList]=useState(names)
  const [suggestions, setSuggestions] = useState(names);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null); 
  const [selectedChips, setSelectedChips] = useState([]);
  const [focus,setFocus]=useState(false)


const handleChipClick = (index) => {
  const clickedChip = suggestions[index];

  // Check if any chip in selectedChips has the highlighted property
  const hasHighlightedChip = selectedChips.some((chip) => chip.highlighted);

  setSelectedChips((prevChips) => [...prevChips, clickedChip]);
  setInputValue('');

  setSuggestions((prevSuggestions) =>
    prevSuggestions.filter((suggestion) => suggestion !== clickedChip)
  );
  setNamesList((prevNames) =>
    prevNames.filter((name) => name !== clickedChip)
  );

  // Remove the highlighted property from any chip that has it
  if (hasHighlightedChip) {
    setSelectedChips((prevChips) =>
      prevChips.map((chip) => ({
        ...chip,
        highlighted: false,
      }))
    );
  }
};


const handleKeyDown = (e) => {
  if (e.key === 'Backspace' && inputValue === '') {
    if (selectedChips.length > 0) {
      const highlightedChipIndex = selectedChips.findIndex(
        (chip) => chip.highlighted
      );
      
      if (highlightedChipIndex !== -1) {
        const removedChip = selectedChips[highlightedChipIndex];
        const { highlighted, ...dataRemovedChip } = removedChip;
        // Add the removed chip back to the suggestions
        setSuggestions((prevNamesList) => [...prevNamesList, dataRemovedChip]);

        setSelectedChips((prevChips) => {
          const updatedChips = [...prevChips];
          updatedChips.splice(highlightedChipIndex, 1);

          return updatedChips;
        });
      } else {
        // Highlight the last selected chip
        const lastSelectedChipIndex = selectedChips.length - 1;
        setSelectedChips((prevChips) =>
          prevChips.map((chip, index) => ({
            ...chip,
            highlighted: index === lastSelectedChipIndex,
          }))
        );
      }
    }
  }
};
  

const onInputChange = (e) => {
  const inputText = e.target.value;
  setInputValue(inputText);
    const filteredSuggestions = namesList.filter((nameObj) => {
      const nameValue = Object.values(nameObj)[0].toLowerCase();
      const inputTextLower = inputText.toLowerCase();
      for (let i = 0; i < inputTextLower.length; i++) {
        if (nameValue[i] !== inputTextLower[i]) {
          return false;
        }
      }
      return true;
    });
    setSuggestions(filteredSuggestions);
};

  const handleFocus=()=>{
  setFocus(true)
  // setSuggestions(namesList)
  }
 
  return (
    <>
     {console.log("suggestions",suggestions)}
      <h1 className='text-blue-700 font-bold font-serif text-3xl text-center'>
        Pick User
      </h1>
      <div className='flex flex-wrap  w-full pl-3'>    
      {selectedChips.map((chip, index) => (
       <div key={index} className={`mt-4 border-b-2 p-3  text-xl ${focus?'border-blue-500': 'border-gray-500'} focus:outline-none flex items-center whitespace-nowrap border-b-1 `}> 
       <Chip
        key={index}
        name={Object.values(chip)[0]}
        type='chip'
        selectedChips={selectedChips}
        setSelectedChips={setSelectedChips}
        suggestions={suggestions}
        setSuggestions={setSuggestions}
        avatar={avatarMapping[Object.keys(chip)[0].toLowerCase()]}
        highlighted={chip.highlighted}
       />
       </div>
      ))}     
      
      

      <input
        ref={inputRef}
        onChange={onInputChange}
        placeholder='Add New User'
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        className='mt-4 border-b-2 p-3 w-1/2  text-xl border-gray-500 focus:outline-none focus:border-blue-500'
        value={inputValue}
      />
</div>
     {focus&&suggestions.length > 0 && (
        <ul className='mt-2 flex flex-col w-full'>
          {suggestions.map((nameObj, index) => {
            const initial = Object.keys(nameObj)[0].toLowerCase();
            const name = Object.values(nameObj)[0];
            const avatarSrc = avatarMapping[initial];

            return (
              <Chip
                key={index}
                avatar={avatarSrc}
                selectedChips={selectedChips}
                setSelectedChips={setSelectedChips}
                suggestions={suggestions}
                setSuggestions={setSuggestions}
                name={name}
                type='suggestion'
                onClick={() => handleChipClick(index)}
              />
            );
          })}
        </ul>
      )}

    </>
  );
}

export default App;
