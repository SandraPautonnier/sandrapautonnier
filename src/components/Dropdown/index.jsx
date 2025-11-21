import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import '../../sass/components/_dropdown.scss';

const Dropdown = ({ title, content, onSelectItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const toggle = () => setIsOpen(!isOpen);

  const handleItemClick = (item) => {
    if (onSelectItem) {
      onSelectItem(item);
    }
    setIsOpen(false);
  };

  return (
    <div className="container-dropdown">
      <div className="click-toggle" onClick={toggle}>
        <p>{title}</p>
        <button>
          <FontAwesomeIcon
            icon={faChevronUp}
            style={{
              transition: 'transform 0.2s ease-in-out',
              transform: isOpen ? 'rotate(-180deg)' : 'rotate(0deg)',
            }}
          />
        </button>
      </div>
      <div
        className={`content-dropdown ${isOpen ? "open" : "closed"}`}
        ref={contentRef}
        style={{
          height: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
          overflow: "hidden",
          transition: "height 0.2s ease-in-out",
        }}
      >
        {typeof content === "string" ? (
          <p className="content-drop">{content}</p>
        ) : content instanceof Array ? (
          <ul className="content-drop">
            {content.map((item, index) => (
              <li key={index} onClick={() => handleItemClick(item)} style={{ cursor: 'pointer' }}>
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default Dropdown;