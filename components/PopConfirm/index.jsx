"use client";
import { Popconfirm } from "antd";

export default function PopConfirm({
  children,
  onConfirm,
  onCancel,
  confirmText = "confirm",
  cancelText = "cancel",
  title = "title",
  description = " ",
  icon = false,
  placement = "bottomRight",
  disabled,
  okButtonStyle,
}) {
  return (
    <Popconfirm
      title={title}
      description={description}
      onConfirm={onConfirm}
      onCancel={onCancel}
      okText={confirmText}
      cancelText={cancelText}
      icon={icon}
      placement={placement}
      disabled={disabled}
      okButtonProps={{ style: okButtonStyle }}
    >
      {children}
    </Popconfirm>
  );
}
