import React, { Component } from 'react';
import Map from '~/components/map_components/Map';
import SelectedScooterSheet from '~/components/map_components/SelectedScooterSheet';
import ActiveRideSheet from '~/components/map_components/ActiveRideSheet';

export class Home extends Component {
  render() {
    return (
      <>
        <Map />
        <SelectedScooterSheet />
        <ActiveRideSheet />
      </>
    );
  }
}

export default Home;
