import React, { Component } from 'react';
import { Redirect } from 'expo-router';

export class Index extends Component {
  render() {
    return <Redirect href="/(auth)/login" />;
  }
}

export default Index;
