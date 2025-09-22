import 'package:flutter/material.dart';
import 'intro_screen.dart';

void main() {
  runApp(TravelSurveyApp());
}

class TravelSurveyApp extends StatelessWidget {
  const TravelSurveyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Nomado',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: IntroScreen(),
    );
  }
}
