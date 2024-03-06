import folium
from folium.plugins import MarkerCluster

# Create a map centered at a specific location with adjusted zoom level
map_center = [12.841134, 80.153791]
m = folium.Map(location=map_center, zoom_start=14)  # Adjust the zoom level

# Define your waypoints with corrected latitude and longitude order
waypoints = [
    # Coordinates generated in path generator
]

# Add markers for the starting and ending points with different icons
folium.Marker(
    location=waypoints[0],
    popup="Starting Point",
    icon=folium.Icon(color="green"),
).add_to(m)

folium.Marker(
    location=waypoints[-1],
    popup="Ending Point",
    icon=folium.Icon(color="red"),
).add_to(m)

# Create a MarkerCluster for the rest of the waypoints
marker_cluster = MarkerCluster().add_to(m)

# Add markers to the cluster
for idx, waypoint in enumerate(waypoints[1:-1]):  # Exclude starting and ending points
    folium.Marker(
        location=waypoint,
        popup=f"Waypoint {idx + 2}",
    ).add_to(marker_cluster)

# Optionally, connect waypoints with lines
folium.PolyLine(waypoints, color="blue").add_to(m)

# Save the map to an HTML file or display it
m.save("waypoints_map.html")
