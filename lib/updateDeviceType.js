import { ApiBaseUrl } from "../Services/Config";
import REQUEST from "../Services/Request";

export default async function UPDATE_DEVICE_TYPE(id, data) {
  return await REQUEST({
    method: "PUT",
    url: ApiBaseUrl + `deviceTypes/${id}`,
    data,
  }).catch((error) => console.log(error));
}
