import 'package:flutter/material.dart';

class JourneyPlanner extends StatefulWidget {
  const JourneyPlanner({super.key});

  @override
  _JourneyPlannerState createState() => _JourneyPlannerState();
}

class _JourneyPlannerState extends State<JourneyPlanner> {
  final _formKey = GlobalKey<FormState>();
  final _fromController = TextEditingController();
  final _toController = TextEditingController();
  final _timeController = TextEditingController();
  String? _travelMode;

  void _getRoutes() {
    if (_formKey.currentState!.validate()) {
      final journeyData = {
        "from": _fromController.text,
        "to": _toController.text,
        "departureTime": _timeController.text,
        "mode": _travelMode,
      };

      print("Journey Data: $journeyData"); // later send to backend

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Routes fetched successfully!")),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Journey Planner")),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                controller: _fromController,
                decoration: InputDecoration(labelText: "From"),
                validator: (value) =>
                    value == null || value.isEmpty ? "Enter starting point" : null,
              ),
              SizedBox(height: 15),
              TextFormField(
                controller: _toController,
                decoration: InputDecoration(labelText: "To"),
                validator: (value) =>
                    value == null || value.isEmpty ? "Enter destination" : null,
              ),
              SizedBox(height: 15),
              TextFormField(
                controller: _timeController,
                decoration: InputDecoration(labelText: "Departure Time (e.g. 08:30)"),
                validator: (value) =>
                    value == null || value.isEmpty ? "Enter departure time" : null,
              ),
              SizedBox(height: 15),
              DropdownButtonFormField<String>(
                decoration: InputDecoration(labelText: "Mode of Transport"),
                value: _travelMode,
                items: ["Bus", "Car", "Bike", "Train", "Walk"]
                    .map((value) =>
                        DropdownMenuItem(value: value, child: Text(value)))
                    .toList(),
                onChanged: (value) => setState(() => _travelMode = value),
                validator: (value) =>
                    value == null ? "Select a travel mode" : null,
              ),
              SizedBox(height: 30),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.lightBlueAccent,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                  padding: EdgeInsets.symmetric(horizontal: 40, vertical: 15),
                ),
                onPressed: _getRoutes,
                child: Text(
                  "Get Routes",
                  style: TextStyle(fontSize: 18, color: Colors.black),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
