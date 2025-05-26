import "./WriteNFCComponent.css"
import { WriteTagComponent } from "./WriteTagComponent";

export function QrScannerComponent( { QrScanResult } ) {
    return (
        <div className="row-scanner">
            <label className="labl">WRITE NFC</label>
            <pre className="log-scanner" id="logQrScanRes"></pre>
            <WriteTagComponent QrScanResult={QrScanResult} />
        </div>
    );
}