import 'package:flutter/material.dart';
import 'profile_complete.dart';

class ProfileForm extends StatefulWidget {
  const ProfileForm({super.key});

  @override
  _ProfileFormState createState() => _ProfileFormState();
}

class _ProfileFormState extends State<ProfileForm> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _locationController = TextEditingController();
  String? _travelPurpose;
  String? _modeOfTransport;
  String? _usage;
  String? _frequency;
  int _familySize = 1;

  void _incrementFamily() {
    setState(() {
      _familySize++;
    });
  }

  void _decrementFamily() {
    if (_familySize > 1) {
      setState(() {
        _familySize--;
      });
    }
  }

  void _submitProfile() {
    if (_formKey.currentState!.validate()) {
      // Collect all values here
      final profileData = {
        "name": _nameController.text,
        "familySize": _familySize,
        "location": _locationController.text,
        "travelPurpose": _travelPurpose,
        "modeOfTransport": _modeOfTransport,
        "usage": _usage,
        "frequency": _frequency,
      };

      print("Profile Data: $profileData"); // Later send to backend

      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => ProfileComplete()),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Tell us about Yourself")),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                controller: _nameController,
                decoration: InputDecoration(labelText: "Name"),
                validator: (value) =>
                    value == null || value.isEmpty ? "Enter your name" : null,
              ),
              SizedBox(height: 15),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text("Family Size:"),
                  Row(
                    children: [
                      IconButton(
                        icon: Icon(Icons.remove),
                        onPressed: _decrementFamily,
                      ),
                      Text("$_familySize"),
                      IconButton(
                        icon: Icon(Icons.add),
                        onPressed: _incrementFamily,
                      ),
                    ],
                  ),
                ],
              ),
              SizedBox(height: 15),
              TextFormField(
                controller: _locationController,
                decoration: InputDecoration(labelText: "Location"),
                validator: (value) => value == null || value.isEmpty
                    ? "Enter your location"
                    : null,
              ),
              SizedBox(height: 15),
              DropdownButtonFormField<String>(
                decoration: InputDecoration(labelText: "Travel Purpose"),
                value: _travelPurpose,
                items: ["Work", "Education", "Shopping", "Leisure", "Other"]
                    .map((value) =>
                        DropdownMenuItem(value: value, child: Text(value)))
                    .toList(),
                onChanged: (value) => setState(() => _travelPurpose = value),
                validator: (value) =>
                    value == null ? "Select travel purpose" : null,
              ),
              SizedBox(height: 15),
              DropdownButtonFormField<String>(
                decoration: InputDecoration(labelText: "Mode of Transport"),
                value: _modeOfTransport,
                items: ["Bus", "Car", "Bike", "Train", "Walk"]
                    .map((value) =>
                        DropdownMenuItem(value: value, child: Text(value)))
                    .toList(),
                onChanged: (value) => setState(() => _modeOfTransport = value),
                validator: (value) =>
                    value == null ? "Select mode of transport" : null,
              ),
              SizedBox(height: 15),
              DropdownButtonFormField<String>(
                decoration: InputDecoration(labelText: "How will you use the app?"),
                value: _usage,
                items: ["Daily Commute", "Occasional Trips", "Planning Only"]
                    .map((value) =>
                        DropdownMenuItem(value: value, child: Text(value)))
                    .toList(),
                onChanged: (value) => setState(() => _usage = value),
                validator: (value) =>
                    value == null ? "Select an option" : null,
              ),
              SizedBox(height: 15),
              DropdownButtonFormField<String>(
                decoration: InputDecoration(labelText: "How often will you use the app?"),
                value: _frequency,
                items: ["Daily", "Weekly", "Monthly", "Rarely"]
                    .map((value) =>
                        DropdownMenuItem(value: value, child: Text(value)))
                    .toList(),
                onChanged: (value) => setState(() => _frequency = value),
                validator: (value) =>
                    value == null ? "Select frequency" : null,
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
                onPressed: _submitProfile,
                child: Text(
                  "Submit Profile",
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
