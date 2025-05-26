import axios from "../../../axios";
import { logWriteTag } from "./LogWriteTag";
import { logWriteTagInfo } from "./LogWriteTagInfo";
import { sleep } from "./Sleep";
import { enableButtons } from "../../ButtonActions/EnableButtons";
import { getDateAndTime } from "../../Date/GetDateAndTime";

export default async function writeTag(formData, retries = 2) {
  if (!("NDEFReader" in window)) {
    logWriteTagInfo("Oops!");
    logWriteTag("WebNFC API isn't supported in this browser.");
    return;
  }

  if (!formData) {
    logWriteTagInfo("Oops!");
    logWriteTag("No data to write.");
    return;
  }

  const ndef = new NDEFReader();

  try {
    logWriteTag("");
    logWriteTagInfo("Sending data to the server...");

    const timeStamp = getDateAndTime();
    const response = await axios.post("/nfcs", {
      ...formData,
      timeStamp: timeStamp,
    });

    const id = response.data._id?.toString();
    if (!id) {
      throw new Error("No ID returned from server.");
    }

    logWriteTagInfo("Bring the tag near the reader...");
    await ndef.write(id);
    logWriteTagInfo("Success!");
    logWriteTag(`Written tag ID: ${id}\nAt: ${timeStamp}`);
  } catch (error) {
    if (retries > 0 && error.name !== "AbortError") {
      logWriteTag(`Writing failed. Retrying ${retries} more time(s)...`);
      await sleep(1000);
      return await writeTag(formData, retries - 1);
    }

    logWriteTagInfo("Oops!");
    logWriteTag("Can't write this tag.");
    enableButtons();
  }
}
