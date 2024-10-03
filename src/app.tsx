import React from 'react';
import { createRoot } from 'react-dom/client';
import { createComponent } from '@lit/react';
import { DemoGreeting as DemoGreetingWC } from './demo-greeting.js';

// Creates a React component from a Lit component
const DemoGreeting = createComponent({
  react: React,
  tagName: 'demo-greeting',
  elementClass: DemoGreetingWC,
});

const root = createRoot(document.getElementById('app')!);

root.render(<DemoGreeting name="React" />);
