"use client";
import CardComponent from "@/components/CardComponent";
import { PlusOutlined } from "@ant-design/icons";
import "./style.scss";
import LinkComponent from "../LinkComponent";

export default function AddDeviceCard() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <LinkComponent url={"/settings"}>
        <CardComponent className="add-card-container" title="">
          <PlusOutlined className="plus-icon" />
        </CardComponent>
      </LinkComponent>
      <h3>Add devices</h3>
    </div>
  );
}
