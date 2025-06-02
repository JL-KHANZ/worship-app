import { Stack } from 'expo-router';

export const screenOptions = {
  href: null,
};
export default function SetsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: 'modal',
        animation: 'slide_from_bottom',
      }}
    />
  );
}
