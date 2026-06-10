import { useEffect, useRef } from "react";

const STORE_LAT = -33.9215;
const STORE_LNG = 150.9168;
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const MapSection = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMap`;
      script.async = true;
      script.defer = true;

      window.initMap = () => initializeMap();
      document.head.appendChild(script);

      return () => {
        delete window.initMap;
      };
    } else {
      initializeMap();
    }
  }, []);

  const initializeMap = () => {
    if (!mapRef.current) return;

    const storeLocation = { lat: STORE_LAT, lng: STORE_LNG };

    const map = new window.google.maps.Map(mapRef.current, {
      center: storeLocation,
      zoom: 15,
      mapTypeControl: false,
      fullscreenControl: true,
      streetViewControl: false,
      styles: [
        { featureType: "water", elementType: "geometry", stylers: [{ color: "#e9e9e9" }] },
        { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
        { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
        { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
        { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#dadada" }] },
        { featureType: "poi", elementType: "geometry", stylers: [{ color: "#eeeeee" }] },
        { featureType: "transit", elementType: "geometry", stylers: [{ color: "#e5e5e5" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
        { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#0F4C8A" }] },
        { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#e5f5e0" }] },
        { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
        { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
      ],
    });

    mapInstanceRef.current = map;

    const marker = new window.google.maps.Marker({
      position: storeLocation,
      map,
      title: "UCMS – Main Office",
      animation: window.google.maps.Animation.DROP,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 12,
        fillColor: "#FF6B35",
        fillOpacity: 1,
        strokeColor: "#ffffff",
        strokeWeight: 3,
      },
    });

    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${STORE_LAT},${STORE_LNG}`;

    const container = document.createElement("div");
    container.style.fontFamily = "'Segoe UI', sans-serif";
    container.style.padding = "8px 4px";
    container.style.minWidth = "200px";

    const title = document.createElement("h3");
    title.textContent = "UCMS – Main Office";
    title.style.cssText = "margin:0 0 6px;color:#0F4C8A;font-size:15px;font-weight:700;";

    const address = document.createElement("p");
    address.style.cssText = "margin:0;color:#364153;font-size:13px;line-height:1.5;";
    address.innerHTML = "Unit-1/88, Bathurst Street<br>Liverpool NSW 2170, Australia";

    const link = document.createElement("a");
    link.href = directionsUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Get Directions";
    link.style.cssText = "display:inline-block;margin-top:10px;background:#FF6B35;color:#fff;font-size:12px;padding:6px 14px;border-radius:6px;text-decoration:none;font-weight:600;";

    container.appendChild(title);
    container.appendChild(address);
    container.appendChild(link);

    const infoWindow = new window.google.maps.InfoWindow({
      content: container,
    });

    infoWindow.open(map, marker);

    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });
  };

  return (
    <section className="mt-12 mb-12">
      <h2 className="mb-6 text-center text-3xl font-bold font-inter text-[#0A0A0A]">
        Find Us
      </h2>
      <div className="overflow-hidden rounded-2xl border border-border shadow-lg relative">
        <div ref={mapRef} className="h-[420px] w-full" />
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${STORE_LAT},${STORE_LNG}`}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-5 right-5 inline-flex items-center gap-2 bg-[#0F4C8A] text-white font-inter font-semibold text-sm px-4 py-2.5 rounded-xl shadow-lg hover:bg-[#193CB8] transition-colors z-10"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Get Directions
        </a>
      </div>
    </section>
  );
};

export default MapSection;