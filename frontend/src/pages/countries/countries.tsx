import React from "react";
import { Country } from "../../types";
import { useQuery } from "@apollo/client";
import { queryAllCountries } from "@/graphql/queryAllCountries";
import Header from "@/components/Header";
import Link from "next/link";

const Countries = (): React.ReactNode => {
  const { data } = useQuery<{ countries: Country[] }>(queryAllCountries);

  const countries: Country[] = data ? data.countries : [];

  return (
    <Header>
      <div>
        {countries.map((country) => (
          <div key={country.id}>
            <Link href={`/countries/${country.code}`}>
              <h3>{country.name}</h3>
            </Link>
            <p>{country.emoji}</p>
            <p>Code: {country.code}</p>
            <p>Continent: {country.continent.name}</p>
          </div>
        ))}
      </div>
    </Header>
  );
};

export default Countries;
