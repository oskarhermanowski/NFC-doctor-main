import "./styles.css";
import { useEffect, useState } from "react";
import { ReadTagComponent } from "./components/Nfcs/ReadTagComponent";
import NavComponent from "./components/Nav/NavComponent";
import { QrScannerComponent } from "./components/Nfcs/WriteNFCComponent";


export default function App(){

  const [QrScanResult, setQrScanResult] = useState(undefined)
  const [QRs, setQRs] = useState(() => {
    const localValue = localStorage.getItem("QRs")
    if (localValue == null) return []
    return JSON.parse(localValue)
  });

  useEffect(() =>{
    localStorage.setItem("QRs", JSON.stringify(QRs))
  }, [QRs]);

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
  <>
    <form onSubmit={handleSubmit} className="new-item-form">
      <NavComponent />
      <ReadTagComponent />   
      <QrScannerComponent QrScanResult={QrScanResult} />
    </form>
  </>
  );
}