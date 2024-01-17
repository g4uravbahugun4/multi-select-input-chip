import React from 'react';

function Chip({selectedChips,suggestions,setSuggestions,setSelectedChips,type, name, avatar, onClick,highlighted }) {
  const ClassName = type==='suggestion' ? 'relative w-1/3 cursor-pointer border-2 mt-2 mb-2 m-auto rounded-xl px-6 flex items-center bg-gray-200 text-black font-semibold text-xl hover:border-blue-400' : `relative border-1 m-auto rounded-sm px-2 flex items-center bg-gray-200 text-black font-semibold py-1 text-xs hover:border-blue-400 ${highlighted ?'border-2 border-red-500':''}`;

  const imageClass=type==='suggestion'?'h-14 w-14 p-2':'h-6 w-6 p-0.5'

   const removeChip = () => {
 
    const chipIndex = selectedChips.findIndex(chip => Object.values(chip)[0] === name);
    console.log(chipIndex)
    if (chipIndex !== -1) {
      const removedChip = selectedChips[chipIndex];
      const hasHighlight = removedChip.hasOwnProperty('highlighted');

    // If 'highlighted' property is present, set it to false before adding to suggestions
    if (hasHighlight) {
    removedChip.highlighted = false;
    }
    setSuggestions((prevNamesList) => [...prevNamesList, removedChip]);
    const updatedChips = [...selectedChips];
    updatedChips.splice(chipIndex, 1);
    setSelectedChips(updatedChips);
    }
  };
  return (
    <div
      className={`${ClassName}`}
      onClick={onClick}
    >
      <img className={`${imageClass}`} src={avatar} alt={`${name}_avatar`} />
      <span className='ml-3'>{name}</span>
      {type==='chip'&&<button onClick={removeChip} className=' bg-red-500 text-white text-[6px] leading-[12px] px-1 rounded-full absolute -top-1 left-[94%]'>X</button>}
    </div>
  );
}


export default Chip;
