"use client";

import React, { useState } from 'react';
import { MapContainer, Marker, Popup, Polygon, useMapEvents, ImageOverlay } from 'react-leaflet';
// Component cho phép chọn điểm trên bản đồ popup
function SelectableMap({ points, setPoints }: { points: LatLngExpression[]; setPoints: (pts: LatLngExpression[]) => void }) {
    useMapEvents({
        click(e) {
            if (points.length < 4) {
                setPoints([...points, [e.latlng.lat, e.latlng.lng]]);
            }
        },
    });
    return null;
}
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression } from 'leaflet';

// Fix marker icon for Next.js/Leaflet

L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/leaflet/marker-icon-2x.png',
    iconUrl: '/leaflet/marker-icon.png',
    shadowUrl: '/leaflet/marker-shadow.png',
});


export default function MapWithPopup() {
    const [showPopup, setShowPopup] = useState(false);
    const [polygonPoints, setPolygonPoints] = useState<LatLngExpression[]>([]); // polygon trên bản đồ chính
    const [popupPoints, setPopupPoints] = useState<LatLngExpression[]>([]); // polygon tạm trong popup

    // Test tối giản: bounds 400x400, center [200,200], file PNG nhỏ
    const bounds: [[number, number], [number, number]] = [[0, 0], [900, 900]];
    const center: LatLngExpression = [200, 200];

    return (
        <div className="w-full flex flex-col items-center">
            <button onClick={() => setShowPopup(true)} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">
                Mapping
            </button>

            {/* Bản đồ chính: chỉ hiển thị khi popup đóng */}
            {!showPopup && (
                <MapContainer center={center} zoom={0} crs={L.CRS.Simple} style={{ minHeight: 400, minWidth: 400 }} className="w-full h-[400px] rounded">
                    <ImageOverlay url="/floorplan.png" bounds={bounds} />
                    {/* Hiển thị polygon và marker nếu đã lưu */}
                    {polygonPoints.map((pt, idx) => (
                        <Marker key={idx} position={pt}>
                            <Popup>{`D${idx + 1}`}</Popup>
                        </Marker>
                    ))}
                    {polygonPoints.length === 4 && (
                        <Polygon positions={polygonPoints} pathOptions={{ color: '#2A70F0', fillColor: '#2A70F0', fillOpacity: 0.4 }} />
                    )}
                </MapContainer>
            )}

            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[90vw] max-w-2xl relative">
                        <button onClick={() => setShowPopup(false)} className="absolute top-2 right-2 text-xl">&times;</button>

                        <MapContainer center={center} zoom={0} crs={L.CRS.Simple} style={{ minHeight: 400, minWidth: 400 }} className="w-full h-[400px] rounded">
                            <ImageOverlay url="/floorplan.png" bounds={bounds} />
                            {/* Cho phép chọn điểm bằng chuột */}
                            <SelectableMap points={popupPoints} setPoints={setPopupPoints} />
                            {/* Hiển thị marker các điểm đã chọn */}
                            {popupPoints.map((pt, idx) => (
                                <Marker key={idx} position={pt}>
                                    <Popup>{`D${idx + 1}`}</Popup>
                                </Marker>
                            ))}
                            {/* Vẽ polygon khi đủ 4 điểm */}
                            {popupPoints.length === 4 && (
                                <Polygon positions={popupPoints} pathOptions={{ color: '#2A70F0', fillColor: '#2A70F0', fillOpacity: 0.4 }} />
                            )}
                        </MapContainer>
                        <div className="flex gap-2 mt-4">
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded"
                                disabled={popupPoints.length !== 4}
                                onClick={() => {
                                    if (popupPoints.length === 4) {
                                        setPolygonPoints(popupPoints);
                                        setShowPopup(false);
                                    }
                                }}
                            >Save</button>
                            <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded" onClick={() => setPopupPoints([])}>Reset</button>
                            {popupPoints.length > 0 && popupPoints.length < 4 && (
                                <button className="bg-red-400 text-white px-4 py-2 rounded" onClick={() => setPopupPoints(popupPoints.slice(0, -1))}>Undo</button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
