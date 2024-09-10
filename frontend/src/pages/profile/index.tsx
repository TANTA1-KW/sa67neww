import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

function UserEdit() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontFamily: "Kanit, sans-serif",
      }}
    >
      <Title level={1} style={{ fontSize: "150px", color: "#FF0000" }}>
        ทำไม่เป็นแล้วโว้ยยยย
      </Title>
    </div>
  );
}

export default UserEdit;
