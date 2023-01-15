import React from "react";
import GoogleMapReact from "google-map-react";
import { useGeolocated } from "react-geolocated";

const AnyReactComponent = ({ text }) => <div>{text}<i className={'bx bx-home nav__icon'}></i></div>;

export default function SimpleMap() {
  const data = {
    center: {lat: -15.6694398, lng: -56.1640791},
    zoom: 18,
  };

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {enableHighAccuracy: true},
      userDecisionTimeout: 5000,
    });

  return !isGeolocationAvailable ? (
    <div>Seu navegador não suporta a geolocalização</div>
  ) : !isGeolocationEnabled ? (
    <div>A geolocalização não está ativada</div>
  ) : coords ? (
    <div flex={1} style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact bootstrapURLKeys={{ key: "AIzaSyB7uSyHl7w2J1OXok3mfNEryT22uYoB8SE" }} defaultCenter={data.center} defaultZoom={data.zoom}>
        <AnyReactComponent lat={coords.latitude} lng={coords.longitude} text="My Marker" />
      </GoogleMapReact>
    </div>
  ) : (
    <div>Obtendo os dados de localização&hellip; </div>
  );
}

//AIzaSyDDCh02P-ETQlKHzjkDLq7UETGmK4uG3uk
