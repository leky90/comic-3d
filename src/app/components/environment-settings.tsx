export function EnvironmentSettings() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight intensity={0.5} position={[0, 100, 0]} />
      <pointLight intensity={0.5} position={[0, 0, -100]} />
      <color attach="background" args={['#191920']} />
      {/* <fog attach="fog" args={['#191920', 0, 100]} /> */}
    </>
  );
}
