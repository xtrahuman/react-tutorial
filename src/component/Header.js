import React from 'react';
/* eslint-disable */
const Header = () => {

    const headerStyle = {
      padding: "20px 0",
      lineHeight: "1.5em",
    }
    return (
      <header const={headerStyle}>
        <h1 style={{
        fontSize: "6rem",
        fontWeight: "600",
        marginBottom: "2rem",
        lineHeight: "1em",
        color: "#ececec",
        textTransform: "lowercase",
        textAlign: "center",
      }}>Todo list</h1>
      </header>
    );

}

export default Header;
/* eslint-disable */