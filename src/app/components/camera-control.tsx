import { CameraControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useCallback, useEffect, useRef } from 'react';
import { Quaternion, Vector3 } from 'three';
import { ROUTES } from '../constants/route.constant';
import { ROUND_SPACE_Y } from '../constants/app.constant';
import { useHashLocation } from '../hooks/use-hash-location';

type CameraControlProps = {
  position?: Vector3;
  quaternion?: Quaternion;
};

export function CameraControl({
  position = new Vector3(0, 2, 10),
  quaternion = new Quaternion(),
}: CameraControlProps) {
  const firstAccess = useRef(true);
  const { controls } = useThree();
  const [location] = useHashLocation();

  const changeCameraPosition = useCallback(
    function (location: string) {
      const cameraControls = controls as unknown as CameraControls;

      if (!cameraControls) return;

      switch (location.replace(/[0-9]+$/, ':page')) {
        case ROUTES.comics:
          cameraControls.moveTo(0, 2, 0, true);
          break;
        case ROUTES['comics-page']: {
          const matched = location.match(/[0-9]+$/);
          const page = matched ? matched[0] : 1;

          cameraControls.moveTo(
            0,
            (Number(page) - 1) * ROUND_SPACE_Y + 6,
            0,
            true
          );
          break;
        }
        default:
          cameraControls.moveTo(0, 2, 15, true);
          break;
      }

      cameraControls.azimuthAngle = 0;
      cameraControls.polarAngle = 1.6;
    },
    [controls]
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
        // minAzimuthAngle={-0.5}
        // maxAzimuthAngle={0.5}
        // azimuthAngle={0}
        dollySpeed={1}
        makeDefault
      />
    </>
  );
}
