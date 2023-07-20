"use client";

import CardComponent from "../../../components/CardComponent";
import MasterTable from "../../../components/MasterTable";
import ADD_DEVICE from "../../../lib/addDevice";
import DELETE_DEVICE from "../../../lib/deleteDevice";
import UPDATE_DEVICE from "../../../lib/updateDevice";

export default async function Devices({ data, options, userId }) {
  function handleAdd(e) {
    let changes = e.data;
    delete changes.__KEY__;

    ADD_DEVICE({ ...changes, userId });
  }

  function handleDelete(e) {
    const id = e.data.id;
    DELETE_DEVICE(id);
  }
  function handleEdit(e) {
    const changes = e.changes[0].data;
    const id = e.changes[0].key.id;

    UPDATE_DEVICE(id, changes).then(() => window.location.reload());
  }

  const columns = [
    {
      field: "name",
      caption: "Name",
    },
    {
      field: "deviceTypeId",
      caption: "Type",
      options: options,
    },
  ];

  return (
    <CardComponent title="Devices" style={{ width: "100%" }}>
      <MasterTable
        allowAdd
        allowDelete
        allowUpdate
        editingMode="popup"
        popupTitle="Add device"
        searchPanel={false}
        columnChooser={false}
        dataSource={data}
        colAttributes={columns}
        onRowInserting={(e) => handleAdd(e)}
        onRowRemoving={(e) => handleDelete(e)}
        onSaving={(e) => handleEdit(e)}
      />
    </CardComponent>
  );
}
