import React from "react";
import styled from "styled-components";

const StyledFilter = styled.div`
  text-align: center;
`;

const Filter = ({ onSetTag }) => {
  return (
    <StyledFilter>
      <p>Show</p>
      <form>
        <input
          type="radio"
          id="all"
          name="filter"
          onChange={() => onSetTag("all")}
        />
        <label htmlFor="all">All</label>

        <input
          type="radio"
          id="bird"
          name="filter"
          onChange={() => onSetTag("Birds")}
        />
        <label htmlFor="bird">Bird</label>

        <input
          type="radio"
          id="bread"
          name="filter"
          onChange={() => onSetTag("Bread")}
        />
        <label htmlFor="bread">Bread</label>

        <input
          type="radio"
          id="other"
          name="filter"
          onChange={() => onSetTag("Other")}
        />
        <label htmlFor="other">Other</label>
      </form>
    </StyledFilter>
  );
};

export default Filter;
