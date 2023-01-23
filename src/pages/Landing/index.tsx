import React, { FC } from 'react';

import { CollectionName } from 'model/enums/CollectionName';

import { RoomModel } from 'model/types/Room';

import HasPermission from 'components/base/HasPermission';
import Table from 'components/base/Table';

import config from 'config';
import useFetch from 'hooks/useFetch';

const RoomsEnabled: FC = () => (
  <HasPermission expectedValue="true" propName="webpanel.room.enabled">
    <div>Has rooms enabled</div>
  </HasPermission>
);

const RoomsDisabled: FC = () => (
  <HasPermission expectedValue="false" propName="webpanel.room.enabled">
    <div>Has rooms disabled</div>
  </HasPermission>
);

const LandingPage: FC = () => {
  const { data, isLoading } = useFetch<RoomModel[]>(
    CollectionName.config,
    config.api.room.getRooms,
  );

  return (
    <div id="landing-page">
      <h2 style={{ borderBottom: '1px solid black' }}>LANDING PAGE</h2>
      <Table<RoomModel>
        columns={[
          {
            accessor: 'name',
            Header: 'Room Name',
            filterable: true,
            sortable: true,
          },
          {
            accessor: 'roomNumber',
            Header: 'Room Number',
            filterable: true,
            sortable: true,
          },
          {
            accessor: 'bedInfo',
            Header: 'Bed info',
            filterable: true,
            sortable: true,
          },
        ]}
        data={data || []}
        loading={isLoading}
      />
      <RoomsEnabled />
      <RoomsDisabled />
    </div>
  );
};

export default LandingPage;
