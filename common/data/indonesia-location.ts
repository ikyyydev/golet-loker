import { State, City } from "country-state-city";

export type IndonesiaLocationProps = {
  key: string;
  value: string;
  label: string;
  city: string;
  province: string;
};

let CACHE: IndonesiaLocationProps[] | null = null;

export const getIndonesiaLocations = () => {
  if (CACHE) return CACHE;

  const locations: IndonesiaLocationProps[] = [];
  const states = State.getStatesOfCountry("ID");

  for (const state of states) {
    for (const city of City.getCitiesOfState("ID", state.isoCode)) {
      locations.push({
        key: `${city.name}-${state.isoCode}`,
        city: city.name,
        province: state.name,
        label: `${city.name}, ${state.name}`,
        value: `${city.name}, ${state.name}, Indonesia`,
      });
    }
  }

  CACHE = locations;
  return locations;
};
