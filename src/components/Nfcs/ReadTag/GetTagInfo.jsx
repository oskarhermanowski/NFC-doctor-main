import logReadTag from "./LogReadTag";
import axios from "../../../axios";
import logReadTagInfo from "./LogReadTagInfo";
import { getDateAndTime } from "../../Date/GetDateAndTime";

export default async function getTagInfo(event) {
  const decoder = new TextDecoder();
  const record = event.message.records[0];
  const id = decoder.decode(record.data);
  const readTime = getDateAndTime();

  logReadTagInfo("Reading tag... Step[2/3]");

  try {
    const res = await axios.get('/nfcs/' + id);
    const data = res.data;

    logReadTagInfo("Success!");
    logReadTag(
      `Pacjent:\n` +
      `Imię: ${data.firstName}\n` +
      `Nazwisko: ${data.lastName}\n` +
      `PESEL: ${data.pesel}\n` +
      `Data urodzenia: ${data.birthDate}\n` +
      `Grupa krwi: ${data.bloodType}\n` +
      `Alergie: ${data.allergies}\n` +
      `Leki: ${data.medications}\n` +
      `Choroby przewlekłe: ${data.chronicDiseases}\n` +
      `Lekarz: ${data.assignedDoctorId}\n` +
      `Zapisano: ${data.timeStamp}\n` +
      `Odczytano: ${readTime}`
    );

  } catch (err) {
    logReadTagInfo("❌ Nie znaleziono rekordu w bazie danych");
    logReadTag(`Wartość z tagu:\n${id}`);
  }
}
