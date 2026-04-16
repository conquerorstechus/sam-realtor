"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { formatListingPrice } from "./listingFormat";
import type { MapBrowseListing } from "./types";

type Props = {
  listings: MapBrowseListing[];
  selectedId: string | null;
  hoveredId: string | null;
  onSelect: (id: string | null) => void;
  onHoverMarker?: (id: string | null) => void;
};

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type MarkerVisualState = "default" | "hover" | "selected";

function markerVisualState(
  rowId: string,
  selectedId: string | null,
  hoveredId: string | null,
): MarkerVisualState {
  if (rowId === selectedId) return "selected";
  if (rowId === hoveredId) return "hover";
  return "default";
}

/** Brand-aligned orange-red → deep maroon (reference: gradient house pin). */
function gradientStops(state: MarkerVisualState): [string, string] {
  switch (state) {
    case "selected":
      return ["#FF9F4A", "#6B0F18"];
    case "hover":
      return ["#FBBF77", "#A61E28"];
    default:
      return ["#F28C45", "#8F1D2B"];
  }
}

/**
 * Thick minimalist house (gabled roof + two legs); vertical gradient + CSS drop-shadow.
 */
function buildPinIcon(rowId: string, selectedId: string | null, hoveredId: string | null): L.DivIcon {
  const state = markerVisualState(rowId, selectedId, hoveredId);
  const [top, bottom] = gradientStops(state);
  const gid = `trp-house-${rowId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const scale = state === "selected" ? 1.06 : state === "hover" ? 1.03 : 1;
  const html = `
    <div class="trp-leaflet-house-wrap" style="width:52px;height:60px;display:flex;justify-content:center;align-items:flex-end;pointer-events:none;transform:scale(${scale});transform-origin:50% 100%;filter:drop-shadow(2px 5px 5px rgba(15,23,42,0.32)) drop-shadow(1px 2px 2px rgba(0,0,0,0.18));">
      <svg width="44" height="52" viewBox="0 0 48 56" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="${gid}" x1="24" y1="5" x2="24" y2="54" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="${top}"/>
            <stop offset="100%" stop-color="${bottom}"/>
          </linearGradient>
        </defs>
        <path fill="url(#${gid})" d="M24 5 L45 26 L45 54 L30 54 L30 31 L24 24 L18 31 L18 54 L3 54 L3 26 Z"/>
      </svg>
    </div>`;
  return L.divIcon({
    html,
    className: "trp-leaflet-marker-root",
    iconSize: [52, 60],
    iconAnchor: [26, 58],
    popupAnchor: [0, -54],
  });
}

function listingHref(row: MapBrowseListing): string {
  if (row.listingKind === "rent" || !row.slug) return "/contact";
  return `/properties/${encodeURIComponent(row.slug)}`;
}

function popupHtml(row: MapBrowseListing): string {
  const href = listingHref(row);
  const ctaLabel = row.listingKind === "rent" ? "Plan your lease" : "View plans & buy";
  const price = escapeHtml(formatListingPrice(row));
  return `
    <div class="trp-leaflet-popup-inner" style="min-width:210px;font-family:ui-sans-serif,system-ui,sans-serif;padding:2px 0 4px;">
      <div style="font-size:10px;font-weight:800;letter-spacing:0.06em;text-transform:uppercase;color:#78716c;margin-bottom:4px;">
        ${escapeHtml(row.propertyType)}
      </div>
      <div style="font-size:15px;font-weight:800;color:#1c1917;line-height:1.2;margin-bottom:4px;">
        ${escapeHtml(row.title)}
      </div>
      <div style="font-size:12px;color:#57534e;margin-bottom:8px;line-height:1.35;">
        ${escapeHtml(row.addressLine)}, ${escapeHtml(row.city)}, ${escapeHtml(row.state)}
      </div>
      <div style="font-size:18px;font-weight:800;color:#C63A2B;margin-bottom:10px;">${price}</div>
      <div style="font-size:11px;color:#78716c;margin-bottom:10px;">
        ${row.beds} beds · ${row.baths} baths · ${row.sqft.toLocaleString()} sqft
      </div>
      <a href="${href}" style="display:block;text-align:center;background:#1c1917;color:#fff;font-weight:800;font-size:12px;padding:10px 12px;border-radius:10px;text-decoration:none;">
        ${escapeHtml(ctaLabel)}
      </a>
    </div>`;
}

const TAMPA_VIEW: L.LatLngExpression = [27.96, -82.46];

/**
 * Leaflet + OpenStreetMap — real geography; pins open a popup with a CTA to view plans / buy.
 */
export function LeafletPropertyMap({ listings, selectedId, hoveredId, onSelect, onHoverMarker }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const groupRef = useRef<L.LayerGroup | null>(null);
  const [expanded, setExpanded] = useState(false);

  const rebuildMarkers = useCallback(() => {
    const map = mapRef.current;
    const group = groupRef.current;
    if (!map || !group) return;
    group.clearLayers();

    if (listings.length === 0) {
      map.setView(TAMPA_VIEW, 10);
      return;
    }

    const bounds = L.latLngBounds(listings.map((r) => [r.lat, r.lng] as L.LatLngTuple));
    const markerById = new Map<string, L.Marker>();

    for (const row of listings) {
      const marker = L.marker([row.lat, row.lng], {
        icon: buildPinIcon(row.id, selectedId, hoveredId),
        title: row.title,
      }).addTo(group);

      marker.bindPopup(popupHtml(row), { maxWidth: 300, className: "trp-leaflet-popup-wrap" });
      markerById.set(row.id, marker);

      marker.on("click", () => {
        onSelect(row.id);
        marker.openPopup();
      });
      marker.on("mouseover", () => onHoverMarker?.(row.id));
      marker.on("mouseout", () => onHoverMarker?.(null));
    }

    if (listings.length === 1) {
      map.setView([listings[0]!.lat, listings[0]!.lng], 12);
    } else {
      map.fitBounds(bounds, { padding: [36, 36], maxZoom: 11 });
    }

    if (selectedId) {
      const row = listings.find((r) => r.id === selectedId);
      const m = row ? markerById.get(row.id) : undefined;
      if (m && row) {
        m.openPopup();
        map.panTo([row.lat, row.lng], { animate: true, duration: 0.35 });
      }
    }
  }, [listings, selectedId, hoveredId, onSelect, onHoverMarker]);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;

    const map = L.map(el, {
      zoomControl: true,
      scrollWheelZoom: true,
      attributionControl: true,
    }).setView(TAMPA_VIEW, 10);

    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    const group = L.layerGroup().addTo(map);
    groupRef.current = group;

    const onResize = () => map.invalidateSize();
    window.addEventListener("resize", onResize);
    requestAnimationFrame(() => {
      map.invalidateSize();
      requestAnimationFrame(() => map.invalidateSize());
    });

    return () => {
      window.removeEventListener("resize", onResize);
      group.clearLayers();
      map.remove();
      mapRef.current = null;
      groupRef.current = null;
    };
  }, []);

  useEffect(() => {
    rebuildMarkers();
  }, [rebuildMarkers]);

  useEffect(() => {
    mapRef.current?.invalidateSize();
  }, [expanded]);

  return (
    <div
      ref={hostRef}
      className={`relative z-0 h-full min-h-[260px] w-full overflow-hidden rounded-[inherit] bg-stone-200 ${
        expanded ? "fixed inset-3 z-[500] min-h-0 shadow-2xl sm:inset-6" : ""
      }`}
    >
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="pointer-events-auto absolute bottom-14 right-3 z-[1000] rounded-lg border border-stone-300 bg-white/95 px-2.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wide text-stone-800 shadow-md backdrop-blur-sm hover:bg-white"
      >
        {expanded ? "Exit" : "Fullscreen"}
      </button>
    </div>
  );
}
