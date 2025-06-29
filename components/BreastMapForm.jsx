"use client";

import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

export default function BreastMapForm() {
  const [lesions, setLesions] = useState([]);
  const [side, setSide] = useState("Sağ");
  const [specimenInfo, setSpecimenInfo] = useState({
    size: "",
    skinEllipse: "",
    areolaDiameter: "",
    nippleDiameter: "",
  });

  const addLesionAtPosition = (x, y) => {
    setLesions([
      ...lesions,
      {
        x,
        y,
        size: "",
        color: "krem",
        contour: "düzenli",
        consistency: "",
        distanceToSkin: "",
        distanceToNipple: "",
        distanceToFascia: "",
        marginDistances: {
          superior: "",
          inferior: "",
          medial: "",
          lateral: "",
          anterior: "",
          posterior: "",
        },
        relationToOtherLesions: "",
      },
    ]);
  };

  const updateLesion = (index, field, value) => {
    const updated = [...lesions];
    updated[index][field] = value;
    setLesions(updated);
  };

  const removeLesion = (index) => {
    const updated = [...lesions];
    updated.splice(index, 1);
    setLesions(updated);
  };

  const generateReport = () => {
    return `ÜZERİNDE ${specimenInfo.skinEllipse.toUpperCase()} BOYUTUNDA DERİELİPSİ VE ${specimenInfo.nippleDiameter.toUpperCase()} CM ÇAPINDA MEME BAŞI, ${specimenInfo.areolaDiameter.toUpperCase()} CM ÇAPINDA AREOLA BULUNAN ${specimenInfo.size.toUpperCase()} BOYUTLARINDA ${side.toUpperCase()} MASTEKTOMİ MATERYALİDİR. KESİT YAPILDIĞINDA ${lesions
      .map(
        (l, i) =>
          `${side.toUpperCase()} MEMEDE ${Math.round(l.x)}X${Math.round(l.y)} KONUMUNDA YERLEŞİM GÖSTEREN, ${l.size.toUpperCase()} BOYUTLARINDA, ${l.color.toUpperCase()} RENKLİ, ${l.contour.toUpperCase()} KONTURLU, ${l.consistency.toUpperCase()} KIVAMLI LEZYON DİKKATİ ÇEKTİ. LEZYON DERİYE ${l.distanceToSkin} CM, MEME BAŞINA ${l.distanceToNipple} CM, FASYAYA ${l.distanceToFascia} CM MESAFEDEDİR. SÜPERİOR CERRAHİ SINIRA ${l.marginDistances.superior} CM, İNFERİOR CERRAHİ SINIRA ${l.marginDistances.inferior} CM, MEDİAL CERRAHİ SINIRA ${l.marginDistances.medial} CM, LATERAL CERRAHİ SINIRA ${l.marginDistances.lateral} CM, ANTERİOR CERRAHİ SINIRA ${l.marginDistances.anterior} CM, POSTERİOR CERRAHİ SINIRA ${l.marginDistances.posterior} CM MESAFEDEDİR. ${l.relationToOtherLesions.toUpperCase()}`
      )
      .join(". ")}.`;
  };

  return (
    <div className="grid gap-4 p-4">
      <Card>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button variant={side === "Sağ" ? "default" : "outline"} onClick={() => setSide("Sağ")}>Sağ Meme</Button>
            <Button variant={side === "Sol" ? "default" : "outline"} onClick={() => setSide("Sol")}>Sol Meme</Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Materyal boyutu (örn. 20x17x6 cm)" value={specimenInfo.size} onChange={(e) => setSpecimenInfo({ ...specimenInfo, size: e.target.value })} />
            <Input placeholder="Deri elipsi boyutu (örn. 17x6 cm)" value={specimenInfo.skinEllipse} onChange={(e) => setSpecimenInfo({ ...specimenInfo, skinEllipse: e.target.value })} />
            <Input placeholder="Areola çapı (cm)" value={specimenInfo.areolaDiameter} onChange={(e) => setSpecimenInfo({ ...specimenInfo, areolaDiameter: e.target.value })} />
            <Input placeholder="Meme başı çapı (cm)" value={specimenInfo.nippleDiameter} onChange={(e) => setSpecimenInfo({ ...specimenInfo, nippleDiameter: e.target.value })} />
          </div>

          <svg width="300" height="300" className="border rounded cursor-crosshair bg-white" onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            addLesionAtPosition(x, y);
          }}>
            <circle cx="150" cy="150" r="100" fill="#f3f4f6" stroke="#111" strokeWidth="2" />
            <text x="150" y="30" textAnchor="middle" fontSize="12">SÜPERİOR</text>
            <text x="150" y="290" textAnchor="middle" fontSize="12">İNFERİOR</text>
            <text x="20" y="155" textAnchor="start" fontSize="12">{side === "Sol" ? "LATERAL" : "MEDİAL"}</text>
            <text x="280" y="155" textAnchor="end" fontSize="12">{side === "Sol" ? "MEDİAL" : "LATERAL"}</text>
            {lesions.map((l, i) => (
              <circle key={i} cx={l.x} cy={l.y} r={l.contour === "spiküle" ? 10 : 8} fill={l.color || "#fbbf24"} stroke={l.contour === "spiküle" ? "#000" : "#4b5563"} strokeDasharray={l.contour === "spiküle" ? "2,2" : "0"} />
            ))}
          </svg>

          {lesions.map((lesion, i) => (
            <div key={i} className="border p-4 rounded-xl space-y-2">
              <p className="font-bold">Lezyon {i + 1}</p>
              <Input placeholder="Boyut (örn. 3x2x1 cm)" value={lesion.size} onChange={(e) => updateLesion(i, "size", e.target.value)} />
              <Input placeholder="Renk (örn. krem, sarı)" value={lesion.color} onChange={(e) => updateLesion(i, "color", e.target.value)} />
              <Input placeholder="Kontur (örn. düzenli, spiküle)" value={lesion.contour} onChange={(e) => updateLesion(i, "contour", e.target.value)} />
              <Input placeholder="Kıvam (örn. sert, elastik)" value={lesion.consistency} onChange={(e) => updateLesion(i, "consistency", e.target.value)} />
              <Input placeholder="Deriye mesafe (cm)" value={lesion.distanceToSkin} onChange={(e) => updateLesion(i, "distanceToSkin", e.target.value)} />
              <Input placeholder="Meme başına mesafe (cm)" value={lesion.distanceToNipple} onChange={(e) => updateLesion(i, "distanceToNipple", e.target.value)} />
              <Input placeholder="Fasyaya mesafe (cm)" value={lesion.distanceToFascia} onChange={(e) => updateLesion(i, "distanceToFascia", e.target.value)} />
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(lesion.marginDistances).map((dir) => (
                  <Input key={dir} placeholder={`${dir.charAt(0).toUpperCase() + dir.slice(1)} sınır mesafesi (cm)`} value={lesion.marginDistances[dir]} onChange={(e) => {
                    const updated = [...lesions];
                    updated[i].marginDistances[dir] = e.target.value;
                    setLesions(updated);
                  }} />
                ))}
              </div>
              <Input placeholder="Diğer lezyonlara mesafe/ilişki" value={lesion.relationToOtherLesions} onChange={(e) => updateLesion(i, "relationToOtherLesions", e.target.value)} />
              <Button variant="destructive" onClick={() => removeLesion(i)}>Lezyonu Sil</Button>
            </div>
          ))}

          <Textarea className="mt-4" value={generateReport()} readOnly rows={15} />
        </CardContent>
      </Card>
    </div>
  );
}
