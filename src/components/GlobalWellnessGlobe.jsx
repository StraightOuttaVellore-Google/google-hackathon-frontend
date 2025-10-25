import { useEffect, useRef, useState } from 'react'
import Globe from 'globe.gl'
import * as THREE from 'three'
import { useTheme } from '../contexts/ThemeContext'

export default function GlobalWellnessGlobe({ isOverlay = false, selectedRegion, onRegionChange }) {
  const globeContainerRef = useRef()
  const globeInstance = useRef()
  const [hoveredRegion, setHoveredRegion] = useState(null)
  const { theme } = useTheme()

  const size = isOverlay ? 700 : 180

  useEffect(() => {
    if (!globeContainerRef.current) return

    // Create Globe instance
    const globe = Globe()(globeContainerRef.current)
      .width(size)
      .height(size)
      .backgroundColor('rgba(0,0,0,0)')
      
      // Globe appearance - theme-based colors
      .globeImageUrl(null)
      .showGlobe(true)
      .showAtmosphere(true)
      .atmosphereColor(theme === 'light' ? '#8BD4B3' : '#22d3ee')
      .atmosphereAltitude(0.15)
      
      // Show graticules (grid lines)
      .showGraticules(true)
      
      // Custom globe material - realistic Earth colors only in light mode
      .globeMaterial(new THREE.MeshBasicMaterial({
        color: theme === 'light' ? '#4A90E2' : '#1a1a1a', // Light: Ocean blue, Dark/Black: Original dark gray
        wireframe: true,
        wireframeLinewidth: 1,
        wireframeColor: theme === 'light' ? '#87CEEB' : '#333333' // Light: Sky blue, Dark/Black: Original dark gray
      }))
      
      // Camera controls
      .enablePointerInteraction(isOverlay)
      
    // Set initial camera position
    globe.pointOfView({ altitude: 2.5 }, 0)
    
    // Auto-rotate
    if (!isOverlay) {
      globe.controls().autoRotate = true
      globe.controls().autoRotateSpeed = 0.6
    }
    
    // Disable zoom for mini globe
    if (!isOverlay) {
      globe.controls().enableZoom = false
    }

    globeInstance.current = globe

    // Load country polygons from Natural Earth data
    fetch('https://unpkg.com/world-atlas@2/countries-110m.json')
      .then(res => res.json())
      .then(topology => {
        import('topojson-client')
          .then(({ feature }) => {
            const countries = feature(topology, topology.objects.countries).features

            // Configure polygon layer for countries - realistic Earth colors only in light mode
            globe
              .polygonsData(countries)
              .polygonCapColor(() => theme === 'light' ? 'rgba(34, 139, 34, 0.8)' : 'rgba(70, 80, 95, 0.7)') // Light: Forest green, Dark/Black: Original gray
              .polygonSideColor(() => theme === 'light' ? 'rgba(50, 205, 50, 0.6)' : 'rgba(50, 60, 75, 0.6)')
              .polygonStrokeColor(() => theme === 'light' ? 'rgba(0, 128, 0, 0.6)' : 'rgba(148, 163, 184, 0.6)') // Light: Green borders, Dark/Black: Original gray borders
              .polygonAltitude(0.005)
              .polygonCapCurvatureResolution(isOverlay ? 3 : 5)
              .onPolygonHover((polygon) => {
                if (isOverlay && polygon) {
                  setHoveredRegion(polygon.properties?.name || 'Unknown')
                } else {
                  setHoveredRegion(null)
                }
              })
              .onPolygonClick((polygon) => {
                if (isOverlay && polygon && onRegionChange) {
                  onRegionChange(polygon.properties?.name || 'Unknown')
                }
              })

            // Add activity points (bright glowing dots)
            const activityPoints = [
              { lat: 40.7128, lng: -74.0060, size: 0.3, name: 'New York' },
              { lat: 34.0522, lng: -118.2437, size: 0.25, name: 'Los Angeles' },
              { lat: 51.5074, lng: -0.1278, size: 0.28, name: 'London' },
              { lat: 48.8566, lng: 2.3522, size: 0.22, name: 'Paris' },
              { lat: 35.6762, lng: 139.6503, size: 0.35, name: 'Tokyo' },
              { lat: 28.6139, lng: 77.2090, size: 0.3, name: 'Delhi' },
              { lat: 1.3521, lng: 103.8198, size: 0.25, name: 'Singapore' },
              { lat: -33.8688, lng: 151.2093, size: 0.22, name: 'Sydney' },
              { lat: -23.5505, lng: -46.6333, size: 0.24, name: 'São Paulo' },
              { lat: 30.0444, lng: 31.2357, size: 0.2, name: 'Cairo' },
              { lat: 25.2048, lng: 55.2708, size: 0.22, name: 'Dubai' },
              { lat: 19.4326, lng: -99.1332, size: 0.23, name: 'Mexico City' }
            ]

            globe
              .pointsData(activityPoints)
              .pointColor(() => theme === 'light' ? '#8BD4B3' : '#ffffff') // Light: Warmer Aurora green, Dark: White
              .pointAltitude(0.01)
              .pointRadius('size')
              .pointsMerge(true)
          })
          .catch(err => {
            console.log('Could not load country data:', err)
          })
      })
      .catch(err => {
        console.log('Could not fetch country data:', err)
      })

    // Cleanup
    return () => {
      if (globeInstance.current) {
        globeInstance.current._destructor?.()
      }
    }
  }, [isOverlay, size, onRegionChange, theme])

  return (
    <div style={{ position: 'relative', width: `${size}px`, height: `${size}px` }}>
      <div ref={globeContainerRef} />
      
      {/* Region name tooltip */}
      {isOverlay && hoveredRegion && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 neuro-surface-elevated px-4 py-2 rounded-lg animate-fadeIn pointer-events-none z-10">
          <span className="text-sm font-semibold neuro-text-primary">{hoveredRegion}</span>
        </div>
      )}
    </div>
  )
}
