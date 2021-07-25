import React, { useRef, useEffect, useState } from "react";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import mapboxgl from "mapbox-gl";

// mapboxgl.accessToken =
// "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";

const Map = () => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState("");
  const [lat, setLat] = useState("");
  const [zoom, setZoom] = useState(4);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      attributionControl: false,
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [43.6847595, 33.2209265],
      zoom: zoom,
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl());

    var marker = new mapboxgl.Marker({
      draggable: true,
      color: "red",
    });

    // Find my location
    var geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      fitBoundsOptions: {
        maxZoom: 17,
      },
    });
    map.addControl(geolocate);

    geolocate.on("geolocate", (e) => {
      var lon = e.coords.longitude;
      var lat = e.coords.latitude;

      setLng(lon);
      setLat(lat);

      marker.setLngLat([lon, lat]).addTo(map);

      localStorage.setItem("lng", lon);
      localStorage.setItem("lat", lat);

      marker.on("dragend", () => {
        var lngLat = marker.getLngLat();

        setLng(lngLat.lng);
        setLat(lngLat.lat);

        localStorage.setItem("lng", lngLat.lng);
        localStorage.setItem("lat", lngLat.lat);
      });
    });

    map.on("load", () => {
      geolocate.trigger();
    });

  }, []);

  return (
    <div>
      <div className="sidebarStyle">
        <div>
          Longitude: {lng} | Latitude: {lat}
        </div>
      </div>
      <div className="map-container" ref={mapContainerRef} />
    </div>
  );
};

export default Map;
