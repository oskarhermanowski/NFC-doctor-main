import axios from "../../../axios";
import { logWriteTag } from "./LogWriteTag";
import { logWriteTagInfo } from "./LogWriteTagInfo";
import { sleep } from "./Sleep";
import { enableButtons } from "../../ButtonActions/EnableButtons";
import { getDateAndTime } from "../../Date/GetDateAndTime";

export default async function writeTag(formData, retries = 2) {
  
    const timeStamp = getDateAndTime();
    const response = await axios.post("/nfcs", {
      ...formData,
      timeStamp: timeStamp,
    });
}
