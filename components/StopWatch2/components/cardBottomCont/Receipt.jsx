export default function Receipt({ timer, getStartTime, charge }) {
  return (
    <>
      <p>Time: {timer()}</p>
      <p>Start Time: {getStartTime()}</p>
      <p>Charge: ${charge()}</p>
    </>
  );
}
