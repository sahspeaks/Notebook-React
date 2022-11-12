import React from "react";

export default function Alert(props) {
  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    <div style={{ height: "55px" }}>
      {/* {props.alert && ( */}
        <div
          className={`alert alert-success alert-dismissible fade show`}
          role="alert"
        >
          <strong>Success</strong>: {props.msg}
        </div>
      {/* )} */}
    </div>
  );
}

// ${props.alert.type}
// {capitalize(props.alert.type)}