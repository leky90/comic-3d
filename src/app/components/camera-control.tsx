import { CameraControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useCallback, useEffect, useRef } from 'react';
import { Quaternion, Vector3 } from 'three';
import { ROUTES } from '../constants/route.constant';
import { ROUND_SPACE_Y } from '../constants/app.constant';
import { useHashLocation } from '../hooks/use-hash-location';
import { useRoute } from 'wouter';

type CameraControlProps = {
  position?: Vector3;
  quaternion?: Quaternion;
};

const currentPosition = new Vector3(0, 0, 2);
const focusPosition = new Vector3(0, 0, 0);

export function CameraControl({
  position = new Vector3(0, 2, 10),
  quaternion = new Quaternion(),
}: CameraControlProps) {
  const firstAccess = useRef(true);
  const { controls, scene } = useThree();
  const [location] = useHashLocation();
  const [, params] = useRoute(ROUTES['detail-comic']);
  const comicId = params?.id;

  const changeCameraPosition = useCallback(
    function (location: string) {
      const cameraControls = controls as unknown as CameraControls;

      if (!cameraControls) return;

      cameraControls.azimuthAngle = 0;
      cameraControls.polarAngle = 1.6;
      cameraControls.minDistance = 0.01;
      cameraControls.maxDistance = 0.01;
      cameraControls.distance = 0.01;

      if (location === ROUTES.comics) {
        cameraControls.moveTo(0, 2, 0, true);
        return;
      }

      if (location.replace(/[0-9]+$/, ':page') === ROUTES['comics-page']) {
        const matched = location.match(/[0-9]+$/);
        const page = matched ? matched[0] : 1;

        cameraControls.moveTo(
          0,
          (Number(page) - 1) * ROUND_SPACE_Y + 6,
          0,
          true
        );

        return;
      }

      if (
        location.replace(/[a-zA-Z0-9-]+$/, ':id') === ROUTES['detail-comic']
      ) {
        if (!comicId) return;

        const active = scene.getObjectByName(comicId);

        if (active?.parent) {
          const cameraControls = controls as unknown as CameraControls;

          active.parent.localToWorld(currentPosition.set(0, 0.5, 12));
          active.parent.localToWorld(focusPosition.set(0, 0, -2));

          cameraControls?.setLookAt(
            ...currentPosition.toArray(),
            ...focusPosition.toArray(),
            true
          );
          cameraControls.minDistance = 13;
          cameraControls.maxDistance = 13;
          cameraControls.distance = 13;
        }

        return;
      }

      cameraControls.moveTo(0, 2, 15, true);
    },
    [comicId, controls, scene]
  );

  useEffect(() => {
    if (!location) return;

    if (firstAccess.current) {
      setTimeout(() => {
        changeCameraPosition(location);
        firstAccess.current = false;
      }, 500);
    } else {
      changeCameraPosition(location);
    }
  }, [changeCameraPosition, location, position, quaternion]);

  return (
    <>
      {/* <PerspectiveCamera /> */}
      <CameraControls
        minDistance={0.01}
        maxDistance={0.01}
        distance={0.01}
        polarAngle={1.6}
        minPolarAngle={1}
        maxPolarAngle={2}
        minZoom={1}
        maxZoom={1}
        // minAzimuthAngle={-0.5}
        // maxAzimuthAngle={0.5}
        // azimuthAngle={0}
        dollySpeed={1}
        makeDefault
      />
    </>
  );
}
