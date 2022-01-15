import React, { useState } from "react";
import { Button, List, Popconfirm, Typography } from "antd";

import { PaperClipOutlined, CloseOutlined } from "@ant-design/icons";
import { IListItem } from "./interface";

const ListItem: React.FC<IListItem> = ({
  item,
  handleActionMoreInfo,
  handleActionRemove,
  ...res
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <List.Item {...res}>
      <List.Item.Meta
        // avatar={<Avatar  />}
        title={
          <Typography.Text>{`${item.name} ${item.lastname}`}</Typography.Text>
        }
        description={item.email}
      />
      <Button
        title="Mais Informações!"
        type="link"
        icon={<PaperClipOutlined />}
        onClick={() => {
          handleActionMoreInfo(item);
        }}
      />
      <Popconfirm
        title="Você tem certeza？"
        okText="Sim"
        cancelText="Não"
        onConfirm={() => {
          handleActionRemove(item);
        }}
      >
        <Button type="link" danger icon={<CloseOutlined />} />
      </Popconfirm>
    </List.Item>
  );
};

export default ListItem;
