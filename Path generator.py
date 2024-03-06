
import osmnx as ox
import networkx as nx
import numpy as np
import RPi.GPIO as GPIO
from flask import Flask, request, jsonify
import time

app = Flask(__name__)
GPIO.setmode(GPIO.BCM)

# Initialize start_location and final_location to None
start_location = None
final_location = None

# Create a network graph of the area with an increased search radius
def create_graph(start_coordinates, dist=1500):
    return ox.graph_from_point(start_coordinates, dist=dist, network_type='all')

def update_graph(start, final):
    # Create or update the graph using the received coordinates
    graph = create_graph(start, dist=1500)

    # Find the nearest network nodes to the start and final coordinates
    start_node = ox.distance.nearest_nodes(graph, start[1], start[0])
    final_node = ox.distance.nearest_nodes(graph, final[1], final[0])

    # Calculate the route using networkx with 'length' as weight metric
    route = nx.shortest_path(graph, start_node, final_node, weight='length')

    # Extract and return the coordinates of turning points (nodes) in (latitude, longitude) format
    turning_points = [(graph.nodes[node]['y'], graph.nodes[node]['x']) for node in route]
    
    # Add intermediate points to make the path smoother
    smoothed_route = []
    for i in range(len(turning_points) - 1):
        p1, p2 = turning_points[i], turning_points[i + 1]
        smoothed_route.append(p1)
        # Interpolate between p1 and p2
        num_intermediate_points = 10  # Adjust as needed
        for j in range(1, num_intermediate_points):
            y = np.interp(j, [0, num_intermediate_points], [p1[0], p2[0]])
            x = np.interp(j, [0, num_intermediate_points], [p1[1], p2[1]])
            smoothed_route.append((y, x))
    smoothed_route.append(turning_points[-1])

    return smoothed_route

@app.route('/api/navigation', methods=['POST']) #end point from the application 
def receive_signal():
    global start_location, final_location
    try:
        data = request.json
        # Extract start and final location coordinates from the received data
        new_start_location = data.get("start_location")
        new_final_location = data.get("final_location")
        print("Received data:", data)

        # Update the start and final locations
        start_location = new_start_location
        final_location = new_final_location

        # Check if both start and final locations are not None before updating the graph
        if start_location is not None and final_location is not None:
            smoothed_path = update_graph(start_location, final_location)
            return jsonify({"message": "Signal received successfully.", "smoothed_path": smoothed_path})
        else:
            return jsonify({"message": "Signal received, waiting for start and final coordinates."})
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    try:
        app.run(host='0.0.0.0', port=5400, debug=True)
    except KeyboardInterrupt:
        pass

GPIO.cleanup()
