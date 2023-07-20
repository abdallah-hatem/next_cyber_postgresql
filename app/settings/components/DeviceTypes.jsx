"use client";
import CardComponent from "../../../components/CardComponent";
import MasterTable from "../../../components/MasterTable";
import ADD_DEVICE_TYPE from "../../../lib/addDeviceType";
import DELETE_DEVICE_TYPE from "../../../lib/deleteDeviceType";
import UPDATE_DEVICE_TYPE from "../../../lib/updateDeviceType";

export default async function DeviceTypes({ data, userId }) {
  function handleAdd(e) {
    let changes = e.data;
    delete changes.__KEY__;

    ADD_DEVICE_TYPE({ ...changes, userId }).then(() =>
      window.location.reload()
    );
  }

  function handleEdit(e) {
    const changes = e.changes[0].data;
    const id = e.changes[0].key.id;

    UPDATE_DEVICE_TYPE(id, changes).then(() => window.location.reload());
  }

  function handleDelete(e) {
    const id = e.data.id;
    DELETE_DEVICE_TYPE(id);
  }

  const columns = [
    {
      field: "id",
      visible: false,
      allowEditing: false,
    },
    {
      field: "name",
      caption: "Name",
    },
    {
      field: "hourRateSingle",
      caption: "Hour Price (Single)",
      dataType: "number",
      format: "currency",
    },
    {
      field: "hourRateMulti",
      caption: "Hour Price (Multi)",
      dataType: "number",
      format: "currency",
    },
  ];

  return (
    <CardComponent
      title="Device Types"
      style={{ width: "100%", marginTop: 15 }}
    >
      <MasterTable
        allowAdd
        allowDelete
        allowUpdate
        editingMode="popup"
        popupTitle="Add a device type"
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
