import { Country, State, City } from "country-state-city";

export type LocationOption = {
  key: string;
  value: string;
  city: string;
  country: string;
};

export const getAllLocations = (): LocationOption[] => {
  const locations: LocationOption[] = [];

  Country.getAllCountries().forEach((country) => {
    State.getStatesOfCountry(country.isoCode).forEach((state) => {
      City.getCitiesOfState(country.isoCode, state.isoCode).forEach((city) => {
        locations.push({
          key: `${city.name}-${city.stateCode ?? "NA"}-${city.countryCode}`,
          city: city.name,
          country: country.name,
          value: `${city.name}, ${country.name}`,
        });
      });
    });
  });

  return locations;
};
