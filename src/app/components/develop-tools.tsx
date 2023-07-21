import { GizmoHelper, GizmoViewport } from '@react-three/drei';
import { Perf } from 'r3f-perf';

type DevelopToolsProps = {
  performance?: boolean;
  viewport?: boolean;
};

export function DevelopTools({
  performance = true,
  viewport = true,
}: DevelopToolsProps) {
  if (import.meta.env.PROD) return;

  return (
    <>
      {performance && <Perf />}
      {viewport && (
        <GizmoHelper alignment="bottom-right" margin={[100, 100]}>
          <GizmoViewport labelColor="white" axisHeadScale={1} />
        </GizmoHelper>
      )}
    </>
  );
}
