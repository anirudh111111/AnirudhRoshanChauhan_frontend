import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

const SingleListItem = memo(({ index, onClickHandler, text, selectedIndex }) => {
  const isSelected = index === selectedIndex;
  
  const handleClick = () => {
    onClickHandler(index);
  };

  return (
    <li
      style={{ backgroundColor: isSelected ? 'green' : 'red'}}
      onClick={handleClick}
    >
      {text}
    </li>
  );
});

SingleListItem.propTypes = {
  index: PropTypes.number.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  selectedIndex: PropTypes.number,
};

const List = memo(({ items }) => {
  const [selectedIndex, setSelectedIndex] = useState(undefined);

  useEffect(() => {
    setSelectedIndex(undefined);
  }, [items]);

  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <ul style={{ textAlign: 'left' }}>
      {items.map(({ text }, index) => (
        <SingleListItem
          key={index}
          index={index}
          onClickHandler={handleClick}
          text={text}
          selectedIndex={selectedIndex}
        />
      ))}
    </ul>
  );
});

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ),
};

List.defaultProps = {
  items: null,
};

export default List;
