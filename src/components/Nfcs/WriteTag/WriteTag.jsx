import axios from "../../../axios";
import { logWriteTag } from "./LogWriteTag";
import { logWriteTagInfo } from "./LogWriteTagInfo";
import { sleep } from "./Sleep";
import { enableButtons } from "../../ButtonActions/EnableButtons";
import { getDateAndTime } from "../../Date/GetDateAndTime";

export default async function writeTag(formData, retries = 2) {
    const ndef = new NDEFReader();
    
    const response = await axios.post("/nfcs", {
      ...formData,
});
var id = res.data._id.toString();
 await ndef.write(id);
}
