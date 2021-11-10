import React from 'react'
import GoogleMapReact from 'google-map-react'
import { FaMapMarkerAlt } from 'react-icons/fa'

const MapMarker = ({ lat, lng }) => (
  <FaMapMarkerAlt
    size='42'
    color='#222'
    lat={lat}
    lng={lng}
    style={{ transform: `(translate -50%,-100%)` }}
  />
)

const GoogleMap = (content, { lat, lng, zoom }) => (
  <GoogleMapReact
    bootstrapURLKeys={{
      key: process.env.GATSBY_GOOGLE_MAP_KEY
    }}
    defaultCenter={{
      lat: content.lat || lat,
      lng: content.lng || lng
    }}
    defaultZoom={content.zoom || zoom}
  >
    <MapMarker lat={content.lat || lat} lng={content.lng || lng} />
  </GoogleMapReact>
)

GoogleMap.defaultProps = {
  lat: 59.95,
  lng: 30.33,
  zoom: 12
}

export default GoogleMap
