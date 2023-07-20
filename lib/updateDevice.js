import { ApiBaseUrl } from "../Services/Config";
import REQUEST from "../Services/Request";

export default async function UPDATE_DEVICE(id, data) {
  return await REQUEST({
    method: "PUT",
    url: ApiBaseUrl + `devices/${id}`,
    data,
  }).catch((error) => console.log(error));
}
