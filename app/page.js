import StopWatch from "../components/StopWatch";
import "./style.scss";
import StopWatch2 from "../components/StopWatch2";

import getDevices from "../lib/getDevices";
import AddDeviceCard from "../components/AddDeviceCard";

export default async function Home() {
  const data = await getDevices();

  function renderDevices() {
    return data?.map((el, index) => (
      <StopWatch2
        title={el.name}
        id={index}
        type={el.devicetype.name}
        hourRateSingle={el.devicetype.hourRateSingle}
        hourRateMulti={el.devicetype.hourRateMulti}
        key={index}
      />
    ));
  }

  return (
    <div className="devices-cont">
      {data.length > 0 ? renderDevices() : <AddDeviceCard />}
    </div>
  );
}
