import React, { FC } from 'react';

import { CollectionName } from 'model/enums/CollectionName';

import { RoomModel } from 'model/type/Room';

import config from 'config';
import useFetch from 'hooks/useFetch';

const LandingPage: FC = () => {
  const { data, isLoading } = useFetch<RoomModel[]>(
    CollectionName.config,
    config.api.room.getRooms,
  );

  return (
    <div id="landing-page">
      <h2 style={{ borderBottom: '1px solid black' }}>LANDING PAGE</h2>
      <div>{isLoading && <div>LOADING...</div>}</div>
      {!!data &&
        data.length > 0 &&
        data.map((room: RoomModel) => (
          <div key={room.roomId} style={{ borderBottom: '1px solid black', display: 'flex' }}>
            <h3 style={{ marginRight: 10 }}>{room.name}</h3>
            <span>Number: {room.roomNumber}</span>
          </div>
        ))}
    </div>
  );
};

export default LandingPage;
