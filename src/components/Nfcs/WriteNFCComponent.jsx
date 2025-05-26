import "./WriteNFCComponent.css"
import { WriteTagComponent } from "./WriteTagComponent";

export function QrScannerComponent() {
    return (
        <div className="row-scanner">
            <label className="labl">WRITE NFC</label>
            <pre className="log-scanner" id="logQrScanRes"></pre>
            <WriteTagComponent/>
        </div>
    );
}