import React from "react";
import copy from "copy-to-clipboard";
import { data } from "./data";

function App() {
  const inputRef = React.useRef(null);
  const afkNIMRef = React.useRef(null);
  const afkPerihalRef = React.useRef(null);

  const formatNumber = (num) => {
    if (parseInt(num) < 10) {
      return `0${num}`;
    } else {
      return `${num}`;
    }
  };

  const titleCase = (string) => {
    var sentence = string.toLowerCase().split(" ");
    for (var i = 0; i < sentence.length; i++) {
      sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }
    return sentence.join(" ");
  };

  const copyToClipboard = async () => {
    const value = inputRef.current.value;
    const person = data.find((item) => value === item.nim.slice(-3));
    if (!person) {
      alert("3 digit terakhir NIM tidak ditemukan.");
    } else {
      const toCopy = `${formatNumber(person.kelompok)} ${
        person.nim
      } ${titleCase(person.namaLengkap)}`;
      copy(toCopy);
      alert(`Copied "${toCopy}" to clipboard!`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    copyToClipboard();
  };
  const handleClick = () => {
    copyToClipboard();
  };

  function copyWithNewLine(stringWithNewLines) {
    const myFluffyTextarea = document.createElement("textarea");
    myFluffyTextarea.innerHTML = stringWithNewLines;
    const parentElement = document.querySelector(".afk-generator");
    parentElement.appendChild(myFluffyTextarea);
    myFluffyTextarea.select();
    document.execCommand("copy");
    parentElement.removeChild(myFluffyTextarea);
  }

  const generateAFK = () => {
    if (afkNIMRef.current.value && afkPerihalRef.current.value) {
      console.log("valid");
      const value = afkNIMRef.current.value;
      const person = data.find((item) => value === item.nim.slice(-3));
      if (!person) {
        alert("3 digit terakhir NIM tidak ditemukan.");
      } else {
        const kelompok = formatNumber(person.kelompok);
        const nama = titleCase(person.namaLengkap);
        const nim = person.nim;
        const toCopy = `NAMA: ${nama}\nNIM: ${nim}\nKELOMPOK: ${kelompok}\n${afkPerihalRef.current.value}`;
        copyWithNewLine(toCopy);
        alert(`Copied message to clipboard!`);
      }
    }
  };

  const handleSubmitAFK = (e) => {
    e.preventDefault();
    generateAFK();
  };

  return (
    <>
      <main>
        <h1 className="main-title">SPARTA 101</h1>
        <div className="tools">
          <div className="tool-container">
            <h2>Presensi to Clipboard</h2>
            <form className="form-absen" onSubmit={handleSubmit}>
              <label htmlFor="nim">
                Masukkan <strong>3 digit terakhir</strong> NIM:{" "}
              </label>
              <input
                type="number"
                className="input-absen"
                id="nim"
                ref={inputRef}
                placeholder="001"
              />
            </form>
            <button type="submit" className="btn" onClick={handleClick}>
              Copy to Clipboard
            </button>
            <p>
              Kirim ke <strong>MSDM Kader Kelompok</strong> yang sesuai{" "}
              <strong>di Zoom</strong> sesuai pada waktunya.
            </p>
          </div>
          <div className="tool-container">
            <h2>GUIDELINE</h2>
            <p>
              Bingung apa yang harus dilakukan sebelum/selama/setelah day
              <strong> (terutama perizinan)</strong>?
            </p>
            <p>Baca dulu guidelinenya!</p>
            <a
              href="https://drive.google.com/file/d/1PfFd9NYXPpbJm4aNsaH3-jvl5aS_rG3V/view?usp=sharing"
              target="_blank"
              className="btn"
            >
              Guideline SPARTA
            </a>
          </div>
          <div className="tool-container">
            <h2>PRESENSI</h2>
            <p>
              Banyak SPARTANS adalah <strong>276</strong> orang.
            </p>
            <a
              href="https://bit.ly/AbsenLokalSparta"
              target="_blank"
              className="btn"
            >
              Sheets Presensi
            </a>
          </div>
          <div className="tool-container">
            <h2>Izin Tidak Hadir</h2>
            <p>
              Ada kegiatan yang lebih penting/diproritaskan? Ikuti tahapan izin
              yang harus kalian lalui biar aman, ya!
            </p>
            <a
              href="https://docs.google.com/spreadsheets/d/1a7WbicwDinf8tYJucSqPlu-Q35Ow3uic24pSt79s1w4/edit#gid=584785785"
              className="btn"
              target="_blank"
            >
              Tahapan perizinan
            </a>
          </div>
        </div>
      </main>
      <section className="afk-generator">
        <div className="afk-generator-container">
          <h2>Ada keperluan sehingga perlu AFK dari Zoom?</h2>
          <p>
            Gunakan generator di bawah ini lalu kirim ke{" "}
            <strong>MSDM Kader pada milis</strong> via <strong>LINE!</strong>
          </p>
          <form onSubmit={handleSubmitAFK}>
            <div className="form-item">
              <label htmlFor="afk-nim">3 digit terakhir NIM:</label>
              <input
                type="number"
                id="afk-nim"
                placeholder="001"
                ref={afkNIMRef}
              />
            </div>
            <div className="form-item">
              <label htmlFor="afk-perihal">Perihal perizinan: </label>
              <textarea
                id="afk-perihal"
                cols="30"
                rows="10"
                placeholder="Izin ke toilet"
                ref={afkPerihalRef}
              ></textarea>
            </div>
            <button type="submit" className="btn" onClick={handleSubmitAFK}>
              Copy to Clipboard
            </button>
          </form>
        </div>
      </section>
      <footer className="footer">
        <div className="footer-overlay">
          <div className="footer-container">
            <h2>USEFUL LINKS</h2>
            <ul className="footer-links">
              <li>
                <a href="https://intip.in/spartanewo" target="_blank">
                  Kitab Owen
                </a>
              </li>
              <li>
                <a href="https://bit.ly/MengenalWargaHMIF" target="_blank">
                  List Mengenal Warga HMIF
                </a>
              </li>
              <li>
                <a href="https://www.sparta2020.tech" target="_blank">
                  Website SPARTA 2020
                </a>
              </li>
              <li>
                <a
                  href="https://groups.google.com/g/sparta_hmif_2020"
                  target="_blank"
                >
                  Milis SPARTA 2020
                </a>
              </li>
              <li>
                <a
                  href="https://docs.google.com/spreadsheets/d/1LqMdXlOltVS77B4mQJT9DoTs-fDpk6EkP1ePkZmtNZA/edit#gid=0"
                  target="_blank"
                >
                  Daftar Kelompok dan Buddies SPARTA 2020
                </a>
              </li>
              <li>
                <a href="https://bit.ly/KeperluanPesertaSPARTA" target="_blank">
                  Keperluan Peserta SPARTA
                </a>
              </li>
              <li>
                <a href="https://mengenal-spartans.netlify.app" target="_blank">
                  Game Mengenal SPARTANS
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
