import React from "react";
import GoogleMapReact from "google-map-react";
//import { useGeolocated } from "react-geolocated";

export default function SimpleMap(props) {
  const [markers, setMarkers] = React.useState([]);
  const defaultProps = {
    key:"AIzaSyBQuFHbaOSWWIyZsXGnU_jFYCg2enqF1g4",
    center: { lat: -15.674378472412673, lng: -56.167523504731655 },
    zoom: 14,
    radius: props.radius
  };

  function _onClick(obj) {
    function getDistance(p1, p2) {
      var deg2rad = function (deg) { return deg * (Math.PI / 180); },
          R = 6371,
          dLat = deg2rad(p2.lat - p1.lat),
          dLng = deg2rad(p2.lng - p1.lng),
          a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
              + Math.cos(deg2rad(p1.lat))
              * Math.cos(deg2rad(p1.lat))
              * Math.sin(dLng / 2) * Math.sin(dLng / 2),
          c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return ((R * c *1000).toFixed());
    }

    var distancia = (getDistance(defaultProps.center,obj));
    console.log(distancia);
    if (distancia <= defaultProps.radius) {
      setMarkers([defaultProps.center,obj]);
    }
  }

  const circle = (map, maps) => {
    new maps.Circle({
      strokeColor: "#0fcf1f",
      fillColor: "#00FF00",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillOpacity: 0.2,
      map,
      center: defaultProps.center,
      radius: defaultProps.radius,
      geodesic: true,
      draggable: false,
      editable: false,
    });
  };


  const Marker = ()=><h1><i className="bx bx-home"></i></h1>;

  return (
    <div style={{ height: "50vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: defaultProps.key,
          libraries: ["places", "geometry", "drawing", "visualization"],
        }}
        onLoad={(a) => console.log(a)}
        onGoogleApiLoaded={({ map, maps }) => circle(map, maps)}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onClick={_onClick}
      >
        {markers.map((item, index)=><Marker key={index} lat={item.lat} lng={item.lng} />)}
      </GoogleMapReact>
    </div>
  );
}