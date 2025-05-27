import axios from "../../../axios";
import { logWriteTag } from "./LogWriteTag";
import { logWriteTagInfo } from "./LogWriteTagInfo";
import { sleep } from "./Sleep";
import { enableButtons } from "../../ButtonActions/EnableButtons";
import { getDateAndTime } from "../../Date/GetDateAndTime";

export default async function writeTag(formData, retries = 2) {
  const dateTime = getDateAndTime();

  // ✅ Sprawdzenie obsługi Web NFC
  if (!("NDEFReader" in window)) {
    logWriteTagInfo("Oops!");
    logWriteTag("WebNFC API isn't supported in this browser.");
    return;
  }

  try {
    // ✅ Zapis do bazy danych
    const response = await axios.post("/nfcs", {
      ...formData,
      timeStamp: dateTime,
    });

    const id = response.data._id.toString();
    logWriteTagInfo("✔️ Data saved to DB, now bring tag close to device...");

    // ✅ Zapis na tag NFC
    const ndef = new NDEFReader();
    await ndef.write(id);

    logWriteTagInfo("✅ Successfully written to NFC!");
    logWriteTag(`Written ID: ${id}`);

  } catch (error) {
    console.error("❌ Error during NFC write:", error);
    logWriteTagInfo("Oops!");
    logWriteTag("Error writing to NFC or database.");

    if (retries > 0 && error.name !== "AbortError") {
      await sleep(1000);
      return await writeTag(formData, retries - 1);
    }

    enableButtons(); // Optional: re-enable UI
  }
}
