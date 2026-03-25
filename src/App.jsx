import { useState, useRef, useCallback, useEffect } from 'react'
import './App.css'

// ── CSV Parser ────────────────────────────────────────────────────────────────
function parseCSV(text) {
  const lines = text.trim().split("\n");
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map((h) => h.trim().replace(/^@/, ""));
  return lines.slice(1).map((line) => {
    const cols = [];
    let cur = "", inQ = false;
    for (let i = 0; i < line.length; i++) {
      if (line[i] === '"') { inQ = !inQ; continue; }
      if (line[i] === "," && !inQ) { cols.push(cur.trim()); cur = ""; continue; }
      cur += line[i];
    }
    cols.push(cur.trim());
    const obj = {};
    headers.forEach((h, i) => { obj[h] = cols[i] || ""; });
    console.log("obj from the parseCSV", obj)
    return obj;
  });
}

// ── Institute Constants ───────────────────────────────────────────────────────
const INST = {
  name: "SD Campus",
  line1: "Near Tehsil, Sonakpur",
  line2: "Stadium Road, Moradabad (UP) 244001",
  office: "+91 81265 55333 / 222",
  website: "www.scholarsden.in",
  emergency: "+91 8868036333",
};

// Card size: portrait 5.4cm × 8.5cm
const CW = "54mm";
const CH = "85mm";

// ── Graduation Cap SVG — matches the dark mortarboard in the PDF ──────────────
function GradCap({ width = 64 }) {
  return (
    <svg width={width} height={width * 0.72} viewBox="0 0 160 115" xmlns="http://www.w3.org/2000/svg">
      {/* flat diamond top board */}
      <polygon points="80,8 158,42 80,76 2,42" fill="#1e1e1e" />
      {/* left side of cap body */}
      <polygon points="2,42 2,42 30,56 30,88 2,74" fill="#111" />
      {/* right side of cap body */}
      <polygon points="158,42 158,74 130,88 130,56" fill="#111" />
      {/* front face of cap body */}
      <polygon points="30,56 130,56 130,88 30,88" fill="#1a1a1a" />
      {/* tassel cord */}
      <rect x="148" y="42" width="5" height="38" rx="2.5" fill="#1a1a1a" />
      {/* tassel hanging end */}
      <rect x="143" y="78" width="15" height="22" rx="3" fill="#1a1a1a" />
      {/* tassel tip */}
      <rect x="147" y="98" width="7" height="10" rx="2" fill="#111" />
    </svg>
  );
}

// ── FRONT CARD — exact match to PDF template ──────────────────────────────────
// Layout top→bottom (all centred):
//   white bar · grad cap · circular photo ·
//   Roll No. · STUDENT NAME · divider · BLOOD GROUP: X · +91 XXXXXXXXXX
function CardFront({ student }) {
  return (
    <div style={{
      width: CW, height: CH,
      background: "#CC0000",
      borderRadius: "4mm",
      overflow: "hidden",
      boxSizing: "border-box",
      fontFamily: "'Arial Black', 'Arial', sans-serif",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flexShrink: 0,
      position: "relative",
    }}>

      {/* ① thin white horizontal accent bar */}
      <div style={{
        width: "38%",
        height: "3.5px",
        background: "#fff",
        borderRadius: "2px",
        marginTop: "6.5mm",
      }} />

      {/* ② graduation cap */}
      <div style={{ marginTop: "3.5mm", lineHeight: 0 }}>
        <GradCap width={62} />
      </div>

      {/* ③ circular photo with thick white border */}
      <div style={{
        width: "28mm",
        height: "28mm",
        borderRadius: "50%",
        border: "3.5px solid #fff",
        overflow: "hidden",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "3mm",
        flexShrink: 0,
      }}>
        {student._photoUrl
          ? <img src={student._photoUrl} alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          : <svg viewBox="0 0 56 56" width="56" height="56" xmlns="http://www.w3.org/2000/svg">
              <circle cx="28" cy="20" r="12" fill="#CC0000" />
              <ellipse cx="28" cy="47" rx="19" ry="14" fill="#CC0000" />
            </svg>
        }
      </div>

      {/* ④ Roll No. */}
      <div style={{
        marginTop: "4mm",
        fontSize: "8pt",
        fontWeight: 400,
        fontFamily: "'Arial', sans-serif",
        letterSpacing: "0.1mm",
        textAlign: "center",
      }}>
        Roll No. <span style={{ fontWeight: 700 }}>{student['Roll_No.']}</span>
      </div>

      {/* ⑤ STUDENT NAME — bold, large, uppercase */}
      <div style={{
        marginTop: "1.8mm",
        fontSize: "13pt",
        fontWeight: 600,
        fontFamily: "'Arial Black', 'Arial', sans-serif",
        textTransform: "uppercase",
        textAlign: "center",
      }}>
        {student.Student_Name}
      </div>

      {/* ⑥ divider */}
      <div style={{
        width: "80%",
        height: "1px",
        background: "rgba(255,255,255,0.5)",
      }} />

      {/* ⑦ BLOOD GROUP */}
      <div style={{
        fontSize: "9pt",
        fontWeight: 700,
        fontFamily: "'Arial', sans-serif",
        letterSpacing: "0.5mm",
        textAlign: "center",
      }}>
        BLOOD GROUP: {student.Blood_Group}
      </div>

      {/* ⑧ Phone number */}
      <div style={{
        marginTop: "2mm",
        fontSize: "9.5pt",
        fontWeight: 700,
        fontFamily: "'Arial', sans-serif",
        letterSpacing: "0.6mm",
        textAlign: "center",
      }}>
        +91 {student.Father_Contact}
      </div>

    </div>
  );
}

// ── BACK CARD — exact match to PDF back template ──────────────────────────────
// Layout top→bottom:
//   [white body — student fields]
//   [light grey — SD Campus fixed info + Authorised Signatory]
//   [red bottom strip — entry notice]
function CardBack({ student }) {
  return (
    <div style={{
      width: CW, height: CH,
      background: "#fff",
      borderRadius: "4mm",
      overflow: "hidden",
      boxSizing: "border-box",
      fontFamily: "'Arial', sans-serif",
      color: "#222",
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
      border: "0.5px solid #ccc",
    }}>

      {/* ── WHITE BODY: per-student fields ── */}
      <div style={{
        flex: 1,
        padding: "5mm 4.5mm 3mm",
        display: "flex",
        flexDirection: "column",
        gap: "3mm",
      }}>
        <BRow label="Father's Name" value={student.Father_Name} />
        <BRow label="Mother's Name" value={student.Mother_Name} />
        <BRow label="Contact No." value={student.Father_Contact} />
        <div style={{ fontSize: "7.5pt", lineHeight: 1.5, color: "#222" }}>
          <span style={{ fontWeight: 700, color: "#111" }}>Address: </span>
          {student.Address}
        </div>

        {/* Authorised Signatory — inside white area, right-aligned */}
        <div style={{
          marginTop: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          paddingTop: "2mm",
        }}>
          {/* blank box for signature */}
          <div style={{
            width: "22mm",
            height: "10mm",
            border: "0.8px solid #aaa",
            borderRadius: "1mm",
            background: "#fafafa",
          }} />
          <div style={{ fontSize: "6pt", color: "#444", marginTop: "1mm", textAlign: "right", lineHeight: 1.4 }}>
            Authorised Signatory:
          </div>
        </div>
      </div>

      {/* ── LIGHT GREY: fixed institute info ── */}
      <div style={{
        background: "#f0f0f0",
        borderTop: "0.5px solid #ddd",
        padding: "3mm 4.5mm",
        flexShrink: 0,
      }}>
        <div style={{ fontSize: "7pt", fontWeight: 700, color: "#111", marginBottom: "1mm" }}>
          SD Campus: Near Tehsil, Sonakpur Stadium Road,
        </div>
        <div style={{ fontSize: "6.5pt", color: "#333", lineHeight: 1.65 }}>
          Moradabad (UP) 244001<br />
          Office: {INST.office}<br />
          {INST.website}
        </div>
        <div style={{ marginTop: "1.5mm", fontSize: "6.5pt", color: "#222", lineHeight: 1.5 }}>
          <span style={{ fontWeight: 700 }}>Emergency Contact- </span>{INST.emergency}
        </div>
      </div>

      {/* ── RED BOTTOM STRIP: entry notice ── */}
      <div style={{
        background: "#CC0000",
        color: "#fff",
        padding: "2.5mm 4mm",
        fontSize: "5.8pt",
        textAlign: "center",
        lineHeight: 1.55,
        fontWeight: 500,
        flexShrink: 0,
      }}>
        Please show this ID card at the time of entry in the institute premises.
      </div>

    </div>
  );
}

function BRow({ label, value }) {
  return (
    <div style={{ fontSize: "7.5pt", lineHeight: 1.4, color: "#222" }}>
      <span style={{ fontWeight: 700, color: "#111" }}>{label}: </span>
      <span>{value}</span>
    </div>
  );
}

// ── Upload Box component ──────────────────────────────────────────────────────
function UploadBox({ title, hint, icon, dropText, isDragOver, onDragOver, onDragLeave, onDrop, onClick, success }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "12px", padding: "22px", border: "1px solid rgba(255,255,255,0.1)" }}>
      <h3 style={{ margin: "0 0 10px", fontSize: "14px", color: "#ff9999" }}>{title}</h3>
      <p style={{ fontSize: "11px", opacity: 0.6, margin: "0 0 14px", lineHeight: 1.65 }}>{hint}</p>
      <div
        onDragOver={(e) => { e.preventDefault(); onDragOver(); }}
        onDragLeave={onDragLeave}
        onDrop={(e) => { e.preventDefault(); onDrop(Array.from(e.dataTransfer.files)); }}
        onClick={onClick}
        style={{
          border: `2px dashed ${isDragOver ? "#fff" : "rgba(255,255,255,0.22)"}`,
          borderRadius: "10px", padding: "26px",
          textAlign: "center", cursor: "pointer",
          transition: "all 0.2s",
          background: isDragOver ? "rgba(204,0,0,0.15)" : "transparent",
        }}
      >
        <div style={{ fontSize: "30px" }}>{icon}</div>
        <div style={{ marginTop: "8px", fontSize: "11px", opacity: 0.65 }}>{dropText}</div>
      </div>
      {success && (
        <div style={{ marginTop: "10px", padding: "8px 12px", background: "rgba(0,210,0,0.1)", borderRadius: "7px", fontSize: "11px", color: "#88ff88" }}>
          {success}
        </div>
      )}
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
function App() {
  const [students, setStudents] = useState([]);
  const [photos, setPhotos]     = useState({});
  const [view, setView]         = useState("import");
  const [flipMap, setFlipMap]   = useState({});   // which preview cards show back
  const [manualForm, setManualForm] = useState({
    Roll_No:"", Student_Name:"", Father_Name:"", Mother_Name:"",
    Father_Contact:"", Mother_Contact:"", Blood_Group:"", Address:"",
  });
  const [manualPhoto, setManualPhoto] = useState(null);
  const [dragCSV,  setDragCSV]  = useState(false);
  const [dragImg,  setDragImg]  = useState(false);

  const csvRef         = useRef();
  const photoFolderRef = useRef();
  const manualPhotoRef = useRef();

  const enriched = students.map((s) => ({
    ...s, _photoUrl: photos[String(s.Roll_No)] || null,
  }));

  useEffect(()=>{
    console.log("students from the useEffect", students)
  }, [students])

  const handleCSV = (file) => {
    const r = new FileReader();
    console.log("Reading CSV file", file);
    console.log("Reading CSV file", );
    r.onload = (e) => { 
      console.log("e from  the handleCSV", e.target.result);
      setStudents(parseCSV(e.target.result)); setView("preview"); };
    r.readAsText(file);
  };

  const handlePhotoFolder = (files) => {
    const next = { ...photos };
    Array.from(files).forEach((file) => {
      const roll = file.name.replace(/\.[^/.]+$/, "");
      const r = new FileReader();
      r.onload = (e) => { next[roll] = e.target.result; setPhotos({ ...next }); };
      r.readAsDataURL(file);
    });
  };

  const handlePrint = useCallback(() => {
    const el = document.getElementById("print-area");
    if (!el) return;
    el.style.display = "block";
    window.print();
    setTimeout(() => { el.style.display = "none"; }, 800);
  }, []);

  const handleManualAdd = () => {
    if (!manualForm.Roll_No || !manualForm.Student_Name) return;
    setStudents((prev) => {
      const idx = prev.findIndex((s) => s.Roll_No === manualForm.Roll_No);
      if (idx >= 0) { const a = [...prev]; a[idx] = { ...manualForm }; return a; }
      return [...prev, { ...manualForm }];
    });
    if (manualPhoto) setPhotos((p) => ({ ...p, [manualForm.Roll_No]: manualPhoto }));
    setManualForm({ Roll_No:"", Student_Name:"", Father_Name:"", Mother_Name:"", Father_Contact:"", Mother_Contact:"", Blood_Group:"", Address:"" });
    setManualPhoto(null);
    setView("preview");
  };

  const photoCount   = Object.keys(photos).length;
  const matchedCount = students.filter((s) => photos[s.Roll_No]).length;

  const NavBtn = ({ v, label }) => (
    <button onClick={() => setView(v)} style={{
      padding: "8px 20px", borderRadius: "6px", border: "none", cursor: "pointer",
      fontWeight: 700, fontSize: "12px",
      background: view === v ? "#fff" : "rgba(255,255,255,0.14)",
      color: view === v ? "#CC0000" : "#fff",
      transition: "all 0.18s",
    }}>{label}</button>
  );

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(140deg, #180000 0%, #2c0000 55%, #180000 100%)",
      fontFamily: "'Arial', sans-serif",
      color: "#fff",
    }}>
      {/* ── Header ── */}
      <div style={{
        background: "linear-gradient(90deg, #CC0000, #990000)",
        padding: "13px 28px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        boxShadow: "0 4px 28px rgba(0,0,0,0.55)",
      }}>
        <div>
          <div style={{ fontSize: "17px", fontWeight: 900, letterSpacing: "0.4px" }}>🎓 SD Campus — ID Card Generator</div>
          <div style={{ fontSize: "10px", opacity: 0.72, marginTop: "2px" }}>Scholars Den · Moradabad · {INST.office}</div>
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <NavBtn v="import" label="📂 Import" />
          <NavBtn v="manual" label="✏️ Manual" />
          <NavBtn v="preview" label={`👁 Preview (${students.length})`} />
          {students.length > 0 && (
            <button onClick={handlePrint} style={{
              padding: "8px 20px", borderRadius: "6px",
              border: "2px solid rgba(255,255,255,0.85)",
              cursor: "pointer", fontWeight: 800, fontSize: "12px",
              background: "transparent", color: "#fff",
            }}>🖨 Print All</button>
          )}
        </div>
      </div>

      <div style={{ padding: "24px 28px", maxWidth: "1200px", margin: "0 auto" }}>

        {/* ── IMPORT ── */}
        {view === "import" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <UploadBox
              title="📄 Step 1 — Upload Student CSV"
              hint={<>Columns: <code style={{ background: "rgba(255,255,255,0.1)", padding: "1px 5px", borderRadius: "3px", fontSize: "10px" }}>Roll_No, Student_Name, Father_Name, Mother_Name, Father_Contact, Mother_Contact, Blood_Group, Address</code></>}
              icon="📊" dropText="Drop .csv here or click to browse"
              isDragOver={dragCSV}
              onDragOver={() => setDragCSV(true)} onDragLeave={() => setDragCSV(false)}
              onDrop={(files) => { setDragCSV(false); if (files[0]) handleCSV(files[0]); }}
              onClick={() => csvRef.current.click()}
              success={students.length > 0 ? `✅ ${students.length} students loaded` : null}
            />
            <input ref={csvRef} type="file" accept=".csv" style={{ display:"none" }}
              onChange={(e) => { if (e.target.files[0]) handleCSV(e.target.files[0]); }} />

            <UploadBox
              title="📸 Step 2 — Upload Student Photos"
              hint={<>Name each photo by Roll No. e.g. <code style={{ background: "rgba(255,255,255,0.1)", padding: "1px 5px", borderRadius: "3px", fontSize: "10px" }}>2026120007.jpg</code> — select multiple files at once</>}
              icon="🗂" dropText="Drop all photos here or click to select"
              isDragOver={dragImg}
              onDragOver={() => setDragImg(true)} onDragLeave={() => setDragImg(false)}
              onDrop={(files) => { setDragImg(false); handlePhotoFolder(files); }}
              onClick={() => photoFolderRef.current.click()}
              success={photoCount > 0 ? `✅ ${photoCount} photos — ${matchedCount} / ${students.length} matched` : null}
            />
            <input ref={photoFolderRef} type="file" accept="image/*" multiple style={{ display:"none" }}
              onChange={(e) => handlePhotoFolder(e.target.files)} />
          </div>
        )}

        {/* ── MANUAL ── */}
        {view === "manual" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "28px", alignItems: "start" }}>
            <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "12px", padding: "22px", border: "1px solid rgba(255,255,255,0.1)" }}>
              <h3 style={{ margin: "0 0 16px", fontSize: "14px", color: "#ff9999" }}>✏️ Add / Edit Student</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "11px" }}>
                {[
                  ["Roll_No","Roll Number *"],["Student_Name","Student Name *"],
                  ["Father_Name","Father's Name"],["Mother_Name","Mother's Name"],
                  ["Father_Contact","Father's Contact"],["Mother_Contact","Mother's Contact"],
                  ["Blood_Group","Blood Group"],
                ].map(([k, lbl]) => (
                  <div key={k} style={{ display:"flex", flexDirection:"column", gap:"4px" }}>
                    <label style={{ fontSize:"10px", opacity:0.6 }}>{lbl}</label>
                    <input value={manualForm[k]} onChange={(e) => setManualForm(f => ({...f,[k]:e.target.value}))}
                      style={{ padding:"7px 9px", borderRadius:"5px", border:"1px solid rgba(255,255,255,0.18)",
                        background:"rgba(255,255,255,0.07)", color:"#fff", fontSize:"12px", outline:"none" }} />
                  </div>
                ))}
                <div style={{ gridColumn:"1/-1", display:"flex", flexDirection:"column", gap:"4px" }}>
                  <label style={{ fontSize:"10px", opacity:0.6 }}>Address</label>
                  <textarea value={manualForm.Address} onChange={(e) => setManualForm(f => ({...f,Address:e.target.value}))}
                    rows={2} style={{ padding:"7px 9px", borderRadius:"5px", border:"1px solid rgba(255,255,255,0.18)",
                      background:"rgba(255,255,255,0.07)", color:"#fff", fontSize:"12px", outline:"none", resize:"vertical" }} />
                </div>
                <div style={{ gridColumn:"1/-1", display:"flex", flexDirection:"column", gap:"4px" }}>
                  <label style={{ fontSize:"10px", opacity:0.6 }}>Student Photo</label>
                  <div style={{ display:"flex", gap:"10px", alignItems:"center" }}>
                    <button onClick={() => manualPhotoRef.current.click()} style={{ padding:"7px 13px", borderRadius:"5px",
                      border:"1px solid rgba(255,255,255,0.3)", background:"transparent", color:"#fff", cursor:"pointer", fontSize:"11px" }}>
                      📷 Choose Photo
                    </button>
                    {manualPhoto && <img src={manualPhoto} alt="" style={{ width:"36px", height:"36px", borderRadius:"50%", objectFit:"cover", border:"2px solid rgba(255,255,255,0.4)" }} />}
                  </div>
                  <input ref={manualPhotoRef} type="file" accept="image/*" style={{ display:"none" }}
                    onChange={(e) => { const f=e.target.files[0]; if(f){ const r=new FileReader(); r.onload=(ev)=>setManualPhoto(ev.target.result); r.readAsDataURL(f); }}} />
                </div>
              </div>
              <button onClick={handleManualAdd} style={{ marginTop:"15px", padding:"10px 26px",
                background:"#CC0000", color:"#fff", border:"none", borderRadius:"6px",
                cursor:"pointer", fontWeight:700, fontSize:"13px" }}>
                ✅ Add to List
              </button>
            </div>

            {/* Live preview */}
            <div>
              <div style={{ fontSize:"10px", opacity:0.45, marginBottom:"8px", textAlign:"center" }}>Live Preview</div>
              <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
                <CardFront student={{ ...manualForm, _photoUrl: manualPhoto }} />
                <CardBack  student={manualForm} />
              </div>
            </div>
          </div>
        )}

        {/* ── PREVIEW ── */}
        {view === "preview" && (
          <div>
            {enriched.length === 0 ? (
              <div style={{ textAlign:"center", padding:"60px", opacity:0.4 }}>
                <div style={{ fontSize:"50px" }}>📋</div>
                <div style={{ marginTop:"12px" }}>No students yet — import CSV or add manually.</div>
              </div>
            ) : (
              <>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"18px" }}>
                  <div style={{ fontSize:"12px", opacity:0.55 }}>
                    {enriched.length} students · {matchedCount} with photos · <em>Click card to flip front / back</em>
                  </div>
                  <button onClick={handlePrint} style={{ padding:"9px 24px", background:"#CC0000", color:"#fff",
                    border:"none", borderRadius:"7px", cursor:"pointer", fontWeight:700, fontSize:"13px" }}>
                    🖨 Print All ID Cards
                  </button>
                </div>

                {/* Scaled card grid */}
                <div style={{ display:"flex", flexWrap:"wrap", gap:"16px" }}>
                  {enriched.map((s, i) => {
                    const showBack = !!flipMap[i];
                    // scale factor to display at ~55% of real size
                    const SCALE = 0.55;
                    const dispW = `calc(${CW} * ${SCALE})`;
                    const dispH = `calc(${CH} * ${SCALE})`;
                    return (
                      <div key={i}
                        onClick={() => setFlipMap(m => ({...m,[i]:!m[i]}))}
                        style={{ cursor:"pointer", position:"relative", width: dispW, height: dispH, flexShrink:0 }}
                      >
                        <div style={{
                          position:"absolute", top:0, left:0,
                          transform:`scale(${SCALE})`,
                          transformOrigin:"top left",
                          transition:"opacity 0.15s",
                        }}>
                          {showBack ? <CardBack student={s} /> : <CardFront student={s} />}
                        </div>
                        {/* Flip indicator */}
                        <div style={{
                          position:"absolute", bottom:"-16px", left:0, right:0,
                          textAlign:"center", fontSize:"8px", opacity:0.45,
                        }}>
                          {showBack ? "↩ back" : "↻ front"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* ── Hidden Print Area ── */}
      <div id="print-area">
        <style>{`
          @media print {
            @page { size: A4 portrait; margin: 8mm; }
            body * { visibility: hidden !important; }
            #print-area, #print-area * { visibility: visible !important; }
            #print-area {
              position: fixed; top: 0; left: 0;
              width: 210mm; padding: 8mm;
              background: white; box-sizing: border-box;
            }
            .pr { display: flex; flex-direction: row; gap: 5mm; margin-bottom: 6mm; page-break-inside: avoid; align-items: flex-start; }
          }
          @media screen { #print-area { display: none; } }
        `}</style>
        {enriched.map((s, i) => (
          <div key={i} className="pr">
            <CardFront student={s} />
            <CardBack  student={s} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App