// import { useState, useRef, useCallback, useEffect } from 'react'
// import './App.css'
// import cap from "./assets/Cap.png"

// // ── CSV Parser ────────────────────────────────────────────────────────────────
// function parseCSV(text) {
//   const lines = text.trim().split("\n");
//   if (lines.length < 2) return [];
//   const headers = lines[0].split(",").map((h) => h.trim().replace(/^@/, ""));
//   return lines.slice(1).map((line) => {
//     const cols = [];
//     let cur = "", inQ = false;
//     for (let i = 0; i < line.length; i++) {
//       if (line[i] === '"') { inQ = !inQ; continue; }
//       if (line[i] === "," && !inQ) { cols.push(cur.trim()); cur = ""; continue; }
//       cur += line[i];
//     }
//     cols.push(cur.trim());
//     const obj = {};
//     headers.forEach((h, i) => { obj[h] = cols[i] || ""; });
//     console.log("obj from the parseCSV", obj)
//     return obj;
//   });
// }

// // ── Institute Constants ───────────────────────────────────────────────────────
// const INST = {
//   name: "SD Campus",
//   line1: "Near Tehsil, Sonakpur",
//   line2: "Stadium Road, Moradabad (UP) 244001",
//   office: "+91 81265 55333 / 222",
//   website: "www.scholarsden.in",
//   emergency: "+91 8868036333",
// };

// // Card size: portrait 5.4cm × 8.5cm
// const CW = "54mm";
// const CH = "85mm";

// // ── Graduation Cap SVG — matches the dark mortarboard in the PDF ──────────────
// function GradCap({ width = 64 }) {
//   return (
//     <svg width={width} height={width * 0.72} viewBox="0 0 160 115" xmlns="http://www.w3.org/2000/svg">
//       {/* flat diamond top board */}
//       <polygon points="80,8 158,42 80,76 2,42" fill="#1e1e1e" />
//       {/* left side of cap body */}
//       <polygon points="2,42 2,42 30,56 30,88 2,74" fill="#111" />
//       {/* right side of cap body */}
//       <polygon points="158,42 158,74 130,88 130,56" fill="#111" />
//       {/* front face of cap body */}
//       <polygon points="30,56 130,56 130,88 30,88" fill="#1a1a1a" />
//       {/* tassel cord */}
//       <rect x="148" y="42" width="5" height="38" rx="2.5" fill="#1a1a1a" />
//       {/* tassel hanging end */}
//       <rect x="143" y="78" width="15" height="22" rx="3" fill="#1a1a1a" />
//       {/* tassel tip */}
//       <rect x="147" y="98" width="7" height="10" rx="2" fill="#111" />
//     </svg>
//   );
// }

// // ── FRONT CARD — exact match to PDF template ──────────────────────────────────
// function CardFront({ student }) {
//   return (
//     <div style={{
//       width: CW, height: CH,
//       background: "#CC0000",
//       borderRadius: "4mm",
//       overflow: "hidden",
//       boxSizing: "border-box",
//       fontFamily: "'Arial Black', 'Arial', sans-serif",
//       color: "#fff",
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       flexShrink: 0,
//       position: "relative",
//     }}>

//       {/* ① thin white horizontal accent bar */}
//       <div style={{
//         width: "38%",
//         height: "3.5px",
//         background: "#fff",
//         borderRadius: "2px",
//         marginTop: "6.5mm",
//       }} />

//       {/* ② graduation cap */}
//       <div style={{ marginTop: "3.5mm", lineHeight: 0 }}>
//         <img src={cap} style={{ width: "62px", height: "auto" }} alt="" />
//       </div>

//       {/* ③ circular photo with thick white border */}
//       <div style={{
//         width: "67px",
//         height: "67px",
//         borderRadius: "50%",
//         border: "3.5px solid #fff",
//         overflow: "hidden",
//         background: "#fff",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         marginTop: "3mm",
//         flexShrink: 0,
//       }}>
//         {student._photoUrl
//           ? <img src={student._photoUrl} alt=""
//               style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
//           : <svg viewBox="0 0 56 56" width="56" height="56" xmlns="http://www.w3.org/2000/svg">
//               <circle cx="28" cy="20" r="12" fill="#CC0000" />
//               <ellipse cx="28" cy="47" rx="19" ry="14" fill="#CC0000" />
//             </svg>
//         }
//       </div>

//       {/* ④ Roll No. */}
//       <div style={{
//         fontSize: "8pt",
//         fontWeight: 400,
//         fontFamily: "'Arial', sans-serif",
//         letterSpacing: "0.1mm",
//         textAlign: "center",
//       }}>
//         Roll No. <span style={{ fontWeight: 700 }}>{student['Roll_No.']}</span>
//       </div>

//       {/* ⑤ STUDENT NAME — bold, large, uppercase */}
//       <div style={{
//         fontSize: "13pt",
//         fontWeight: 600,
//         fontFamily: "'Arial Black', 'Arial', sans-serif",
//         textTransform: "uppercase",
//         textAlign: "center",
//       }}>
//         {student.Student_Name}
//       </div>

//       {/* ⑥ divider */}
//       <div style={{
//         width: "80%",
//         height: "1px",
//         background: "rgba(255,255,255,0.5)",
//       }} />

//       {/* ⑦ BLOOD GROUP */}
//       <div style={{
//         fontSize: "9pt",
//         fontWeight: 700,
//         fontFamily: "'Arial', sans-serif",
//         letterSpacing: "0.5mm",
//         textAlign: "center",
//       }}>
//         BLOOD GROUP: {student.Blood_Group}
//       </div>

//       {/* ⑧ Phone number */}
//       <div style={{
//         fontSize: "9.5pt",
//         fontWeight: 700,
//         fontFamily: "'Arial', sans-serif",
//         textAlign: "center",
//       }}>
//         +91 {student.Father_Contact}
//       </div>

//     </div>
//   );
// }

// // ── BACK CARD — with logo bar at top ─────────────────────────────────────────
// function CardBack({ student }) {
//   return (
//     <div style={{
//       width: CW, height: CH,
//       background: "#fff",
//       borderRadius: "4mm",
//       overflow: "hidden",
//       boxSizing: "border-box",
//       fontFamily: "'Arial', sans-serif",
//       color: "#222",
//       display: "flex",
//       flexDirection: "column",
//       flexShrink: 0,
//       border: "0.5px solid #ccc",
//     }}>

//       {/* ── RED LOGO BAR at top ── */}

//       {/* ── WHITE BODY: per-student fields ── */}
//       <div style={{
//         flex: 1,
//         padding: "4mm 4.5mm 3mm",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "flex-start",
//         gap: "2.5mm",
//       }}>
//         <BRow label="Father's Name" value={student.Father_Name} />
//         <BRow label="Mother's Name" value={student.Mother_Name} />
//         <div style={{ fontSize: "7.5pt", lineHeight: 1.5, color: "#222" }}>
//           <span style={{ fontWeight: 700, color: "#111" }}>Address: </span>
//           {student.Address}
//         </div>
//                 <BRow label="Contact No." value={student.Father_Contact} />

//         {/* Authorised Signatory — inside white area, right-aligned */}
//         <div style={{
//           marginTop: "auto",
//           display: "flex",
//           alignItems: "center",
//           gap: "4mm",
//           paddingTop: "2mm",
//         }}>
//            <div style={{ fontSize: "6pt", color: "#444", marginTop: "1mm", textAlign: "right", lineHeight: 1.4 }}>
//             Authorised <br/>Signatory:
//           </div>
//           {/* blank box for signature */}
//           <div style={{
//             width: "22mm",
//             height: "10mm",
//             border: "0.8px solid #aaa",
//             borderRadius: "1mm",
//             background: "#fafafa",
//           }} />

//         </div>
//       </div>

//       {/* ── LIGHT GREY: fixed institute info ── */}
//       <div style={{
//         background: "#f0f0f0",
//         borderTop: "0.5px solid #ddd",
//         padding: "3mm 4.5mm",
//         flexShrink: 0,
//         alignItems: "flex-start",
//       }}>
//          <div style={{ marginTop: "1.5mm", fontSize: "6.5pt", color: "#222", lineHeight: 1.5 }}>
//           <span style={{ fontWeight: 700 }}>Emergency Contact- </span>{INST.emergency}
//         </div>
//         <div style={{ fontSize: "7pt", fontWeight: 700, color: "#111",  }}>
//           SD Campus: Near Tehsil, Sonakpur Stadium Road, Moradabad (UP) 244001<br />
//         </div>
//         <div style={{ fontSize: "6.5pt", color: "#333" }}>
//           Office: {INST.office}<br />
//           {INST.website}
//         </div>

//       </div>

//       {/* ── RED BOTTOM STRIP: entry notice ── */}
//       <div style={{
//         background: "#CC0000",
//         color: "#fff",
//         fontSize: "5.8pt",
//         textAlign: "center",
//         lineHeight: 1.55,
//         fontWeight: 500,
//         flexShrink: 0,
//       }}>
//         Please show this ID card at the time of entry in the institute premises.
//       </div>

//     </div>
//   );
// }

// function BRow({ label, value }) {
//   return (
//     <div style={{ fontSize: "7.5pt", lineHeight: 1.4, color: "#222" }}>
//       <span style={{ fontWeight: 700, color: "#111" }}>{label}: </span>
//       <span>{value}</span>
//     </div>
//   );
// }

// // ── Upload Box component ──────────────────────────────────────────────────────
// function UploadBox({ title, hint, icon, dropText, isDragOver, onDragOver, onDragLeave, onDrop, onClick, success }) {
//   return (
//     <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "12px", padding: "22px", border: "1px solid rgba(255,255,255,0.1)" }}>
//       <h3 style={{ margin: "0 0 10px", fontSize: "14px", color: "#ff9999" }}>{title}</h3>
//       <p style={{ fontSize: "11px", opacity: 0.6, margin: "0 0 14px", lineHeight: 1.65 }}>{hint}</p>
//       <div
//         onDragOver={(e) => { e.preventDefault(); onDragOver(); }}
//         onDragLeave={onDragLeave}
//         onDrop={(e) => { e.preventDefault(); onDrop(Array.from(e.dataTransfer.files)); }}
//         onClick={onClick}
//         style={{
//           border: `2px dashed ${isDragOver ? "#fff" : "rgba(255,255,255,0.22)"}`,
//           borderRadius: "10px", padding: "26px",
//           textAlign: "center", cursor: "pointer",
//           transition: "all 0.2s",
//           background: isDragOver ? "rgba(204,0,0,0.15)" : "transparent",
//         }}
//       >
//         <div style={{ fontSize: "30px" }}>{icon}</div>
//         <div style={{ marginTop: "8px", fontSize: "11px", opacity: 0.65 }}>{dropText}</div>
//       </div>
//       {success && (
//         <div style={{ marginTop: "10px", padding: "8px 12px", background: "rgba(0,210,0,0.1)", borderRadius: "7px", fontSize: "11px", color: "#88ff88" }}>
//           {success}
//         </div>
//       )}
//     </div>
//   );
// }

// // ── Main App ──────────────────────────────────────────────────────────────────
// function App() {
//   const [students, setStudents] = useState([]);
//   const [photos, setPhotos]     = useState({});
//   const [view, setView]         = useState("import");
//   const [flipMap, setFlipMap]   = useState({});   // which preview cards show back
//   const [manualForm, setManualForm] = useState({
//     Roll_No:"", Student_Name:"", Father_Name:"", Mother_Name:"",
//     Father_Contact:"", Mother_Contact:"", Blood_Group:"", Address:"",
//   });
//   const [manualPhoto, setManualPhoto] = useState(null);
//   const [dragCSV,  setDragCSV]  = useState(false);
//   const [dragImg,  setDragImg]  = useState(false);

//   const csvRef         = useRef();
//   const photoFolderRef = useRef();
//   const manualPhotoRef = useRef();

//   const enriched = students.map((s) => ({
//     ...s, _photoUrl: photos[String(s.Roll_No)] || null,
//   }));

//   useEffect(()=>{
//     console.log("students from the useEffect", students)
//   }, [students])

//   const handleCSV = (file) => {
//     const r = new FileReader();
//     console.log("Reading CSV file", file);
//     r.onload = (e) => {
//       console.log("e from  the handleCSV", e.target.result);
//       setStudents(parseCSV(e.target.result)); setView("preview"); };
//     r.readAsText(file);
//   };

//   const handlePhotoFolder = (files) => {
//     const next = { ...photos };
//     Array.from(files).forEach((file) => {
//       const roll = file.name.replace(/\.[^/.]+$/, "");
//       const r = new FileReader();
//       r.onload = (e) => { next[roll] = e.target.result; setPhotos({ ...next }); };
//       r.readAsDataURL(file);
//     });
//   };

//   const handlePrint = useCallback(() => {
//     const el = document.getElementById("print-area");
//     if (!el) return;
//     el.style.display = "block";
//     window.print();
//     setTimeout(() => { el.style.display = "none"; }, 800);
//   }, []);

//   const handleManualAdd = () => {
//     if (!manualForm.Roll_No || !manualForm.Student_Name) return;
//     setStudents((prev) => {
//       const idx = prev.findIndex((s) => s.Roll_No === manualForm.Roll_No);
//       if (idx >= 0) { const a = [...prev]; a[idx] = { ...manualForm }; return a; }
//       return [...prev, { ...manualForm }];
//     });
//     if (manualPhoto) setPhotos((p) => ({ ...p, [manualForm.Roll_No]: manualPhoto }));
//     setManualForm({ Roll_No:"", Student_Name:"", Father_Name:"", Mother_Name:"", Father_Contact:"", Mother_Contact:"", Blood_Group:"", Address:"" });
//     setManualPhoto(null);
//     setView("preview");
//   };

//   const photoCount   = Object.keys(photos).length;
//   const matchedCount = students.filter((s) => photos[s.Roll_No]).length;

//   const NavBtn = ({ v, label }) => (
//     <button onClick={() => setView(v)} style={{
//       padding: "8px 20px", borderRadius: "6px", border: "none", cursor: "pointer",
//       fontWeight: 700, fontSize: "12px",
//       background: view === v ? "#fff" : "rgba(255,255,255,0.14)",
//       color: view === v ? "#CC0000" : "#fff",
//       transition: "all 0.18s",
//     }}>{label}</button>
//   );

//   return (
//     <div style={{
//       minHeight: "100vh",
//       background: "linear-gradient(140deg, #180000 0%, #2c0000 55%, #180000 100%)",
//       fontFamily: "'Arial', sans-serif",
//       color: "#fff",
//     }}>
//       {/* ── Header ── */}
//       <div style={{
//         background: "linear-gradient(90deg, #CC0000, #990000)",
//         padding: "13px 28px",
//         display: "flex", alignItems: "center", justifyContent: "space-between",
//         boxShadow: "0 4px 28px rgba(0,0,0,0.55)",
//       }}>
//         <div>
//           <div style={{ fontSize: "17px", fontWeight: 900, letterSpacing: "0.4px" }}>🎓 SD Campus — ID Card Generator</div>
//           <div style={{ fontSize: "10px", opacity: 0.72, marginTop: "2px" }}>Scholars Den · Moradabad · {INST.office}</div>
//         </div>
//         <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
//           <NavBtn v="import" label="📂 Import" />
//           <NavBtn v="manual" label="✏️ Manual" />
//           <NavBtn v="preview" label={`👁 Preview (${students.length})`} />
//           {students.length > 0 && (
//             <button onClick={handlePrint} style={{
//               padding: "8px 20px", borderRadius: "6px",
//               border: "2px solid rgba(255,255,255,0.85)",
//               cursor: "pointer", fontWeight: 800, fontSize: "12px",
//               background: "transparent", color: "#fff",
//             }}>🖨 Print All</button>
//           )}
//         </div>
//       </div>

//       <div style={{ padding: "24px 28px", maxWidth: "1200px", margin: "0 auto" }}>

//         {/* ── IMPORT ── */}
//         {view === "import" && (
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
//             <UploadBox
//               title="📄 Step 1 — Upload Student CSV"
//               hint={<>Columns: <code style={{ background: "rgba(255,255,255,0.1)", padding: "1px 5px", borderRadius: "3px", fontSize: "10px" }}>Roll_No, Student_Name, Father_Name, Mother_Name, Father_Contact, Mother_Contact, Blood_Group, Address</code></>}
//               icon="📊" dropText="Drop .csv here or click to browse"
//               isDragOver={dragCSV}
//               onDragOver={() => setDragCSV(true)} onDragLeave={() => setDragCSV(false)}
//               onDrop={(files) => { setDragCSV(false); if (files[0]) handleCSV(files[0]); }}
//               onClick={() => csvRef.current.click()}
//               success={students.length > 0 ? `✅ ${students.length} students loaded` : null}
//             />
//             <input ref={csvRef} type="file" accept=".csv" style={{ display:"none" }}
//               onChange={(e) => { if (e.target.files[0]) handleCSV(e.target.files[0]); }} />

//             <UploadBox
//               title="📸 Step 2 — Upload Student Photos"
//               hint={<>Name each photo by Roll No. e.g. <code style={{ background: "rgba(255,255,255,0.1)", padding: "1px 5px", borderRadius: "3px", fontSize: "10px" }}>2026120007.jpg</code> — select multiple files at once</>}
//               icon="🗂" dropText="Drop all photos here or click to select"
//               isDragOver={dragImg}
//               onDragOver={() => setDragImg(true)} onDragLeave={() => setDragImg(false)}
//               onDrop={(files) => { setDragImg(false); handlePhotoFolder(files); }}
//               onClick={() => photoFolderRef.current.click()}
//               success={photoCount > 0 ? `✅ ${photoCount} photos — ${matchedCount} / ${students.length} matched` : null}
//             />
//             <input ref={photoFolderRef} type="file" accept="image/*" multiple style={{ display:"none" }}
//               onChange={(e) => handlePhotoFolder(e.target.files)} />
//           </div>
//         )}

//         {/* ── MANUAL ── */}
//         {view === "manual" && (
//           <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "28px", alignItems: "start" }}>
//             <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "12px", padding: "22px", border: "1px solid rgba(255,255,255,0.1)" }}>
//               <h3 style={{ margin: "0 0 16px", fontSize: "14px", color: "#ff9999" }}>✏️ Add / Edit Student</h3>
//               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "11px" }}>
//                 {[
//                   ["Roll_No","Roll Number *"],["Student_Name","Student Name *"],
//                   ["Father_Name","Father's Name"],["Mother_Name","Mother's Name"],
//                   ["Father_Contact","Father's Contact"],["Mother_Contact","Mother's Contact"],
//                   ["Blood_Group","Blood Group"],
//                 ].map(([k, lbl]) => (
//                   <div key={k} style={{ display:"flex", flexDirection:"column", gap:"4px" }}>
//                     <label style={{ fontSize:"10px", opacity:0.6 }}>{lbl}</label>
//                     <input value={manualForm[k]} onChange={(e) => setManualForm(f => ({...f,[k]:e.target.value}))}
//                       style={{ padding:"7px 9px", borderRadius:"5px", border:"1px solid rgba(255,255,255,0.18)",
//                         background:"rgba(255,255,255,0.07)", color:"#fff", fontSize:"12px", outline:"none" }} />
//                   </div>
//                 ))}
//                 <div style={{ gridColumn:"1/-1", display:"flex", flexDirection:"column", gap:"4px" }}>
//                   <label style={{ fontSize:"10px", opacity:0.6 }}>Address</label>
//                   <textarea value={manualForm.Address} onChange={(e) => setManualForm(f => ({...f,Address:e.target.value}))}
//                     rows={2} style={{ padding:"7px 9px", borderRadius:"5px", border:"1px solid rgba(255,255,255,0.18)",
//                       background:"rgba(255,255,255,0.07)", color:"#fff", fontSize:"12px", outline:"none", resize:"vertical" }} />
//                 </div>
//                 <div style={{ gridColumn:"1/-1", display:"flex", flexDirection:"column", gap:"4px" }}>
//                   <label style={{ fontSize:"10px", opacity:0.6 }}>Student Photo</label>
//                   <div style={{ display:"flex", gap:"10px", alignItems:"center" }}>
//                     <button onClick={() => manualPhotoRef.current.click()} style={{ padding:"7px 13px", borderRadius:"5px",
//                       border:"1px solid rgba(255,255,255,0.3)", background:"transparent", color:"#fff", cursor:"pointer", fontSize:"11px" }}>
//                       📷 Choose Photo
//                     </button>
//                     {manualPhoto && <img src={manualPhoto} alt="" style={{ width:"36px", height:"36px", borderRadius:"50%", objectFit:"cover", border:"2px solid rgba(255,255,255,0.4)" }} />}
//                   </div>
//                   <input ref={manualPhotoRef} type="file" accept="image/*" style={{ display:"none" }}
//                     onChange={(e) => { const f=e.target.files[0]; if(f){ const r=new FileReader(); r.onload=(ev)=>setManualPhoto(ev.target.result); r.readAsDataURL(f); }}} />
//                 </div>
//               </div>
//               <button onClick={handleManualAdd} style={{ marginTop:"15px", padding:"10px 26px",
//                 background:"#CC0000", color:"#fff", border:"none", borderRadius:"6px",
//                 cursor:"pointer", fontWeight:700, fontSize:"13px" }}>
//                 ✅ Add to List
//               </button>
//             </div>

//             {/* Live preview */}
//             <div>
//               <div style={{ fontSize:"10px", opacity:0.45, marginBottom:"8px", textAlign:"center" }}>Live Preview</div>
//               <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
//                 <CardFront student={{ ...manualForm, _photoUrl: manualPhoto }} />
//                 <CardBack  student={manualForm} />
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ── PREVIEW ── */}
//         {view === "preview" && (
//           <div>
//             {enriched.length === 0 ? (
//               <div style={{ textAlign:"center", padding:"60px", opacity:0.4 }}>
//                 <div style={{ fontSize:"50px" }}>📋</div>
//                 <div style={{ marginTop:"12px" }}>No students yet — import CSV or add manually.</div>
//               </div>
//             ) : (
//               <>
//                 <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"18px" }}>
//                   <div style={{ fontSize:"12px", opacity:0.55 }}>
//                     {enriched.length} students · {matchedCount} with photos · <em>Click card to flip front / back</em>
//                   </div>
//                   <button onClick={handlePrint} style={{ padding:"9px 24px", background:"#CC0000", color:"#fff",
//                     border:"none", borderRadius:"7px", cursor:"pointer", fontWeight:700, fontSize:"13px" }}>
//                     🖨 Print All ID Cards
//                   </button>
//                 </div>

//                 {/* Scaled card grid */}
//                 <div style={{ display:"flex", flexWrap:"wrap", gap:"16px" }}>
//                   {enriched.map((s, i) => {
//                     const showBack = !!flipMap[i];
//                     const SCALE = 0.55;
//                     const dispW = `calc(${CW} * ${SCALE})`;
//                     const dispH = `calc(${CH} * ${SCALE})`;
//                     return (
//                       <div key={i}
//                         onClick={() => setFlipMap(m => ({...m,[i]:!m[i]}))}
//                         style={{ cursor:"pointer", position:"relative", width: dispW, height: dispH, flexShrink:0 }}
//                       >
//                         <div style={{
//                           position:"absolute", top:0, left:0,
//                           transform:`scale(${SCALE})`,
//                           transformOrigin:"top left",
//                           transition:"opacity 0.15s",
//                         }}>
//                           {showBack ? <CardBack student={s} /> : <CardFront student={s} />}
//                         </div>
//                         {/* Flip indicator */}
//                         <div style={{
//                           position:"absolute", bottom:"-16px", left:0, right:0,
//                           textAlign:"center", fontSize:"8px", opacity:0.45,
//                         }}>
//                           {showBack ? "↩ back" : "↻ front"}
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </>
//             )}
//           </div>
//         )}
//       </div>

//       {/* ── Hidden Print Area ── */}
//       <div id="print-area">
//         <style>{`
//           @media print {
//             @page { size: A4 portrait; margin: 8mm; }
//             body * { visibility: hidden !important; }
//             #print-area, #print-area * { visibility: visible !important; }
//             #print-area {
//               position: fixed; top: 0; left: 0;
//               width: 210mm; padding: 8mm;
//               background: white; box-sizing: border-box;
//             }
//             .pr { display: flex; flex-direction: row; gap: 5mm; margin-bottom: 6mm; page-break-inside: avoid; align-items: flex-start; }
//           }
//           @media screen { #print-area { display: none; } }
//         `}</style>
//         {enriched.map((s, i) => (
//           <div key={i} className="pr">
//             <CardFront student={s} />
//             <CardBack  student={s} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App

import { useState, useRef, useCallback, useEffect } from "react";
import "./App.css";

import CAP from "./assets/Cap.png";

// ── CSV Parser ────────────────────────────────────────────────────────────────
function parseCSV(text) {
  const lines = text.trim().split("\n");
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map((h) => h.trim().replace(/^@/, ""));
  return lines.slice(1).map((line) => {
    const cols = [];
    let cur = "",
      inQ = false;
    for (let i = 0; i < line.length; i++) {
      if (line[i] === '"') {
        inQ = !inQ;
        continue;
      }
      if (line[i] === "," && !inQ) {
        cols.push(cur.trim());
        cur = "";
        continue;
      }
      cur += line[i];
    }
    cols.push(cur.trim());
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = cols[i] || "";
    });
    console.log("obj from the parseCSV", obj);
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

const SD_LOGO_B64 =
  "data:image/png;base64,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";

// Card size: portrait 5.4cm × 8.5cm
const CW = "54mm";
const CH = "85mm";

// ── Graduation Cap SVG — matches the dark mortarboard in the PDF ──────────────
function GradCap({ width = 64 }) {
  return (
    <svg
      width={width}
      height={width * 0.72}
      viewBox="0 0 160 115"
      xmlns="http://www.w3.org/2000/svg"
    >
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
function CardFront({ student }) {
  return (
    <div
      style={{
        width: CW,
        height: CH,
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
      }}
    >
      {/* ① thin white horizontal accent bar */}
      <div
        style={{
          width: "38%",
          height: "3.5px",
          background: "#fff",
          borderRadius: "2px",
          marginTop: "6.5mm",
        }}
      />

      {/* ② graduation cap */}
      <div style={{ marginTop: "3.5mm", lineHeight: 0 }}>
        {/* <GradCap width={62} /> */}
        <img src={CAP} style={{ width: "62px", height: "auto" }} alt="" />
      </div>

      {/* ③ circular photo with thick white border */}
      <div
        style={{
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
        }}
      >
        {student._photoUrl ? (
          <img
            src={student._photoUrl}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : (
          <svg
            viewBox="0 0 56 56"
            width="56"
            height="56"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="28" cy="20" r="12" fill="#CC0000" />
            <ellipse cx="28" cy="47" rx="19" ry="14" fill="#CC0000" />
          </svg>
        )}
      </div>

      {/* ④ Roll No. */}
      <div
        style={{
          fontSize: "8pt",
          fontWeight: 400,
          fontFamily: "'Arial', sans-serif",
          letterSpacing: "0.1mm",
          textAlign: "center",
        }}
      >
        Roll No. <span style={{ fontWeight: 700 }}>{student["Roll_No."]}</span>
      </div>

      {/* ⑤ STUDENT NAME — bold, large, uppercase */}
      <div
        style={{
          fontSize: "13pt",
          fontWeight: 600,
          fontFamily: "'Arial Black', 'Arial', sans-serif",
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        {student.Student_Name}
      </div>

      {/* ⑥ divider */}
      <div
        style={{
          width: "80%",
          height: "1px",
          background: "rgba(255,255,255,0.5)",
        }}
      />

      {/* ⑦ BLOOD GROUP */}
      <div
        style={{
          fontSize: "9pt",
          fontWeight: 700,
          fontFamily: "'Arial', sans-serif",
          letterSpacing: "0.5mm",
          textAlign: "center",
        }}
      >
        BLOOD GROUP: {student.Blood_Group}
      </div>

      {/* ⑧ Phone number */}
      <div
        style={{
          fontSize: "9.5pt",
          fontWeight: 700,
          fontFamily: "'Arial', sans-serif",
          textAlign: "center",
        }}
      >
        +91 {student.Father_Contact}
      </div>
    </div>
  );
}

// ── BACK CARD — with logo bar at top ─────────────────────────────────────────
function CardBack({ student }) {
  return (
    <div
      style={{
        width: CW,
        height: CH,
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
      }}
    >
      {/* ── RED LOGO BAR at top ── */}
      <div
        style={{
          padding: "2.5mm 4mm",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          flexShrink: 0,
        }}
      >
        <img
          src={SD_LOGO_B64}
          alt="Scholars Den Logo"
          style={{
            height: "18mm",
            width: "18mm",
            backgroundColor: "white",
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>

      {/* ── WHITE BODY: per-student fields ── */}
      <div
        style={{
          flex: 1,
          padding: "1mm 4.5mm 1mm",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          // gap: "2.5mm",
        }}
      >
        <BRow label="Father's Name" value={student.Father_Name} />
        <BRow label="Mother's Name" value={student.Mother_Name} />
        <div style={{ fontSize: "7.5pt", lineHeight: 1.5, color: "#222" }}>
          <span style={{ fontWeight: 700, color: "#111" }}>Address: </span>
          {student.Address}
        </div>
        <BRow label="Contact No." value={student.Father_Contact} />

        {/* Authorised Signatory — inside white area, right-aligned */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            gap: "4mm",
            paddingTop: "2mm",
          }}
        >
          <div
            style={{
              fontSize: "6pt",
              color: "#444",
              marginTop: "1mm",
              textAlign: "right",
              lineHeight: 1.4,
            }}
          >
            Authorised <br />
            Signatory:
          </div>
          {/* blank box for signature */}
          <div
            style={{
              width: "22mm",
              height: "10mm",
              border: "0.8px solid #aaa",
              borderRadius: "1mm",
              background: "#fafafa",
            }}
          />
        </div>
      </div>

      {/* ── LIGHT GREY: fixed institute info ── */}
      <div
        style={{
          background: "#f0f0f0",
          borderTop: "0.5px solid #ddd",
          padding: "1mm 4.5mm",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            marginTop: "1.5mm",
            fontSize: "6.5pt",
            color: "#222",
            lineHeight: 1.5,
          }}
        >
          <span style={{ fontWeight: 700 }}>Emergency Contact- </span>
          {INST.emergency}
        </div>
        <div style={{ fontSize: "6.5pt",
            color: "#222",
            lineHeight: 1.5}}>
          SD Campus: Near Tehsil, Sonakpur
        </div>
        <div style={{ fontSize: "6.5pt", fontWeight: 700, color: "#111" }}>
          Stadium Road, Moradabad (UP) 244001
        </div>
        <div style={{ fontSize: "6.5pt",
            color: "#222",
            lineHeight: 1.5}}>
          Office: {INST.office}
          <br />
          {INST.website}
        </div>
      </div>

      {/* ── RED BOTTOM STRIP: entry notice ── */}
      <div
        style={{
          background: "#CC0000",
          color: "#fff",
          padding: "2.5mm 4mm",
          fontSize: "5.8pt",
          textAlign: "center",
          lineHeight: 1.55,
          fontWeight: 500,
          flexShrink: 0,
        }}
      >
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
function UploadBox({
  title,
  hint,
  icon,
  dropText,
  isDragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  onClick,
  success,
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.05)",
        borderRadius: "12px",
        padding: "22px",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <h3 style={{ margin: "0 0 10px", fontSize: "14px", color: "#ff9999" }}>
        {title}
      </h3>
      <p
        style={{
          fontSize: "11px",
          opacity: 0.6,
          margin: "0 0 14px",
          lineHeight: 1.65,
        }}
      >
        {hint}
      </p>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          onDragOver();
        }}
        onDragLeave={onDragLeave}
        onDrop={(e) => {
          e.preventDefault();
          onDrop(Array.from(e.dataTransfer.files));
        }}
        onClick={onClick}
        style={{
          border: `2px dashed ${isDragOver ? "#fff" : "rgba(255,255,255,0.22)"}`,
          borderRadius: "10px",
          padding: "26px",
          textAlign: "center",
          cursor: "pointer",
          transition: "all 0.2s",
          background: isDragOver ? "rgba(204,0,0,0.15)" : "transparent",
        }}
      >
        <div style={{ fontSize: "30px" }}>{icon}</div>
        <div style={{ marginTop: "8px", fontSize: "11px", opacity: 0.65 }}>
          {dropText}
        </div>
      </div>
      {success && (
        <div
          style={{
            marginTop: "10px",
            padding: "8px 12px",
            background: "rgba(0,210,0,0.1)",
            borderRadius: "7px",
            fontSize: "11px",
            color: "#88ff88",
          }}
        >
          {success}
        </div>
      )}
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
function App() {
  const [students, setStudents] = useState([]);
  const [photos, setPhotos] = useState({});
  const [view, setView] = useState("import");
  const [flipMap, setFlipMap] = useState({}); // which preview cards show back
  const [manualForm, setManualForm] = useState({
    Roll_No: "",
    Student_Name: "",
    Father_Name: "",
    Mother_Name: "",
    Father_Contact: "",
    Mother_Contact: "",
    Blood_Group: "",
    Address: "",
  });
  const [manualPhoto, setManualPhoto] = useState(null);
  const [dragCSV, setDragCSV] = useState(false);
  const [dragImg, setDragImg] = useState(false);

  const csvRef = useRef();
  const photoFolderRef = useRef();
  const manualPhotoRef = useRef();

  const enriched = students.map((s) => ({
    ...s,
    _photoUrl: photos[String(s.Roll_No)] || null,
  }));

  useEffect(() => {
    console.log("students from the useEffect", students);
  }, [students]);

  const handleCSV = (file) => {
    const r = new FileReader();
    console.log("Reading CSV file", file);
    r.onload = (e) => {
      console.log("e from  the handleCSV", e.target.result);
      setStudents(parseCSV(e.target.result));
      setView("preview");
    };
    r.readAsText(file);
  };

  const handlePhotoFolder = (files) => {
    const next = { ...photos };
    Array.from(files).forEach((file) => {
      const roll = file.name.replace(/\.[^/.]+$/, "");
      const r = new FileReader();
      r.onload = (e) => {
        next[roll] = e.target.result;
        setPhotos({ ...next });
      };
      r.readAsDataURL(file);
    });
  };

  const handlePrint = useCallback(() => {
    const el = document.getElementById("print-area");
    if (!el) return;
    el.style.display = "block";
    window.print();
    setTimeout(() => {
      el.style.display = "none";
    }, 800);
  }, []);

  const handleManualAdd = () => {
    if (!manualForm.Roll_No || !manualForm.Student_Name) return;
    setStudents((prev) => {
      const idx = prev.findIndex((s) => s.Roll_No === manualForm.Roll_No);
      if (idx >= 0) {
        const a = [...prev];
        a[idx] = { ...manualForm };
        return a;
      }
      return [...prev, { ...manualForm }];
    });
    if (manualPhoto)
      setPhotos((p) => ({ ...p, [manualForm.Roll_No]: manualPhoto }));
    setManualForm({
      Roll_No: "",
      Student_Name: "",
      Father_Name: "",
      Mother_Name: "",
      Father_Contact: "",
      Mother_Contact: "",
      Blood_Group: "",
      Address: "",
    });
    setManualPhoto(null);
    setView("preview");
  };

  const photoCount = Object.keys(photos).length;
  const matchedCount = students.filter((s) => photos[s.Roll_No]).length;

  const NavBtn = ({ v, label }) => (
    <button
      onClick={() => setView(v)}
      style={{
        padding: "8px 20px",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
        fontWeight: 700,
        fontSize: "12px",
        background: view === v ? "#fff" : "rgba(255,255,255,0.14)",
        color: view === v ? "#CC0000" : "#fff",
        transition: "all 0.18s",
      }}
    >
      {label}
    </button>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(140deg, #180000 0%, #2c0000 55%, #180000 100%)",
        fontFamily: "'Arial', sans-serif",
        color: "#fff",
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          background: "linear-gradient(90deg, #CC0000, #990000)",
          padding: "13px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 4px 28px rgba(0,0,0,0.55)",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "17px",
              fontWeight: 900,
              letterSpacing: "0.4px",
            }}
          >
            🎓 SD Campus — ID Card Generator
          </div>
          <div style={{ fontSize: "10px", opacity: 0.72, marginTop: "2px" }}>
            Scholars Den · Moradabad · {INST.office}
          </div>
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <NavBtn v="import" label="📂 Import" />
          <NavBtn v="manual" label="✏️ Manual" />
          <NavBtn v="preview" label={`👁 Preview (${students.length})`} />
          {students.length > 0 && (
            <button
              onClick={handlePrint}
              style={{
                padding: "8px 20px",
                borderRadius: "6px",
                border: "2px solid rgba(255,255,255,0.85)",
                cursor: "pointer",
                fontWeight: 800,
                fontSize: "12px",
                background: "transparent",
                color: "#fff",
              }}
            >
              🖨 Print All
            </button>
          )}
        </div>
      </div>

      <div
        style={{ padding: "24px 28px", maxWidth: "1200px", margin: "0 auto" }}
      >
        {/* ── IMPORT ── */}
        {view === "import" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            <UploadBox
              title="📄 Step 1 — Upload Student CSV"
              hint={
                <>
                  Columns:{" "}
                  <code
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      padding: "1px 5px",
                      borderRadius: "3px",
                      fontSize: "10px",
                    }}
                  >
                    Roll_No, Student_Name, Father_Name, Mother_Name,
                    Father_Contact, Mother_Contact, Blood_Group, Address
                  </code>
                </>
              }
              icon="📊"
              dropText="Drop .csv here or click to browse"
              isDragOver={dragCSV}
              onDragOver={() => setDragCSV(true)}
              onDragLeave={() => setDragCSV(false)}
              onDrop={(files) => {
                setDragCSV(false);
                if (files[0]) handleCSV(files[0]);
              }}
              onClick={() => csvRef.current.click()}
              success={
                students.length > 0
                  ? `✅ ${students.length} students loaded`
                  : null
              }
            />
            <input
              ref={csvRef}
              type="file"
              accept=".csv"
              style={{ display: "none" }}
              onChange={(e) => {
                if (e.target.files[0]) handleCSV(e.target.files[0]);
              }}
            />

            <UploadBox
              title="📸 Step 2 — Upload Student Photos"
              hint={
                <>
                  Name each photo by Roll No. e.g.{" "}
                  <code
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      padding: "1px 5px",
                      borderRadius: "3px",
                      fontSize: "10px",
                    }}
                  >
                    2026120007.jpg
                  </code>{" "}
                  — select multiple files at once
                </>
              }
              icon="🗂"
              dropText="Drop all photos here or click to select"
              isDragOver={dragImg}
              onDragOver={() => setDragImg(true)}
              onDragLeave={() => setDragImg(false)}
              onDrop={(files) => {
                setDragImg(false);
                handlePhotoFolder(files);
              }}
              onClick={() => photoFolderRef.current.click()}
              success={
                photoCount > 0
                  ? `✅ ${photoCount} photos — ${matchedCount} / ${students.length} matched`
                  : null
              }
            />
            <input
              ref={photoFolderRef}
              type="file"
              accept="image/*"
              multiple
              style={{ display: "none" }}
              onChange={(e) => handlePhotoFolder(e.target.files)}
            />
          </div>
        )}

        {/* ── MANUAL ── */}
        {view === "manual" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "28px",
              alignItems: "start",
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.05)",
                borderRadius: "12px",
                padding: "22px",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <h3
                style={{
                  margin: "0 0 16px",
                  fontSize: "14px",
                  color: "#ff9999",
                }}
              >
                ✏️ Add / Edit Student
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "11px",
                }}
              >
                {[
                  ["Roll_No", "Roll Number *"],
                  ["Student_Name", "Student Name *"],
                  ["Father_Name", "Father's Name"],
                  ["Mother_Name", "Mother's Name"],
                  ["Father_Contact", "Father's Contact"],
                  ["Mother_Contact", "Mother's Contact"],
                  ["Blood_Group", "Blood Group"],
                ].map(([k, lbl]) => (
                  <div
                    key={k}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    <label style={{ fontSize: "10px", opacity: 0.6 }}>
                      {lbl}
                    </label>
                    <input
                      value={manualForm[k]}
                      onChange={(e) =>
                        setManualForm((f) => ({ ...f, [k]: e.target.value }))
                      }
                      style={{
                        padding: "7px 9px",
                        borderRadius: "5px",
                        border: "1px solid rgba(255,255,255,0.18)",
                        background: "rgba(255,255,255,0.07)",
                        color: "#fff",
                        fontSize: "12px",
                        outline: "none",
                      }}
                    />
                  </div>
                ))}
                <div
                  style={{
                    gridColumn: "1/-1",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  <label style={{ fontSize: "10px", opacity: 0.6 }}>
                    Address
                  </label>
                  <textarea
                    value={manualForm.Address}
                    onChange={(e) =>
                      setManualForm((f) => ({ ...f, Address: e.target.value }))
                    }
                    rows={2}
                    style={{
                      padding: "7px 9px",
                      borderRadius: "5px",
                      border: "1px solid rgba(255,255,255,0.18)",
                      background: "rgba(255,255,255,0.07)",
                      color: "#fff",
                      fontSize: "12px",
                      outline: "none",
                      resize: "vertical",
                    }}
                  />
                </div>
                <div
                  style={{
                    gridColumn: "1/-1",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  <label style={{ fontSize: "10px", opacity: 0.6 }}>
                    Student Photo
                  </label>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <button
                      onClick={() => manualPhotoRef.current.click()}
                      style={{
                        padding: "7px 13px",
                        borderRadius: "5px",
                        border: "1px solid rgba(255,255,255,0.3)",
                        background: "transparent",
                        color: "#fff",
                        cursor: "pointer",
                        fontSize: "11px",
                      }}
                    >
                      📷 Choose Photo
                    </button>
                    {manualPhoto && (
                      <img
                        src={manualPhoto}
                        alt=""
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          border: "2px solid rgba(255,255,255,0.4)",
                        }}
                      />
                    )}
                  </div>
                  <input
                    ref={manualPhotoRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const f = e.target.files[0];
                      if (f) {
                        const r = new FileReader();
                        r.onload = (ev) => setManualPhoto(ev.target.result);
                        r.readAsDataURL(f);
                      }
                    }}
                  />
                </div>
              </div>
              <button
                onClick={handleManualAdd}
                style={{
                  marginTop: "15px",
                  padding: "10px 26px",
                  background: "#CC0000",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: "13px",
                }}
              >
                ✅ Add to List
              </button>
            </div>

            {/* Live preview */}
            <div>
              <div
                style={{
                  fontSize: "10px",
                  opacity: 0.45,
                  marginBottom: "8px",
                  textAlign: "center",
                }}
              >
                Live Preview
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <CardFront
                  student={{ ...manualForm, _photoUrl: manualPhoto }}
                />
                <CardBack student={manualForm} />
              </div>
            </div>
          </div>
        )}

        {/* ── PREVIEW ── */}
        {view === "preview" && (
          <div>
            {enriched.length === 0 ? (
              <div
                style={{ textAlign: "center", padding: "60px", opacity: 0.4 }}
              >
                <div style={{ fontSize: "50px" }}>📋</div>
                <div style={{ marginTop: "12px" }}>
                  No students yet — import CSV or add manually.
                </div>
              </div>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "18px",
                  }}
                >
                  <div style={{ fontSize: "12px", opacity: 0.55 }}>
                    {enriched.length} students · {matchedCount} with photos ·{" "}
                    <em>Click card to flip front / back</em>
                  </div>
                  <button
                    onClick={handlePrint}
                    style={{
                      padding: "9px 24px",
                      background: "#CC0000",
                      color: "#fff",
                      border: "none",
                      borderRadius: "7px",
                      cursor: "pointer",
                      fontWeight: 700,
                      fontSize: "13px",
                    }}
                  >
                    🖨 Print All ID Cards
                  </button>
                </div>

                {/* Scaled card grid */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                  {enriched.map((s, i) => {
                    const showBack = !!flipMap[i];
                    const SCALE = 0.55;
                    const dispW = `calc(${CW} * ${SCALE})`;
                    const dispH = `calc(${CH} * ${SCALE})`;
                    return (
                      <div
                        key={i}
                        onClick={() =>
                          setFlipMap((m) => ({ ...m, [i]: !m[i] }))
                        }
                        style={{
                          cursor: "pointer",
                          position: "relative",
                          width: dispW,
                          height: dispH,
                          flexShrink: 0,
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            transform: `scale(${SCALE})`,
                            transformOrigin: "top left",
                            transition: "opacity 0.15s",
                          }}
                        >
                          {showBack ? (
                            <CardBack student={s} />
                          ) : (
                            <CardFront student={s} />
                          )}
                        </div>
                        {/* Flip indicator */}
                        <div
                          style={{
                            position: "absolute",
                            bottom: "-16px",
                            left: 0,
                            right: 0,
                            textAlign: "center",
                            fontSize: "8px",
                            opacity: 0.45,
                          }}
                        >
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
            <CardBack student={s} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
